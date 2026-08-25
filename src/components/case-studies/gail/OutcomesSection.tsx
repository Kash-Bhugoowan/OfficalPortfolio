"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_SHADOW_SM,
  CASE_STUDY_SHADOW_SM_HOVER,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

// GAiL-specific "Outcomes" layout: a 3x2 grid of tinted stat/testimonial
// tiles (matching this project's Figma) rather than Minerva's
// OutcomesSection, which pairs a bulleted results list with a single
// portrait image. No image, no bullet list — content lives entirely in
// the tiles plus the closing paragraphs beneath them.
export type GailOutcomeTile =
  | {
      kind: "stat";
      label: string;
      value: string;
      description: string;
      bgClass: string;
    }
  | {
      kind: "quote";
      label: string;
      quote: string;
      bgClass: string;
    };

export type GailOutcomesSectionData = {
  eyebrow: string;
  title: string;
  introLines: string[];
  tiles: GailOutcomeTile[];
  closingParagraphs: string[];
};

function OutcomeTile({ tile }: { tile: GailOutcomeTile }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={CASE_STUDY_REVEAL_TRANSITION}
      className={`relative flex flex-col overflow-hidden rounded-3xl px-8 pt-8 pb-9 ${CASE_STUDY_SHADOW_SM} transition-all duration-200 md:hover:-translate-y-1 ${CASE_STUDY_SHADOW_SM_HOVER} ${tile.bgClass}`}
    >
      <span className="relative text-xs font-semibold tracking-wider text-zinc-800 uppercase font-[family-name:var(--font-dm-sans)]">
        {tile.label}
      </span>
      {tile.kind === "stat" ? (
        <>
          <span className="relative pt-5 pb-4 text-5xl font-light leading-[68px] text-zinc-800 md:text-6xl">
            {tile.value}
          </span>
          <p className="relative text-base leading-6 text-zinc-800">{tile.description}</p>
        </>
      ) : (
        <p className="relative pt-5 text-xl leading-10 text-zinc-800">“{tile.quote}”</p>
      )}
    </motion.div>
  );
}

export default function GailOutcomesSection({ data }: { data: GailOutcomesSectionData }) {
  const { eyebrow, title, introLines, tiles, closingParagraphs } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
            <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
            <h2 className={CASE_STUDY_TITLE}>{title}</h2>
          </div>
          <div className="flex flex-col gap-2">
            {introLines.map((line) => (
              <p key={line} className={CASE_STUDY_BODY}>
                {line}
              </p>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {tiles.map((tile) => (
            <OutcomeTile key={tile.label + ("value" in tile ? tile.value : tile.quote)} tile={tile} />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {closingParagraphs.map((paragraph) => (
            <p key={paragraph} className={CASE_STUDY_BODY}>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
