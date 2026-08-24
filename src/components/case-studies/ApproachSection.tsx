"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";

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
      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden rounded-2xl border border-zinc-300 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)]"
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
      <div className="mx-auto flex w-full max-w-[1227px] flex-col gap-8 md:gap-16">
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-6">
            <span className="text-xs font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)]">
              {eyebrow}
            </span>
            <h2 className="text-2xl leading-9 text-zinc-800 md:text-3xl md:leading-[44px]">
              {title}
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-16">
            {columns.map((column) => (
              <div key={column.paragraph} className="flex flex-col gap-8">
                <RevealImage image={column.image} />
                <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">
                  {column.paragraph}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-8">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)]">
            {fieldObservation.eyebrow}
          </span>
          <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-16">
            <RevealImage image={fieldObservation.image} />
            <div className="flex flex-col gap-8">
              <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">
                {fieldObservation.introPrefix}
                <span className="text-lg font-semibold md:text-xl">
                  {fieldObservation.introHighlight}
                </span>
                {fieldObservation.introSuffix}
              </p>
              <div className="flex items-stretch gap-8 pl-8">
                <div className="w-2 shrink-0 rounded-sm bg-[#C0D9C0]" />
                <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">
                  {fieldObservation.quote}
                </p>
              </div>
              <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">
                {fieldObservation.closing}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
