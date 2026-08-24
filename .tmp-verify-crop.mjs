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
await page.waitForTimeout(700);

const whatsNext = page.getByRole("heading", { name: "From proof of concept to production" });
await whatsNext.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
const wnBox = await whatsNext.locator("xpath=../..").boundingBox();
await page.screenshot({ path: "/tmp/crop-whatsnext.png", clip: { x: wnBox.x, y: wnBox.y, width: wnBox.width, height: wnBox.height } });

const reflectionLabel = page.getByText("Reflection", { exact: true });
await reflectionLabel.scrollIntoViewIfNeeded();
await page.waitForTimeout(400);
const rBox = await page.evaluate(() => {
  const section = [...document.querySelectorAll("section")].pop();
  const r = section.getBoundingClientRect();
  return { x: r.x, y: r.y, width: r.width, height: r.height };
});
await page.screenshot({ path: "/tmp/crop-reflections.png", clip: rBox });

await browser.close();
