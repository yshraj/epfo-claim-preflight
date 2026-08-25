import { test, expect, CLEAN_ID, NAME_MISMATCH_ID, CLEAN_UAN, loginAs } from "./fixtures";

test("all-pass -> submit -> confirmation -> status timeline", async ({ page, consoleErrors }) => {
  await loginAs(page, CLEAN_ID);
  await page.goto(`/claim/preflight?uan=${CLEAN_UAN}&reason=medical`);
  await expect(page.getByRole("button", { name: "Submit claim" })).toBeVisible();
  await page.getByRole("button", { name: "Submit claim" }).click();

  await expect(page).toHaveURL(/\/claim\/status/);
  await expect(page.getByRole("heading", { name: "Claim submitted" })).toBeVisible();
  await expect(page.getByText(/CLM-2026-/)).toBeVisible();
  await expect(page.getByText("Regional processing", { exact: true })).toBeVisible();
  await expect(page.getByText("What happens next?")).toBeVisible();
  void consoleErrors;
});

test("status page redirects instead of showing a false confirmation", async ({
  page,
  consoleErrors,
}) => {
  const NAME_MISMATCH_UAN = "100912345678";
  await loginAs(page, NAME_MISMATCH_ID);
  await page.goto(`/claim/status?uan=${NAME_MISMATCH_UAN}&reason=medical`);

  // Guard should bounce back to preflight rather than showing "Claim submitted"
  await expect(page).toHaveURL(/\/claim\/preflight/);
  await expect(page.getByRole("heading", { name: "Claim submitted" })).toHaveCount(0);
  void consoleErrors;
});
