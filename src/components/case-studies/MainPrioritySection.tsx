"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";

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
      initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full overflow-hidden rounded-2xl border border-zinc-300 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)]"
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
      <div className="mx-auto flex w-full max-w-[1227px] flex-col gap-8 md:gap-16">
        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-6">
                <span className="text-xs font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)]">
                  {eyebrow}
                </span>
                <h2 className="text-2xl leading-9 text-zinc-800 md:text-3xl md:leading-[44px]">
                  {title}
                </h2>
              </div>
              <p className="text-base leading-7 font-semibold text-zinc-800 md:text-lg md:leading-8">
                {subtitle}
              </p>
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
          <RevealImage image={image} aspectRatio="596 / 727" />
        </div>

        <div className="grid grid-cols-1 items-start gap-8 md:grid-cols-2 md:gap-16">
          <RevealImage image={pushback.image} aspectRatio="732 / 494" />
          <div className="flex flex-col gap-8">
            <div className="flex flex-col gap-8">
              <span className="text-xs font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)]">
                {pushback.eyebrow}
              </span>
              <div className="flex flex-col gap-8">
                {pushback.paragraphs.map((paragraph) => (
                  <p
                    key={paragraph}
                    className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
            <div className="flex items-stretch gap-8 pl-8">
              <div className="w-2 shrink-0 rounded-sm bg-[#C1DAC1]" />
              <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">
                {pushback.quote}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
