"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { CASE_STUDY_SECTION_GAP_PX, linkHoverTransition } from "@/lib/motion";
import {
  CASE_STUDY_FIELD_LABEL,
  CASE_STUDY_REVEAL_HIDDEN,
  CASE_STUDY_REVEAL_VISIBLE,
  CASE_STUDY_REVEAL_VIEWPORT,
  CASE_STUDY_REVEAL_TRANSITION,
} from "@/lib/case-studies/styles";

// Shared across every case-study page (not Minerva-specific) — sits above
// the Footer and links to the next project in the sequence. Only the data
// (label/title/href) differs per page.
export type NextProjectNavData = {
  label: string;
  title: string;
  href: string;
  ctaLabel: string;
};

// Previous has no button, so it skips ctaLabel — the field would just sit
// unused on every page's data object otherwise.
export type PreviousProjectNavData = Pick<NextProjectNavData, "label" | "title" | "href">;

export function ArrowLeftIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M19 12H5M12 19l-7-7 7-7" />
    </svg>
  );
}

export default function NextProjectNav({ next }: { next: NextProjectNavData }) {
  const reduceMotion = useReducedMotion();
  const [buttonHovered, setButtonHovered] = useState(false);
  const { label, title, href, ctaLabel } = next;

  return (
    // -mb-[140px] cancels Footer.tsx's own mt-[140px] (built for the
    // homepage's Contact -> Footer rhythm) via CSS margin collapsing —
    // adjacent sibling margins where one is positive and one negative sum
    // algebraically, so 140px + (-140px) nets to 0. Living here rather
    // than as a per-page override means every future case study gets a
    // flush transition into the Footer automatically, without Footer.tsx
    // (used on the homepage too) ever needing to change. No background
    // color of its own — it's plain page background, not a distinct
    // decorative band, so it reads as a continuation of the page rather
    // than a separate block sitting on top of it.
    // initial/whileInView stay defined even when reduceMotion is true —
    // only the transition duration drops to 0. Conditionally undefined
    // props here create a server/client hydration mismatch React can't
    // patch up, which can force a broader client-side re-render of the
    // page and cause unrelated sections to flash/disappear.
    <motion.section
      initial={CASE_STUDY_REVEAL_HIDDEN}
      whileInView={CASE_STUDY_REVEAL_VISIBLE}
      viewport={CASE_STUDY_REVEAL_VIEWPORT}
      transition={reduceMotion ? { duration: 0 } : CASE_STUDY_REVEAL_TRANSITION}
      className="-mb-[140px] flex flex-col items-center px-6 pb-16 md:pb-24"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className="flex w-full max-w-[1227px] flex-col border-t border-indigo-500/20 pt-12">
        <Link
          href={href}
          className="flex w-full flex-col gap-4 md:flex-row md:items-center md:justify-between md:gap-8"
        >
          <div className="flex flex-col gap-2">
            <span className={CASE_STUDY_FIELD_LABEL}>{label}</span>
            {/* Tied to buttonHovered state (not CSS group-hover on the row)
                so the title only recolors when the button itself is
                hovered, not anywhere else on the row. */}
            <span
              className={`text-2xl leading-10 transition-colors duration-[400ms] ease-out ${
                buttonHovered ? "text-accent" : "text-foreground"
              }`}
            >
              {title}
            </span>
          </div>
          {/* The site's standard primary-button interaction (see Contact.tsx's
              "Get in touch" button): scales up and shifts to the brand's
              hover-purple on hover, then scales down to a darker purple on
              press — kept identical here rather than inventing a new variant,
              so every primary CTA on the site behaves the same way. */}
          <motion.span
            onHoverStart={() => setButtonHovered(true)}
            onHoverEnd={() => setButtonHovered(false)}
            whileHover={{ scale: 1.05, backgroundColor: "#6757e8" }}
            whileTap={{ scale: 0.97, backgroundColor: "#4434B8" }}
            transition={linkHoverTransition}
            className="inline-flex w-fit items-center justify-center rounded-full bg-accent px-9 py-3.5 text-sm font-semibold text-white shadow-[0px_4px_8px_0px_rgba(36,31,43,0.12)] font-[family-name:var(--font-dm-sans)]"
          >
            {ctaLabel}
          </motion.span>
        </Link>
      </div>
    </motion.section>
  );
}
