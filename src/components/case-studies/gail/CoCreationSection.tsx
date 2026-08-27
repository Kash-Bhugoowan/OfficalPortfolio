"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_SUBTITLE,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_TIGHT,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

// GAiL-specific "Co-creation" layout: the image gallery top-aligns with
// the body copy (items-start) rather than Minerva's CoCreationSection,
// which bottom-aligns the gallery against the text column (items-end).
// The first paragraph reads as a subtitle directly under the title (same
// CASE_STUDY_SUBTITLE treatment as MainPrioritySection), not as the first
// item in the paragraphs column. Same gallery mechanics otherwise.
export type GailCoCreationSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  images: { src: string; alt: string }[];
};

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

export default function GailCoCreationSection({ data }: { data: GailCoCreationSectionData }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, subtitle, paragraphs, images } = data;
  const total = images.length;
  const current = images[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_TIGHT}`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
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
            className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}
          >
            <div
              className="relative w-full overflow-hidden rounded-2xl border border-zinc-300 bg-zinc-100 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)]"
              style={{ aspectRatio: "737 / 512" }}
            >
              {/* Default (sync) AnimatePresence mode, not "wait" — the incoming
                  image fades in while the outgoing one is still fading out, so
                  they cross-fade over each other instead of leaving a blank
                  gap between a full fade-out and a separate fade-in (which is
                  what reads as "jumpy"). */}
              <AnimatePresence initial={false}>
                <motion.div
                  key={index}
                  initial={reduceMotion ? undefined : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={reduceMotion ? undefined : { opacity: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0"
                >
                  <Image src={current.src} alt={current.alt} fill className="object-contain" unoptimized />
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="flex justify-center gap-3">
              <button
                type="button"
                aria-label="Previous image"
                onClick={goPrev}
                className="flex size-11 items-center justify-center rounded-full bg-zinc-500 text-white shadow-[0px_16px_48px_0px_rgba(36,31,43,0.12)] transition hover:bg-zinc-600 active:scale-95"
              >
                <ArrowIcon direction="left" />
              </button>
              <button
                type="button"
                aria-label="Next image"
                onClick={goNext}
                className="flex size-11 items-center justify-center rounded-full bg-zinc-500 text-white shadow-[0px_16px_48px_0px_rgba(36,31,43,0.12)] transition hover:bg-zinc-600 active:scale-95"
              >
                <ArrowIcon direction="right" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
