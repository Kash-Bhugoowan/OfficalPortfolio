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

/**
 * Scrolls to a fraction of the way through the projects section's total
 * scrollable range, so sticky-stack tests don't hardcode raw pixel values
 * that would break the moment card heights change.
 */
export async function scrollToProjectsCheckpoint(page: Page, fraction: number) {
  const { sectionTop, pageHeight } = await page.evaluate(() => {
    const section = document.querySelector("h2")!.closest("section")!;
    return {
      sectionTop: (section as HTMLElement).offsetTop,
      pageHeight: document.body.scrollHeight,
    };
  });
  const y = sectionTop + fraction * (pageHeight - sectionTop);
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await page.waitForTimeout(600);
}
