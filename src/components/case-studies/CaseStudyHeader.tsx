"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import {
  CASE_STUDY_PAGE_EYEBROW,
  CASE_STUDY_FIELD_LABEL,
  CASE_STUDY_BODY,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type CaseStudyStat = {
  label: string;
  value: string;
  description: string;
  bgClass: string;
  glowClass: string;
};

export type CaseStudyHeaderData = {
  eyebrow: string;
  primaryTag: string;
  tags: string[];
  titleLight: string;
  titleBold: string;
  dek: string;
  roleLabel: string;
  roleSummary: string;
  heroImage: { src: string; alt: string };
  stats: CaseStudyStat[];
};

// Same mount-time stagger shape as Hero.tsx's container/item pair — kept
// local rather than promoted to src/lib/motion.ts, matching Hero's own
// precedent of defining per-section stagger timing locally.
const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const item = fadeInUp;

export default function CaseStudyHeader({ data }: { data: CaseStudyHeaderData }) {
  const reduceMotion = useReducedMotion();
  const {
    eyebrow,
    primaryTag,
    tags,
    titleLight,
    titleBold,
    dek,
    roleLabel,
    roleSummary,
    heroImage,
    stats,
  } = data;

  // No bottom padding here — the gap to the next case-study section comes
  // from that section's own top margin (see CASE_STUDY_SECTION_GAP_PX in
  // src/lib/motion.ts), not this section's bottom, so the gap stays a
  // fixed, consistent value regardless of either section's content height.
  return (
    <section className="flex flex-col items-center px-6 pt-[37px] md:pt-[54px]">
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_BLOCK}`}>
        <motion.div
          className={`flex flex-col ${CASE_STUDY_GAP_BLOCK}`}
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            <motion.span variants={item} className={CASE_STUDY_PAGE_EYEBROW}>
              {eyebrow}
            </motion.span>

            <motion.div variants={item} className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-zinc-800/30 px-3 py-[5px] text-xs font-semibold tracking-wide text-white/90 uppercase outline outline-1 -outline-offset-1 outline-white/20 font-[family-name:var(--font-dm-sans)]">
                {primaryTag}
              </span>
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-stone-50/90 px-3 py-1 text-xs font-medium tracking-wide text-text-secondary uppercase outline outline-1 -outline-offset-1 outline-border font-[family-name:var(--font-dm-sans)]"
                >
                  {tag}
                </span>
              ))}
            </motion.div>
          </div>

          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            <motion.h1
              variants={item}
              className="text-3xl leading-[38px] text-zinc-800 sm:text-4xl sm:leading-[44px] md:text-5xl md:leading-[56px]"
            >
              <span className="font-light">{titleLight}</span>
              <br />
              <span className="font-semibold">{titleBold}</span>
            </motion.h1>
            <motion.p variants={item} className={`max-w-[960px] ${CASE_STUDY_BODY}`}>
              {dek}
            </motion.p>
          </div>

          <motion.div variants={item} className="flex max-w-[960px] flex-col gap-2">
            <span className={CASE_STUDY_FIELD_LABEL}>{roleLabel}</span>
            <p className={CASE_STUDY_BODY}>{roleSummary}</p>
          </motion.div>
        </motion.div>

        <div className={`flex flex-col ${CASE_STUDY_GAP_BLOCK}`}>
          <motion.div
            initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
            whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
            viewport={CASE_STUDY_REVEAL_VIEWPORT}
            transition={CASE_STUDY_REVEAL_TRANSITION}
            className="relative w-full max-w-[960px] overflow-hidden rounded-xl border-[1.5px] border-text-secondary shadow-[0px_16px_48px_0px_rgba(36,31,43,0.12)]"
            style={{ aspectRatio: "1169 / 732" }}
          >
            <Image
              src={heroImage.src}
              alt={heroImage.alt}
              fill
              className="object-cover"
              unoptimized
              priority
            />
          </motion.div>

          <motion.div
            initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
            whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
            viewport={CASE_STUDY_REVEAL_VIEWPORT}
            transition={CASE_STUDY_REVEAL_TRANSITION}
            className="grid grid-cols-1 gap-4 md:grid-cols-3"
          >
            {stats.map((stat) => (
              <div
                key={stat.label}
                className={`relative w-full overflow-hidden rounded-3xl p-8 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)] ${stat.bgClass}`}
              >
                <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
                  <div
                    className={`absolute -top-10 right-0 size-[180px] rounded-full opacity-20 blur-2xl md:size-[240px] ${stat.glowClass}`}
                  />
                </div>
                <div className="relative flex flex-col gap-4">
                  <span className="text-xs font-semibold tracking-wider text-zinc-800 uppercase font-[family-name:var(--font-dm-sans)]">
                    {stat.label}
                  </span>
                  <span className="text-5xl font-light leading-[68px] text-zinc-800 md:text-6xl">
                    {stat.value}
                  </span>
                  <p className="text-base leading-6 text-zinc-800">{stat.description}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
