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

// GAiL-specific "My Approach" layout: a two-column grid — two images
// stacked in the left column, all copy (paragraphs + pulled quote)
// stacked in the right column — rather than Minerva's ApproachSection,
// which pairs each image with its own paragraph side by side. Same
// content shape, different rhythm, per this project's Figma.
export type GailApproachSectionData = {
  eyebrow: string;
  title: string;
  topImage: { src: string; alt: string };
  paragraphs: string[];
  quote: string;
  bottomImage: { src: string; alt: string };
};

function RevealImage({ image }: { image: { src: string; alt: string } }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={CASE_STUDY_REVEAL_TRANSITION}
      className={CASE_STUDY_IMAGE_FRAME}
      style={{ aspectRatio: "734 / 453" }}
    >
      <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
    </motion.div>
  );
}

export default function GailApproachSection({ data }: { data: GailApproachSectionData }) {
  const { eyebrow, title, topImage, paragraphs, quote, bottomImage } = data;

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

        <div className={`grid grid-cols-1 items-start ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_BLOCK}`}>
            <RevealImage image={topImage} />
            <RevealImage image={bottomImage} />
          </div>

          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={CASE_STUDY_BODY}>
                {paragraph}
              </p>
            ))}
            <div className="flex items-stretch gap-8 pl-8">
              <div className="w-2 shrink-0 rounded-sm bg-[#C0D9C0]" />
              <p className={CASE_STUDY_BODY}>{quote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
