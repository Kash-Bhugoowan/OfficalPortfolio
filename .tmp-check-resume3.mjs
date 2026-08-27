import { chromium } from "playwright";

const browser = await chromium.launch();

async function checkViewport(name, viewport) {
  const page = await browser.newPage({ viewport });
  await page.goto("http://localhost:3000/resume", { waitUntil: "networkidle" });
  await page.waitForSelector("text=My Resume");
  await page.waitForTimeout(2200);

  const height = await page.evaluate(() => document.body.scrollHeight);
  const step = viewport.height * 0.7;
  for (let y = 0; y < height; y += step) {
    await page.evaluate((yy) => window.scrollTo(0, yy), y);
    await page.waitForTimeout(500);
  }
  await page.waitForTimeout(500);

  await page.screenshot({ path: `/tmp/resume3-${name}-full.png`, fullPage: true });
  await page.close();
}

await checkViewport("desktop", { width: 1440, height: 900 });
await checkViewport("mobile", { width: 375, height: 812 });

await browser.close();
console.log("done");
