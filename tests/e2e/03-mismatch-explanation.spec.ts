import { test, expect, NAME_MISMATCH_ID, loginAs } from "./fixtures";

test("preflight shows the real name mismatch and its explanation", async ({
  page,
  consoleErrors,
}) => {
  const NAME_MISMATCH_UAN = "100912345678";
  await loginAs(page, NAME_MISMATCH_ID);
  await page.goto(`/claim/preflight?uan=${NAME_MISMATCH_UAN}&reason=medical`);

  const mismatchCard = page.getByRole("status", { name: /Significant name difference detected: fail/ });
  await expect(mismatchCard).toBeVisible();
  await expect(mismatchCard).toContainText("RAJESH KUMAR SINGH");
  await expect(mismatchCard).toContainText("Why are you seeing this?");

  // Other checks pass on this profile, so the fix flow must be reachable —
  // this is the exact bug the audit found (previously a dead end).
  await expect(page.getByRole("link", { name: "Fix the issue and continue" })).toBeVisible();
  void consoleErrors;
});
