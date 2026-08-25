import { test, expect, loginAs } from "./fixtures";

export const UNMERGED_PF_ID = "unmerged-pf";

test.describe("Employment & Consolidation", () => {
  test("Journey 3: View employment and consolidate PF", async ({ page }) => {
    // Login as UNMERGED_PF
    await loginAs(page, UNMERGED_PF_ID);
    await page.goto("/dashboard");
    
    // -> Employment
    await page.getByRole("link", { name: /Employment/i }).click();
    await expect(page).toHaveURL(/\/dashboard\/employment/);
    
    // Check Timeline
    await expect(page.getByRole("heading", { name: "Employment History" })).toBeVisible();
    await expect(page.getByText("Previous Employer")).first().toBeVisible();
    
    // -> Previous PF (Tech Mahindra - mock data)
    await page.getByRole("link", { name: /Tech Mahindra/i }).click();
    
    // -> Consolidation
    await expect(page.getByRole("heading", { name: "Transfer Recommended" })).toBeVisible();
    await page.getByRole("link", { name: "Start Transfer" }).click();
    
    // The link should take them to the online claims transfer page
    await expect(page).toHaveURL(/\/services\/online-claims-transfer/);
    await expect(page.getByRole("heading", { name: "One Member - One EPF Account" })).toBeVisible();
  });
});
