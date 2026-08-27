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
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

// HSBC-specific "Outcome" layout: title + intro paragraph, a full-width
// hero image of the final presentation artifact, then a pulled-quote bar
// carrying two paragraphs beneath it. Distinct from Gail's tile-grid
// OutcomesSection (this project has no shipped metrics to tile) and from
// Minerva's OutcomesSection (bullet list + portrait image, no full-width
// image or multi-paragraph quote bar).
export type HsbcOutcomeSectionData = {
  eyebrow: string;
  title: string;
  intro: string;
  image: { src: string; alt: string };
  quoteParagraphs: string[];
};

export default function HsbcOutcomeSection({ data }: { data: HsbcOutcomeSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, intro, image, quoteParagraphs } = data;

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
          <p className={CASE_STUDY_BODY}>{intro}</p>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
          whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
          viewport={CASE_STUDY_REVEAL_VIEWPORT}
          transition={CASE_STUDY_REVEAL_TRANSITION}
          className={`${CASE_STUDY_IMAGE_FRAME} max-w-[960px]`}
          style={{ aspectRatio: "1920 / 1080" }}
        >
          <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
        </motion.div>

        <div className="flex items-stretch gap-6 pl-0 md:pl-12">
          <div className="w-2 shrink-0 rounded-sm bg-[#C0D9C0]" />
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            {quoteParagraphs.map((paragraph) => (
              <p key={paragraph} className={CASE_STUDY_BODY}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
