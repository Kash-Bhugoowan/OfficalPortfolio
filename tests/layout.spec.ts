import { test, expect } from "@playwright/test";
import { waitForEntrance, scrollToProjectsCheckpoint } from "./helpers";

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

test.describe("projects sticky stack", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForEntrance(page);
  });

  test("card z-index ascends with DOM order", async ({ page }) => {
    const zIndexes = await page.evaluate(() =>
      Array.from(document.querySelectorAll("[data-sticky-card]")).map((el) =>
        Number(getComputedStyle(el).zIndex),
      ),
    );
    expect(zIndexes).toEqual([1, 2, 3]);
  });

  test("each card pins at its own configured offset (188, 220, 252px) while scrolling through its range", async ({
    page,
  }) => {
    // Checkpoints empirically correspond to each card's mid-pin window,
    // well before the synchronized release near the end of the section.
    const cases: [number, string, number][] = [
      [0.06, "0", 188],
      [0.3, "1", 220],
      [0.55, "2", 252],
    ];
    for (const [fraction, index, expectedTop] of cases) {
      await scrollToProjectsCheckpoint(page, fraction);
      const box = await page.locator(`[data-sticky-card="${index}"]`).boundingBox();
      expect(box!.y).toBe(expectedTop);
    }
  });

  test("covered card shrinks slightly but stays fully opaque (solid, no see-through)", async ({
    page,
  }) => {
    // Card 1 has landed and is covering card 0 at this checkpoint.
    await scrollToProjectsCheckpoint(page, 0.3);
    await page.waitForTimeout(1500); // let the entrance fade-in fully settle
    const inner = page.locator('[data-sticky-card="0"] > *').first();
    const innerOpacity = await inner.evaluate((el) => getComputedStyle(el).opacity);
    const transform = await inner.evaluate((el) => getComputedStyle(el).transform);
    expect(parseFloat(innerOpacity)).toBeCloseTo(1, 1);
    expect(transform).not.toBe("none"); // scale is still applied
  });

  test("tag outlines are white on cards 1 & 2, unchanged on card 3", async ({
    page,
  }) => {
    const outlineOf = (index: number) =>
      page
        .locator(`[data-sticky-card="${index}"] span.rounded-full.bg-stone-50\\/90`)
        .first()
        .evaluate((el) => getComputedStyle(el).outlineColor);
    expect(await outlineOf(0)).toBe("rgb(255, 255, 255)");
    expect(await outlineOf(1)).toBe("rgb(255, 255, 255)");
    expect(await outlineOf(2)).not.toBe("rgb(255, 255, 255)");
  });

  test("heading block internal spacing is 8px eyebrow-to-title, 8px title-to-description", async ({
    page,
  }) => {
    const eyebrow = await page.getByText("Selected Work").boundingBox();
    const heading = await page.locator("h2").boundingBox();
    const description = await page
      .locator("p", { hasText: "A selection of client work" })
      .boundingBox();

    expect(heading!.y - (eyebrow!.y + eyebrow!.height)).toBe(8);
    expect(description!.y - (heading!.y + heading!.height)).toBe(8);
  });

  test("header pins through cards landing, then releases in sync with the whole stack", async ({
    page,
  }) => {
    const header = () => page.locator("[data-sticky-header]").boundingBox();
    const card2 = () => page.locator('[data-sticky-card="2"]').boundingBox();

    // Pinned at a fixed, small offset through card 0, 1, and 2 all landing
    // (not flush at 0 — there's a deliberate top offset).
    for (const fraction of [0.06, 0.3, 0.55]) {
      await scrollToProjectsCheckpoint(page, fraction);
      const box = await header();
      expect(box!.y).toBeGreaterThan(0);
      expect(box!.y).toBeLessThan(100);
    }

    // Header sits above every card in the stacking order (never covered)
    // while pinned.
    const headerZ = await page
      .locator("[data-sticky-header]")
      .evaluate((el) => Number(getComputedStyle(el).zIndex));
    const cardZs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("[data-sticky-card]")).map((el) =>
        Number(getComputedStyle(el).zIndex),
      ),
    );
    expect(headerZ).toBeGreaterThan(Math.max(...cardZs));

    // Once card 3 has landed and dwelled for a while, continuing to scroll
    // releases the header AND the cards together — neither is left behind,
    // so there's no gap where the header used to sit.
    await scrollToProjectsCheckpoint(page, 0.66);
    const releasedHeader = await header();
    const releasedCard2 = await card2();
    expect(releasedHeader!.y).toBeLessThan(32); // moved from its pinned offset
    expect(releasedCard2!.y).toBeLessThan(252); // moved from its pinned offset
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

  test("mobile gets its own independent full-card stacking effect (16, 40, 64px), header stays static", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(300);

    // The header never goes sticky on mobile — unaffected by this feature.
    const headerPosition = await page
      .locator("[data-sticky-header]")
      .evaluate((el) => getComputedStyle(el).position);
    expect(headerPosition).toBe("static");

    // Cards ARE sticky on mobile now, at their own (smaller) offsets —
    // independent constants from desktop's 188/220/252.
    const cases: [number, string, number][] = [
      [0.06, "0", 16],
      [0.34, "1", 40],
      [0.7, "2", 64],
    ];
    for (const [fraction, index, expectedTop] of cases) {
      await scrollToProjectsCheckpoint(page, fraction);
      const card = page.locator(`[data-sticky-card="${index}"]`);
      expect(await card.evaluate((el) => getComputedStyle(el).position)).toBe("sticky");
      const box = await card.boundingBox();
      expect(box!.y).toBe(expectedTop);
    }
  });
});
