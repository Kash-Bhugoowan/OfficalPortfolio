import { test, expect } from "@playwright/test";
import { waitForEntrance, freezeMarquee, scrollToProjectsCheckpoint } from "./helpers";

test.describe("visual regression", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await waitForEntrance(page);
    await freezeMarquee(page);
  });

  test("full homepage", async ({ page }) => {
    await expect(page).toHaveScreenshot("homepage.png", { fullPage: true });
  });

  test("nav bar", async ({ page }) => {
    await expect(page.locator("nav")).toHaveScreenshot("nav.png");
  });

  test("hero section", async ({ page }) => {
    await expect(page.locator("section").first()).toHaveScreenshot("hero.png");
  });

  test("projects heading", async ({ page }) => {
    // Scoped to the heading's own wrapper rather than a page-wide "h2"
    // lookup — several more h2-headed sections (Capabilities, Design
    // Principles, Community, Contact) have been added since this test was
    // written, so an unscoped "h2" now matches 5 elements.
    const heading = page.locator("[data-sticky-header]");
    await heading.scrollIntoViewIfNeeded();
    await page.waitForTimeout(300);
    await expect(heading).toHaveScreenshot("projects-heading.png");
  });

  test("projects card 1 pinned", async ({ page }) => {
    // The sticky-card effect is desktop-only by design — mobile renders
    // MobileProjectCard in normal document flow instead, so [data-sticky-card]
    // is never visible to screenshot on mobile.
    test.skip(
      page.viewportSize()!.width < 768,
      "sticky card stack is desktop-only",
    );
    await scrollToProjectsCheckpoint(page, 0.18);
    await expect(page.locator('[data-sticky-card="0"]')).toHaveScreenshot(
      "projects-card1-pinned.png",
    );
  });

  test("projects card 2 covering card 1", async ({ page }) => {
    await scrollToProjectsCheckpoint(page, 0.45);
    await expect(page).toHaveScreenshot("projects-card2-covering.png", {
      clip: { x: 0, y: 0, width: 1400, height: 900 },
    });
  });
});
