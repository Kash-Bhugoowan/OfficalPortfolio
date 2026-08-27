"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_BODY,
} from "@/lib/case-studies/styles";

export type ResumeExperienceItem = {
  dateRange: string;
  title: string;
  company: string;
  description: string;
};

export type ResumeExperienceSectionData = {
  eyebrow: string;
  title: string;
  items: ResumeExperienceItem[];
};

// Same gentle deceleration curve as ProcessSection.tsx's scroll reveals.
const EASE = [0.22, 1, 0.36, 1] as const;

// Adapts the Figma draft's fixed pl-48/gap-20 two-column row (which only
// stays aligned at one exact viewport width) into a responsive grid: a
// fixed label column on desktop that collapses to a stacked column on
// mobile, matching how every other page on this site handles width
// instead of the Figma frame's absolute pixel layout.
export default function ExperienceTimelineSection({ data }: { data: ResumeExperienceSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, items } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
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

        <div className="flex flex-col">
          {items.map((entry) => (
            <motion.div
              key={entry.title}
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduceMotion ? undefined : { duration: 1.6, ease: EASE }}
              className="flex flex-col gap-2 border-t border-gray-300 pt-6 pb-8 md:grid md:grid-cols-[160px_1fr] md:gap-8"
            >
              <span className="text-sm font-medium text-accent">{entry.dateRange}</span>
              <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-zinc-800 md:text-xl">{entry.title}</h3>
                <span className="text-lg text-neutral-700 md:text-xl">{entry.company}</span>
                <p className={CASE_STUDY_BODY}>{entry.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
