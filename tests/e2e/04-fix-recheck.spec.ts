import { test, expect, NAME_MISMATCH_UAN } from "./fixtures";

test("fix -> apply correction -> recheck -> mismatch actually resolves", async ({
  page,
  consoleErrors,
}) => {
  await page.goto(`/claim/preflight?uan=${NAME_MISMATCH_UAN}&reason=medical`);
  await page.getByRole("link", { name: "Fix the issue and continue" }).click();

  await expect(page).toHaveURL(/\/claim\/fix/);
  const useAadhaarButton = page.getByRole("button", { name: /Use Aadhaar name/ });
  await expect(useAadhaarButton).toBeVisible();
  await useAadhaarButton.click();

  // Real navigation back to preflight with the correction applied,
  // and a real recomputation — not a canned success screen.
  await expect(page).toHaveURL(/\/claim\/preflight/, { timeout: 5000 });
  await expect(page).toHaveURL(/nameOverride=/);

  const identityCard = page.getByRole("status", { name: /Name matches.*pass/ });
  await expect(identityCard).toBeVisible();
  await expect(page.getByRole("link", { name: "Submit claim" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Fix the issue and continue" })).toHaveCount(0);
  void consoleErrors;
});
