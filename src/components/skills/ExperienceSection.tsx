"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  SKILL_HEADER_GAP_CLASSNAME,
  SKILL_CARD_FOCUS_SCALE,
  SKILL_HEADER_NEXT_ITEM_DELAY_S,
} from "@/lib/motion";
import { useIsDesktop } from "@/lib/useIsDesktop";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_FIELD_LABEL,
  CASE_STUDY_BODY,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_SHADOW_SM,
  CASE_STUDY_SHADOW_SM_HOVER,
} from "@/lib/case-studies/styles";

export type SkillExperienceParagraph = {
  lead: string;
  text: string;
};

export type SkillExperienceStat = {
  label: string;
  value: string;
  // Omitted for a tile like "Certified" whose value is itself the whole
  // statement (e.g. a credential name) rather than a number with a
  // separate explanatory line underneath.
  description?: string;
  bgClass: string;
};

export type SkillExperienceLogo = {
  name: string;
  src: string;
};

export type SkillExperienceSectionData = {
  eyebrow: string;
  paragraphs: SkillExperienceParagraph[];
  stats: SkillExperienceStat[];
  logos: SkillExperienceLogo[];
};

// Same edge-fade treatment as the homepage's RolesMarquee
// (src/components/RolesMarquee.tsx), reproduced here rather than shared
// since it's just a two-line mask style — items scroll in/out softly
// instead of clipping abruptly at the container boundary.
const edgeFadeStyle = {
  maskImage:
    "linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)",
  WebkitMaskImage:
    "linear-gradient(to right, transparent, black 64px, black calc(100% - 64px), transparent)",
};

function LogoItem({ name, src }: SkillExperienceLogo) {
  return (
    <div className="relative h-16 w-40 shrink-0">
      <Image src={src} alt={`${name} logo`} fill className="object-contain" unoptimized />
    </div>
  );
}

// Auto-scrolling logo strip, same pattern as the homepage's RolesMarquee:
// the source list is repeated enough times that a full set always spans
// the visible window at any viewport width, then shifted -50% via the
// shared .animate-marquee keyframe (globals.css) so the loop wraps
// seamlessly on an identical repeat.
function LogosMarquee({ logos }: { logos: SkillExperienceLogo[] }) {
  const repeatedLogos = Array.from({ length: 8 }, () => logos).flat();

  return (
    <div className="w-full overflow-hidden" style={edgeFadeStyle}>
      <div className="animate-marquee flex w-max items-center gap-4">
        {repeatedLogos.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} {...logo} />
        ))}
      </div>
    </div>
  );
}

// Cascading container/item pair, same shape as PrinciplesSection's — was
// previously one flat CASE_STUDY_REVEAL_HIDDEN/VISIBLE fade on the whole
// section, which meant the 3 stat cards, paragraphs, and logo strip all
// popped in together as a single block instead of cascading like every
// other skill-page section. delayChildren continues SkillHeader's own
// stagger rhythm by one more beat (SKILL_HEADER_NEXT_ITEM_DELAY_S) rather
// than waiting for it to fully finish — see that constant's comment in
// lib/motion.ts for why this still guarantees top-to-bottom completion
// order without a dead pause between the header settling and this
// section starting. This section is typically inside the initial
// viewport, so a fixed guess-delay here previously let its own
// eyebrow/stat cards reach full opacity *before* the header's dek did
// (measured: 744ms/894ms vs 978ms) — matches PrinciplesSection's
// container exactly, so both skill pages' first section cascades in at
// the same rhythm.
const EXPERIENCE_CONTAINER = {
  hidden: {},
  visible: { transition: { delayChildren: SKILL_HEADER_NEXT_ITEM_DELAY_S, staggerChildren: 0.15 } },
};

const EXPERIENCE_ITEM = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

// CASE_STUDY_REVEAL_VIEWPORT's amount: 0.25 assumes an element short enough
// that a quarter of it is a meaningful, soon-reached scroll distance. This
// section is 3 stacked stat cards + paragraphs + a logo strip — on a mobile
// single-column layout it's easily 1200px+ tall, sitting almost entirely
// below the fold right under the header. 25% of that is further than most
// visitors scroll before giving up, so the whole section — stats, "My
// experience" copy, logos, all of it — silently never appears. Triggering
// on any visible sliver instead means it reveals as soon as it's reached.
const EXPERIENCE_REVEAL_VIEWPORT = { once: true, amount: "some" as const };

// Same standard mobile-scroll card treatment as MobileProjectCard /
// CapabilityCard / PrincipleCard: scales up toward full size as the card
// crosses the center of the viewport, back down as it leaves, on top of
// the one-time cascade reveal. Desktop keeps the existing CSS hover lift
// (md:hover:-translate-y-1) instead — pulled into its own component since
// each card needs its own scroll-tracking ref/hook, which .map() can't
// give a single component instance.
function StatCard({ stat, isDesktop }: { stat: SkillExperienceStat; isDesktop: boolean }) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const focusScale = useTransform(scrollYProgress, [0, 0.5, 1], SKILL_CARD_FOCUS_SCALE);

  return (
    <motion.div
      ref={cardRef}
      variants={EXPERIENCE_ITEM}
      style={reduceMotion ? undefined : { scale: isDesktop ? 1 : focusScale }}
      className={`relative flex h-60 flex-col items-start overflow-hidden rounded-3xl px-8 pt-8 pb-9 ${CASE_STUDY_SHADOW_SM} transition-all duration-200 md:hover:-translate-y-1 ${CASE_STUDY_SHADOW_SM_HOVER} ${stat.bgClass}`}
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

// Sits directly under SkillHeader (its marginTop is the header-to-body gap,
// same slot PrinciplesSection normally owns) — establishing credibility
// with real numbers before Principles gets into how this skill is applied.
export default function ExperienceSection({
  data,
}: {
  data: SkillExperienceSectionData;
}) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { eyebrow, paragraphs, stats, logos } = data;

  return (
    <motion.section
      className={`relative flex flex-col items-center px-6 ${SKILL_HEADER_GAP_CLASSNAME}`}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={EXPERIENCE_REVEAL_VIEWPORT}
      variants={reduceMotion ? undefined : EXPERIENCE_CONTAINER}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <motion.span variants={EXPERIENCE_ITEM} className={CASE_STUDY_EYEBROW}>
          {eyebrow}
        </motion.span>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <StatCard key={stat.label} stat={stat} isDesktop={isDesktop} />
          ))}
        </div>

        <motion.div variants={EXPERIENCE_ITEM} className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.lead} className={CASE_STUDY_BODY}>
              <span className="font-semibold">{paragraph.lead}: </span>
              {paragraph.text}
            </p>
          ))}
        </motion.div>

        <motion.div variants={EXPERIENCE_ITEM} className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
          <span className={CASE_STUDY_FIELD_LABEL}>Companies I&apos;ve worked with</span>
          <LogosMarquee logos={logos} />
        </motion.div>
      </div>
    </motion.section>
  );
}
