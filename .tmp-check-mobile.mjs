import { chromium, devices } from "@playwright/test";

const browser = await chromium.launch();
const context = await browser.newContext({ ...devices["iPhone 13"] });
const page = await context.newPage();

const errors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") errors.push(`[console] ${msg.text()}`);
});
page.on("pageerror", (err) => errors.push(`[pageerror] ${err.message}`));
page.on("requestfailed", (req) => errors.push(`[requestfailed] ${req.url()} ${req.failure()?.errorText}`));

await page.goto("http://localhost:3000/skills/workshop-facilitation", { waitUntil: "domcontentloaded" });

await page.waitForTimeout(200);
await page.screenshot({ path: "/tmp/wf-mobile-0.2s.png" });
await page.waitForTimeout(600);
await page.screenshot({ path: "/tmp/wf-mobile-0.8s.png" });
await page.waitForTimeout(1000);
await page.screenshot({ path: "/tmp/wf-mobile-1.8s.png" });
await page.waitForTimeout(2000);
await page.screenshot({ path: "/tmp/wf-mobile-3.8s.png", fullPage: true });

console.log("ERRORS:", JSON.stringify(errors, null, 2));

await browser.close();
