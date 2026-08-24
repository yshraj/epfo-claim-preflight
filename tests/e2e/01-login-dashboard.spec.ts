import { test, expect } from "./fixtures";

test("login -> dashboard shows balance and readiness", async ({ page, consoleErrors }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: "Member login" })).toBeVisible();

  await page.getByRole("link", { name: /RAJESH KUMAR SINGH/ }).click();

  await expect(page).toHaveURL(/\/dashboard/);
  await expect(page.getByText("Total PF balance")).toBeVisible();
  await expect(page.getByRole("link", { name: "Withdraw funds" })).toBeVisible();
  void consoleErrors;
});
