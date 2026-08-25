import { test, expect, CLEAN_ID, NAME_MISMATCH_ID, loginAs } from './fixtures';
import fs from 'fs';
import path from 'path';

const viewports = [
  { width: 1440, height: 900, name: 'desktop-l' },
  { width: 1280, height: 800, name: 'desktop-m' },
  { width: 390, height: 844, name: 'mobile-ios' },
  { width: 375, height: 812, name: 'mobile-s' }
];

const cases = [
  { path: '/login', name: 'login' },
  { path: '/dashboard', name: 'dashboard', accountId: CLEAN_ID },
  { path: '/claim/type', name: 'claim-type', accountId: CLEAN_ID },
  { path: '/claim/reason', name: 'claim-reason', accountId: CLEAN_ID },
  { path: '/claim/preflight', name: 'claim-preflight-clean', accountId: CLEAN_ID },
  { path: '/claim/preflight', name: 'claim-preflight-mismatch', accountId: NAME_MISMATCH_ID },
  { path: '/claim/status', name: 'claim-status', accountId: CLEAN_ID }
];

test('Capture Screenshots', async ({ browser }) => {
  const artifactsDir = '/Users/yash.d/.gemini/antigravity-ide/brain/a86d542a-9db5-483a-8ef1-26c85645d74e/scratch/screenshots';
  if (!fs.existsSync(artifactsDir)) {
    fs.mkdirSync(artifactsDir, { recursive: true });
  }

  for (const vp of viewports) {
    const context = await browser.newContext({ viewport: { width: vp.width, height: vp.height } });
    const page = await context.newPage();

    for (const route of cases) {
      console.log(`Taking screenshot for ${route.name} at ${vp.name}`);
      if (route.accountId) {
        await loginAs(page, route.accountId);
      }
      await page.goto(`http://localhost:3000${route.path}`, { waitUntil: 'networkidle' });
      await page.screenshot({ path: path.join(artifactsDir, `${route.name}-${vp.name}.png`), fullPage: true });
    }
    await context.close();
  }
});
