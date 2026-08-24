"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";

export type CoreUxSectionData = {
  eyebrow: string;
  title: string;
  image: { src: string; alt: string };
  intro: string;
  quote: string;
};

export default function CoreUxSection({ data }: { data: CoreUxSectionData }) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, title, image, intro, quote } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className="mx-auto flex w-full max-w-[1227px] flex-col gap-12">
        <div className="flex flex-col gap-6">
          <span className="text-xs font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)]">
            {eyebrow}
          </span>
          <h2 className="text-2xl leading-9 text-zinc-800 md:text-3xl md:leading-[44px]">
            {title}
          </h2>
        </div>

        <div className="flex flex-col gap-16">
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 14 }}
            whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-[960px] overflow-hidden rounded-2xl border border-zinc-300 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)]"
            style={{ aspectRatio: "1169 / 732" }}
          >
            <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
          </motion.div>

          <div className="flex flex-col gap-12">
            <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">{intro}</p>
            <div className="flex items-stretch gap-8 pl-8">
              <div className="w-2 shrink-0 rounded-sm bg-[#DACBE2]" />
              <p className="text-base leading-7 text-zinc-800 md:text-lg md:leading-8">{quote}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
