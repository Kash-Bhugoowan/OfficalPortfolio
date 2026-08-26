"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import {
  ArrowLeftIcon,
  type PreviousProjectNavData,
} from "@/components/case-studies/NextProjectNav";
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
  CASE_STUDY_SHADOW_SM,
  CASE_STUDY_SHADOW_SM_HOVER,
} from "@/lib/case-studies/styles";

export type CaseStudyStat = {
  label: string;
  value: string;
  description: string;
  bgClass: string;
};

export type CaseStudyHeaderData = {
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

export default function CaseStudyHeader({
  data,
  previous,
}: {
  data: CaseStudyHeaderData;
  previous?: PreviousProjectNavData;
}) {
  const reduceMotion = useReducedMotion();
  const {
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
          className="flex flex-col gap-8"
          variants={container}
          initial="hidden"
          animate="visible"
        >
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            {/* Replaces the old static "Selected work | CASE STUDY" page
                eyebrow — that slot now points back to the previous project
                in the sequence instead. Minerva is first in the chain and
                has no previous project, so this slot is simply omitted
                there rather than falling back to the old label. */}
            {previous && (
              <motion.a
                variants={item}
                href={previous.href}
                aria-label={`${previous.label}: ${previous.title}`}
                className={`group inline-flex w-fit items-center gap-2 ${CASE_STUDY_PAGE_EYEBROW} transition-colors duration-200 hover:text-accent`}
              >
                <ArrowLeftIcon className="size-3 shrink-0 transition-transform duration-200 group-hover:-translate-x-1" />
                <span className="md:hidden">{previous.label}</span>
                <span className="hidden md:inline">
                  {previous.label}: {previous.title}
                </span>
              </motion.a>
            )}

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

          {/* Part of the mount-time stagger, not a whileInView scroll
              reveal — at typical viewport heights this image sits at or
              near the fold on first load, so waiting for a scroll trigger
              left it invisible and the page looked empty below the text.
              The stats row further down is reliably off-screen on load,
              so it keeps the scroll-triggered reveal. */}
          <motion.div
            variants={item}
            className="relative w-full max-w-[960px] overflow-hidden rounded-xl border-[1.5px] border-text-secondary shadow-[0px_16px_48px_0px_rgba(36,31,43,0.10)]"
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
              className={`relative w-full overflow-hidden rounded-3xl p-8 ${CASE_STUDY_SHADOW_SM} transition-all duration-200 md:hover:-translate-y-1 ${CASE_STUDY_SHADOW_SM_HOVER} ${stat.bgClass}`}
            >
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
    </section>
  );
}
