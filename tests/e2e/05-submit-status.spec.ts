import { test, expect, CLEAN_UAN } from "./fixtures";

test("all-pass -> submit -> confirmation -> status timeline", async ({ page, consoleErrors }) => {
  await page.goto(`/claim/preflight?uan=${CLEAN_UAN}&reason=medical`);
  await expect(page.getByRole("link", { name: "Submit claim" })).toBeVisible();
  await page.getByRole("link", { name: "Submit claim" }).click();

  await expect(page).toHaveURL(/\/claim\/status/);
  await expect(page.getByRole("heading", { name: "Claim submitted" })).toBeVisible();
  await expect(page.getByText(/CLM-2026-/)).toBeVisible();
  await expect(page.getByRole("listitem", { name: /Claim submitted, complete/ })).toBeVisible();

  await expect(page.getByText("You knew about the problem before EPFO did.")).toBeVisible();
  void consoleErrors;
});

test("status page redirects instead of showing a false confirmation", async ({
  page,
  consoleErrors,
}) => {
  const NAME_MISMATCH_UAN = "100912345678";
  await page.goto(`/claim/status?uan=${NAME_MISMATCH_UAN}&reason=medical`);

  // Guard should bounce back to preflight rather than showing "Claim submitted"
  await expect(page).toHaveURL(/\/claim\/preflight/);
  await expect(page.getByRole("heading", { name: "Claim submitted" })).toHaveCount(0);
  void consoleErrors;
});
