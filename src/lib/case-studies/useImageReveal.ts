"use client";

import { useRef, useState } from "react";
import { useInView } from "framer-motion";
import { CASE_STUDY_REVEAL_VIEWPORT } from "@/lib/case-studies/styles";

// Drives the case-study image reveal: the fade should start only once the
// image has both scrolled into view AND finished decoding, whichever is
// later — never on viewport entry alone, which is what let an empty frame
// fade in ahead of the image's own pixels. Callers combine `inView` and
// `loaded` themselves (most as `inView && loaded`; ImageCarousel treats
// video slides, which have no decode step, as always "loaded").
//
// `imageRef` covers the case where the image resolved from the browser's
// own cache before this component mounted — `onLoad` alone can miss that,
// since the load event may have already fired before the handler existed.
export function useImageReveal<T extends HTMLElement = HTMLDivElement>() {
  const containerRef = useRef<T>(null);
  const inView = useInView(containerRef, CASE_STUDY_REVEAL_VIEWPORT);
  const [loaded, setLoaded] = useState(false);

  const onImageLoad = () => setLoaded(true);
  const imageRef = (img: HTMLImageElement | null) => {
    if (img?.complete) setLoaded(true);
  };

  return { containerRef, inView, loaded, onImageLoad, imageRef };
}
