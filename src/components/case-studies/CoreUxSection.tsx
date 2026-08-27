"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import { useImageReveal } from "@/lib/case-studies/useImageReveal";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_IMAGE_FRAME,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type CoreUxSectionData = {
  eyebrow: string;
  title: string;
  image: { src: string; alt: string };
  intro: string;
  quote: string;
};

// This section's image frame is max-w-[960px], full width below that. 960px
// is the true ceiling at every breakpoint (unlike the two-column sections),
// so a plain viewport-vs-fixed split covers it exactly.
const CORE_UX_IMAGE_SIZES = "(min-width: 960px) 960px, 100vw";

export default function CoreUxSection({ data }: { data: CoreUxSectionData }) {
  const reduceMotion = useReducedMotion();
  const { containerRef, inView, loaded, onImageLoad, imageRef } = useImageReveal();
  const ready = inView && loaded;
  const { eyebrow, title, image, intro, quote } = data;

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

        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <motion.div
            ref={containerRef}
            initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
            animate={reduceMotion ? undefined : ready ? CASE_STUDY_REVEAL_VISIBLE : CASE_STUDY_REVEAL_HIDDEN}
            transition={CASE_STUDY_REVEAL_TRANSITION}
            className={`${CASE_STUDY_IMAGE_FRAME} max-w-[960px]`}
            style={{ aspectRatio: "2546 / 1228" }}
          >
            <Image
              ref={imageRef}
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
              sizes={CORE_UX_IMAGE_SIZES}
              quality={90}
              onLoad={onImageLoad}
            />
          </motion.div>

          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            <p className={CASE_STUDY_BODY}>{intro}</p>
            <div className="flex items-stretch gap-8 pl-8">
              <div className="w-2 shrink-0 rounded-sm bg-[#DACBE2]" />
              <p className={CASE_STUDY_BODY}>{quote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
