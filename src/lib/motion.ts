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

// --- Mobile project cards scroll in normal document flow (no sticky
// pinning — full-card sticky pinning was tried and dropped: mobile cards
// are taller than the mobile viewport, so once pinned, their bottom
// content is permanently below the fold no matter how offsets/spacers are
// tuned). Instead, each card gets a one-time reveal as it scrolls into
// view, plus a subtle continuous "focus" scale while it travels through
// the viewport — peaking at full size when centered.
export const MOBILE_CARD_ENTRANCE_Y_PX = 40;
export const MOBILE_CARD_FOCUS_SCALE = [0.94, 1, 0.94] as [number, number, number];
