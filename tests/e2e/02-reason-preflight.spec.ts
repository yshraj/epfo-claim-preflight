import { test, expect, NAME_MISMATCH_UAN } from "./fixtures";

test("dashboard -> reason -> preflight loads with real checks", async ({
  page,
  consoleErrors,
}) => {
  await page.goto(`/dashboard?uan=${NAME_MISMATCH_UAN}`);
  await page.getByRole("link", { name: "Withdraw funds" }).click();

  await expect(page).toHaveURL(/\/claim\/reason/);
  await expect(page.getByRole("heading", { name: "Why do you need money?" })).toBeVisible();

  await page.getByRole("link", { name: "Medical emergency" }).click();

  await expect(page).toHaveURL(/\/claim\/preflight/);
  await expect(page.getByRole("heading", { name: "Pre-flight check" })).toBeVisible();
  await expect(page.getByRole("status").first()).toBeVisible();
  void consoleErrors;
});
