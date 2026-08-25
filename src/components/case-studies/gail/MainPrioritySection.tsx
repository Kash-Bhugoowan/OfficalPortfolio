"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_SUBTITLE,
  CASE_STUDY_IMAGE_FRAME,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_TIGHT,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

// GAiL-specific "My Key Design decision" layout: the main image is
// landscape (732 / 518, matching this project's product screenshot)
// with its pulled quote living directly underneath it, rather than
// Minerva's MainPrioritySection, which uses a tall portrait image and a
// second image/paragraphs/quote "pushback" block. GAiL has no pushback
// block — "How I work with my design team & build team" is its own
// standalone, image-free section (see gail/page.tsx, reusing
// WhatsNextSection's layout).
export type GailMainPrioritySectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  image: { src: string; alt: string };
  imageQuote: string;
};

function RevealImage({
  image,
  aspectRatio,
}: {
  image: { src: string; alt: string };
  aspectRatio: string;
}) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      initial={reduceMotion ? undefined : CASE_STUDY_REVEAL_HIDDEN}
      whileInView={reduceMotion ? undefined : CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={CASE_STUDY_REVEAL_TRANSITION}
      className={CASE_STUDY_IMAGE_FRAME}
      style={{ aspectRatio }}
    >
      <Image src={image.src} alt={image.alt} fill className="object-cover" unoptimized />
    </motion.div>
  );
}

export default function GailMainPrioritySection({ data }: { data: GailMainPrioritySectionData }) {
  const { eyebrow, title, subtitle, paragraphs, image, imageQuote } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto grid w-full max-w-[1227px] grid-cols-1 items-start ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_TIGHT}`}>
            <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
              <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
              <h2 className={CASE_STUDY_TITLE}>{title}</h2>
            </div>
            <p className={CASE_STUDY_SUBTITLE}>{subtitle}</p>
          </div>
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={CASE_STUDY_BODY}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <RevealImage image={image} aspectRatio="732 / 518" />
          <div className="flex items-stretch gap-8 pl-8">
            <div className="w-[5px] shrink-0 rounded-sm bg-[#C0D9C0]" />
            <p className={CASE_STUDY_BODY}>{imageQuote}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
