"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeftIcon,
  type PreviousProjectNavData,
} from "@/components/case-studies/NextProjectNav";
import { CASE_STUDY_PAGE_EYEBROW, CASE_STUDY_GAP_CONTENT } from "@/lib/case-studies/styles";
import {
  SKILL_HEADER_DELAY_CHILDREN_S,
  SKILL_HEADER_STAGGER_CHILDREN_S,
  SKILL_HEADER_ITEM_DURATION_S,
} from "@/lib/motion";

export type SkillHeaderData = {
  primaryTag: string;
  tags: string[];
  title: string;
  dek: string;
};

// Same mount-time stagger shape as CaseStudyHeader.tsx's container/item
// pair — this header has no hero image or stats to scroll-reveal
// separately, so everything animates in on mount.
const container = {
  hidden: {},
  visible: {
    transition: {
      delayChildren: SKILL_HEADER_DELAY_CHILDREN_S,
      staggerChildren: SKILL_HEADER_STAGGER_CHILDREN_S,
    },
  },
};

// Deliberately faster than the shared fadeInUp (1.6s) that CaseStudyHeader
// uses: that header has a hero image filling the viewport while its text
// fades in, so a slow fade doesn't read as an empty page. This header has
// no image to fall back on, so a slow fade left the page looking content-less
// for ~2s on mount, worst on mobile where hydration itself is slower. Went
// too far the other way at 0.4s/0.08s stagger — fast enough that the
// cascade (each line following the last) wasn't perceptible, it just read
// as "pop in". This duration/stagger pairing keeps the total under ~1s
// while each item's fade is still long enough, and spaced out enough, to
// see as a sequence rather than a flash. These three values are exported
// from lib/motion.ts (not just local constants) because PrinciplesSection
// and ExperienceSection need to compute exactly when this cascade finishes,
// so their own cascade can start only once this one is fully done.
const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: SKILL_HEADER_ITEM_DURATION_S, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function SkillHeader({
  data,
  previous,
}: {
  data: SkillHeaderData;
  previous?: PreviousProjectNavData;
}) {
  const reduceMotion = useReducedMotion();
  const { primaryTag, tags, title, dek } = data;

  return (
    <section className="flex flex-col items-center px-6 pt-[37px] md:pt-[54px]">
      <motion.div
        className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
      >
        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          {/* Replaces the old "← Back" link + "Skill showcase" eyebrow —
              see CaseStudyHeader.tsx for the matching change on the
              case-study pages. */}
          {previous && (
            <motion.a
              variants={item}
              href={previous.href}
              aria-label={`${previous.label}: ${previous.title}`}
              className={`group inline-flex w-fit items-center gap-2 ${CASE_STUDY_PAGE_EYEBROW} transition-colors duration-200 hover:text-accent`}
            >
              <ArrowLeftIcon className="size-3 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
              <span className="md:hidden">{previous.label}</span>
              <span className="hidden md:inline">
                {previous.label}: <span className="font-semibold">{previous.title}</span>
              </span>
            </motion.a>
          )}

          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white px-3 py-[5px] text-xs font-semibold tracking-wide text-accent outline outline-1 -outline-offset-1 outline-indigo-500/20 font-[family-name:var(--font-dm-sans)]">
              {primaryTag}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[#FAF8F5] px-3 py-1 text-xs font-medium tracking-wide text-nav-muted outline outline-1 -outline-offset-1 outline-white font-[family-name:var(--font-dm-sans)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <motion.h1
            variants={item}
            className="text-3xl leading-[38px] font-semibold text-zinc-800 sm:text-4xl sm:leading-[44px] md:text-5xl md:leading-[56px]"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-3xl text-base leading-7 text-zinc-800 md:text-lg md:leading-8"
          >
            {dek}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
