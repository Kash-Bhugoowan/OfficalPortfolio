"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_BODY_EMPHASIS,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

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
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={CASE_STUDY_REVEAL_TRANSITION}
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
        <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
        <div className={`flex flex-col ${CASE_STUDY_GAP_BLOCK} md:flex-row md:items-start`}>
          <h2 className={`${CASE_STUDY_TITLE} md:w-[35%] md:shrink-0`}>{title}</h2>
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT} md:flex-1`}>
            <p className={CASE_STUDY_BODY}>{intro}</p>
            <p className={CASE_STUDY_BODY}>
              {askLabel}
              <span className={CASE_STUDY_BODY_EMPHASIS}>{askHighlight}</span>
            </p>
            <p className={CASE_STUDY_BODY}>{challengeParagraph}</p>
            <p className={CASE_STUDY_BODY}>{closingParagraph}</p>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
