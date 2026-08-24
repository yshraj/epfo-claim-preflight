import { test as base, expect } from "@playwright/test";

// Shared fixture: fails a test if any console error fires during it.
// Every spec imports `test` from here instead of "@playwright/test"
// directly, so the console-error check is automatic everywhere.
export const test = base.extend<{ consoleErrors: string[] }>({
  consoleErrors: async ({ page }, use) => {
    const errors: string[] = [];
    page.on("console", (msg) => {
      if (msg.type() === "error") errors.push(msg.text());
    });
    page.on("pageerror", (err) => errors.push(err.message));
    await use(errors);
    expect(errors, `Console errors:\n${errors.join("\n")}`).toEqual([]);
  },
});

export { expect };

// Known-good demo profiles, matching src/data/mockMembers.json.
export const NAME_MISMATCH_UAN = "100912345678";
export const CLEAN_UAN = "100911112222";
