"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_SUBTITLE,
  CASE_STUDY_IMAGE_FRAME,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_TIGHT,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

// HSBC-specific "Defining the vision" layout: eyebrow/title/subtitle atop,
// then paragraphs beside a single static image — no pulled quote, no
// image gallery, no "pushback" block. None of the existing generic or
// per-project section shapes match this combination, so it gets its own
// component rather than overloading MainPrioritySection with unused
// optional fields.
export type HsbcVisionSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  image: { src: string; alt: string };
};

export default function HsbcVisionSection({ data }: { data: HsbcVisionSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, subtitle, paragraphs, image } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_TIGHT}`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW} max-w-[732px]`}>
            <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
            <h2 className={CASE_STUDY_TITLE}>{title}</h2>
          </div>
          <p className={CASE_STUDY_SUBTITLE}>{subtitle}</p>
        </div>

        <div className={`grid grid-cols-1 items-start ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={CASE_STUDY_BODY}>
                {paragraph}
              </p>
            ))}
          </div>
          <motion.div
            initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
            whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
            viewport={CASE_STUDY_REVEAL_VIEWPORT}
            transition={CASE_STUDY_REVEAL_TRANSITION}
            className={CASE_STUDY_IMAGE_FRAME}
            style={{ aspectRatio: "731 / 396" }}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover object-left" unoptimized />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
