import { chromium } from "playwright";

const browser = await chromium.launch();
const errors = [];

async function checkViewport(name, viewport) {
  const page = await browser.newPage({ viewport });
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`[${name}] ${msg.text()}`);
  });
  page.on("pageerror", (err) => errors.push(`[${name}] pageerror: ${err.message}`));

  await page.goto("http://localhost:3000/resume", { waitUntil: "networkidle" });
  await page.waitForSelector("text=My Resume");

  // Capture the waterfall mid-flight (shortly after mount) to confirm it's animating.
  await page.waitForTimeout(400);
  await page.screenshot({ path: `/tmp/resume2-${name}-midfade.png`, fullPage: false });

  await page.waitForTimeout(1800);
  await page.screenshot({ path: `/tmp/resume2-${name}-settled.png`, fullPage: false });
  await page.screenshot({ path: `/tmp/resume2-${name}-full.png`, fullPage: true });

  await page.close();
}

await checkViewport("desktop", { width: 1440, height: 900 });
await checkViewport("mobile", { width: 375, height: 812 });

await browser.close();

if (errors.length) {
  console.log("CONSOLE/PAGE ERRORS:");
  errors.forEach((e) => console.log(e));
} else {
  console.log("No console/page errors.");
}
