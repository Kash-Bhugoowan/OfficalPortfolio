"use client";

import { motion } from "framer-motion";
import { linkHoverTransition } from "@/lib/motion";

const footerLinks: { label: string; href: string | null }[] = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#process" },
  { label: "Process", href: "/#design-principles" },
  { label: "Resume", href: null },
  { label: "Contact", href: "/#contact" },
];

function ArrowUpIcon({ className }: { className?: string }) {
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
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function BackToTopButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group flex size-8 items-center justify-center rounded-sm border border-white text-white transition-colors hover:bg-white hover:text-[#1c1726] ${className ?? ""}`}
    >
      <ArrowUpIcon className="size-4.5" />
    </button>
  );
}

export default function Footer() {
  return (
    <div className="relative mt-[140px] flex h-32 w-full flex-col justify-center border-t border-white/5 bg-bg-inverse px-6 md:block md:px-0">
      <div className="flex flex-col items-start justify-start md:absolute md:top-[41px] md:left-[100px]">
        <div className="flex flex-col items-start justify-start self-stretch">
          <div className="justify-start font-['Manrope'] text-lg leading-7 font-medium text-white/90">
            Karishma Bhugoowan
          </div>
        </div>
        <div className="flex h-6 w-44 flex-col items-start justify-start pt-1">
          <div className="justify-start font-['DM_Sans'] text-xs leading-5 font-normal tracking-tight text-white/40">
            Product Designer · London
          </div>
        </div>
      </div>

      <div className="hidden items-center gap-14 md:absolute md:top-[51px] md:right-[100px] md:flex">
        <div className="flex items-center gap-6">
          {footerLinks.map((link) =>
            link.href ? (
              <motion.a
                key={link.label}
                href={link.href}
                className="font-['Manrope'] text-lg leading-6 font-light tracking-tight text-white"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.02 }}
                transition={linkHoverTransition}
              >
                {link.label}
              </motion.a>
            ) : (
              <span
                key={link.label}
                aria-disabled="true"
                title="Coming soon"
                className="font-['Manrope'] text-lg leading-6 font-light tracking-tight text-white/40"
              >
                {link.label}
              </span>
            ),
          )}
        </div>
        <BackToTopButton />
      </div>

      <BackToTopButton className="absolute top-1/2 right-6 -translate-y-1/2 md:hidden" />
    </div>
  );
}
