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

// Same focus-scale concept, applied to the Capabilities carousel's cards
// — kept as its own constant (not shared with MOBILE_CARD_FOCUS_SCALE
// above) so retuning one can never shift the other. Kept close to 1: a
// bigger dip (e.g. 0.85) shrinks off-center cards toward their own
// center enough to visually blow the tight 2px carousel gap out to
// 30-50px on screen, which reads as "cards not close together" even
// though the underlying CSS gap is small.
export const CAPABILITY_CARD_FOCUS_SCALE = [0.95, 1, 0.95] as [number, number, number];

// Same focus-scale concept as the two constants above, applied to the
// Design Philosophy cards — kept as its own constant per that same
// convention. Subtler than both: these cards are much larger, so a
// bigger dip would be more visually jarring.
export const PHILOSOPHY_CARD_FOCUS_SCALE = [0.96, 1, 0.96] as [number, number, number];

// Same focus-scale concept, applied to the skill pages' cards (Principles'
// principle cards and Experience's stat cards) — kept as its own constant
// per that same convention. Matches CAPABILITY_CARD_FOCUS_SCALE's dip since
// these cards are a similar size/weight to the Capabilities cards they're
// modeled on.
export const SKILL_CARD_FOCUS_SCALE = [0.95, 1, 0.95] as [number, number, number];

// SkillHeader's own mount-time cascade timing. PrinciplesSection and
// ExperienceSection use SKILL_HEADER_NEXT_ITEM_DELAY_S as their own
// container's delayChildren — SkillHeader itself uses the other three
// constants directly, so this stays the single source of truth for both
// sides of the handoff between the header and the section below it.
//
// That handoff continues the header's own stagger rhythm by exactly one
// more beat, rather than waiting for the header to fully finish first.
// Waiting for a full stop (delayChildren = header's total duration) did
// guarantee top-to-bottom completion order, but it also meant nothing was
// moving for a stretch between the header settling and the section below
// starting — a dead pause. Since each item's fade (duration, 0.6s) is
// longer than the stagger step (0.15s) between items, continuing the same
// rhythm still guarantees every later item finishes after every earlier
// one — finish time = start time + duration, and start times are already
// strictly increasing by a fixed step — so top-to-bottom order holds
// without ever fully stopping.
export const SKILL_HEADER_DELAY_CHILDREN_S = 0.1;
export const SKILL_HEADER_STAGGER_CHILDREN_S = 0.15;
export const SKILL_HEADER_ITEM_DURATION_S = 0.6;
// SkillHeader stages at most 4 items (prev-skill link, tags, title, dek) —
// both skill pages always pass a `previous` link, so this is exact today,
// not just a safe upper bound.
const SKILL_HEADER_ITEM_COUNT = 4;
export const SKILL_HEADER_NEXT_ITEM_DELAY_S =
  SKILL_HEADER_DELAY_CHILDREN_S + SKILL_HEADER_ITEM_COUNT * SKILL_HEADER_STAGGER_CHILDREN_S;

// Fixed gap between consecutive sections on a case-study page (measured
// from the header's hero image / stat cards to the Challenge section).
// Unlike the homepage's responsive py-[37px]/md:py-[54px] rhythm, this is
// a single fixed value at all breakpoints, applied as each section's own
// top margin.
export const CASE_STUDY_SECTION_GAP_PX = 100;

// Gap from SkillHeader down to whichever section is a page's first body
// section (PrinciplesSection on conversational-design, ExperienceSection
// on workshop-facilitation) — shared so both pages stay in sync. Tighter
// than CASE_STUDY_SECTION_GAP_PX because SkillHeader has no hero image to
// counterbalance the extra space, and tightened further on mobile where
// the same fixed gap reads as proportionally bigger.
export const SKILL_HEADER_GAP_CLASSNAME = "mt-[54px] md:mt-[64px]";
