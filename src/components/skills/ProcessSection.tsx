"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";
import { SKILL_SECTION_TITLE } from "@/lib/skills/styles";

export type SkillProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type SkillProcessSectionData = {
  eyebrow: string;
  title: string;
  steps: SkillProcessStep[];
};

function ProcessColumn({ steps }: { steps: SkillProcessStep[] }) {
  return (
    <div className="flex w-full flex-col divide-y divide-border border-t border-border">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col px-6 py-6 md:px-14">
          <div className="flex items-center gap-6">
            <span className="text-sm font-medium leading-7 text-accent">{step.number}</span>
            <h3 className="flex-1 text-2xl leading-[45px] font-semibold text-zinc-800">{step.title}</h3>
          </div>
          <p className="pt-4 pb-2.5 pl-12 text-xl leading-[30px] text-zinc-600">{step.description}</p>
        </div>
      ))}
    </div>
  );
}

// Two ruled columns of numbered steps, split so the first column absorbs
// an odd extra step (e.g. 5 steps -> 3 + 2) — matches the Figma spec's
// asymmetric split rather than a strict even divide.
export default function ProcessSection({ data }: { data: SkillProcessSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, steps } = data;
  const half = Math.ceil(steps.length / 2);
  const columns = [steps.slice(0, half), steps.slice(half)];

  return (
    <motion.section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={CASE_STUDY_REVEAL_TRANSITION}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_BLOCK}`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
          <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
          <h2 className={SKILL_SECTION_TITLE}>{title}</h2>
        </div>

        <div className={`flex flex-col ${CASE_STUDY_GAP_BLOCK} md:flex-row`}>
          {columns.map((columnSteps, i) => (
            <ProcessColumn key={i} steps={columnSteps} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
