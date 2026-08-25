import { test, expect, loginAs, CLEAN_ID } from "./fixtures";

test.describe("Profile & Documents", () => {
  test("Journey 1: Profile and Documents navigation", async ({ page }) => {
    // Login -> Dashboard
    await loginAs(page, CLEAN_ID);
    await page.goto("/dashboard");
    
    // Check Dashboard
    await expect(page.getByText("Good evening,")).toBeVisible();
    
    // -> Profile
    await page.getByRole("button", { name: /^P/ }).first().click();
    await page.getByRole("menuitem", { name: "Profile Settings" }).click();
    await expect(page).toHaveURL(/\/dashboard\/profile/);
    await expect(page.getByRole("heading", { name: "Identity & Verification" })).toBeVisible();
    
    // Check masked Aadhaar (the mock data has a masked Aadhaar ending in 4821 for Priya)
    await expect(page.getByText(/4821/)).toBeVisible();
    await expect(page.getByText("Verified").first()).toBeVisible();

    // -> Documents
    await page.getByRole("button", { name: /^P/ }).first().click();
    await page.getByRole("menuitem", { name: "Document Center" }).click();
    await expect(page).toHaveURL(/\/dashboard\/documents/);
    
    // Check DigiLocker component
    await expect(page.getByText("DigiLocker")).toBeVisible();
    
    // -> Logout
    await page.getByRole("button", { name: /^P/ }).first().click();
    await page.getByRole("menuitem", { name: "Log out" }).click();
    await page.getByRole("button", { name: "Log out", exact: true }).click();
    await expect(page).toHaveURL(/\/login/);
  });
});
