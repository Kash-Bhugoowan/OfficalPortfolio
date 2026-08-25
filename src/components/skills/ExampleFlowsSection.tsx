"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type ExampleFlowsSectionData = {
  eyebrow: string;
  image: { src: string; alt: string };
};

export default function ExampleFlowsSection({ data }: { data: ExampleFlowsSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, image } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_BLOCK}`}>
        <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
        <motion.div
          initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
          whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
          viewport={CASE_STUDY_REVEAL_VIEWPORT}
          transition={CASE_STUDY_REVEAL_TRANSITION}
          className="relative w-full overflow-hidden rounded-2xl shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)]"
          style={{ aspectRatio: "1530 / 503" }}
        >
          <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
        </motion.div>
      </div>
    </section>
  );
}
