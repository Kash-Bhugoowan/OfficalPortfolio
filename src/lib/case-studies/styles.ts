// Shared Tailwind class strings + motion primitives for case-study
// section components (src/components/case-studies/*). Every new case
// study section should build from these rather than copying sizes and
// gaps straight out of a Figma spec — that's how the mismatches between
// Approach/Core UX/Main Priority crept in before this file existed.

// ---- Text styles ----

// Small uppercase section label at the top of a section ("THE CHALLENGE",
// "MY APPROACH", "CORE UX", ...).
export const CASE_STUDY_EYEBROW =
  "text-xs font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)]";

// The page-level eyebrow at the very top of the header ("Selected work |
// CASE STUDY") — muted rather than accent-colored, since it isn't
// introducing a specific section.
export const CASE_STUDY_PAGE_EYEBROW =
  "text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]";

// A small field label above a block of copy (e.g. "ROLE & SUMMARY").
// Slightly larger than the section eyebrow and muted, not accent-colored.
export const CASE_STUDY_FIELD_LABEL =
  "text-sm font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]";

// Sub-section heading (h2) used within a case study's body — not the
// page's main h1 title, which is unique and lives in CaseStudyHeader.
export const CASE_STUDY_TITLE =
  "text-2xl leading-9 text-zinc-800 md:text-3xl md:leading-[44px]";

// Standard flowing body paragraph.
export const CASE_STUDY_BODY = "text-base leading-7 text-zinc-800 md:text-lg md:leading-8";

// A short line directly under a title that reads as part of the same
// unit (e.g. Main Priority's "The right-hand Add Task Flow became the
// tool's mental model."). Same size as body copy, just semibold.
export const CASE_STUDY_SUBTITLE = `${CASE_STUDY_BODY} font-semibold`;

// Inline emphasis within a body paragraph (e.g. "key insight", the bold
// half of an "ask" sentence).
export const CASE_STUDY_BODY_EMPHASIS = "text-lg font-semibold md:text-xl";

// ---- Shadows ----
//
// The site-wide "small" resting shadow — matches Capabilities.tsx and
// DesignPhilosophy.tsx's card shadow exactly, so this isn't a
// case-study-only value, it's the established site standard. Use this
// (never a heavier one straight off a Figma spec) for any small
// card/tile at rest in a case study.
export const CASE_STUDY_SHADOW_SM = "shadow-[0px_2px_8px_0px_rgba(36,31,43,0.06)]";

// Deepened shadow for a hover-lift on that same small card (see the
// header's stat cards) — paired with a slight -translate-y on hover.
// Includes the md:hover: variant baked in (rather than composed at the
// call site) because Tailwind's static scanner needs the complete class
// name to exist as literal text somewhere — splitting "md:hover:" and
// "shadow-[...]" across a runtime template-string concatenation means
// neither file ever contains the full class name, so it silently never
// generates the CSS rule.
export const CASE_STUDY_SHADOW_SM_HOVER = "md:hover:shadow-[0px_8px_16px_0px_rgba(36,31,43,0.10)]";

// ---- Image frame ----

// Standard placeholder/content image treatment used throughout a case
// study's body sections. The header's hero image is a deliberately
// different, larger treatment and stays defined locally in
// CaseStudyHeader.tsx.
export const CASE_STUDY_IMAGE_FRAME =
  "relative w-full overflow-hidden rounded-2xl border border-zinc-300 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.06)]";

// ---- Scroll-fade motion (whileInView reveal) ----
//
// Always gate with useReducedMotion(): initial={reduceMotion ? undefined
// : CASE_STUDY_REVEAL_HIDDEN} whileInView={reduceMotion ? undefined :
// CASE_STUDY_REVEAL_VISIBLE} viewport={CASE_STUDY_REVEAL_VIEWPORT}
// transition={CASE_STUDY_REVEAL_TRANSITION}
export const CASE_STUDY_REVEAL_HIDDEN = { opacity: 0, y: 14 };
export const CASE_STUDY_REVEAL_VISIBLE = { opacity: 1, y: 0 };
export const CASE_STUDY_REVEAL_VIEWPORT = { once: true, amount: 0.25 };
export const CASE_STUDY_REVEAL_TRANSITION = {
  duration: 0.8,
  ease: [0.22, 1, 0.36, 1] as const,
};

// ---- Spacing tiers ----
//
// Mobile-first: the base (unprefixed) value applies at every breakpoint
// unless a md: override is given. Rule of thumb when adding a new
// section — pick the tier by the RELATIONSHIP between the two blocks,
// not by what a Figma spec happened to use:
//
// Tier "eyebrow" — 24px, every breakpoint (gap-6): a label and the
//   heading it directly introduces (eyebrow -> title).
// Tier "tight" — 16px, every breakpoint (gap-4): a title and a subtitle
//   so closely related they read as one unit (e.g. Main Priority's
//   title + its "mental model" line).
// Tier "content" — 32px, every breakpoint (gap-8): a heading/eyebrow (or
//   an image) and the single block of content it directly introduces —
//   body text, a quote, a grid, a captioned image. Also
//   paragraph-to-paragraph within one flowing text column.
// Tier "block" — 32px mobile / 64px desktop (gap-8 md:gap-16): two
//   distinct, independent blocks stacked or placed side-by-side —
//   row-to-row, left/right column gutters.
export const CASE_STUDY_GAP_EYEBROW = "gap-6";
export const CASE_STUDY_GAP_TIGHT = "gap-4";
export const CASE_STUDY_GAP_CONTENT = "gap-8";
export const CASE_STUDY_GAP_BLOCK = "gap-8 md:gap-16";
