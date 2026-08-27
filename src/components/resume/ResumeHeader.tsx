"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeInUp, linkHoverTransition } from "@/lib/motion";
import {
  CASE_STUDY_BODY,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_SHADOW_SM,
  CASE_STUDY_SHADOW_SM_HOVER,
} from "@/lib/case-studies/styles";

export type ResumeStat = {
  label: string;
  value: string;
  // Omitted for a card like "contributions to the bottom line" whose
  // value is itself a whole sentence rather than a number with a
  // separate explanatory line underneath — same shape as
  // ExperienceSection.tsx's SkillExperienceStat.
  description?: string;
  bgClass: string;
};

export type ResumeHeaderData = {
  title: string;
  // Split so mobile can force "Senior Product Designer" onto its own
  // line and keep "7+ Years ・ IBM" together on the next, instead of
  // letting a single long string wrap wherever it happens to run out
  // of room. Desktop rejoins both into one line with a "・" between.
  eyebrowRole: string;
  eyebrowMeta: string;
  description: string;
  primaryCta: { label: string; href: string };
  secondaryCta: { label: string; href: string };
  stats: ResumeStat[];
};

// Same "waterfall" mount cascade as the homepage's Hero.tsx (the other
// page-level, above-the-fold intro on this site) — deliberately slower
// and more pronounced than SkillHeader's sub-page header cascade, so the
// whole hero (title through stats) reads as one clear top-to-bottom fade
// on load rather than a quick, barely-visible flash.
const container = {
  hidden: {},
  visible: { transition: { delayChildren: 0.3, staggerChildren: 0.35 } },
};

const item = fadeInUp;

// Same card shape as ExperienceSection.tsx's StatCard (label / big value /
// optional description). Unlike that mid-page section, these cards sit
// right under the buttons with no hero image to push them off-screen, so
// they join the header's own mount-time waterfall (variants={item} from
// the caller) instead of a separate scroll-triggered reveal.
function StatCard({ stat }: { stat: ResumeStat }) {
  return (
    <motion.div
      variants={item}
      className={`relative flex h-60 flex-col items-start text-left overflow-hidden rounded-3xl px-8 pt-8 pb-9 ${CASE_STUDY_SHADOW_SM} transition-all duration-200 md:hover:-translate-y-1 ${CASE_STUDY_SHADOW_SM_HOVER} ${stat.bgClass}`}
    >
      <span className="pb-5 text-xs font-semibold tracking-wider text-zinc-800 uppercase font-[family-name:var(--font-dm-sans)]">
        {stat.label}
      </span>
      {stat.description ? (
        <>
          <span className="pb-4 text-5xl leading-[68px] font-light text-zinc-800 md:text-6xl">
            {stat.value}
          </span>
          <p className="text-base leading-6 text-zinc-800">{stat.description}</p>
        </>
      ) : (
        <span className="text-3xl leading-[42px] font-light whitespace-pre-line text-zinc-800 md:text-4xl md:leading-[50px]">
          {stat.value}
        </span>
      )}
    </motion.div>
  );
}

export default function ResumeHeader({ data }: { data: ResumeHeaderData }) {
  const reduceMotion = useReducedMotion();
  const { title, eyebrowRole, eyebrowMeta, description, primaryCta, secondaryCta, stats } = data;

  return (
    <section className="flex flex-col items-center px-6 pt-[37px] md:pt-[54px]">
      <div className="mx-auto w-full max-w-[1227px]">
        <motion.div
          className={`flex flex-col items-center text-center ${CASE_STUDY_GAP_BLOCK}`}
          variants={reduceMotion ? undefined : container}
          initial={reduceMotion ? undefined : "hidden"}
          animate={reduceMotion ? undefined : "visible"}
        >
          <div className={`flex flex-col items-center ${CASE_STUDY_GAP_CONTENT}`}>
            <div className="flex flex-col items-center gap-4">
              <motion.h1
                variants={item}
                className="text-3xl leading-[38px] font-normal text-zinc-800 sm:text-4xl sm:leading-[44px] md:text-5xl md:leading-[56px]"
              >
                {title}
              </motion.h1>
              {/* "block sm:inline" forces the role onto its own line on
                  mobile with the meta line below it, then rejoins both
                  into a single line (with the "・" separator) from sm up. */}
              <motion.span
                variants={item}
                className="text-sm font-semibold tracking-wider text-accent uppercase font-[family-name:var(--font-dm-sans)] sm:text-base"
              >
                <span className="block sm:inline">{eyebrowRole}</span>
                <span className="hidden sm:inline"> ・ </span>
                <span className="block sm:inline">{eyebrowMeta}</span>
              </motion.span>
            </div>
            <motion.p variants={item} className={`max-w-3xl ${CASE_STUDY_BODY}`}>
              {description}
            </motion.p>
          </div>

          <motion.div variants={item} className="flex flex-wrap items-center justify-center gap-4">
            <motion.a
              href={primaryCta.href}
              download
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97, backgroundColor: "#4434B8" }}
              transition={linkHoverTransition}
            >
              {primaryCta.label} ↓
            </motion.a>
            <motion.a
              href={secondaryCta.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-accent/30 bg-[#FAF8F5] px-8 py-3 text-sm font-semibold text-accent"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97, backgroundColor: "#ddd3fc" }}
              transition={linkHoverTransition}
            >
              {secondaryCta.label} →
            </motion.a>
          </motion.div>

          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
            {stats.map((stat) => (
              <StatCard key={stat.label} stat={stat} />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
