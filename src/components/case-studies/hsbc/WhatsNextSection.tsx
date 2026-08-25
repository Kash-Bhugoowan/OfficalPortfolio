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
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

// HSBC-specific "What happened next?" layout: title + paragraph beside a
// portrait image, unlike the shared WhatsNextSection (text-only, used
// elsewhere on this page for "My responsibilities"-style rows) — per
// Figma this closing beat carries its own image.
export type HsbcWhatsNextSectionData = {
  eyebrow: string;
  title: string;
  paragraph: string;
  image: { src: string; alt: string };
};

export default function HsbcWhatsNextSection({ data }: { data: HsbcWhatsNextSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, paragraph, image } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div
        className={`mx-auto flex w-full max-w-[1227px] flex-col items-start ${CASE_STUDY_GAP_BLOCK} md:flex-row`}
      >
        <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW} md:flex-1`}>
          <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
          <h2 className={CASE_STUDY_TITLE}>{title}</h2>
          <p className={CASE_STUDY_BODY}>{paragraph}</p>
        </div>
        <motion.div
          initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
          whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
          viewport={CASE_STUDY_REVEAL_VIEWPORT}
          transition={CASE_STUDY_REVEAL_TRANSITION}
          className={`${CASE_STUDY_IMAGE_FRAME} w-full max-w-[380px] md:w-[380px] md:shrink-0`}
          style={{ aspectRatio: "653 / 1100" }}
        >
          <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
        </motion.div>
      </div>
    </section>
  );
}
