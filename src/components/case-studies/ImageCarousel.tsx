"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

export type CarouselMedia = { src: string; alt: string; type?: "image" | "video" };

// Snappier than the 0.8s scroll-reveal fade (CASE_STUDY_REVEAL_TRANSITION) —
// this one is click-driven, not scroll-driven, so it should feel immediate.
const CROSSFADE_TRANSITION = { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const };

// Same two-column-grid math as ApproachSection's constant — this carousel
// sits in the second column of a max-w-[1227px]/gap-16 grid. Callers with a
// different layout (e.g. a full-width carousel) can override via the
// `sizes` prop.
const DEFAULT_CAROUSEL_SIZES = "(min-width: 1276px) 582px, (min-width: 768px) 45vw, 100vw";

function ArrowIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className="size-5"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d={direction === "left" ? "M15 18l-6-6 6-6" : "M9 6l6 6-6 6"} />
    </svg>
  );
}

function isSlideReady(item: CarouselMedia, readyMap: Record<number, boolean>, index: number) {
  return item.type === "video" || !!readyMap[index];
}

export default function ImageCarousel({
  media,
  objectFit = "cover",
  background = "bg-zinc-100",
  sizes = DEFAULT_CAROUSEL_SIZES,
}: {
  media: CarouselMedia[];
  objectFit?: "cover" | "contain";
  background?: string;
  sizes?: string;
}) {
  const [index, setIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [readyMap, setReadyMap] = useState<Record<number, boolean>>({});
  const pendingIndexRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, CASE_STUDY_REVEAL_VIEWPORT);
  const reduceMotion = useReducedMotion();
  const total = media.length;
  const current = media[index];

  // Every image slide stays mounted (opacity-toggled, not mounted/unmounted)
  // so this one `onLoad`/`.complete` check is both the real signal the
  // <Image> below is actually showing and the background preload for the
  // other slides — the same element, so there's no risk of preloading one
  // URL while next/image's responsive srcset requests a different one.
  // Videos have no decode step, so they're always considered ready.
  const settle = (i: number) => {
    setReadyMap((prev) => (prev[i] ? prev : { ...prev, [i]: true }));
    if (pendingIndexRef.current === i) {
      pendingIndexRef.current = null;
      setPendingIndex(null);
      setIndex(i);
    }
  };

  const requestIndex = (target: number) => {
    if (isSlideReady(media[target], readyMap, target)) {
      pendingIndexRef.current = null;
      setPendingIndex(null);
      setIndex(target);
    } else {
      pendingIndexRef.current = target;
      setPendingIndex(target);
    }
  };

  const base = pendingIndex ?? index;
  const goPrev = () => requestIndex((base - 1 + total) % total);
  const goNext = () => requestIndex((base + 1) % total);
  const isWaiting = pendingIndex !== null;

  // The gallery's own reveal waits on the same "in view AND ready" rule as
  // every other case-study image — gated on slide 0 specifically, since
  // that's what's on screen the first time this scrolls into view.
  const firstSlideReady = media[0]?.type === "video" || !!readyMap[0];
  const revealReady = inView && firstSlideReady;

  return (
    <motion.div
      ref={containerRef}
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      animate={reduceMotion ? undefined : revealReady ? CASE_STUDY_REVEAL_VISIBLE : CASE_STUDY_REVEAL_HIDDEN}
      transition={CASE_STUDY_REVEAL_TRANSITION}
      className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-zinc-300 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)] ${background}`}
        style={{ aspectRatio: "737 / 512" }}
      >
        {/* Image slides all stay mounted (opacity-toggled by index match)
            rather than mounting only the current one — that's what lets
            each slide's own onLoad double as both its ready-check and its
            background preload for the others, with no separate preloader
            requesting a different URL than the one actually rendered. */}
        {media.map((item, i) =>
          item.type === "video" ? null : (
            <motion.div
              key={item.src}
              className="absolute inset-0"
              style={{ zIndex: i === index ? 1 : 0 }}
              initial={false}
              animate={{ opacity: i === index ? 1 : 0 }}
              transition={reduceMotion ? { duration: 0 } : CROSSFADE_TRANSITION}
              aria-hidden={i === index ? undefined : true}
            >
              <Image
                ref={(img) => {
                  if (img?.complete) settle(i);
                }}
                src={item.src}
                alt={item.alt}
                fill
                className={objectFit === "contain" ? "object-contain" : "object-cover"}
                sizes={sizes}
                quality={90}
                onLoad={() => settle(i)}
              />
            </motion.div>
          ),
        )}

        {/* Video slides mount only while current — unlike images, they
            aren't preloaded in the background, matching the existing
            (unchanged) lazy behaviour for this gallery's video entries. */}
        <AnimatePresence initial={false}>
          {current.type === "video" && (
            <motion.div
              key={index}
              initial={reduceMotion ? undefined : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0 }}
              transition={CROSSFADE_TRANSITION}
              className="absolute inset-0"
              style={{ zIndex: 2 }}
            >
              <video
                src={current.src}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex justify-center gap-3">
        <button
          type="button"
          aria-label="Previous image"
          onClick={goPrev}
          disabled={isWaiting}
          className="flex size-11 items-center justify-center rounded-full bg-zinc-500 text-white shadow-[0px_16px_48px_0px_rgba(36,31,43,0.12)] transition hover:bg-zinc-600 active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:active:scale-100"
        >
          <ArrowIcon direction="left" />
        </button>
        <button
          type="button"
          aria-label="Next image"
          onClick={goNext}
          disabled={isWaiting}
          className="flex size-11 items-center justify-center rounded-full bg-zinc-500 text-white shadow-[0px_16px_48px_0px_rgba(36,31,43,0.12)] transition hover:bg-zinc-600 active:scale-95 disabled:cursor-wait disabled:opacity-50 disabled:active:scale-100"
        >
          <ArrowIcon direction="right" />
        </button>
      </div>
    </motion.div>
  );
}
