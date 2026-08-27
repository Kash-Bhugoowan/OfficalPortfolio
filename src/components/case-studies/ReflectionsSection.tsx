"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_IMAGE_FRAME,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type ReflectionsSectionData = {
  // Optional: not every case study wants an image/video stacked directly
  // above this section's quote block.
  image?: { src: string; alt: string };
  video?: { src: string };
  label: string;
  quote: string;
  supporting: string;
};

function QuoteIcon() {
  return (
    <svg viewBox="0 0 24 20" className="h-5 w-6 text-white" fill="none" aria-hidden="true">
      <path
        d="M0 12c0-4.4 2.7-7.8 7-9l1 2.6c-2.6.9-4 2.5-4 4.4h4v6H0v-4zm13 0c0-4.4 2.7-7.8 7-9l1 2.6c-2.6.9-4 2.5-4 4.4h4v6h-8v-4z"
        fill="currentColor"
      />
    </svg>
  );
}

export default function ReflectionsSection({ data }: { data: ReflectionsSectionData }) {
  const reduceMotion = useReducedMotion();
  const { image, video, label, quote, supporting } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_BLOCK}`}>
        {(video || image) && (
          <motion.div
            initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
            whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
            viewport={CASE_STUDY_REVEAL_VIEWPORT}
            transition={CASE_STUDY_REVEAL_TRANSITION}
            className={`${CASE_STUDY_IMAGE_FRAME} max-w-[960px]`}
            style={{ aspectRatio: "1169 / 732" }}
          >
            {video ? (
              <video
                src={video.src}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image src={image!.src} alt={image!.alt} fill className="object-cover" unoptimized />
            )}
          </motion.div>
        )}

        <motion.div
          initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
          whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
          viewport={CASE_STUDY_REVEAL_VIEWPORT}
          transition={CASE_STUDY_REVEAL_TRANSITION}
          className="flex overflow-hidden rounded-[32px] bg-[#37323F]"
        >
          <div className="hidden w-32 shrink-0 items-start justify-center border-r border-zinc-700 bg-[#2B2832] pt-14 md:flex">
            <QuoteIcon />
          </div>
          <div className="flex flex-col gap-8 px-8 py-10 md:px-10 md:py-14">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-semibold tracking-wider text-white/90 uppercase font-[family-name:var(--font-dm-sans)]">
                {label}
              </span>
              <p className="max-w-[960px] text-xl leading-9 font-semibold text-white md:text-2xl md:leading-10">
                {quote}
              </p>
            </div>
            <div className="flex max-w-[960px] flex-col gap-6">
              <div className="h-[3px] w-28 rounded-2xl bg-indigo-500" />
              <p className="text-base leading-7 text-white/80">{supporting}</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
