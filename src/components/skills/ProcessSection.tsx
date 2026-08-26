"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_BODY,
  CASE_STUDY_SUBTITLE,
} from "@/lib/case-studies/styles";

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

// Same gentle deceleration curve as the rest of the site's scroll
// reveals — used for the rows' fade, which is the same kind of motion
// (opacity + position) those reveals are tuned for.
const EASE = [0.22, 1, 0.36, 1] as const;
// A "draw" (scaleY growth) reads completely differently to a fade — EASE
// above front-loads most of its visual change into the first fraction of
// the duration, which for a scale transform looks like a snap-then-stall
// rather than a line smoothly extending. A symmetric ease keeps the
// growth rate visually even.
const LINE_EASE = "easeInOut" as const;
// Small pause after a row's own content settles before its line starts
// drawing toward the next step — not a global stagger offset, since
// every row now triggers off its own scroll position, not a shared timer.
const LINE_FOLLOW_DELAY = 0.5;

// Each row (and its own connecting line) is revealed independently off
// its own scroll position — not a shared, section-wide stagger timer.
// An earlier version orchestrated all rows from one parent whileInView,
// which fires once as soon as a small fraction of the whole (tall)
// section enters view — meaning later steps could finish animating in
// while still off-screen, well before a scrolling user actually reached
// them. Per-row triggers make each step arrive exactly when it's
// scrolled to, which is the point of a step-by-step timeline.
export default function ProcessSection({ data }: { data: SkillProcessSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, steps } = data;

  return (
    <section className="flex flex-col items-center px-6" style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}>
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={reduceMotion ? undefined : { duration: 1.6, ease: EASE }}
          className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}
        >
          <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
          <h2 className={CASE_STUDY_TITLE}>{title}</h2>
        </motion.div>

        <div className="flex w-full max-w-[720px] flex-col">
          {steps.map((step, i) => {
            const isLast = i === steps.length - 1;
            return (
              <motion.div
                key={step.number}
                initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
                whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={reduceMotion ? undefined : { duration: 1.6, ease: EASE }}
                className="flex gap-6"
              >
                <div className="flex flex-col items-center">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white font-[family-name:var(--font-dm-sans)]">
                    {step.number.replace(/\D/g, "")}
                  </span>
                  {!isLast && (
                    <motion.div
                      initial={reduceMotion ? undefined : { scaleY: 0 }}
                      whileInView={reduceMotion ? undefined : { scaleY: 1 }}
                      viewport={{ once: true, amount: 0.6 }}
                      transition={
                        reduceMotion
                          ? undefined
                          : { duration: 1.4, ease: LINE_EASE, delay: LINE_FOLLOW_DELAY }
                      }
                      style={{ transformOrigin: "top" }}
                      className="my-1 w-px flex-1 bg-border"
                    />
                  )}
                </div>
                <div className={`flex flex-col gap-2 ${isLast ? "" : "pb-10"}`}>
                  <h3 className={CASE_STUDY_SUBTITLE}>{step.title}</h3>
                  <p className={CASE_STUDY_BODY}>{step.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
