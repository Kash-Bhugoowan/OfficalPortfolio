import type { Page } from "@playwright/test";

/** Hero's entrance stagger (now 6 items) finishes well within 4.3s (see src/components/Hero.tsx). */
export async function waitForEntrance(page: Page) {
  await page.waitForTimeout(4300);
}

/**
 * The roles/gallery marquees scroll forever, which makes pixel screenshots
 * non-deterministic. Freeze them at a known position before comparing.
 */
export async function freezeMarquee(page: Page) {
  await page.evaluate(() => {
    document
      .querySelectorAll<HTMLElement>(".animate-marquee, .animate-marquee-reverse")
      .forEach((el) => {
        el.style.animation = "none";
        el.style.transform = "translateX(0)";
      });
  });
}
