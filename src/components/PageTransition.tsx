"use client";

import { useEffect, useLayoutEffect, type ReactNode } from "react";
import { motion, useAnimation, useReducedMotion } from "framer-motion";
import { registerExit, unregisterExit, consumeScrollReset } from "@/lib/pageTransitionBus";

// Wraps every page's content below <Nav/> (and below the decorative
// CaseStudyTopGradient/CaseStudyBottomGradient, where a page has them) so a
// route-transition animation can target this one element without ever
// touching Nav. Nav must stay visually static across navigations, so it's
// deliberately rendered as this wrapper's sibling in every page.tsx, never
// its child — see Nav.tsx and CaseStudyPageBackground.tsx for why.
//
// Same easing curve as lib/motion.ts's fadeInUp ([0.22, 1, 0.36, 1], an
// ease-out-expo shape) so this reads as the same "language" as every
// component-level cascade — just much faster. This wrapper's job is only
// to cover the exit/scroll-reset moment and give content a soft arrival,
// not to compete with the slower per-component waterfalls (ResumeHeader,
// CaseStudyHeader, etc.) that start playing the instant they mount,
// independent of this wrapper's own opacity.
const EASE = [0.22, 1, 0.36, 1] as const;
const ENTER_DURATION_S = 0.35;
const EXIT_DURATION_S = 0.18;

const hidden = { opacity: 0, y: 14 };
const visible = { opacity: 1, y: 0, transition: { duration: ENTER_DURATION_S, ease: EASE } };
const exited = { opacity: 0, y: 14, transition: { duration: EXIT_DURATION_S, ease: EASE } };

export default function PageTransition({ children }: { children: ReactNode }) {
  const controls = useAnimation();
  const reduceMotion = useReducedMotion();

  // Pre-paint: if RouteTransitionController flagged this mount as a fresh
  // route change (not a hash link, not back/forward), snap scroll to top
  // before the browser ever paints this frame — combined with the opacity-0
  // initial state below, the jump is never visible. Runs before the effect
  // below on purpose: useLayoutEffect fires before paint, useEffect doesn't.
  useLayoutEffect(() => {
    if (consumeScrollReset()) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, []);

  useEffect(() => {
    // Deliberately never registers an exit when true: RouteTransitionController's
    // runExit() resolves instantly when nothing is registered, so reduced
    // motion falls out of "just don't animate" rather than a second code path.
    if (reduceMotion) return;

    controls.start(visible);

    async function playExit() {
      await controls.start(exited);
    }
    registerExit(playExit);
    return () => unregisterExit(playExit);
    // Intentionally mount-once: this mirrors every other mount-triggered
    // cascade in this codebase (ResumeHeader, CaseStudyHeader, ...), which
    // read reduceMotion once rather than re-subscribing mid-animation.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div initial={reduceMotion ? undefined : hidden} animate={controls}>
      {children}
    </motion.div>
  );
}
