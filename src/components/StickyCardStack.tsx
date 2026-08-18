"use client";

import { Fragment, type ReactNode, useRef, type RefObject } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import {
  STACK_CARD_OFFSET_PX,
  STACK_BASE_OFFSET_PX,
  STACK_HEADER_TOP_PX,
  STACK_CARD_VIEW_SPACER_PX,
  stackDimTransform,
  fadeInUp,
} from "@/lib/motion";

function StickyCard({
  project,
  index,
  cardRef,
  nextCardRef,
}: {
  project: Project;
  index: number;
  cardRef: RefObject<HTMLDivElement | null>;
  nextCardRef: RefObject<HTMLDivElement | null> | null;
}) {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: nextCardRef ?? undefined,
    offset: ["start end", "start start"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], stackDimTransform.scale);
  const ownFinalTop = STACK_BASE_OFFSET_PX + index * STACK_CARD_OFFSET_PX;

  return (
    <div
      ref={cardRef}
      className="static md:sticky"
      data-sticky-card={index}
      style={{ top: ownFinalTop, zIndex: index + 1 }}
    >
      <motion.div
        style={
          nextCardRef && !reduceMotion
            ? { scale, transformOrigin: "top" }
            : undefined
        }
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeInUp}
      >
        <ProjectCard project={project} />
      </motion.div>
    </div>
  );
}

// Built for exactly 3 case-study cards (hardcoded content, not CMS-driven),
// so the per-card refs are declared explicitly rather than via a loop of
// useRef calls, which would violate the Rules of Hooks.
//
// All cards are DIRECT children of one shared relative container (not each
// wrapped in its own box) — a sticky element's "hold" room comes from its
// immediate parent's total height, so sharing one tall parent lets every
// card stay pinned for as long as that container has room. The container
// below is deliberately height-BOUNDED (not infinite): once its room runs
// out, all three cards release together and continue scrolling up as a
// unit (maintaining their relative sliver offsets, since they were all
// moving 1:1 with scroll immediately beforehand) — rather than freezing in
// place forever, which left an inelegant gap once the header (which
// releases earlier, see below) had scrolled away but the cards hadn't.
export default function StickyCardStack({
  projects,
  header,
}: {
  projects: Project[];
  header?: ReactNode;
}) {
  const card0 = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const cardRefs = [card0, card1, card2];

  return (
    <div className="relative">
      {header && (
        // A separate, height-bounded containing block for the header —
        // NOT the shared one below that holds the cards. Same mechanism,
        // different (shorter) duration: this wrapper's height determines
        // how long the header stays pinned before releasing and scrolling
        // away with the rest of the page. Sized (empirically, via
        // scroll-position scans) so it holds through cards 1 and 2
        // revealing AND through card 3 landing with some dwell time, then
        // releases in sync with the cards' own bounded wrapper below — so
        // the whole stack scrolls away together as one unit.
        //
        // The negative bottom margin cancels the wrapper's own extra flow
        // height (this height minus the header's actual rendered height)
        // so it doesn't push card 0 further down the page — only the
        // sticky-release timing budget grows, not the layout gap before
        // the cards.
        <div className="relative md:h-[2357px] md:mb-[-2233px]">
          <div
            className="static md:sticky md:z-50"
            data-sticky-header
            style={{ top: STACK_HEADER_TOP_PX }}
          >
            {header}
          </div>
        </div>
      )}
      {header && <div className="h-8" aria-hidden />}
      {/*
        A second height-bounded containing block, this time for the cards
        (and their spacers), separate from the header's above. Cards must
        remain DIRECT children of THIS wrapper (a Fragment, not a per-card
        div) so they share one containing block and release together,
        maintaining their relative sliver offsets, rather than each getting
        its own short-lived box and desynchronizing from each other.
        Sized (empirically) to hold through card 3 landing plus some dwell
        time, then release in sync with the header above.

        Unlike the header, this one uses NO negative margin: a card's
        sticky-release timing depends only on its own containing block's
        height, completely independent of whatever real content follows
        that block — so a canceled (net-zero) extra height here would
        change WHEN release could happen but never WHETHER it happens at
        all. Release genuinely requires real, uncanceled scroll room after
        this wrapper closes (the spacer right below) big enough to fit
        the last card's own height — otherwise, at this viewport, there is
        always leftover room at the true end of the page and the browser
        never has a reason to un-stick it.
      */}
      <div className="relative md:h-[2883px]">
        {projects.map((project, i) => (
          <Fragment key={project.id}>
            {i > 0 && (
              <div
                className="hidden md:block"
                style={{ height: STACK_CARD_VIEW_SPACER_PX }}
                aria-hidden
              />
            )}
            <StickyCard
              project={project}
              index={i}
              cardRef={cardRefs[i]}
              nextCardRef={i < projects.length - 1 ? cardRefs[i + 1] : null}
            />
          </Fragment>
        ))}
      </div>
      {/*
        Real (uncanceled) trailing room, required for the cards' release
        above to be reachable at all — see the comment there. Kept modest;
        it's only ever seen briefly while the stack is already scrolling
        away, not as a static gap.
      */}
      <div className="hidden md:block md:h-[450px]" aria-hidden />
    </div>
  );
}
