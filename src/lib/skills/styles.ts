// Shared styling tokens for skill-showcase pages (src/components/skills/*).
// Mirrors src/lib/case-studies/styles.ts, which already covers the
// site-wide eyebrow/title/body/gap/shadow/reveal-motion values reused
// directly from there (including CASE_STUDY_TITLE for this page's own
// section headings — an earlier, bigger custom scale here read as
// oversized against the rest of the site and was dropped).

// Gap from SkillHeader down to the first body section. Case studies use
// the site-wide CASE_STUDY_SECTION_GAP_PX (100px) for every section
// transition, including header -> first section — but that gap reads
// correctly there because CaseStudyHeader is tall (hero image + stats
// grid) and visually counterbalances it. SkillHeader is deliberately
// lighter (no hero image), so the same 100px reads as excess empty
// space here. Only this first transition is tightened — subsequent
// body-section-to-body-section gaps still use the standard
// CASE_STUDY_SECTION_GAP_PX, matching the rest of the site.
export const SKILL_HEADER_TO_BODY_GAP_PX = 64;
