import { test, expect, loginAs, CLEAN_ID, CLEAN_UAN, DOB_MISMATCH_ID, DOB_MISMATCH_UAN } from "./fixtures";
import { computeEligibility, serviceMonthsOf, ageOf } from "@/lib/eligibilityEngine";
import members from "@/data/mockMembers.json";
import type { ClaimReason, MemberProfile } from "@/types/member";

const TODAY = new Date("2026-08-29");
const profiles = members as MemberProfile[];
const byId = (id: string) => profiles.find((m) => m.id === id)!;
const REASONS: ClaimReason[] = ["medical", "house", "education", "leaving_job", "retirement"];

// Pure rule assertions. These pin the thresholds of the EPF Scheme, 2026
// framework encoded in eligibilityEngine.ts, so a later edit to any constant
// fails loudly here instead of silently changing what members are told
// they're owed.
test.describe("eligibility rules", () => {
  test("partial withdrawal is capped at 75%, with 25% retained", () => {
    const m = byId("dob-mismatch");
    const corpus = m.balance.employee + m.balance.employer;
    const r = computeEligibility(m, "medical", TODAY);

    expect(r.withdrawableAmount).toBe(Math.round(corpus * 0.75));
    expect(r.minimumBalance).toBe(Math.round(corpus * 0.25));
    expect(r.withdrawableAmount + r.minimumBalance).toBe(corpus);

    // The breakdown must actually add up to the headline figure, or the
    // "here's the arithmetic" promise is a lie.
    const sum = r.breakdown.reduce((a, l) => a + l.amount, 0);
    expect(sum).toBe(r.withdrawableAmount);
  });

  test("final settlement releases the retained 25% too", () => {
    const m = byId("missing-doe"); // 74 days since contribution, past the 60-day mark
    const corpus = m.balance.employee + m.balance.employer;
    const r = computeEligibility(m, "leaving_job", TODAY);

    expect(r.status).toBe("eligible");
    expect(r.category).toBe("final_settlement");
    expect(r.minimumBalance).toBe(0);
    expect(r.withdrawableAmount).toBe(corpus + m.balance.pension);
  });

  test("the unemployment clock gates 75% at 30 days and 100% at 60", () => {
    const base = byId("clean");
    const outcomes = [29, 30, 59, 60].map((d) => {
      const r = computeEligibility({ ...base, daysSinceLastContribution: d }, "leaving_job", TODAY);
      return { d, status: r.status, category: r.category };
    });

    expect(outcomes[0].status).toBe("not_yet_eligible");
    expect(outcomes[1].status).toBe("partially_eligible");
    expect(outcomes[2].status).toBe("partially_eligible");
    expect(outcomes[3].status).toBe("eligible");
    expect(outcomes[3].category).toBe("final_settlement");
  });

  test("the 10-year EPS cliff flips withdrawal to a scheme certificate", () => {
    const base = { ...byId("clean"), dateOfExit: null, daysSinceLastContribution: 5 };
    const at = (startDate: string) =>
      computeEligibility(
        {
          ...base,
          employmentHistory: [{ ...base.employmentHistory![0], startDate, endDate: "Present" }],
        } as MemberProfile,
        "leaving_job",
        TODAY,
      );

    // 119 months of service — still withdrawable as cash.
    const under = at("2016-09-01");
    expect(under.pension.withdrawable).toBe(true);

    // 120 months — a scheme certificate instead, and Form 10C drops away.
    const over = at("2016-08-01");
    expect(over.pension.withdrawable).toBe(false);
    expect(over.pension.note).toContain("scheme certificate");
  });

  test("partial withdrawal needs 12 months of membership while still employed", () => {
    const base = { ...byId("clean"), dateOfExit: null };
    const at = (startDate: string) =>
      computeEligibility(
        {
          ...base,
          employmentHistory: [{ ...base.employmentHistory![0], startDate, endDate: "Present" }],
        } as MemberProfile,
        "medical",
        TODAY,
      );

    expect(at("2025-09-01").status).toBe("not_yet_eligible"); // 11 months
    expect(at("2025-08-01").status).toBe("eligible"); // 12 months
  });

  test("retirement settlement is gated on age, read from the Aadhaar DOB", () => {
    const m = byId("dob-mismatch");
    expect(ageOf(m, TODAY)).toBe(39);

    const tooYoung = computeEligibility(m, "retirement", TODAY);
    expect(tooYoung.status).toBe("not_yet_eligible");
    expect(tooYoung.blockedReason).toContain("age 55");

    const older = computeEligibility({ ...m, dobAadhaar: "1965-06-14" }, "retirement", TODAY);
    expect(older.status).toBe("eligible");
  });

  test("service months sum each employment period, not end-to-end", () => {
    // Two spells with a gap must not count the gap as contributing service.
    const m: MemberProfile = {
      ...byId("clean"),
      employmentHistory: [
        { id: "a", employer: "A", startDate: "2015-01-01", endDate: "2016-01-01", status: "previous", pfBalance: 1 },
        { id: "b", employer: "B", startDate: "2025-01-01", endDate: "2026-01-01", status: "previous", pfBalance: 1 },
      ],
    };
    expect(serviceMonthsOf(m, TODAY)).toBeLessThan(30); // ~24, not ~132
  });

  test("every profile and reason produces a coherent result", () => {
    for (const m of profiles) {
      for (const reason of REASONS) {
        const r = computeEligibility(m, reason, TODAY);
        expect(r.withdrawableAmount, `${m.id}/${reason}`).toBeGreaterThanOrEqual(0);
        expect(r.withdrawableAmount, `${m.id}/${reason}`).toBeLessThanOrEqual(
          m.balance.employee + m.balance.employer + m.balance.pension,
        );
        if (r.status === "not_yet_eligible") {
          expect(r.blockedReason, `${m.id}/${reason} must explain the block`).toBeTruthy();
          expect(r.withdrawableAmount).toBe(0);
        } else {
          expect(r.forms.length, `${m.id}/${reason} must resolve a form`).toBeGreaterThan(0);
        }
      }
    }
  });
});

test.describe("eligibility on the preflight page", () => {
  test("the chosen reason drives the amount shown", async ({ page, consoleErrors }) => {
    await loginAs(page, CLEAN_ID);
    await page.goto(`/claim/preflight?uan=${CLEAN_UAN}&reason=medical`);

    const panel = page.getByRole("region", { name: /Eligibility for a medical emergency/ });
    await expect(panel).toBeVisible();
    // 75% of (340000 + 350000) = 517500
    await expect(panel).toContainText("₹5,17,500");
    await expect(panel).toContainText("Essential Needs");
    await expect(panel).toContainText("Retained in your account");

    // Same member, different reason -> a different category and route.
    await page.goto(`/claim/preflight?uan=${CLEAN_UAN}&reason=house`);
    await expect(
      page.getByRole("region", { name: /Eligibility for buying or building a house/ }),
    ).toContainText("Housing Needs");
    void consoleErrors;
  });

  test("clean records with an unmet waiting period block submission without a fix prompt", async ({
    page,
    consoleErrors,
  }) => {
    // Priya passes every record check but is only 12 days past her last
    // contribution, so the job-exit route isn't open yet.
    await loginAs(page, CLEAN_ID);
    await page.goto(`/claim/preflight?uan=${CLEAN_UAN}&reason=leaving_job`);

    await expect(page.getByText("Your records are in order.")).toBeVisible();
    await expect(page.getByRole("button", { name: "Submit claim" })).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Fix the issue and continue" })).toHaveCount(0);
    void consoleErrors;
  });

  test("an unrecognised reason falls back instead of breaking", async ({ page, consoleErrors }) => {
    await loginAs(page, DOB_MISMATCH_ID);
    await page.goto(`/claim/preflight?uan=${DOB_MISMATCH_UAN}&reason=../../etc/passwd`);
    await expect(
      page.getByRole("region", { name: /Eligibility for a medical emergency/ }),
    ).toBeVisible();
    void consoleErrors;
  });
});
