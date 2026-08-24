"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_IMAGE_FRAME,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type OutcomesSectionData = {
  eyebrow: string;
  title: string;
  intro: string;
  results: string[];
  closing: string;
  quote: string;
  image: { src: string; alt: string };
};

export default function OutcomesSection({ data }: { data: OutcomesSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, intro, results, closing, quote, image } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
          <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
          <h2 className={CASE_STUDY_TITLE}>{title}</h2>
        </div>

        <div className={`grid grid-cols-1 items-stretch ${CASE_STUDY_GAP_BLOCK} md:grid-cols-[1fr_420px]`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
              <p className={CASE_STUDY_BODY}>{intro}</p>
              <ul className="list-disc space-y-1 pl-5 marker:text-zinc-800">
                {results.map((result) => (
                  <li key={result} className={`${CASE_STUDY_BODY} font-semibold`}>
                    {result}
                  </li>
                ))}
              </ul>
              <p className={CASE_STUDY_BODY}>{closing}</p>
            </div>
            <div className="flex items-stretch gap-8 pl-8">
              <div className="w-2 shrink-0 rounded-sm bg-[#DACCE2]" />
              <p className={CASE_STUDY_BODY}>{quote}</p>
            </div>
          </div>

          <motion.div
            initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
            whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
            viewport={CASE_STUDY_REVEAL_VIEWPORT}
            transition={CASE_STUDY_REVEAL_TRANSITION}
            className={`${CASE_STUDY_IMAGE_FRAME} aspect-[533/688] md:aspect-auto md:h-full`}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
