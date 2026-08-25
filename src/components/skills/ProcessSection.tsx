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

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type ProcessSectionData = {
  eyebrow: string;
  title: string;
  // Steps are pre-split into their two display columns (rather than one
  // flat list auto-chunked in half) since the split is a layout decision
  // from the source design, not a fixed count that scales with content.
  leftSteps: ProcessStep[];
  rightSteps: ProcessStep[];
};

function StepColumn({ steps }: { steps: ProcessStep[] }) {
  return (
    <div className="flex flex-1 flex-col divide-y divide-zinc-200 border-t border-b border-zinc-200">
      {steps.map((step) => (
        <div key={step.number} className="flex flex-col gap-4 px-6 py-6 md:px-14">
          <div className="flex items-center gap-6">
            <span className="text-sm leading-7 font-medium text-accent">{step.number}</span>
            <span className="text-2xl leading-9 font-medium text-zinc-800 md:text-3xl md:leading-10">
              {step.title}
            </span>
          </div>
          <p className="pl-10 text-lg leading-7 text-text-secondary md:text-xl md:leading-8">
            {step.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function ProcessSection({ data }: { data: ProcessSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, leftSteps, rightSteps } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_BLOCK}`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
          <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
          <h2 className="text-3xl leading-10 text-zinc-800 md:text-4xl md:leading-[52px]">
            {title}
          </h2>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
          whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
          viewport={CASE_STUDY_REVEAL_VIEWPORT}
          transition={CASE_STUDY_REVEAL_TRANSITION}
          className="flex flex-col gap-8 md:flex-row md:gap-16"
        >
          <StepColumn steps={leftSteps} />
          <StepColumn steps={rightSteps} />
        </motion.div>
      </div>
    </section>
  );
}
