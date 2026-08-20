import { chromium, devices } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices['iPhone 13'] });
const page = await context.newPage();
await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
await page.waitForTimeout(1000);

await page.click('button[aria-label="Open menu"]');
await page.waitForTimeout(600);

const info = await page.evaluate(() => {
  const header = document.querySelector('button[aria-label="Close menu"]').closest('div');
  const cs = getComputedStyle(header);
  const name = [...document.querySelectorAll('span')].find(el => el.textContent.includes('Karishma'));
  const closeBtn = document.querySelector('button[aria-label="Close menu"]');
  return {
    headerPaddingTop: cs.paddingTop,
    headerTop: header.getBoundingClientRect().top,
    nameTop: name.getBoundingClientRect().top,
    closeTop: closeBtn.getBoundingClientRect().top,
    closeHeight: closeBtn.getBoundingClientRect().height,
  };
});
console.log(info);

await browser.close();
