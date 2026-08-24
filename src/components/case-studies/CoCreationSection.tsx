"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";

export type CoCreationSectionData = {
  eyebrow: string;
  title: string;
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

export default function CoCreationSection({ data }: { data: CoCreationSectionData }) {
  const [index, setIndex] = useState(0);
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, paragraphs, images } = data;
  const total = images.length;
  const current = images[index];

  const goPrev = () => setIndex((i) => (i - 1 + total) % total);
  const goNext = () => setIndex((i) => (i + 1) % total);

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className="mx-auto grid w-full max-w-[1227px] grid-cols-1 items-end gap-8 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)]">
              {eyebrow}
            </span>
            <h2 className="text-2xl leading-9 text-zinc-800 md:text-3xl md:leading-[44px]">
              {title}
            </h2>
          </div>
          <div className="flex flex-col gap-8">
            {paragraphs.map((paragraph) => (
              <p
                key={paragraph}
                className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
          whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col gap-6"
        >
          <div
            className="relative w-full overflow-hidden rounded-2xl border border-zinc-300 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)]"
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
                <Image src={current.src} alt={current.alt} fill className="object-cover" unoptimized />
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
    </section>
  );
}
