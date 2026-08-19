// Approximates the Figma-exported spring easing (0.744s, slight overshoot)
export const linkHoverTransition = {
  type: "spring" as const,
  visualDuration: 0.744,
  bounce: 0.25,
};

// Shared fade-up entrance, used by Hero's stagger and mobile-fallback reveals.
export const fadeInUp = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

// Vertical offset between each pinned card in the sticky project stack —
// how much of the previous card's top edge stays visible as a "sliver"
// once the next card slides up and covers it.
export const STACK_CARD_OFFSET_PX = 32;

// How far the sticky section header pins from the very top of the viewport.
export const STACK_HEADER_TOP_PX = 32;

// How far card 0 docks from the viewport top — set so it sits directly
// below the pinned header's bottom edge with one tight, consistent gap
// (header's own top offset + its rendered height + the gap). Tuned
// empirically against the header's actual rendered height.
export const STACK_BASE_OFFSET_PX = 188;

// Subtle shrink applied to a card as the next one covers it (no opacity
// fade — a covered card's visible sliver should stay fully solid).
export const stackDimTransform = {
  scale: [1, 0.94] as [number, number],
};

// Real gap in document flow between consecutive cards, on top of their
// sticky top offsets. With zero gap, the next card's own box sits flush
// against the previous one, so it starts sliding over and covering it
// almost as soon as you scroll into the section — this delays that onset,
// giving each card a stretch of scroll where it's shown alone, uncovered,
// before the next one begins its approach.
export const STACK_CARD_VIEW_SPACER_PX = 400;

// --- Mobile-only stacking values, entirely independent of the desktop
// ones above (STACK_BASE_OFFSET_PX / STACK_CARD_OFFSET_PX). Same full-card
// pin-and-overlap mechanic as desktop, matching the Athos mobile
// reference, just tuned to mobile's own viewport and card proportions
// rather than reusing desktop's numbers.
export const STACK_CARD_OFFSET_PX_MOBILE = 24;
export const STACK_BASE_OFFSET_PX_MOBILE = 16;

// Explicit height for the mobile cards' shared containing block. Without
// this, the container's height is just the natural sum of the three (very
// tall) cards, with zero slack — meaning by the time the last card's own
// natural position reaches its sticky threshold, the shared container has
// already run out of room to hold it there, so it approaches but never
// actually locks in. This adds genuine budget (well beyond the natural
// content height) so every card, including the last, gets its own turn to
// hold. Reverts to desktop's own explicit height at the md breakpoint.
export const STACK_CONTAINER_HEIGHT_PX_MOBILE = 4000;
