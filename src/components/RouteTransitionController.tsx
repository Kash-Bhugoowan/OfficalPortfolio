"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { runExit, requestScrollReset } from "@/lib/pageTransitionBus";

// Defensive cap on how long we wait for the current page's exit fade
// (~180ms, see PageTransition.tsx) before navigating anyway. Not the
// normal path — a safety net so a stuck animation can never leave the
// user staring at a faded-out page.
const EXIT_TIMEOUT_MS = 600;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Renders nothing. Mounted once in the root layout — a stable ancestor
// that never remounts on navigation, unlike page.tsx/Nav — so it can
// intercept every internal link click site-wide and run the same
// exit-fade -> scroll-reset -> navigate sequence, without touching Nav or
// re-editing the 8 files that already render next/link from commit 1.
//
// Why not AnimatePresence/template.tsx: both need a stable ancestor to
// hold the outgoing page's DOM on screen while it fades, but Nav lives
// inside page.tsx (not layout.tsx, per the background audit), so any
// element that wrapper could animate would include Nav — exactly what
// must never fade. Fading the *current* page's content before navigating
// (here), rather than after React unmounts it, sidesteps that entirely:
// there's nothing to keep mounted, because we haven't navigated yet.
export default function RouteTransitionController() {
  const router = useRouter();
  const navTokenRef = useRef(0);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented) return;
      if (e.button !== 0) return; // primary button only; keyboard-activated clicks report 0 too

      const anchor = (e.target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      // Nav's mobile overlay (Nav.tsx) marks its own links and fully owns their
      // click -> close-overlay -> navigate sequencing itself, so the overlay's
      // exit-fade finishes before navigation starts. Left to this controller, its
      // capture-phase listener runs (and starts navigating) before the overlay's
      // own fade even begins, racing it closed underneath the new page. See
      // Nav.tsx's handleMenuLinkClick/handleOverlayExitComplete.
      if (anchor.dataset.navOverlayLink) return;

      const target = anchor.getAttribute("target");
      if (target && target !== "_self") return; // new tab/window
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return; // open-in-new-tab intents
      if (anchor.hasAttribute("download")) return;

      let url: URL;
      try {
        url = new URL(anchor.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return; // external, mailto:, tel:, etc.

      const here = window.location;
      const samePath = url.pathname === here.pathname && url.search === here.search;
      if (samePath) return; // same-page hash scroll (or a no-op link) — leave to default Link behavior

      // Real cross-route navigation from here on.
      e.preventDefault();
      const token = ++navTokenRef.current;
      const hasHash = url.hash.length > 0;
      const destination = url.pathname + url.search + url.hash;

      (async () => {
        try {
          await Promise.race([runExit(), wait(EXIT_TIMEOUT_MS)]);
          if (token !== navTokenRef.current) return; // superseded by a later click — don't queue

          if (hasHash) {
            // Cross-page hash link (e.g. Nav's "Work" clicked from another
            // page): don't force scroll-to-top, it would fight the target
            // section. router.push here is exactly what <Link> itself
            // calls under the hood, so the hash-scroll behaves identically
            // to a native, un-intercepted click.
            router.push(destination);
          } else {
            // Flag the reset for the *incoming* page to apply pre-paint —
            // see pageTransitionBus.ts for why this can't happen here, on
            // the outgoing page, without corrupting back/forward's saved
            // scroll position for the page being left.
            requestScrollReset();
            router.push(destination, { scroll: false });
          }
        } catch {
          window.location.href = destination; // fail open: never leave the user on a faded-out page
        }
      })();
    }

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, [router]);

  return null;
}
