import { chromium } from "playwright";

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const page = await ctx.newPage();
await page.goto("http://localhost:3000/case-studies/minerva", { waitUntil: "networkidle" });
const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < scrollHeight; y += 500) {
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(150);
}
await page.waitForTimeout(500);

const heading = page.getByRole("heading", { name: "Designing the brain of the tool" });
await heading.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
const box = await heading.locator("xpath=../..").boundingBox();
await page.screenshot({ path: "/tmp/subtitle-color.png", clip: { x: box.x, y: box.y, width: box.width, height: 220 } });

await browser.close();
