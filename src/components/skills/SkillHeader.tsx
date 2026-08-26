"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, linkHoverTransition } from "@/lib/motion";
import { CASE_STUDY_PAGE_EYEBROW, CASE_STUDY_GAP_CONTENT } from "@/lib/case-studies/styles";

export type SkillHeaderData = {
  backHref: string;
  eyebrow: string;
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

export default function SkillHeader({ data }: { data: SkillHeaderData }) {
  const reduceMotion = useReducedMotion();
  const { backHref, eyebrow, tags, title, dek } = data;

  return (
    <section className="flex flex-col items-center px-6 pt-[37px] md:pt-[54px]">
      <motion.div
        className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}
        variants={reduceMotion ? undefined : container}
        initial={reduceMotion ? undefined : "hidden"}
        animate={reduceMotion ? undefined : "visible"}
      >
        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <motion.a
            variants={item}
            href={backHref}
            className={`w-fit underline ${CASE_STUDY_PAGE_EYEBROW}`}
            whileHover={{ color: "#6757e8" }}
            transition={linkHoverTransition}
          >
            ← Back
          </motion.a>

          <motion.span variants={item} className={CASE_STUDY_PAGE_EYEBROW}>
            {eyebrow}
          </motion.span>

          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-stone-50/90 px-3 py-1 text-xs font-medium tracking-wide text-text-secondary uppercase outline outline-1 -outline-offset-1 outline-border font-[family-name:var(--font-dm-sans)]"
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
