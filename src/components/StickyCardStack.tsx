"use client";

import { Fragment, type CSSProperties, type ReactNode, useRef, type RefObject } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import ProjectCard, { type Project } from "@/components/ProjectCard";
import {
  STACK_CARD_OFFSET_PX,
  STACK_BASE_OFFSET_PX,
  STACK_CARD_OFFSET_PX_MOBILE,
  STACK_BASE_OFFSET_PX_MOBILE,
  STACK_CONTAINER_HEIGHT_PX_MOBILE,
  STACK_HEADER_TOP_PX,
  STACK_CARD_VIEW_SPACER_PX,
  stackDimTransform,
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

  // Scroll-progress-driven entrance (own card reaching the viewport),
  // rather than Framer's IntersectionObserver-based `whileInView`. For a
  // `position: sticky` element, the box IntersectionObserver measures can
  // desync from the box actually rendered on screen — most visibly in the
  // frame(s) where the shared containing block runs out of "stuck" room
  // and every card's in-flow position has to reconcile with its pinned
  // one. That reconciliation moment (the stack's release transition) was
  // making `whileInView` re-fire for every card at once, flashing them
  // all semi-transparent and letting their content bleed through each
  // other. Driving off scroll position instead sidesteps the observer
  // entirely.
  const { scrollYProgress: ownEntranceProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start 0.7"],
  });
  const entranceOpacity = useTransform(ownEntranceProgress, [0, 1], [0, 1]);
  const entranceY = useTransform(ownEntranceProgress, [0, 1], [14, 0]);

  const ownFinalTop = STACK_BASE_OFFSET_PX + index * STACK_CARD_OFFSET_PX;
  const ownFinalTopMobile = STACK_BASE_OFFSET_PX_MOBILE + index * STACK_CARD_OFFSET_PX_MOBILE;

  return (
    <div
      ref={cardRef}
      // Sticky at every breakpoint now (was `static` below md): mobile
      // gets the same full-card pin-and-overlap mechanic as desktop, just
      // with its own independently-tuned offset (--card-top-mobile) so
      // retuning one breakpoint can never shift the other.
      className="sticky top-[var(--card-top-mobile)] md:top-[var(--card-top)]"
      data-sticky-card={index}
      style={
        {
          "--card-top-mobile": `${ownFinalTopMobile}px`,
          "--card-top": `${ownFinalTop}px`,
          zIndex: index + 1,
          // iOS 26 Safari tints its status bar/toolbar by sampling the
          // background-color of position:sticky elements near the
          // viewport edge — this sticky wrapper had none of its own (the
          // card's visible color lives two levels deeper), so Safari was
          // picking up a stale/undefined value. Giving it the page's own
          // neutral tone here is invisible (the opaque card fully covers
          // it) and doesn't touch position, offsets, or timing at all.
          backgroundColor: "#f0eaf8",
        } as CSSProperties
      }
    >
      <motion.div
        style={
          reduceMotion
            ? undefined
            : {
                opacity: entranceOpacity,
                y: entranceY,
                ...(nextCardRef ? { scale, transformOrigin: "top" } : null),
              }
        }
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
        div) so they share one containing block, rather than each getting
        its own short-lived box and desynchronizing from each other.

        On mobile (base height, via the CSS var below): the natural sum of
        three very-tall cards leaves zero slack, so without an explicit
        push past that, the last card's own position reaches its sticky
        threshold at the exact moment the container is already exhausted —
        it approaches but never actually locks in. This adds real budget
        beyond the natural content height so every card gets its own turn
        to hold.

        At md+, the desktop value below takes over instead (unrelated
        number, tuned entirely separately — see its own comment): desktop
        additionally needs this sized so release is reachable in sync with
        the header, which doesn't apply on mobile since the header never
        leaves there.
      */}
      <div
        className="relative h-[var(--container-height-mobile)] md:h-[2883px]"
        style={
          {
            "--container-height-mobile": `${STACK_CONTAINER_HEIGHT_PX_MOBILE}px`,
          } as CSSProperties
        }
      >
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
