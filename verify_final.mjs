import { chromium } from "playwright";
const browser = await chromium.launch();
const errors = [];
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
page.on("pageerror", (e) => errors.push("pageerror: " + e.message));
await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

// --- Part 1: sibling dimming ---
await page.getByText("My design principles").scrollIntoViewIfNeeded();
await page.waitForTimeout(500);
const cards = page.locator("article");
await cards.nth(0).hover();
await page.waitForTimeout(500);
const opacities = await page.evaluate(() => {
  return Array.from(document.querySelectorAll("article")).map((el) => {
    const inner = el.querySelector(":scope > div");
    return getComputedStyle(inner).opacity;
  });
});
console.log("opacities while hovering card 0 (expect [1, 0.6, 0.6]):", opacities);

// move away from whole row
await page.mouse.move(50, 50);
await page.waitForTimeout(500);
const opacitiesAfter = await page.evaluate(() => {
  return Array.from(document.querySelectorAll("article")).map((el) => {
    const inner = el.querySelector(":scope > div");
    return getComputedStyle(inner).opacity;
  });
});
console.log("opacities after mouse leaves row (expect [1,1,1]):", opacitiesAfter);

// confirm hovered card's own diagram still assembles
await cards.nth(0).hover();
await page.waitForTimeout(800);
const circleOffset = await page.evaluate(() => {
  const card0 = document.querySelectorAll("article")[0];
  const circle = card0.querySelector(".rounded-full.border");
  const m = getComputedStyle(circle).transform;
  const match = m.match(/matrix\([^,]+, [^,]+, [^,]+, [^,]+, ([^,]+),/);
  return match ? parseFloat(match[1]) : null;
});
console.log("card0 circle offset while hovered (expect ~-29, assembled):", circleOffset);

console.log("ERRORS after part 1:", JSON.stringify(errors));
await browser.close();
