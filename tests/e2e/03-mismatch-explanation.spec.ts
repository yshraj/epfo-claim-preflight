import { test, expect, NAME_MISMATCH_UAN } from "./fixtures";

test("preflight shows the real name mismatch and its explanation", async ({
  page,
  consoleErrors,
}) => {
  await page.goto(`/claim/preflight?uan=${NAME_MISMATCH_UAN}&reason=medical`);

  const mismatchCard = page.getByRole("status", { name: /Name mismatch found: fail/ });
  await expect(mismatchCard).toBeVisible();
  await expect(mismatchCard).toContainText("RAJESH KUMAR SINGH");
  await expect(mismatchCard).toContainText("Why this matters:");

  // Other checks pass on this profile, so the fix flow must be reachable —
  // this is the exact bug the audit found (previously a dead end).
  await expect(page.getByRole("link", { name: "Fix the issue and continue" })).toBeVisible();
  void consoleErrors;
});
