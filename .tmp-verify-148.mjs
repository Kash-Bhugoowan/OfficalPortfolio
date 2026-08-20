import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto('http://localhost:3000');
await page.waitForTimeout(500);

const result = await page.evaluate(() => {
  const capSection = [...document.querySelectorAll('*')].find(el => el.textContent === 'Where I can help').closest('section');
  const projectsSection = capSection.previousElementSibling;
  const trailingSpacer = projectsSection.querySelector('[aria-hidden]:last-of-type, div.hidden.md\\:block:not([style])');
  // find the last aria-hidden trailing div directly (desktop-only, no inline style, comes right before mobile flex block)
  const candidates = [...projectsSection.querySelectorAll('div[aria-hidden]')];
  const trailing = candidates[candidates.length - 1];
  const cs = getComputedStyle(projectsSection);
  return {
    trailingHeight: trailing.getBoundingClientRect().height,
    projectsBottomPadding: parseFloat(cs.paddingBottom),
    total: trailing.getBoundingClientRect().height + parseFloat(cs.paddingBottom),
  };
});
console.log(result);

await browser.close();
