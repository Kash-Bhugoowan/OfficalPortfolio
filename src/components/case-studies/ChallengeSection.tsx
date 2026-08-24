"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";

export type ChallengeSectionData = {
  eyebrow: string;
  title: string;
  intro: string;
  askLabel: string;
  askHighlight: string;
  challengeParagraph: string;
  closingParagraph: string;
};

export default function ChallengeSection({ data }: { data: ChallengeSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, intro, askLabel, askHighlight, challengeParagraph, closingParagraph } =
    data;

  return (
    <motion.section
      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className="mx-auto flex w-full max-w-[1227px] flex-col gap-6">
        <span className="text-xs font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)]">
          {eyebrow}
        </span>
        <div className="flex flex-col gap-8 md:flex-row md:items-start md:gap-16">
          <h2 className="text-2xl leading-9 text-zinc-800 md:w-[35%] md:shrink-0 md:text-3xl md:leading-[44px]">
            {title}
          </h2>
          <div className="flex flex-col gap-8 md:flex-1">
            <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">{intro}</p>
            <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">
              {askLabel}
              <span className="text-lg font-semibold md:text-xl">{askHighlight}</span>
            </p>
            <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">
              {challengeParagraph}
            </p>
            <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">
              {closingParagraph}
            </p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
