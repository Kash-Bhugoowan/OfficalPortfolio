"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { CASE_STUDY_PAGE_EYEBROW } from "@/lib/case-studies/styles";

export type SkillShowcaseHeaderData = {
  eyebrow: string;
  tags: string[];
  title: string;
  dek: string;
};

// Skill-showcase equivalent of CaseStudyHeader.tsx, but lighter: a single
// title line (no light/bold split), no hero image and no stats row —
// this page type introduces a capability, not a shipped product, so
// there's no screenshot or metrics to lead with.
const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const item = fadeInUp;

export default function SkillShowcaseHeader({ data }: { data: SkillShowcaseHeaderData }) {
  const { eyebrow, tags, title, dek } = data;

  return (
    <section className="flex flex-col items-center px-6 pt-[37px] md:pt-[54px]">
      <motion.div
        className="mx-auto flex w-full max-w-[1227px] flex-col gap-10"
        variants={container}
        initial="hidden"
        animate="visible"
      >
        <div className="flex flex-col gap-8">
          <motion.span variants={item} className={CASE_STUDY_PAGE_EYEBROW}>
            {eyebrow}
          </motion.span>

          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-[rgba(250,248,245,0.9)] px-3 py-1 text-xs font-medium tracking-wide text-text-secondary uppercase outline outline-1 -outline-offset-1 outline-border font-[family-name:var(--font-dm-sans)]"
              >
                {tag}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-col gap-8">
          <motion.h1
            variants={item}
            className="text-4xl leading-[44px] font-semibold text-zinc-800 sm:text-5xl sm:leading-[56px] md:text-6xl md:leading-[76px]"
          >
            {title}
          </motion.h1>
          <motion.p
            variants={item}
            className="max-w-[960px] text-lg leading-8 text-zinc-800 md:text-xl md:leading-10"
          >
            {dek}
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}
