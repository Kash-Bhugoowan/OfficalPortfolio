"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import {
  ArrowLeftIcon,
  type PreviousProjectNavData,
} from "@/components/case-studies/NextProjectNav";
import { CASE_STUDY_PAGE_EYEBROW, CASE_STUDY_GAP_CONTENT } from "@/lib/case-studies/styles";

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
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const item = fadeInUp;

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
