"use client";

import { useSyncExternalStore } from "react";

const QUERY = "(min-width: 768px)";

// Mirrors Tailwind's `md` breakpoint in JS — the shared mobile/desktop
// split used anywhere a component needs to branch behavior in JS rather
// than just CSS (e.g. disabling a scroll-linked effect, auto-closing a
// mobile-only overlay on resize).
//
// useSyncExternalStore (rather than useState+useEffect) is the React-
// recommended way to subscribe to a browser API like matchMedia: it reads
// the live value synchronously during render instead of setting state from
// an effect after mount, and it already handles SSR/hydration correctly via
// getServerSnapshot.
function subscribe(callback: () => void) {
  const query = window.matchMedia(QUERY);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

export function useIsDesktop() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
