import { test, expect } from "./fixtures";
import { CLEAN_ID } from "./fixtures";

test.describe("Authentication & Session", () => {
  test("Invalid login shows error and prevents access", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel(/Email or Mobile/).fill("invalid@example.com");
    await page.getByLabel(/Password/).fill("wrongpass");
    await page.getByRole("button", { name: "Continue" }).click();
    
    await expect(page.getByText("Invalid email/phone or password.")).toBeVisible();
    
    // Attempting to go to dashboard directly should redirect to login
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });

  test("Forgot password mock flow", async ({ page }) => {
    await page.goto("/login");
    await page.getByRole("button", { name: "Forgot password?" }).click();
    await expect(page.getByText("Enter your details to receive a password reset link")).toBeVisible();
    
    await page.getByLabel(/Email or Mobile/).fill("priya.demo@example.test");
    await page.getByRole("button", { name: "Send Reset Link" }).click();
    
    await expect(page.getByText("Password reset instructions sent. (Mocked)")).toBeVisible();
    // Should be back on the credentials step
    await expect(page.getByLabel(/Password/)).toBeVisible();
  });

  test("Valid login followed by logout", async ({ page }) => {
    await page.goto("/login");
    
    // Login flow
    await page.getByLabel(/Email or Mobile/).fill("priya.demo@example.test");
    await page.getByLabel(/Password/).fill("demo1234");
    await page.getByRole("button", { name: "Continue" }).click();
    
    // OTP step
    await expect(page.getByText("An OTP has been sent")).toBeVisible();
    await page.getByLabel(/One-Time Password/).fill("123456");
    await page.getByRole("button", { name: "Verify & Login" }).click();
    
    await expect(page).toHaveURL(/\/dashboard/);
    
    // Logout flow
    await page.getByRole("button", { name: /^P/ }).first().click(); // Matches Priya (initial or text)
    await page.getByRole("menuitem", { name: "Log out" }).click();
    
    // Confirmation dialog
    await expect(page.getByRole("heading", { name: "Log out of EPF Account?" })).toBeVisible();
    await page.getByRole("button", { name: "Log out", exact: true }).click();
    
    // Should be redirected to login
    await expect(page).toHaveURL(/\/login/);
    
    // And protected routes should bounce
    await page.goto("/dashboard");
    await expect(page).toHaveURL(/\/login/);
  });
});
