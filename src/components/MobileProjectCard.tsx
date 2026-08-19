"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import { MOBILE_CARD_ENTRANCE_Y_PX, MOBILE_CARD_FOCUS_SCALE } from "@/lib/motion";

// Mobile-only wrapper: cards scroll in normal document flow here (no
// sticky pinning, unlike desktop's StickyCardStack), so this only needs
// to add a scroll-linked feel on top of that natural scroll — a one-time
// reveal as the card first enters view, plus a subtle continuous "focus"
// scale that peaks at full size while the card is centered in the
// viewport and eases down slightly as it scrolls toward the edges.
export default function MobileProjectCard({ project }: { project: Project }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const focusScale = useTransform(scrollYProgress, [0, 0.5, 1], MOBILE_CARD_FOCUS_SCALE);

  return (
    <motion.div
      ref={cardRef}
      data-mobile-card={project.id}
      style={reduceMotion ? undefined : { scale: focusScale }}
      initial={reduceMotion ? undefined : { opacity: 0, y: MOBILE_CARD_ENTRANCE_Y_PX }}
      whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <ProjectCard project={project} compact />
    </motion.div>
  );
}
