import { test, expect, loginAs, DOB_MISMATCH_ID, DOB_MISMATCH_UAN, CLEAN_ID, CLEAN_UAN } from "./fixtures";
import { en } from "@/i18n/locales/en";
import { hi } from "@/i18n/locales/hi";
import { createTranslator } from "@/i18n";
import { LOCALES, LOCALE_COOKIE } from "@/i18n/config";
import { runPreflightChecks, checkDateOfBirth } from "@/lib/matchEngine";
import { computeEligibility } from "@/lib/eligibilityEngine";
import members from "@/data/mockMembers.json";
import type { MemberProfile } from "@/types/member";

const profiles = members as MemberProfile[];
const byId = (id: string) => profiles.find((m) => m.id === id)!;
const placeholders = (s: string) => (s.match(/\{(\w+)\}/g) ?? []).sort();

test.describe("translation dictionaries", () => {
  test("Hindi covers every English key", () => {
    const missing = (Object.keys(en) as (keyof typeof en)[]).filter((k) => !hi[k]);
    expect(missing, `keys missing from hi.ts: ${missing.join(", ")}`).toEqual([]);
  });

  test("placeholders match between languages", () => {
    // The failure tsc cannot see: {days} translated as {day} type-checks
    // perfectly and then renders the literal text "{day}" to a member.
    for (const key of Object.keys(en) as (keyof typeof en)[]) {
      expect(placeholders(hi[key]), `placeholder mismatch in "${key}"`).toEqual(
        placeholders(en[key]),
      );
    }
  });

  test("no Hindi string was left as its English source", () => {
    const allowed = new Set(["duration.yearMonth"]);
    const untranslated = (Object.keys(en) as (keyof typeof en)[]).filter(
      (k) => !allowed.has(k) && hi[k] === en[k],
    );
    expect(untranslated, `untranslated: ${untranslated.join(", ")}`).toEqual([]);
  });

  test("an unknown key falls back to readable text, never a raw key", () => {
    const t = createTranslator("hi");
    // @ts-expect-error deliberately probing an off-dictionary key
    expect(t("does.not.exist")).toBe("does.not.exist");
    expect(t("check.name.pass.title")).toBe(hi["check.name.pass.title"]);
  });

  test("interpolation substitutes every placeholder", () => {
    const t = createTranslator("hi");
    const out = t("check.dob.diff.title", { gap: "6 साल" });
    expect(out).toContain("6 साल");
    expect(out).not.toContain("{");
  });
});

test.describe("engines respect the active language", () => {
  test("pre-flight results come back in Hindi", () => {
    const m = byId("dob-mismatch");
    const enResults = runPreflightChecks(m, createTranslator("en"), "en-IN");
    const hiResults = runPreflightChecks(m, createTranslator("hi"), "hi-IN");

    // Same verdicts, different words — logic must not shift with language.
    expect(hiResults.map((r) => r.status)).toEqual(enResults.map((r) => r.status));
    expect(hiResults.map((r) => r.key)).toEqual(enResults.map((r) => r.key));

    const dob = hiResults.find((r) => r.key === "date_of_birth")!;
    expect(dob.title).toContain("जन्म तिथि");
    expect(dob.title).not.toContain("Date of birth");
  });

  test("month names come from Intl, not the dictionary", () => {
    const hiResult = checkDateOfBirth(byId("dob-mismatch"), createTranslator("hi"), "hi-IN");
    expect(hiResult.detail).toContain("जून");
  });

  test("eligibility amounts are identical across languages", () => {
    const m = byId("clean");
    const a = computeEligibility(m, "medical", new Date("2026-08-29"), createTranslator("en"));
    const b = computeEligibility(m, "medical", new Date("2026-08-29"), createTranslator("hi"));

    expect(b.withdrawableAmount).toBe(a.withdrawableAmount);
    expect(b.minimumBalance).toBe(a.minimumBalance);
    expect(b.categoryLabel).toBe("ज़रूरी खर्च");
  });
});

// ─── The switching mechanism ──────────────────────────────────────────────
// The locale is immutable per document: resolved on the server from the
// cookie, and changed only by loading a new document. These tests pin that
// contract, because every bug in the previous attempt came from trying to
// mutate the locale inside a live page.
test.describe("language switching", () => {
  test("ONE click switches chrome and client-rendered body together", async ({
    page,
    consoleErrors,
  }) => {
    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "Member Login" })).toBeVisible();

    await page
      .getByRole("group", { name: "Language" })
      .first()
      .getByRole("button", { name: "हिन्दी" })
      .click();

    // The click triggers a real navigation; nothing is half-translated after it.
    await page.waitForLoadState("load");
    await expect(page.getByRole("heading", { name: "सदस्य लॉगिन" })).toBeVisible();
    await expect(page.getByText("ईमेल या मोबाइल नंबर")).toBeVisible();
    await expect(page.getByText("Email or Mobile Number")).toHaveCount(0);
    await expect(page.locator("html")).toHaveAttribute("lang", "hi");
    void consoleErrors;
  });

  test("switching back to English sticks", async ({ page, consoleErrors }) => {
    await page.goto("/login");
    const group = () => page.getByRole("group", { name: "Language" }).first();

    await group().getByRole("button", { name: "हिन्दी" }).click();
    await expect(page.getByRole("heading", { name: "सदस्य लॉगिन" })).toBeVisible();

    await group().getByRole("button", { name: "English" }).click();
    await expect(page.getByRole("heading", { name: "Member Login" })).toBeVisible();

    // The reported failure was a silent revert a moment later. Hold still.
    await page.waitForTimeout(2500);
    await expect(page.getByRole("heading", { name: "Member Login" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "सदस्य लॉगिन" })).toHaveCount(0);
    await expect(group().getByRole("button", { name: "English" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    void consoleErrors;
  });

  test("the language survives navigation to an already-visited page", async ({
    page,
    consoleErrors,
  }) => {
    // "/" is cached in English first. Because switching loads a new document,
    // the whole client Router Cache is discarded, so it cannot be replayed.
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Claim Pre-Flight." })).toBeVisible();

    await page.goto("/login");
    await page
      .getByRole("group", { name: "Language" })
      .first()
      .getByRole("button", { name: "हिन्दी" })
      .click();
    await expect(page.getByRole("heading", { name: "सदस्य लॉगिन" })).toBeVisible();

    await page.getByRole("link", { name: /क्लेम प्री-फ़्लाइट/ }).first().click();
    await expect(page.getByRole("heading", { name: "क्लेम प्री-फ़्लाइट।" })).toBeVisible();
    await expect(page.getByRole("heading", { name: "Claim Pre-Flight." })).toHaveCount(0);
    void consoleErrors;
  });

  test("the choice survives a hard reload", async ({ page, consoleErrors }) => {
    await page.goto("/login");
    await page
      .getByRole("group", { name: "Language" })
      .first()
      .getByRole("button", { name: "हिन्दी" })
      .click();
    await expect(page.getByRole("heading", { name: "सदस्य लॉगिन" })).toBeVisible();

    await page.goto("/login");
    await expect(page.getByRole("heading", { name: "सदस्य लॉगिन" })).toBeVisible();
    void consoleErrors;
  });

  test("server components and engine output honour the cookie", async ({
    page,
    context,
    consoleErrors,
  }) => {
    await context.addCookies([
      { name: LOCALE_COOKIE, value: "hi", url: "http://localhost:3000" },
    ]);
    await loginAs(page, DOB_MISMATCH_ID);
    await page.goto(`/claim/preflight?uan=${DOB_MISMATCH_UAN}&reason=medical`);

    await expect(page.getByRole("heading", { name: "जमा करने से पहले" })).toBeVisible();
    await expect(page.getByText(/जन्म तिथि में/)).toBeVisible();
    void consoleErrors;
  });

  test("client-rendered protected pages translate too", async ({
    page,
    context,
    consoleErrors,
  }) => {
    await context.addCookies([
      { name: LOCALE_COOKIE, value: "hi", url: "http://localhost:3000" },
    ]);
    await loginAs(page, CLEAN_ID);
    await page.goto("/dashboard");

    await expect(page.getByText("क्लेम की तैयारी")).toBeVisible();
    await expect(page.getByText("Claim Readiness")).toHaveCount(0);
    void consoleErrors;
  });

  test("English remains the default with no cookie set", async ({ page, consoleErrors }) => {
    await loginAs(page, CLEAN_ID);
    await page.goto(`/claim/preflight?uan=${CLEAN_UAN}&reason=medical`);
    await expect(page.locator("html")).toHaveAttribute("lang", "en");
    await expect(page.getByRole("heading", { name: "Before you submit" })).toBeVisible();
    void consoleErrors;
  });

  test("every registered locale is offered in the switcher", async ({ page, consoleErrors }) => {
    await loginAs(page, CLEAN_ID);
    await page.goto("/dashboard");
    const group = page.getByRole("group", { name: "Language" }).first();
    await expect(group.getByRole("button")).toHaveCount(LOCALES.length);
    void consoleErrors;
  });
});
