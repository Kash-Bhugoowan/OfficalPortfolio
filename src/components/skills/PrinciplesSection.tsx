"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_SHADOW_SM,
  CASE_STUDY_SHADOW_SM_HOVER,
} from "@/lib/case-studies/styles";
import { SKILL_HEADER_TO_BODY_GAP_PX } from "@/lib/skills/styles";

export type SkillPrincipleCard = {
  icon: string;
  title: string;
  description: string;
};

export type SkillPrinciplesSectionData = {
  eyebrow: string;
  title: string;
  cards: SkillPrincipleCard[];
};

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const item = fadeInUp;

// Static, non-carousel take on the homepage's CapabilityCard
// (Capabilities.tsx) — same visual language (icon glyph, shadow, type
// scale) without the scroll-focus/hover-carousel machinery that card
// needs for the horizontal-swipe homepage layout.
export default function PrinciplesSection({ data }: { data: SkillPrinciplesSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, cards } = data;

  return (
    <motion.section
      className="relative flex flex-col items-center px-6"
      style={{ marginTop: SKILL_HEADER_TO_BODY_GAP_PX }}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, amount: 0.25 }}
      variants={reduceMotion ? undefined : container}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <motion.div variants={item} className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
          <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
          <h2 className={CASE_STUDY_TITLE}>{title}</h2>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={item}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`group flex flex-col items-start rounded-2xl bg-white px-7 py-9 ${CASE_STUDY_SHADOW_SM} ${CASE_STUDY_SHADOW_SM_HOVER}`}
            >
              <span className="text-2xl leading-10 text-zinc-600 transition-colors duration-300 md:group-hover:text-accent">
                {card.icon}
              </span>
              <h3 className="w-full pt-4 text-sm leading-6 font-bold text-foreground">{card.title}</h3>
              <p className="pt-2.5 text-sm leading-5 text-zinc-600">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
