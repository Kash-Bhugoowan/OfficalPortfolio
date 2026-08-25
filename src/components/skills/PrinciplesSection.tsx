"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_SHADOW_SM,
  CASE_STUDY_SHADOW_SM_HOVER,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type PrincipleCard = {
  icon: string;
  title: string;
  description: string;
};

export type PrinciplesSectionData = {
  eyebrow: string;
  title: string;
  cards: PrincipleCard[];
};

export default function PrinciplesSection({ data }: { data: PrinciplesSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, cards } = data;

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
          className="grid grid-cols-1 gap-6 sm:grid-cols-3"
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className={`flex flex-col rounded-2xl bg-white px-7 py-9 ${CASE_STUDY_SHADOW_SM} transition-all duration-200 md:hover:-translate-y-1 ${CASE_STUDY_SHADOW_SM_HOVER}`}
            >
              <span className="text-2xl leading-10 text-zinc-600" aria-hidden="true">
                {card.icon}
              </span>
              <span className="pt-4 text-sm leading-6 font-bold text-zinc-800">{card.title}</span>
              <p className="pt-2.5 text-sm leading-5 text-zinc-600">{card.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
