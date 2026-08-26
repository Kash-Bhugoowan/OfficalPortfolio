// Shared styling tokens for skill-showcase pages (src/components/skills/*).
// Mirrors src/lib/case-studies/styles.ts, which already covers the
// site-wide eyebrow/body/gap/shadow/reveal-motion values reused directly
// here — this file only holds what's actually different on a skill page:
// its bigger section-title scale (40px in the Figma spec, vs case
// studies' smaller in-body h2).
export const SKILL_SECTION_TITLE =
  "text-3xl leading-tight text-zinc-800 md:text-4xl md:leading-[60px]";
