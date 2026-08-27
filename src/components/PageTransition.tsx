import type { ReactNode } from "react";

// Wraps every page's content below <Nav/> (and below the decorative
// CaseStudyTopGradient/CaseStudyBottomGradient, where a page has them) so a
// route-transition animation can target this one element without ever
// touching Nav. Nav must stay visually static across navigations, so it's
// deliberately rendered as this wrapper's sibling in every page.tsx, never
// its child — see Nav.tsx and CaseStudyPageBackground.tsx for why.
//
// Inert for now: this is the structural change (new wrapper div, and for
// pages that had one, removal of a redundant inner "relative z-0" div
// around Nav) landing on its own so any seam risk is visible before any
// animation is layered on top. The real enter/exit motion + scroll-reset
// logic lands here in the next commit.
export default function PageTransition({ children }: { children: ReactNode }) {
  return <div>{children}</div>;
}
