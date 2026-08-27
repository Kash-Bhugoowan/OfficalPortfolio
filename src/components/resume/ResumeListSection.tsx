"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
} from "@/lib/case-studies/styles";

export type ResumeListRow = { label: string; items: string[] };

export type ResumeListSectionData = {
  eyebrow: string;
  title: string;
  rows: ResumeListRow[];
};

// Same gentle deceleration curve as ProcessSection.tsx's scroll reveals.
const EASE = [0.22, 1, 0.36, 1] as const;

// Shared shell for "Skills & tools" and "Training & recognition" — both
// Figma sections are structurally identical (eyebrow+title heading, then
// border-divided rows of a small label + a larger comma-separated list),
// so one component is parameterized by data and instantiated twice from
// the resume page rather than duplicating the section shell.
export default function ResumeListSection({ data }: { data: ResumeListSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, rows } = data;

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
          {rows.map((row) => (
            <motion.div
              key={row.label}
              initial={reduceMotion ? undefined : { opacity: 0, y: 10 }}
              whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={reduceMotion ? undefined : { duration: 1.6, ease: EASE }}
              className="flex flex-col gap-2 border-t border-gray-300 pt-6 pb-8 md:grid md:grid-cols-[200px_1fr] md:gap-8"
            >
              <span className="text-sm font-medium text-accent">{row.label}</span>
              <p className="text-lg leading-8 text-zinc-800 md:text-xl">{row.items.join(" · ")}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
