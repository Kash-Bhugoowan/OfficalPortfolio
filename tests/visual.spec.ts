import { test, expect } from "@playwright/test";
import { waitForEntrance, freezeMarquee } from "./helpers";

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
});
