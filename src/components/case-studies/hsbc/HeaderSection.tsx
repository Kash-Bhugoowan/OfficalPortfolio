"use client";

import Image from "next/image";
import { motion } from "framer-motion";
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
} from "@/lib/case-studies/styles";

// HSBC-specific header: this project never shipped, so there are no
// production metrics to put in the usual 3-stat grid (see
// CaseStudyHeader.tsx). Instead the Figma replaces that grid with a
// single wide "Outcome" card carrying mixed bold/plain running text —
// a genuinely different content shape, not just a rhythm tweak, so it
// gets its own header component rather than forcing rich text through
// CaseStudyStat's numeric-tile fields.
export type HsbcOutcomeSegment = { text: string; bold?: boolean };

export type HsbcCaseStudyHeaderData = {
  primaryTag: string;
  tags: string[];
  titleLight: string;
  titleBold: string;
  dek: string;
  roleLabel: string;
  roleSummary: string;
  heroImage: { src: string; alt: string };
  outcome: {
    label: string;
    segments: HsbcOutcomeSegment[];
  };
};

const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.1, staggerChildren: 0.12 },
  },
};

const item = fadeInUp;

export default function HsbcCaseStudyHeader({
  data,
  previous,
}: {
  data: HsbcCaseStudyHeaderData;
  previous?: PreviousProjectNavData;
}) {
  const {
    primaryTag,
    tags,
    titleLight,
    titleBold,
    dek,
    roleLabel,
    roleSummary,
    heroImage,
    outcome,
  } = data;

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
                eyebrow — see CaseStudyHeader.tsx for the matching change
                on the other two case studies. */}
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

          <motion.h1
            variants={item}
            className="text-3xl leading-[38px] text-zinc-800 sm:text-4xl sm:leading-[44px] md:text-5xl md:leading-[56px]"
          >
            <span className="font-light">{titleLight}</span>
            <br />
            <span className="font-semibold">{titleBold}</span>
          </motion.h1>

          {/* The phone screenshot now sits directly beneath the title, with
              the dek, Role & Summary, and the Outcome card all stacked in
              the left column beside it — rather than the dek living in its
              own full-width block above this row. items-start keeps the
              image top-aligned rather than stretched to match the (taller)
              text column. */}
          <div className={`grid grid-cols-1 items-start ${CASE_STUDY_GAP_BLOCK} md:grid-cols-[1fr_380px]`}>
            <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
              <motion.p variants={item} className={`max-w-[722px] ${CASE_STUDY_BODY}`}>
                {dek}
              </motion.p>

              <motion.div variants={item} className="flex max-w-[722px] flex-col gap-2">
                <span className={CASE_STUDY_FIELD_LABEL}>{roleLabel}</span>
                <p className={CASE_STUDY_BODY}>{roleSummary}</p>
              </motion.div>

              <motion.div variants={item} className="flex max-w-[722px] flex-col gap-2">
                <span className={CASE_STUDY_FIELD_LABEL}>{outcome.label}</span>
                <p className={CASE_STUDY_BODY}>
                  {outcome.segments.map((segment, i) => (
                    <span key={i} className={segment.bold ? "font-bold" : undefined}>
                      {segment.text}
                    </span>
                  ))}
                </p>
              </motion.div>
            </div>

            {/* Taller than the left column on purpose — it's a full phone
                mockup, not a landscape screenshot, so it needs the extra
                length to show the device without cropping. items-start on
                the parent grid means it's free to run past the bottom of
                the text column; the leftover space there is expected. */}
            <motion.div
              variants={item}
              className="relative mx-auto w-full max-w-[380px] overflow-hidden rounded-xl border-[1.5px] border-text-secondary shadow-[0px_16px_48px_0px_rgba(36,31,43,0.10)] md:mx-0"
              style={{ aspectRatio: "653 / 1100" }}
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
          </div>
        </motion.div>
      </div>
    </section>
  );
}
