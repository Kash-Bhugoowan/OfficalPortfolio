import type { Page } from "@playwright/test";

/** Hero's entrance stagger finishes well within 3.8s (see src/components/Hero.tsx). */
export async function waitForEntrance(page: Page) {
  await page.waitForTimeout(3800);
}

/**
 * The roles marquee scrolls forever, which makes pixel screenshots
 * non-deterministic. Freeze it at a known position before comparing.
 */
export async function freezeMarquee(page: Page) {
  await page.evaluate(() => {
    document.querySelectorAll<HTMLElement>(".animate-marquee").forEach((el) => {
      el.style.animation = "none";
      el.style.transform = "translateX(0)";
    });
  });
}
