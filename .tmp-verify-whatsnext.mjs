import { chromium } from "playwright";

const browser = await chromium.launch();

async function shot(width, height, path) {
  const ctx = await browser.newContext({ viewport: { width, height } });
  const page = await ctx.newPage();
  const errors = [];
  page.on("console", (msg) => { if (msg.type() === "error") errors.push(msg.text()); });
  page.on("pageerror", (err) => errors.push(String(err)));
  await page.goto("http://localhost:3000/case-studies/minerva", { waitUntil: "networkidle" });
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < scrollHeight; y += 500) {
    await page.mouse.wheel(0, 500);
    await page.waitForTimeout(150);
  }
  await page.waitForTimeout(500);
  await page.screenshot({ path, fullPage: true });
  console.log(path, "errors:", errors.length ? errors : "none");
  await ctx.close();
}

await shot(1440, 1000, "/tmp/whatsnext-desktop.png");
await shot(390, 844, "/tmp/whatsnext-mobile.png");

await browser.close();
