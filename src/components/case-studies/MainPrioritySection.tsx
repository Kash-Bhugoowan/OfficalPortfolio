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

export type MainPrioritySectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  pushback: {
    eyebrow: string;
    image: { src: string; alt: string };
    paragraphs: string[];
    quote: string;
  };
};

function RevealImage({
  image,
  aspectRatio,
}: {
  image: { src: string; alt: string };
  aspectRatio: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={CASE_STUDY_REVEAL_TRANSITION}
      className={CASE_STUDY_IMAGE_FRAME}
      style={{ aspectRatio }}
    >
      <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
    </motion.div>
  );
}

export default function MainPrioritySection({ data }: { data: MainPrioritySectionData }) {
  const { eyebrow, title, subtitle, paragraphs, image, pushback } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_BLOCK}`}>
        <div className={`grid grid-cols-1 items-start ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            <div className={`flex flex-col ${CASE_STUDY_GAP_TIGHT}`}>
              <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
                <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
                <h2 className={CASE_STUDY_TITLE}>{title}</h2>
              </div>
              <p className={CASE_STUDY_SUBTITLE}>{subtitle}</p>
            </div>
            <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
              {paragraphs.map((paragraph) => (
                <p key={paragraph} className={CASE_STUDY_BODY}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
          <RevealImage image={image} aspectRatio="596 / 727" />
        </div>

        <div className={`grid grid-cols-1 items-start ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}>
          <RevealImage image={pushback.image} aspectRatio="732 / 494" />
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
              <span className={CASE_STUDY_EYEBROW}>{pushback.eyebrow}</span>
              <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
                {pushback.paragraphs.map((paragraph) => (
                  <p key={paragraph} className={CASE_STUDY_BODY}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-stretch gap-8 pl-8">
              <div className="w-2 shrink-0 rounded-sm bg-[#C1DAC1]" />
              <p className={CASE_STUDY_BODY}>{pushback.quote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
