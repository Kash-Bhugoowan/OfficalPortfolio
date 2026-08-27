"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type SkillExampleFlowsSectionData = {
  eyebrow: string;
  image?: { src: string; alt: string };
  images?: { src: string; alt: string }[];
};

function GalleryCard({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative h-60 w-96 shrink-0 overflow-hidden rounded-xl">
      <Image src={src} alt={alt} fill className="object-cover" unoptimized />
    </div>
  );
}

export default function ExampleFlowsSection({ data }: { data: SkillExampleFlowsSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, image, images } = data;

  // Repeated enough times that a full set always spans the visible window
  // at any viewport width, so the loop never runs out of content mid-scroll.
  const repeatedImages = images ? Array.from({ length: 4 }, () => images).flat() : [];

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
        {images ? (
          <motion.div
            initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
            whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
            viewport={CASE_STUDY_REVEAL_VIEWPORT}
            transition={CASE_STUDY_REVEAL_TRANSITION}
            className="w-full overflow-hidden"
          >
            <div className="animate-marquee-reverse flex w-max items-center gap-2.5">
              {repeatedImages.map((img, i) => (
                <GalleryCard key={`${img.src}-${i}`} src={img.src} alt={img.alt} />
              ))}
            </div>
          </motion.div>
        ) : image ? (
          <motion.div
            initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
            whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
            viewport={CASE_STUDY_REVEAL_VIEWPORT}
            transition={CASE_STUDY_REVEAL_TRANSITION}
            className="relative w-full overflow-hidden rounded-2xl bg-white shadow-[0px_8px_24px_0px_rgba(36,31,43,0.06)]"
            style={{ aspectRatio: "1530 / 503" }}
          >
            <Image src={image.src} alt={image.alt} fill className="object-contain" unoptimized />
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
