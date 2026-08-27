"use client";

import { useRef, useState, useEffect, type RefObject } from "react";
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { fadeInUp, linkHoverTransition, CAPABILITY_CARD_FOCUS_SCALE } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useIsDesktop";

// See Nav.tsx for why: swaps the skill link's plumbing from a hard browser
// navigation to a client-side one, markup/hover untouched.
const MotionLink = motion.create(Link);

type Capability = {
  icon: string;
  title: string;
  description: string;
  link?: string;
};

const capabilities: Capability[] = [
  {
    icon: "◑",
    title: "AI & Conversational Design",
    description:
      "Designing for generative AI products with ethical frameworks, conversation design, explainability patterns, and human-in-the-loop UX.",
    link: "/skills/conversational-design",
  },
  {
    icon: "◎",
    title: "Workshop Facilitation",
    description:
      "Designing and leading complex workshops for discovery, co-creation, ideation, and decision-making across multi-disciplinary teams.",
    link: "/skills/workshop-facilitation",
  },
  {
    icon: "◐",
    title: "Rapid Prototyping",
    description:
      "Vibe coding prototypes fast, from paper sketches to interactive flows to validate assumptions and communicate vision.",
  },
  {
    icon: "◈",
    title: "Strategic Design",
    description:
      "Connecting design decisions to business and mission outcomes. Framing problems, defining scope, and building alignment across stakeholders.",
  },
  {
    icon: "◉",
    title: "UX & Product Design",
    description:
      "End-to-end experience design from research synthesis to high-fidelity UI, interaction patterns, and design systems.",
  },
];

// Simultaneous fade for the whole carousel (no per-card stagger) — with a
// stagger, cards reveal one after another, and a thin border/shadow reads
// as fully visible at a much lower opacity than filled text does, so
// outlines visibly "arrive" ahead of each card's content as it cascades.
const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2 },
  },
};

const item = fadeInUp;

function CardContent({
  capability,
  isDesktop,
  isActive,
}: {
  capability: Capability;
  isDesktop: boolean;
  isActive: boolean;
}) {
  return (
    <>
      <motion.span
        // Desktop keeps CSS `:hover` (via the parent's `.group`, scoped to
        // `md:` so it never fires from a mobile tap's sticky-hover quirk).
        // Mobile has no hover at all, so it drives the same purple tint
        // directly off the already-computed "centered card" active state
        // instead.
        className={`text-2xl leading-10 transition-colors duration-300 md:group-hover:text-accent ${
          !isDesktop && isActive ? "text-accent" : "text-zinc-600"
        }`}
        whileHover={{ scale: 1.2, rotate: 8 }}
        transition={{ type: "spring", stiffness: 400, damping: 15 }}
      >
        {capability.icon}
      </motion.span>
      <h3 className="w-full pt-4 text-sm leading-6 font-bold whitespace-nowrap text-foreground">
        {capability.title}
      </h3>
      <div className="flex flex-col items-start gap-8">
        <p className="w-56 pt-2.5 text-sm leading-5 text-zinc-600">
          {capability.description}
        </p>
        {capability.link && (
          <MotionLink
            href={capability.link}
            className="text-sm font-medium text-[#6757e8] underline md:text-zinc-600"
            whileHover={isDesktop ? { color: "#6757e8", scale: 1.15 } : undefined}
            whileTap={isDesktop ? { scale: 1.08 } : undefined}
            transition={linkHoverTransition}
          >
            View my skill →
          </MotionLink>
        )}
      </div>
    </>
  );
}

// Same carousel at every breakpoint: scales up as a card crosses the
// horizontal center of the scroll-snap carousel (tracking its own
// progress through the shared container on the x axis) for touch/swipe,
// plus a restrained, Apple-style desktop hover — a soft tint, a small
// lift, and a deeper shadow, no resizing. Sibling cards dim slightly so
// the active one still reads as focused, without the card itself
// growing (an earlier version animated width/height directly, which
// forces every following card to reflow/shift sideways as it grows — a
// layout-thrashing anti-pattern; dropped in favor of this simpler,
// stable-size treatment).
//
// There's no hover on touch devices, so mobile/tablet get an equivalent
// "active" state instead — whichever card is currently nearest the
// carousel's horizontal center (tracked via the same scrollXProgress
// already used for the focus-scale) reports itself active, driving the
// same dim-the-others treatment hover gives on desktop.
function CapabilityCard({
  capability,
  index,
  carouselRef,
  activeIndex,
  isDesktop,
  onHoverStart,
  onCenteredChange,
}: {
  capability: Capability;
  index: number;
  carouselRef: RefObject<HTMLDivElement | null>;
  activeIndex: number | null;
  isDesktop: boolean;
  onHoverStart: () => void;
  onCenteredChange: (index: number, isCentered: boolean) => void;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollXProgress } = useScroll({
    container: carouselRef,
    target: cardRef,
    axis: "x",
    offset: ["start end", "end start"],
  });
  const scrollScale = useTransform(scrollXProgress, [0, 0.5, 1], CAPABILITY_CARD_FOCUS_SCALE);

  useMotionValueEvent(scrollXProgress, "change", (latest) => {
    if (isDesktop) return; // desktop uses hover instead, see onHoverStart
    onCenteredChange(index, latest > 0.4 && latest < 0.6);
  });

  // useMotionValueEvent's "change" handler above only fires on a change
  // after mount — it never reports the value already present when the
  // page first loads. The carousel typically starts with card 0 already
  // sitting centered (no scroll has happened yet), so without this,
  // nothing would read as active until the user's first scroll.
  useEffect(() => {
    if (isDesktop) return;
    const initial = scrollXProgress.get();
    onCenteredChange(index, initial > 0.4 && initial < 0.6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      ref={cardRef}
      variants={item}
      onHoverStart={isDesktop ? onHoverStart : undefined}
      whileHover={isDesktop ? { y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={{ scale: isDesktop ? 1 : scrollScale }}
      className="group flex size-80 shrink-0 snap-center flex-col items-start rounded-2xl bg-white px-7 py-9 shadow-[0px_2px_8px_0px_rgba(36,31,43,0.06)] hover:shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)]"
    >
      {/*
        Plain (non-motion) wrapper for the active-dim opacity: the parent
        motion.div's opacity is already owned by the `variants` entrance
        animation — a second framer-controlled opacity on the same
        element fights that ownership and gets silently overridden. A
        completely separate DOM node with a vanilla CSS transition avoids
        the conflict entirely.
      */}
      <div
        className="flex w-full flex-col items-start transition-opacity duration-300"
        style={{ opacity: activeIndex === null || activeIndex === index ? 1 : 0.6 }}
      >
        <CardContent capability={capability} isDesktop={isDesktop} isActive={activeIndex === index} />
      </div>
    </motion.div>
  );
}

export default function Capabilities() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [centeredIndex, setCenteredIndex] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isDesktop = useIsDesktop();
  const activeIndex = isDesktop ? hoveredIndex : centeredIndex;

  const handleCenteredChange = (index: number, isCentered: boolean) => {
    setCenteredIndex((prev) => {
      if (isCentered) return index;
      return prev === index ? null : prev;
    });
  };

  return (
    <section id="process" className="flex flex-col items-center gap-8 px-6 py-[37px] md:py-[54px]">
      <motion.div
        className="flex w-96 flex-col items-center gap-2 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={container}
      >
        <motion.span
          variants={item}
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]"
        >
          My Skills & Capabilities
        </motion.span>
        <motion.h2 variants={item} className="-mt-1 text-4xl leading-[60px] text-accent">
          Where I can help
        </motion.h2>
      </motion.div>

      {/*
        Swipeable/scrollable carousel via native scroll-snap, same at every
        breakpoint. Deliberately breaks out of the section's own `px-6`
        padding to bleed to the true viewport edges (`w-screen` + margins
        that cancel out however much this element is currently offset from
        the viewport's left edge) — the cards need to visibly run off-screen
        so the cut-off edge itself reads as "there's more, keep scrolling",
        which a fully-contained, padded carousel can't do. Keeps its own
        `px-6` as internal scroll-start/end cushioning, now measured from
        the true edge instead of the section's boxed-in content area.
      */}
      <motion.div
        ref={carouselRef}
        className="flex w-screen snap-x snap-mandatory gap-0.5 overflow-x-auto px-6 md:-mt-8 md:[justify-content:safe_center] md:gap-4 md:py-8"
        style={{ marginLeft: "calc(50% - 50vw)", marginRight: "calc(50% - 50vw)" }}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
        onHoverEnd={isDesktop ? () => setHoveredIndex(null) : undefined}
      >
        {capabilities.map((capability, i) => (
          <CapabilityCard
            key={capability.title}
            capability={capability}
            index={i}
            carouselRef={carouselRef}
            activeIndex={activeIndex}
            isDesktop={isDesktop}
            onHoverStart={() => setHoveredIndex(i)}
            onCenteredChange={handleCenteredChange}
          />
        ))}
      </motion.div>
    </section>
  );
}
