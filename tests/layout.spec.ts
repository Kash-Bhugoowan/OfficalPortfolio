import { test, expect } from "@playwright/test";
import { waitForEntrance } from "./helpers";

test.describe("spacing invariants", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForEntrance(page);
  });

  test("nav sits 24px from the top", async ({ page }) => {
    const nav = await page.locator("nav").boundingBox();
    expect(nav?.y).toBe(24);
  });

  test("photo is 48px below the nav", async ({ page }) => {
    const nav = await page.locator("nav").boundingBox();
    const photo = await page
      .locator('img[alt="Portrait of Karishma Bhugoowan"]')
      .boundingBox();
    expect(photo!.y - (nav!.y + nav!.height)).toBe(48);
  });

  test("heading is 48px below the photo", async ({ page }) => {
    const photo = await page
      .locator('img[alt="Portrait of Karishma Bhugoowan"]')
      .boundingBox();
    const h1 = await page.locator("h1").boundingBox();
    expect(h1!.y - (photo!.y + photo!.height)).toBe(48);
  });

  test("description is 32px below the heading", async ({ page }) => {
    const h1 = await page.locator("h1").boundingBox();
    const desc = await page
      .locator("p", { hasText: "I take complex problems" })
      .boundingBox();
    expect(desc!.y - (h1!.y + h1!.height)).toBe(32);
  });

  test("FT line is 32px below the description", async ({ page }) => {
    const desc = await page
      .locator("p", { hasText: "I take complex problems" })
      .boundingBox();
    const ft = await page
      .locator("p", { hasText: "Interviewed by the" })
      .boundingBox();
    expect(ft!.y - (desc!.y + desc!.height)).toBe(32);
  });

  test("roles marquee is 32px below the FT line", async ({ page }) => {
    const ft = await page
      .locator("p", { hasText: "Interviewed by the" })
      .boundingBox();
    const marquee = await page.locator(".animate-marquee").first().boundingBox();
    expect(marquee!.y - (ft!.y + ft!.height)).toBe(32);
  });

  test("roles marquee window matches the hero text column width", async ({
    page,
  }) => {
    const desc = await page
      .locator("p", { hasText: "I take complex problems" })
      .boundingBox();
    const clipDiv = await page.locator(".overflow-hidden").first().boundingBox();
    expect(clipDiv!.x).toBeCloseTo(desc!.x, 0);
    expect(clipDiv!.width).toBeCloseTo(desc!.width, 0);
  });

  test("photo gallery is 32px below the roles marquee", async ({ page }) => {
    const marquee = await page.locator(".animate-marquee").first().boundingBox();
    const gallery = await page
      .locator(".animate-marquee-reverse")
      .first()
      .boundingBox();
    expect(gallery!.y - (marquee!.y + marquee!.height)).toBe(32);
  });

  test("photo gallery breaks out wider than the hero text column", async ({
    page,
  }) => {
    const desc = await page
      .locator("p", { hasText: "I take complex problems" })
      .boundingBox();
    const galleryClip = await page
      .locator(".animate-marquee-reverse")
      .first()
      .locator("..")
      .boundingBox();
    // Figma's max-w-[1800px] window should be at least as wide as the 896px
    // hero text column — equal only when the viewport itself is the limiting
    // factor (e.g. mobile), strictly wider once the viewport exceeds 896px.
    expect(galleryClip!.width).toBeGreaterThanOrEqual(desc!.width);
  });

  test("no horizontal overflow on mobile", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);
    const { scrollWidth, innerWidth } = await page.evaluate(() => ({
      scrollWidth: document.body.scrollWidth,
      innerWidth: window.innerWidth,
    }));
    expect(scrollWidth).toBe(innerWidth);
  });
});

test.describe("behavior invariants", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForEntrance(page);
  });

  test("nav link hover turns accent purple", async ({ page }) => {
    const link = page.getByRole("link", { name: "Work" });
    const before = await link.evaluate((el) => getComputedStyle(el).color);
    await link.hover();
    await page.waitForTimeout(1500); // let the spring settle past its asymptote
    const after = await link.evaluate((el) => getComputedStyle(el).color);
    expect(before).not.toBe(after);
    // #6757e8, allowing ±1 per channel for spring-settle rounding
    const [, r, g, b] = after.match(/rgb\((\d+), (\d+), (\d+)\)/)!.map(Number);
    expect(r).toBeCloseTo(103, 0);
    expect(g).toBeCloseTo(87, 0);
    expect(b).toBeCloseTo(232, 0);
  });

  test("Financial Times link grows and changes color on hover, no underline", async ({
    page,
  }) => {
    const link = page.getByRole("link", { name: "Financial Times" });
    const decoration = await link.evaluate(
      (el) => getComputedStyle(el).textDecorationLine,
    );
    expect(decoration).toBe("none");

    const restSize = await link.evaluate((el) => getComputedStyle(el).fontSize);
    await link.hover();
    await page.waitForTimeout(900);
    const hoverSize = await link.evaluate((el) => getComputedStyle(el).fontSize);
    expect(parseFloat(hoverSize)).toBeGreaterThan(parseFloat(restSize));
  });

  test("roles marquee scrolls continuously without stalling", async ({ page }) => {
    const track = page.locator(".animate-marquee");
    const readX = () =>
      track.evaluate((el) => {
        const m = getComputedStyle(el).transform;
        const match = m.match(/matrix\(([^)]+)\)/);
        return match ? parseFloat(match[1].split(",")[4]) : 0;
      });
    const deltas: number[] = [];
    let prev = await readX();
    for (let i = 0; i < 3; i++) {
      await page.waitForTimeout(1000);
      const cur = await readX();
      deltas.push(Math.abs(prev - cur));
      prev = cur;
    }
    // every 1s interval should show meaningful, roughly consistent movement
    for (const d of deltas) expect(d).toBeGreaterThan(5);
  });

  test("photo gallery scrolls continuously in the opposite direction from roles", async ({
    page,
  }) => {
    const readX = (selector: string) =>
      page.locator(selector).first().evaluate((el) => {
        const m = getComputedStyle(el).transform;
        const match = m.match(/matrix\(([^)]+)\)/);
        return match ? parseFloat(match[1].split(",")[4]) : 0;
      });

    const rolesStart = await readX(".animate-marquee");
    const galleryStart = await readX(".animate-marquee-reverse");
    await page.waitForTimeout(2000);
    const rolesEnd = await readX(".animate-marquee");
    const galleryEnd = await readX(".animate-marquee-reverse");

    const rolesDelta = rolesEnd - rolesStart;
    const galleryDelta = galleryEnd - galleryStart;

    expect(Math.abs(rolesDelta)).toBeGreaterThan(5);
    expect(Math.abs(galleryDelta)).toBeGreaterThan(5);
    // roles moves left (negative), gallery moves right (positive)
    expect(rolesDelta).toBeLessThan(0);
    expect(galleryDelta).toBeGreaterThan(0);
  });
});
