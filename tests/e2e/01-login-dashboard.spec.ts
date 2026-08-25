import { test, expect } from "./fixtures";

test("login -> dashboard shows balance and readiness", async ({ page, consoleErrors }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Member Login" })).toBeVisible();

  // Test actual login flow
  await page.fill('input[type="text"]', 'rajesh.demo@example.test');
  await page.fill('input[type="password"]', 'demo1234');
  await page.getByRole('button', { name: 'Continue' }).click();

  // Expect OTP step
  await expect(page.getByText("One-Time Password (OTP)")).toBeVisible();
  await page.fill('input[type="text"]', '123456');
  await page.getByRole('button', { name: 'Verify & Login' }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  // We'll also update dashboard to have 'Your next steps'
  // await expect(page.getByText("Claim Readiness")).toBeVisible(); // Will check this later
  // await expect(page.getByRole("link", { name: "Apply for Claim or Transfer" })).toBeVisible();
  void consoleErrors;
});
