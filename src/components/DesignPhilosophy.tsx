"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useIsDesktop";

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
    photo: "/images/design-philosophy/DesignPhilo-photo.png",
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
    photo: "/images/design-philosophy/DesignPhilo-1-photo.png",
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
    photo: "/images/design-philosophy/DesignPhilo-2-photo.png",
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
const TRINITY_LINES: { anchor: [number, number]; rotate: number }[] = [
  { anchor: [0, -46], rotate: 0 }, // Design–Product
  { anchor: [-42, 24], rotate: -60 }, // apex to lower-left
  { anchor: [42, 24], rotate: 60 }, // apex to lower-right
];

// [x, y, label, labelOffsetY] — Design/Product labels sit above their
// dots, Engineering sits below (matches the source's asymmetric offsets).
const TRINITY_DOTS: [number, number, string, number][] = [
  [-84, -46, "Design", -28],
  [84, -46, "Product", -28],
  [0, 70, "Engineering", 26],
];

function TrinityDiagram({ assembled, accent }: { assembled: boolean; accent: string }) {
  const scale = assembled ? 1 : 0.15;
  const opacity = assembled ? 0.9 : 0.35;
  return (
    <>
      {TRINITY_LINES.map(({ anchor: [ax, ay], rotate }) => (
        <div
          key={rotate}
          className="absolute top-1/2 left-1/2 h-px w-[168px]"
          style={{
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
          <div
            className="absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent"
            style={{ transform: `translate(-50%, -50%) translate(${x}px, ${y}px)` }}
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

function PrincipleCard({ principle, isDesktop }: { principle: Principle; isDesktop: boolean }) {
  const [hovered, setHovered] = useState(false);
  const [showPhoto, setShowPhoto] = useState(false);
  // Tracks the diagram box itself, not the whole card — cards run taller
  // than the mobile viewport (title + two paragraphs below the diagram),
  // so centering the *card* can leave the diagram already scrolled out of
  // view by the time the card's own midpoint reaches the viewport's.
  const diagramRef = useRef<HTMLDivElement>(null);
  const [centered, setCentered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: diagramRef,
    offset: ["start end", "end start"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (isDesktop) return; // desktop uses hover instead
    setCentered(latest > 0.4 && latest < 0.6);
  });

  // useMotionValueEvent's "change" handler only fires on a change after
  // mount — it never reports the value already present at first paint, so
  // a card that's already centered before any scroll happens would
  // otherwise stay unassembled until the user's first scroll.
  useEffect(() => {
    if (isDesktop) return;
    const initial = scrollYProgress.get();
    // A one-time read of the scroll motion value's already-current position
    // at mount, not a derived-state anti-pattern — there's no render-time
    // source for it (the motion value only reflects real layout after the
    // ref attaches), so it can't be computed during render instead.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCentered(initial > 0.4 && initial < 0.6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const assembled = hovered || showPhoto || centered;

  return (
    <motion.article
      variants={item}
      onHoverStart={isDesktop ? () => setHovered(true) : undefined}
      onHoverEnd={isDesktop ? () => setHovered(false) : undefined}
      className="box-border flex w-full min-w-0 flex-col rounded-[22px] border border-border bg-white px-8 pt-9 pb-10 lg:flex-1 lg:basis-0"
    >
      <div
        ref={diagramRef}
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
    </motion.article>
  );
}

export default function DesignPhilosophy() {
  const isDesktop = useIsDesktop();

  return (
    <section className="flex flex-col items-center gap-14 px-6 py-[37px]">
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
        className="mx-auto flex w-full max-w-[1528px] flex-col items-stretch gap-8 lg:flex-row"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={container}
      >
        {principles.map((principle) => (
          <PrincipleCard key={principle.index} principle={principle} isDesktop={isDesktop} />
        ))}
      </motion.div>
    </section>
  );
}
