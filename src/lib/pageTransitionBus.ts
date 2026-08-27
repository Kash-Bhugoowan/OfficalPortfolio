// Connects RouteTransitionController's global click interceptor (mounted
// once in the root layout, which never remounts) to whichever
// PageTransition instance is currently mounted (one per page, remounts on
// every navigation). A plain module-scoped variable rather than React
// context: the controller lives above page.tsx in the tree, there's only
// ever one PageTransition mounted at a time, and this only needs to run in
// the browser — no server/SSR concerns.
type ExitFn = () => Promise<void>;

let activeExit: ExitFn | null = null;

export function registerExit(fn: ExitFn): void {
  activeExit = fn;
}

export function unregisterExit(fn: ExitFn): void {
  if (activeExit === fn) activeExit = null;
}

// Resolves once the currently-mounted page's exit animation finishes, or
// immediately if nothing is registered (e.g. prefers-reduced-motion, where
// PageTransition deliberately never registers an exit at all).
export function runExit(): Promise<void> {
  return activeExit ? activeExit() : Promise.resolve();
}

// One-shot flag: RouteTransitionController sets this right before pushing a
// plain (non-hash) route change, and the *incoming* PageTransition consumes
// it in a pre-paint layout effect to snap scroll to top.
//
// This deliberately never touches scroll on the outgoing page. Doing the
// reset there (before router.push) was the original design, and it broke
// browser back/forward: the history entry for the page being left records
// whatever its scroll position is right around the push, so resetting it to
// 0 first meant back navigation faithfully restored 0, not where the user
// actually was. Resetting on the new page instead leaves the outgoing
// page's history entry untouched, so back/forward's native scroll
// restoration keeps working — see RouteTransitionController.tsx.
let pendingScrollReset = false;

export function requestScrollReset(): void {
  pendingScrollReset = true;
}

export function consumeScrollReset(): boolean {
  const value = pendingScrollReset;
  pendingScrollReset = false;
  return value;
}
