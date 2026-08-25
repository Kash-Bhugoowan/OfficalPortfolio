"use client";

import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { fadeInUp, PHILOSOPHY_CARD_FOCUS_SCALE } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useIsDesktop";

// How far down the viewport the invisible "activation" line sits, as a
// fraction of viewport height. A card becomes active the moment its top
// edge crosses above this line, and stays active until the next card's
// top edge crosses it too — so exactly one card is ever active,
// regardless of how tall any individual card is.
const TRIGGER_LINE_RATIO = 0.4;

type Diagram = "venn" | "trinity" | "grid";

type Principle = {
  index: string;
  title: string;
  body: string[];
  photo: string;
  photoAlt: string;
  diagram: Diagram;
  fill: string;
  accent: string;
  label: string;
  labelColor: string;
};

const principles: Principle[] = [
  {
    index: "01",
    title: "The Venn Diagrams of Needs",
    body: [
      "Great design rarely serves just one audience. With a background spanning consulting and pre-sales at IBM, I’ve learned to balance the client’s goals and the needs of the users using the product.",
      "Each perspective is valid, but no single one should determine the solution alone. My role is to find the productive overlap: an experience that improves outcomes for users, supports the client’s measures of success, and can credibly be delivered within IBM’s capabilities. That intersection is where a compelling idea becomes a sustainable product.",
    ],
    photo: "/images/design-philosophy/venn-diagram.jpg",
    photoAlt: "Team voting on features at a wall of sticky notes",
    diagram: "venn",
    fill: "#dfefd7",
    accent: "#4a7a35",
    label: "Client · User · Feasible",
    labelColor: "#3f6a2c",
  },
  {
    index: "02",
    title: "My Holy Trinity",
    body: [
      "I don’t design in isolation. I involve my product manager and technical lead / solution architect early in the decision making process, bringing together user advocacy, product direction, and technical expertise.",
      "I remain accountable for my design judgement, while recognising that the strongest decisions draw on perspectives beyond my own. When we disagree, we work through the trade offs early, so we can stay aligned and make decisions the whole team can stand behind.",
    ],
    photo: "/images/design-philosophy/holy-trinity.png",
    photoAlt: "Karishma at a whiteboard with her product and engineering leads, remote colleagues on screen",
    diagram: "trinity",
    fill: "#e7e0eb",
    accent: "#8f6aa8",
    label: "",
    labelColor: "#5b3f6d",
  },
  {
    index: "03",
    title: "Complexity Has a Job",
    body: [
      "Through my work designing for military and government organisations, I’ve learned that complex systems do not need to be simplified. They need to be designed for clarity. The rules, regulation and compliance within them serve a purpose, and often reflect the established mental models of the specialist users who rely on them.",
      "My role is to develop a deep understanding of the environment, then pinpoint where the existing experience breaks down across a user’s task flow. I shape the information architecture and interaction patterns around those moments of friction, creating experiences that build confidence and trust without removing meaningful complexity.",
    ],
    photo: "/images/design-philosophy/complexity.png",
    photoAlt: "Karishma facilitating a workshop around a table covered in sticky notes",
    diagram: "grid",
    fill: "#fae5d1",
    accent: "#b4652a",
    label: "Not simplified — clarified",
    labelColor: "#8a4d1c",
  },
];

// Fixed pseudo-random scatter for the grid diagram's 27 bars — each entry
// is [x, y, rotation] in the bars' resting (unassembled) state.
const GRID_SCATTER: [number, number, number][] = [
  [6, -9, -8], [-4, 7, 5], [9, 4, -11], [-7, -6, 7], [5, 9, 10], [-9, 3, -6], [3, -8, 8], [8, 6, -4], [-5, -4, 9],
  [7, 8, -9], [-8, -7, 4], [4, 5, 11], [-6, 9, -7], [9, -5, 6], [-3, 6, -10], [6, -7, 5], [-9, 4, 8], [5, 7, -6],
  [8, -6, 9], [-4, 8, -5], [3, 5, 7], [-7, -9, -8], [9, 6, 4], [-5, 7, -9], [6, -4, 10], [-8, 5, -7], [4, 9, 6],
];

const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2 },
  },
};

const item = fadeInUp;

// The circle group is scaled down 0.85x from its "natural" 140px-diameter
// geometry and re-centered as a unit, so it fits inside the 241px-tall box
// with even breathing room on every side at rest — the unscaled group's
// rest-state bounding box (bottom circle at cy:52) ran from y:-104 to
// y:122, 1.5px past the box's own half-height (120.5), clipping the
// bottom circle. Scaling (which preserves overlap proportions, since it's
// a uniform similarity transform) and then shifting the whole group by
// the same amount keeps every circle inside the box in both the resting
// and assembled states — assembled's bounding box is strictly smaller and
// sits inside rest's, so it only ever has more padding, never less.
const VENN_SCALE = 0.85;
const VENN_SHIFT_Y = -7.65; // re-centers the (scaled) rest-state bbox to y:0
const VENN_DIAMETER = 140 * VENN_SCALE; // 119px
const VENN_TOP_Y = -34 * VENN_SCALE + VENN_SHIFT_Y; // -36.55, shared by both top circles
const VENN_AX_REST = -66 * VENN_SCALE;
const VENN_BX_REST = 66 * VENN_SCALE;
const VENN_CY_REST = 52 * VENN_SCALE + VENN_SHIFT_Y;
const VENN_AX_ASSEMBLED = -34 * VENN_SCALE;
const VENN_BX_ASSEMBLED = 34 * VENN_SCALE;
const VENN_CY_ASSEMBLED = 26 * VENN_SCALE + VENN_SHIFT_Y;
function VennDiagram({
  assembled,
  accent,
  label,
  labelColor,
}: {
  assembled: boolean;
  accent: string;
  label: string;
  labelColor: string;
}) {
  const ax = assembled ? VENN_AX_ASSEMBLED : VENN_AX_REST;
  const bx = assembled ? VENN_BX_ASSEMBLED : VENN_BX_REST;
  const cy = assembled ? VENN_CY_ASSEMBLED : VENN_CY_REST;
  const circleStyle = {
    width: VENN_DIAMETER,
    height: VENN_DIAMETER,
    borderColor: accent,
    backgroundColor: `${accent}29`,
  };
  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={circleStyle}
        animate={{ x: ax, y: VENN_TOP_Y }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={circleStyle}
        animate={{ x: bx, y: VENN_TOP_Y }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={circleStyle}
        animate={{ x: 0, y: cy }}
        transition={{ type: "spring", stiffness: 90, damping: 16 }}
      />
      <div
        className="absolute right-0 bottom-[18px] left-0 text-center font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold tracking-wider uppercase"
        style={{ color: labelColor }}
      >
        {label}
      </div>
    </>
  );
}

// Single center axis + shared geometry — every coordinate below is
// derived from TRINITY_CENTER_X/TRINITY_LINE_Y rather than hardcoded, so
// the horizontal line, both diagonals, and all three dots can't drift
// apart from each other even if the size changes later.
const TRINITY_CENTER_X = 0; // the diagram's vertical center axis
const TRINITY_LINE_Y = -46; // y of the Design–Product line (and the apex)
const TRINITY_HALF_LINE = 84; // half the horizontal line's length
const TRINITY_DESIGN_X = TRINITY_CENTER_X - TRINITY_HALF_LINE;
const TRINITY_PRODUCT_X = TRINITY_CENTER_X + TRINITY_HALF_LINE;

// The two diagonals are defined by their endpoints (apex → lower corner)
// rather than an eyeballed anchor+rotation, so the apex is exactly on the
// horizontal line and the legs are exact mirror images by construction.
const TRINITY_LEG_LENGTH = TRINITY_HALF_LINE * 2; // 168, same as the full horizontal line
const TRINITY_LEG_ANGLE_DEG = 60; // from horizontal
const TRINITY_LEG_ANGLE_RAD = (TRINITY_LEG_ANGLE_DEG * Math.PI) / 180;
const TRINITY_LEG_DX = TRINITY_LEG_LENGTH * Math.cos(TRINITY_LEG_ANGLE_RAD);
const TRINITY_LEG_DY = TRINITY_LEG_LENGTH * Math.sin(TRINITY_LEG_ANGLE_RAD);
// Each leg's div is anchored at its own midpoint (apex averaged with its
// lower corner), matching TRINITY_LEG_DX exactly since the apex sits on
// the center axis: midpoint x = (0 + ∓TRINITY_LEG_DX) / 2.
const TRINITY_LEG_ANCHOR_X_OFFSET = TRINITY_LEG_DX / 2;
const TRINITY_LEG_ANCHOR_Y = TRINITY_LINE_Y + TRINITY_LEG_DY / 2;

const TRINITY_ENGINEERING_Y = 70;
const TRINITY_DOT_DIAMETER = 12; // matches size-3

// Each line pivots around its own anchor point, not the box center — the
// outer div does the (static) translate-to-anchor + rotate, and only the
// inner div's scaleX/opacity animate. Nesting it this way means the
// rotate is structurally "outside" the scale (DOM composes as
// outer(inner(point))), matching the source's `rotate() scaleX()` order
// exactly — animating rotate and scaleX together on a single element
// instead left their relative composition order up to Framer Motion's
// own default (translate, scale, rotate), which put scale on the wrong
// side of a non-zero rotate and made the line's length shrink toward the
// wrong axis, sending it past the box edge.
const TRINITY_LINES: { anchor: [number, number]; rotate: number; length: number }[] = [
  { anchor: [TRINITY_CENTER_X, TRINITY_LINE_Y], rotate: 0, length: TRINITY_HALF_LINE * 2 }, // Design–Product
  {
    anchor: [-TRINITY_LEG_ANCHOR_X_OFFSET, TRINITY_LEG_ANCHOR_Y],
    rotate: -TRINITY_LEG_ANGLE_DEG,
    length: TRINITY_LEG_LENGTH,
  }, // apex to lower-left
  {
    anchor: [TRINITY_LEG_ANCHOR_X_OFFSET, TRINITY_LEG_ANCHOR_Y],
    rotate: TRINITY_LEG_ANGLE_DEG,
    length: TRINITY_LEG_LENGTH,
  }, // apex to lower-right
];

// [x, y, label, labelOffsetY] — Design/Product labels sit above their
// dots, Engineering sits below (matches the source's asymmetric offsets).
const TRINITY_DOTS: [number, number, string, number][] = [
  [TRINITY_DESIGN_X, TRINITY_LINE_Y, "Design", -28],
  [TRINITY_PRODUCT_X, TRINITY_LINE_Y, "Product", -28],
  [TRINITY_CENTER_X, TRINITY_ENGINEERING_Y, "Engineering", 26],
];

function TrinityDiagram({ assembled, accent }: { assembled: boolean; accent: string }) {
  const scale = assembled ? 1 : 0.15;
  const opacity = assembled ? 0.9 : 0.35;
  return (
    <>
      {TRINITY_LINES.map(({ anchor: [ax, ay], rotate, length }) => (
        <div
          key={rotate}
          className="absolute top-1/2 left-1/2 h-px"
          style={{
            width: length,
            transform: `translate(-50%, -50%) translate(${ax}px, ${ay}px) rotate(${rotate}deg)`,
          }}
        >
          <motion.div
            className="size-full origin-center"
            style={{ backgroundColor: accent }}
            animate={{ scaleX: scale, opacity }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
          />
        </div>
      ))}
      {TRINITY_DOTS.map(([x, y, label, labelDy]) => (
        <div key={label}>
          {/*
            No Tailwind translate-x/y utility classes here — in Tailwind
            v4 those compile to the standalone CSS `translate` property,
            which composes with (doesn't get overridden by) this inline
            `transform`, double-applying the -50%/-50% centering and
            shifting the dot up-left by half its own size. The inline
            transform alone is sufficient.
          */}
          <div
            className="absolute top-1/2 left-1/2 rounded-full bg-accent"
            style={{
              width: TRINITY_DOT_DIAMETER,
              height: TRINITY_DOT_DIAMETER,
              transform: `translate(-50%, -50%) translate(${x}px, ${y}px)`,
            }}
          />
          <div
            className="absolute top-1/2 left-1/2 font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold tracking-wider whitespace-nowrap uppercase"
            style={{
              color: "#5b3f6d",
              transform: `translate(-50%, -50%) translate(${x}px, ${y + labelDy}px)`,
            }}
          >
            {label}
          </div>
        </div>
      ))}
    </>
  );
}

function GridDiagram({ assembled, accent }: { assembled: boolean; accent: string }) {
  return (
    <div className="absolute top-[44px] right-10 left-10 grid grid-cols-9 gap-2.5">
      {GRID_SCATTER.map(([x, y, r], i) => (
        <motion.div
          key={i}
          className="h-3 rounded-[3px]"
          style={{ backgroundColor: accent }}
          animate={
            assembled
              ? { x: 0, y: 0, rotate: 0, opacity: 0.35 + (i % 9) * 0.06 }
              : { x, y, rotate: r, opacity: 0.45 }
          }
          transition={{ type: "spring", stiffness: 90, damping: 16 }}
        />
      ))}
    </div>
  );
}

function PrincipleCard({
  principle,
  index,
  isDesktop,
  active,
  hoveredIndex,
  onHoverStart,
  registerRef,
}: {
  principle: Principle;
  index: number;
  isDesktop: boolean;
  // Whether this card is the one active card under the trigger-line
  // model — computed and lifted at the parent, since "exactly one card
  // active at a time" is inherently a cross-card comparison, not
  // something a single card can determine on its own.
  active: boolean;
  // Which sibling (if any) is currently hovered — lifted to the parent
  // for the same reason `active` is: dimming the *other* cards when one
  // is hovered needs to compare across siblings, not just know about
  // itself.
  hoveredIndex: number | null;
  onHoverStart: () => void;
  registerRef: (el: HTMLElement | null) => void;
}) {
  const [showPhoto, setShowPhoto] = useState(false);
  const isHovered = hoveredIndex === index;

  const assembled = isHovered || showPhoto || active;

  // Discrete two-state scale, toggled by the lifted `active` boolean
  // rather than continuously mapped from scroll position — a continuous
  // scroll-linked value can't express "stays scaled up for the card's
  // entire length" for cards taller than the viewport. `useSpring(number,
  // config)` only reads its number argument once, as the initial value —
  // passing a changing plain number on later renders is silently ignored,
  // not re-animated — so the target is tracked via its own motion value,
  // which `.set()` on every change, and the spring (created once, following
  // that source) animates toward it automatically. Uses the same spring
  // signature as this file's diagram-assembly animations for a consistent
  // feel.
  const targetScale = isDesktop || active ? 1 : PHILOSOPHY_CARD_FOCUS_SCALE[0];
  const targetScaleValue = useMotionValue(targetScale);
  const scale = useSpring(targetScaleValue, { stiffness: 90, damping: 16 });
  useEffect(() => {
    targetScaleValue.set(targetScale);
  }, [targetScale, targetScaleValue]);

  // Desktop-only cursor-tracking spotlight, within the hovered card itself
  // — separate from the sibling-dim above, which handles the *other*
  // cards. Position is tracked in motion values rather than React state
  // so the gradient repaints every mouse move without re-rendering the
  // component. Tinted with the card's own accent color (same
  // `${accent}NN` hex-alpha suffix technique already used for the Venn
  // circles) so each card's spotlight matches its diagram's theme.
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightBackground = useMotionTemplate`radial-gradient(500px circle at ${mouseX}px ${mouseY}px, ${principle.accent}26, transparent 70%)`;
  const handleMouseMove = (e: ReactMouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.article
      ref={registerRef}
      variants={item}
      onHoverStart={isDesktop ? onHoverStart : undefined}
      onMouseMove={isDesktop ? handleMouseMove : undefined}
      style={{ scale }}
      className="philosophy-card relative box-border flex w-full min-w-0 flex-col overflow-hidden rounded-[22px] border border-border bg-white px-8 pt-9 pb-10 shadow-[0px_1px_3px_0px_rgba(36,31,43,0.03)] hover:shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)] lg:flex-1 lg:basis-0"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10"
        style={{ background: spotlightBackground }}
        animate={{ opacity: isDesktop && isHovered ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      />
      <div className="flex w-full flex-col items-start">
        <div
          className="relative h-[241px] w-full overflow-hidden rounded-lg"
          style={{ backgroundColor: principle.fill }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ opacity: showPhoto ? 0 : 1 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
          >
            {principle.diagram === "venn" && (
              <VennDiagram
                assembled={assembled}
                accent={principle.accent}
                label={principle.label}
                labelColor={principle.labelColor}
              />
            )}
            {principle.diagram === "trinity" && <TrinityDiagram assembled={assembled} accent={principle.accent} />}
            {principle.diagram === "grid" && <GridDiagram assembled={assembled} accent={principle.accent} />}
            {principle.diagram === "grid" && principle.label && (
              <div
                className="absolute right-0 bottom-[18px] left-0 text-center font-[family-name:var(--font-dm-sans)] text-[11px] font-semibold tracking-wider uppercase"
                style={{ color: principle.labelColor }}
              >
                {principle.label}
              </div>
            )}
          </motion.div>
          <motion.img
            src={principle.photo}
            alt={principle.photoAlt}
            className="absolute inset-0 size-full object-cover"
            animate={{ opacity: showPhoto ? 1 : 0 }}
            transition={{ duration: 0.38, ease: "easeInOut" }}
          />
        </div>

        <button
          type="button"
          onClick={() => setShowPhoto((s) => !s)}
          className="mt-4 inline-flex w-fit rounded-full border border-border bg-[#faf8f5] px-[18px] py-[9px] text-sm font-medium whitespace-nowrap text-nav-muted transition-colors duration-200 hover:bg-[#eeeafd] hover:text-nav-hover"
        >
          {showPhoto ? "Show the diagram" : "See it in the room"}
        </button>

        <div className="mt-[22px] font-[family-name:var(--font-dm-sans)] text-[11.52px] font-semibold tracking-wider text-[#887c98]">
          {principle.index}
        </div>
        <h3 className="mt-2.5 mb-5 text-[30px] leading-10 tracking-[-0.4px] text-foreground">{principle.title}</h3>
        {principle.body.map((paragraph, i) => (
          <p
            key={i}
            className={`text-[16.5px] leading-7 font-light text-text-secondary ${i === 0 ? "mb-4" : ""}`}
          >
            {paragraph}
          </p>
        ))}
      </div>
    </motion.article>
  );
}

export default function DesignPhilosophy() {
  const isDesktop = useIsDesktop();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const { scrollY } = useScroll();

  // The active card is the last one (highest index) whose top edge has
  // crossed above the trigger line — recomputed from real layout on every
  // call, so it's a pure function of current scroll position rather than
  // incrementally-updated state. That's what makes "exactly one card
  // active, instant handoff, no stuck mid-state during rapid scrolling"
  // fall out for free: there's nothing to get out of sync, each call just
  // derives the correct answer fresh.
  const updateActiveIndex = useCallback(() => {
    if (isDesktop || reduceMotion) {
      setActiveIndex(null);
      return;
    }
    const triggerY = window.innerHeight * TRIGGER_LINE_RATIO;
    let next: number | null = null;
    cardRefs.current.forEach((el, i) => {
      if (el && el.getBoundingClientRect().top <= triggerY) next = i;
    });
    setActiveIndex(next);
  }, [isDesktop, reduceMotion]);

  useMotionValueEvent(scrollY, "change", updateActiveIndex);

  // useMotionValueEvent's "change" only fires on a change after mount, and
  // the trigger line itself depends on viewport height, which can change
  // on resize/orientation change — both need an explicit recompute.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    updateActiveIndex();
    window.addEventListener("resize", updateActiveIndex);
    return () => window.removeEventListener("resize", updateActiveIndex);
  }, [updateActiveIndex]);

  return (
    <section className="flex flex-col items-center gap-8 px-6 py-[37px] md:py-[54px]">
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
          How I Work
        </motion.span>
        <motion.h2 variants={item} className="-mt-1 text-4xl leading-[60px] text-accent">
          My design principles
        </motion.h2>
      </motion.div>

      <motion.div
        className="philosophy-cards-row mx-auto flex w-full max-w-[1528px] flex-col items-stretch gap-4 lg:flex-row lg:gap-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
        onHoverEnd={isDesktop ? () => setHoveredIndex(null) : undefined}
      >
        {principles.map((principle, i) => (
          <PrincipleCard
            key={principle.index}
            principle={principle}
            index={i}
            isDesktop={isDesktop}
            active={activeIndex === i}
            hoveredIndex={hoveredIndex}
            onHoverStart={() => setHoveredIndex(i)}
            registerRef={(el) => {
              cardRefs.current[i] = el;
            }}
          />
        ))}
      </motion.div>
    </section>
  );
}
