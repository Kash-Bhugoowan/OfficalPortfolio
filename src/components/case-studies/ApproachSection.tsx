"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_BODY_EMPHASIS,
  CASE_STUDY_IMAGE_FRAME,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type ApproachImage = { src: string; alt: string };

export type ApproachSectionData = {
  eyebrow: string;
  title: string;
  columns: { image: ApproachImage; paragraph: string }[];
  fieldObservation: {
    eyebrow: string;
    image: ApproachImage;
    introPrefix: string;
    introHighlight: string;
    introSuffix: string;
    quote: string;
    closing: string;
  };
};

function RevealImage({ image }: { image: ApproachImage }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={CASE_STUDY_REVEAL_TRANSITION}
      className={CASE_STUDY_IMAGE_FRAME}
      style={{ aspectRatio: "733 / 453" }}
    >
      <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
    </motion.div>
  );
}

export default function ApproachSection({ data }: { data: ApproachSectionData }) {
  const { eyebrow, title, columns, fieldObservation } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_BLOCK}`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
            <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
            <h2 className={CASE_STUDY_TITLE}>{title}</h2>
          </div>
          <div className={`grid grid-cols-1 ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}>
            {columns.map((column) => (
              <div key={column.paragraph} className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
                <RevealImage image={column.image} />
                <p className={CASE_STUDY_BODY}>{column.paragraph}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <span className={CASE_STUDY_EYEBROW}>{fieldObservation.eyebrow}</span>
          <div className={`grid grid-cols-1 items-start ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}>
            <RevealImage image={fieldObservation.image} />
            <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
              <p className={CASE_STUDY_BODY}>
                {fieldObservation.introPrefix}
                <span className={CASE_STUDY_BODY_EMPHASIS}>{fieldObservation.introHighlight}</span>
                {fieldObservation.introSuffix}
              </p>
              <div className="flex items-stretch gap-8 pl-8">
                <div className="w-2 shrink-0 rounded-sm bg-[#C0D9C0]" />
                <p className={CASE_STUDY_BODY}>{fieldObservation.quote}</p>
              </div>
              <p className={CASE_STUDY_BODY}>{fieldObservation.closing}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
