import { chromium } from 'playwright';
import path from 'path';
import fs from 'fs';

const ARTIFACTS_DIR = '/Users/yash.d/.gemini/antigravity-ide/brain/e1cb0af7-4122-4714-b87a-858fcd416549/scratch';
fs.mkdirSync(ARTIFACTS_DIR, { recursive: true });

async function capture() {
  const browser = await chromium.launch();
  const desktopContext = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const mobileContext = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });

  const desktopPage = await desktopContext.newPage();
  const mobilePage = await mobileContext.newPage();

  async function snap(url, name) {
    console.log(`Snapping ${name}...`);
    await desktopPage.goto(`http://localhost:3000${url}`);
    await desktopPage.waitForTimeout(1000); // Wait for animations
    await desktopPage.screenshot({ path: path.join(ARTIFACTS_DIR, `desktop_${name}.png`), fullPage: true });

    await mobilePage.goto(`http://localhost:3000${url}`);
    await mobilePage.waitForTimeout(1000);
    await mobilePage.screenshot({ path: path.join(ARTIFACTS_DIR, `mobile_${name}.png`), fullPage: true });
  }

  await snap('/', '01_landing');
  await snap('/login', '02_login');
  await snap('/login?uan=100988765432', '03_uan_activation'); // 100988765432 is the delayed claim and Priya is name mismatch (100912345678)
  await snap('/dashboard?uan=100911112222', '04_dashboard_clean');
  await snap('/dashboard?uan=100999887766', '05_dashboard_unmerged');
  await snap('/claim/preflight?uan=100911112222&reason=medical', '06_preflight_clean');
  await snap('/claim/preflight?uan=100912345678&reason=medical', '07_preflight_mismatch');
  await snap('/claim/fix?uan=100912345678&reason=medical', '08_inline_fix');
  await snap('/claim/status?uan=100911112222&reason=medical', '09_status_clean');
  await snap('/claim/status?uan=100988765432&reason=medical', '10_status_delayed');
  await snap('/claim/preflight?uan=100944445555&reason=medical', '11_preflight_multiple');

  await browser.close();
  console.log('Screenshots captured.');
}

capture().catch(console.error);
