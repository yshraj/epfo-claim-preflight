import { test, expect, NAME_MISMATCH_ID, loginAs } from "./fixtures";

test("dashboard -> reason -> preflight loads with real checks", async ({
  page,
  consoleErrors,
}) => {
  await loginAs(page, NAME_MISMATCH_ID);
  await page.goto(`/dashboard`);
  await page.getByRole("link", { name: "Apply for Claim or Transfer" }).click();

  await expect(page).toHaveURL(/\/claim\/type/);
  await expect(page.getByRole("heading", { name: "What would you like to do?" })).toBeVisible();

  await page.getByRole("link", { name: "Withdraw PF" }).click();

  await expect(page).toHaveURL(/\/claim\/reason/);
  await expect(page.getByRole("heading", { name: "Why do you need money?" })).toBeVisible();

  await page.getByRole("link", { name: "Medical emergency" }).click();

  await expect(page).toHaveURL(/\/claim\/preflight/);
  await expect(page.getByRole("heading", { name: "Before you submit" })).toBeVisible();
  await expect(page.getByRole("status").first()).toBeVisible();
  void consoleErrors;
});
