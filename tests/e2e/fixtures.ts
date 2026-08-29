import { test as base, expect } from "@playwright/test";

// Shared fixture: fails a test if any console error fires during it.
// Every spec imports `test` from here instead of "@playwright/test"
// directly, so the console-error check is automatic everywhere.
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error" && !msg.text().includes("404")) errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await use(errors);
    expect(errors, `Console errors:\n${errors.join("\n")}`).toEqual([]);
  },
});

export { expect };

// Known-good demo profiles, matching src/data/mockAccounts.ts.
export const NAME_MISMATCH_UAN = "100912345678";
export const CLEAN_UAN = "100911112222";
export const NAME_MISMATCH_ID = "name-mismatch";
export const CLEAN_ID = "clean";
export const DOB_MISMATCH_UAN = "100922223333";
export const DOB_MISMATCH_ID = "dob-mismatch";
// "fully-broken" in mockMembers.json / "multiple-issues" in mockAccounts.ts —
// the only profile carrying a DOB gap inside the 3-year tolerance.
export const MULTI_ISSUE_UAN = "100999990000";
export const MULTI_ISSUE_ID = "multiple-issues";

import { Page } from "@playwright/test";

export async function loginAs(page: Page, accountId: string) {
  await page.goto("/login");
  // We can either do the UI flow or set local storage directly.
  // Setting local storage is faster and robust for tests that don't test the login form itself.
  await page.evaluate((id) => {
    localStorage.setItem("epfo_mock_session", id);
  }, accountId);
}
