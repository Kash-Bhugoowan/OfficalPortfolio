"use client";

import { useEffect, useState } from "react";

// Mirrors Tailwind's `md` breakpoint in JS — the shared mobile/desktop
// split used anywhere a component needs to branch behavior in JS rather
// than just CSS (e.g. disabling a scroll-linked effect, auto-closing a
// mobile-only overlay on resize).
export function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    setIsDesktop(query.matches);
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    query.addEventListener("change", handler);
    return () => query.removeEventListener("change", handler);
  }, []);
  return isDesktop;
}
