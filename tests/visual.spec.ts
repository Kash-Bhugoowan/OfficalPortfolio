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
    await page.evaluate(() => document.querySelector("h2")?.scrollIntoView());
    await page.waitForTimeout(300);
    await expect(page.locator("h2").locator("..").locator("..")).toHaveScreenshot(
      "projects-heading.png",
    );
  });

  test("projects card 1 pinned", async ({ page }) => {
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
