import { defineConfig, devices } from "@playwright/test";

const baseURL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3000";
const isRemote = Boolean(process.env.PLAYWRIGHT_BASE_URL);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  retries: isRemote ? 1 : 0,
  reporter: [["list"]],
  use: {
    baseURL,
    trace: "retain-on-failure",
  },
  projects: [
    {
      name: "desktop-chromium",
      use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 800 } },
    },
    {
      name: "mobile-chromium",
      use: { ...devices["Pixel 7"] },
    },
  ],
  // Only spin up a local server when testing localhost — pointed at
  // production (PLAYWRIGHT_BASE_URL set), we test the real deployment.
  webServer: isRemote
    ? undefined
    : {
        command: "npm run build && npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: true,
        timeout: 120_000,
      },
});
