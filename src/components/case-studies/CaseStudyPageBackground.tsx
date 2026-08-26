import type { ReactNode } from "react";

// Shared page wrapper for every case study: the neutral base color both
// gradients below fade into/out of, plus the `z-0` stacking context the
// `-z-10` gradients need so they can't leak behind unrelated page
// content elsewhere.
export function CaseStudyPageBackground({ children }: { children: ReactNode }) {
  return <div className="relative z-0 bg-[#EFF4F9]">{children}</div>;
}

// Decorative pastel gradient behind a case study's Nav + hero header,
// fading down into the neutral page background before the body content
// starts. Wrap it with <Nav/> and <CaseStudyHeader/> in a `relative z-0`
// container.
export function CaseStudyTopGradient() {
  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[700px] bg-linear-55 from-[#D8E4EE] via-[#E3EBF3] via-40% to-[#EFF4F9] md:h-[1000px]">
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-b from-[#EFF4F9]/0 to-[#EFF4F9] md:h-96" />
    </div>
  );
}

// Mirrored version of the same gradient, fading the neutral background
// back into the pastel gradient just above the page's Footer. Anchored
// to bottom-32 (Footer's fixed h-32) rather than to NextProjectNav's own
// box — NextProjectNav carries a -mb-[140px] that collapses through any
// wrapper with auto height, so a wrapper-relative anchor lands in the
// wrong place. The page bottom minus Footer's fixed height is
// unambiguous instead. Place directly before <Footer/>, as a sibling of
// <NextProjectNav/> (not wrapping it) — it's positioned independently.
export function CaseStudyBottomGradient() {
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-32 -z-10 h-[600px] bg-linear-[235deg] from-[#D8E4EE] via-[#E3EBF3] via-40% to-[#EFF4F9]">
      <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-[#EFF4F9] to-[#EFF4F9]/0" />
    </div>
  );
}
