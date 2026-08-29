import {
  test,
  expect,
  loginAs,
  DOB_MISMATCH_ID,
  DOB_MISMATCH_UAN,
  MULTI_ISSUE_ID,
  MULTI_ISSUE_UAN,
} from "./fixtures";

// The DOB check is a tolerance band, not a similarity score: inside 3 years
// Aadhaar is accepted as its own proof (warn + one-click fix), beyond it the
// member needs a separate document (fail, no inline fix). Both sides matter.

test("DOB gap beyond the 3-year limit blocks the claim and explains why", async ({
  page,
  consoleErrors,
}) => {
  await loginAs(page, DOB_MISMATCH_ID);
  await page.goto(`/claim/preflight?uan=${DOB_MISMATCH_UAN}&reason=medical`);

  const dobCard = page.getByRole("status", {
    name: /Date of birth differs by 6 years: fail/,
  });
  await expect(dobCard).toBeVisible();
  // Both records are shown, so the member can see which one is wrong.
  await expect(dobCard).toContainText("1987");
  await expect(dobCard).toContainText("1981");
  await expect(dobCard).toContainText("birth or school certificate");
  await expect(dobCard).toContainText("Why are you seeing this?");

  // Beyond tolerance there is deliberately no one-click fix.
  await expect(
    dobCard.getByRole("link", { name: "Use my Aadhaar date of birth" }),
  ).toHaveCount(0);

  // Every other check on this profile passes, so DOB alone is what blocks it.
  await expect(page.getByRole("status", { name: /Identity verified.*pass/ })).toBeVisible();
  await expect(page.getByRole("button", { name: "Submit claim" })).toHaveCount(0);
  void consoleErrors;
});

test("DOB gap inside the 3-year limit is fixable in one click", async ({
  page,
  consoleErrors,
}) => {
  await loginAs(page, MULTI_ISSUE_ID);
  await page.goto(`/claim/preflight?uan=${MULTI_ISSUE_UAN}&reason=medical`);

  const dobCard = page.getByRole("status", {
    name: /Date of birth differs by 1 day: warn/,
  });
  await expect(dobCard).toBeVisible();

  await dobCard.getByRole("link", { name: "Use my Aadhaar date of birth" }).click();

  // Real re-computation against the corrected record, not a canned success state.
  await expect(page).toHaveURL(/dobOverride=/);
  await expect(page.getByRole("status", { name: /Date of birth matches.*pass/ })).toBeVisible();
  void consoleErrors;
});

test("the identity graph renders one node per check, with no NaN coordinates", async ({
  page,
  consoleErrors,
}) => {
  await loginAs(page, DOB_MISMATCH_ID);
  await page.goto(`/claim/preflight?uan=${DOB_MISMATCH_UAN}&reason=medical`);

  const graph = page.getByRole("img", { name: /Verification graph/ });
  await expect(graph).toBeVisible();
  await expect(graph.locator("circle")).toHaveCount(5); // 4 checks + centre node

  // A hardcoded node-position table would silently emit y1="NaN" for the
  // 4th check; assert every coordinate actually parsed as a number.
  const coords = await graph.locator("line").evaluateAll((els) =>
    els.flatMap((el) => ["x1", "y1", "x2", "y2"].map((a) => el.getAttribute(a) ?? "")),
  );
  expect(coords.length).toBe(16);
  for (const c of coords) expect(Number.isFinite(Number(c))).toBe(true);
  void consoleErrors;
});
