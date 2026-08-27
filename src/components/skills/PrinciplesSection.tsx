"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import {
  CASE_STUDY_SECTION_GAP_PX,
  SKILL_HEADER_GAP_CLASSNAME,
  SKILL_CARD_FOCUS_SCALE,
  SKILL_HEADER_NEXT_ITEM_DELAY_S,
} from "@/lib/motion";
import { useIsDesktop } from "@/lib/useIsDesktop";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_SHADOW_SM,
  CASE_STUDY_SHADOW_SM_HOVER,
} from "@/lib/case-studies/styles";

export type SkillPrincipleCard = {
  icon: string;
  title: string;
  description: string;
};

export type SkillPrinciplesSectionData = {
  eyebrow: string;
  title: string;
  cards: SkillPrincipleCard[];
};

const container = {
  hidden: {},
  // delayChildren continues SkillHeader's own stagger rhythm by one more
  // beat (SKILL_HEADER_NEXT_ITEM_DELAY_S) rather than waiting for it to
  // fully finish — see that constant's comment in lib/motion.ts for why
  // this still guarantees top-to-bottom completion order without a dead
  // pause between the header settling and this section starting. On tall
  // viewports Principles can still land in the initial viewport alongside
  // the header (even with ExperienceSection between them), so its own
  // whileInView could otherwise fire almost immediately on load — a fixed
  // guess-delay here previously let this section's own title/cards reach
  // full opacity *before* the header's dek did (measured: 737ms vs
  // 970ms). Matches ExperienceSection's own delay and stagger so both
  // skill pages' first section cascades in at the same rhythm.
  visible: { transition: { delayChildren: SKILL_HEADER_NEXT_ITEM_DELAY_S, staggerChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
};

// Same standard mobile-scroll card treatment as MobileProjectCard /
// CapabilityCard: scales up toward full size as the card crosses the
// center of the viewport, back down as it leaves, on top of the one-time
// cascade reveal above. Desktop keeps the existing whileHover lift instead
// (no scroll-linked scale) — pulled into its own component since each
// card needs its own scroll-tracking ref/hook, which .map() can't give a
// single component instance.
function PrincipleCard({ card, isDesktop }: { card: SkillPrincipleCard; isDesktop: boolean }) {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const focusScale = useTransform(scrollYProgress, [0, 0.5, 1], SKILL_CARD_FOCUS_SCALE);

  // Same desktop-hover / mobile-active icon tint as Capabilities.tsx's
  // CapabilityCard: desktop keeps CSS :hover (via the parent's `.group`,
  // scoped to md: so it never fires from a mobile tap's sticky-hover
  // quirk); mobile has no hover at all, so it drives the same purple tint
  // directly off this card's own centered-in-viewport state instead —
  // reusing the scrollYProgress already computed above for the focus
  // scale, same 0.4-0.6 "centered" band as Capabilities.
  const [isActive, setIsActive] = useState(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isDesktop) return;
    setIsActive(latest > 0.4 && latest < 0.6);
  });
  // useMotionValueEvent's "change" handler only fires on a change after
  // mount — it never reports the value already present when the page
  // first loads, which matters for a card that starts already centered.
  useEffect(() => {
    if (isDesktop) return;
    const initial = scrollYProgress.get();
    setIsActive(initial > 0.4 && initial < 0.6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={item}
      whileHover={isDesktop ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={reduceMotion ? undefined : { scale: isDesktop ? 1 : focusScale }}
      className={`group flex flex-col items-start rounded-2xl bg-white px-7 py-9 ${CASE_STUDY_SHADOW_SM} ${CASE_STUDY_SHADOW_SM_HOVER}`}
    >
      <span
        className={`text-2xl leading-10 transition-colors duration-300 md:group-hover:text-accent ${
          !isDesktop && isActive ? "text-accent" : "text-zinc-600"
        }`}
      >
        {card.icon}
      </span>
      <h3 className="w-full pt-4 text-sm leading-6 font-bold text-foreground">{card.title}</h3>
      <p className="pt-2.5 text-sm leading-5 text-zinc-600">{card.description}</p>
    </motion.div>
  );
}

// Static, non-carousel take on the homepage's CapabilityCard
// (Capabilities.tsx) — same visual language (icon glyph, shadow, type
// scale) and now the same mobile scroll-focus-scale treatment, without
// the hover-carousel machinery that card needs for the horizontal-swipe
// homepage layout.
export default function PrinciplesSection({
  data,
  underHeader = false,
}: {
  data: SkillPrinciplesSectionData;
  // True when this sits directly under SkillHeader (conversational-design's
  // first section) rather than after another body section (workshop-
  // facilitation's second section, which keeps the standard fixed gap).
  // Shares ExperienceSection's header-gap value (SKILL_HEADER_GAP_CLASSNAME)
  // so both skill pages' header-to-first-section gap stay identical.
  underHeader?: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const { eyebrow, title, cards } = data;

  return (
    <motion.section
      className={
        underHeader
          ? `relative flex flex-col items-center px-6 ${SKILL_HEADER_GAP_CLASSNAME}`
          : "relative flex flex-col items-center px-6"
      }
      style={underHeader ? undefined : { marginTop: CASE_STUDY_SECTION_GAP_PX }}
      initial={reduceMotion ? undefined : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      // amount: "some" (any visible sliver), not a fraction like 0.25 — the
      // eyebrow/title + 3 cards stack to 900px+ tall on a mobile single
      // column, so requiring a quarter of that in view meant this section
      // (all of it — title included) stayed invisible well past where most
      // visitors would scroll on landing. See EXPERIENCE_REVEAL_VIEWPORT in
      // ExperienceSection.tsx for the same fix on the same-shaped problem.
      viewport={{ once: true, amount: "some" }}
      variants={reduceMotion ? undefined : container}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <motion.div variants={item} className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
          <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
          <h2 className={CASE_STUDY_TITLE}>{title}</h2>
        </motion.div>

        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {cards.map((card) => (
            <PrincipleCard key={card.title} card={card} isDesktop={isDesktop} />
          ))}
        </div>
      </div>
    </motion.section>
  );
}
