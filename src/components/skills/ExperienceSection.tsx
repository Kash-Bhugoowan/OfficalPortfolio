"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_FIELD_LABEL,
  CASE_STUDY_BODY,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_SHADOW_SM,
  CASE_STUDY_SHADOW_SM_HOVER,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
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
    <div className="relative h-16 w-40 shrink-0 overflow-hidden rounded-xl bg-white shadow-[0px_2px_8px_0px_rgba(36,31,43,0.06)]">
      <Image
        src={src}
        alt={`${name} logo`}
        fill
        className="object-contain p-4 grayscale opacity-60"
        unoptimized
      />
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
      <div className="animate-marquee flex w-max items-center gap-6">
        {repeatedLogos.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} {...logo} />
        ))}
      </div>
    </div>
  );
}

// Local override of CASE_STUDY_REVEAL_TRANSITION's timing (not a change
// to that shared constant): every other section using it sits further
// down the page, so by the time a user scrolls it into view the
// header's own mount-time fade (SkillHeader's fadeInUp stagger, ~1.6s
// per item) has long since finished. This section instead sits
// directly under the header and is typically already inside the
// initial viewport, so its whileInView threshold fires almost at
// t=0 — without a delay it visibly beat the header's own title/dek to
// full opacity. PrinciplesSection has the same guard (its
// delayChildren: 1) for the same reason, from when it used to occupy
// this slot.
const EXPERIENCE_REVEAL_TRANSITION = { ...CASE_STUDY_REVEAL_TRANSITION, delay: 1 };

// Sits directly under SkillHeader (its marginTop is the header-to-body gap,
// same slot PrinciplesSection normally owns) — establishing credibility
// with real numbers before Principles gets into how this skill is applied.
export default function ExperienceSection({
  data,
  marginTopPx,
}: {
  data: SkillExperienceSectionData;
  marginTopPx: number;
}) {
  const reduceMotion = useReducedMotion();
  const { eyebrow, paragraphs, stats, logos } = data;

  return (
    <motion.section
      className="relative flex flex-col items-center px-6"
      style={{ marginTop: marginTopPx }}
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={EXPERIENCE_REVEAL_TRANSITION}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>

        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
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
            </div>
          ))}
        </div>

        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          {paragraphs.map((paragraph) => (
            <p key={paragraph.lead} className={CASE_STUDY_BODY}>
              <span className="font-semibold">{paragraph.lead}: </span>
              {paragraph.text}
            </p>
          ))}
        </div>

        <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
          <span className={CASE_STUDY_FIELD_LABEL}>Companies I&apos;ve worked with</span>
          <LogosMarquee logos={logos} />
        </div>
      </div>
    </motion.section>
  );
}
