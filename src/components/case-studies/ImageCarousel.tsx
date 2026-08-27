"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
}: {
  media: CarouselMedia[];
  objectFit?: "cover" | "contain";
  background?: string;
}) {
  const [index, setIndex] = useState(0);
  const [pendingIndex, setPendingIndex] = useState<number | null>(null);
  const [readyMap, setReadyMap] = useState<Record<number, boolean>>({});
  const pendingIndexRef = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();
  const total = media.length;
  const current = media[index];

  // Preload every slide as soon as the gallery mounts. `unoptimized` means
  // next/image requests this exact URL with no /_next/image rewrite, so
  // priming the browser's own cache here means the real <Image> below
  // almost always resolves instantly once the user clicks an arrow. If the
  // slide that just finished loading is the one navigation is waiting on,
  // commit it here (inside the load event itself) rather than in a second
  // effect reacting to state — that's what actually starts the fade only
  // once the pixels are ready.
  useEffect(() => {
    const settle = (i: number) => {
      setReadyMap((prev) => (prev[i] ? prev : { ...prev, [i]: true }));
      if (pendingIndexRef.current === i) {
        pendingIndexRef.current = null;
        setPendingIndex(null);
        setIndex(i);
      }
    };
    media.forEach((item, i) => {
      if (item.type === "video") return;
      const img = new window.Image();
      img.onload = () => settle(i);
      img.onerror = () => settle(i);
      img.src = item.src;
    });
  }, [media]);

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

  return (
    <motion.div
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={CASE_STUDY_REVEAL_TRANSITION}
      className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}
    >
      <div
        className={`relative w-full overflow-hidden rounded-2xl border border-zinc-300 shadow-[0px_8px_24px_0px_rgba(36,31,43,0.08)] ${background}`}
        style={{ aspectRatio: "737 / 512" }}
      >
        {/* Default (sync) AnimatePresence mode, not "wait" — the incoming
            slide fades in while the outgoing one is still fading out, so
            they cross-fade over each other instead of leaving a blank gap.
            Safe to start now because requestIndex only changes `index`
            once the target slide has actually finished loading. */}
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            initial={reduceMotion ? undefined : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={CROSSFADE_TRANSITION}
            className="absolute inset-0"
          >
            {current.type === "video" ? (
              <video
                src={current.src}
                className="absolute inset-0 h-full w-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              />
            ) : (
              <Image
                src={current.src}
                alt={current.alt}
                fill
                className={objectFit === "contain" ? "object-contain" : "object-cover"}
                unoptimized
              />
            )}
          </motion.div>
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
