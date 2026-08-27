"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { fadeInUp, linkHoverTransition } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useIsDesktop";

// next/link wrapped for motion props (whileHover/whileTap/variants) — swaps
// the plumbing under every nav link from a hard browser navigation to a
// client-side one, with byte-identical markup, classes, and hover/tap
// behavior. See motion.create in framer-motion 13's API (not the legacy
// motion(Component) call syntax).
const MotionLink = motion.create(Link);

const links = [
  { label: "Work", href: "/#work" },
  { label: "Skills", href: "/#process" },
  { label: "Process", href: "/#design-principles" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/#contact" },
];

const menuLinks = [{ label: "Home", href: "/" }, ...links];

// Waits a beat for the panel's own fade to mostly settle, then reveals
// each link one after another rather than all at once — a soft entrance
// that reads as considered rather than a hard on/off toggle.
const menuListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <div className="relative size-3">
      <motion.span
        className="absolute inset-x-0 top-0 h-[1.4px] rounded-full bg-text-secondary"
        animate={isOpen ? { y: 5, rotate: 45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
      <motion.span
        className="absolute inset-x-0 top-1/2 h-[1.4px] -translate-y-1/2 rounded-full bg-text-secondary"
        animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.span
        className="absolute inset-x-0 bottom-0 h-[1.4px] rounded-full bg-text-secondary"
        animate={isOpen ? { y: -5, rotate: -45 } : { y: 0, rotate: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
      />
    </div>
  );
}

function Chevron() {
  return (
    <span className="block size-2 rotate-[-45deg] border-r-[1.4px] border-b-[1.4px] border-text-secondary" />
  );
}

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const isDesktop = useIsDesktop();

  // If the viewport crosses into desktop while the mobile overlay is
  // open (resize, orientation change), close it — the overlay and its
  // trigger are md:hidden, so leaving it "open" in state with nothing
  // rendered would just mean it snaps back open if the viewport shrinks
  // again without the user having tapped anything.
  useEffect(() => {
    if (isDesktop) setIsOpen(false);
  }, [isDesktop]);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  return (
    <div className="px-4 pt-6 sm:px-6">
      <nav className="mx-auto flex w-full max-w-[1528px] items-center justify-between rounded-full border-b border-white/60 bg-[rgba(239,244,249,0.85)] px-4 py-2.5 shadow-[0_4px_20px_0_rgba(36,31,43,0.03)] backdrop-blur-md sm:px-10 sm:py-3.5">
        <MotionLink
          href="/"
          className="text-sm leading-[22.4px] tracking-[0.14px] font-light text-nav-muted sm:text-[18px]"
          whileHover={{ color: "#6757e8", scale: 1.15 }}
          whileTap={{ scale: 1.08 }}
          transition={linkHoverTransition}
        >
          Karishma Bhugoowan
        </MotionLink>
        <div className="hidden items-center gap-3 md:flex md:gap-[42px]">
          {links.map((link) =>
            link.href ? (
              <MotionLink
                key={link.label}
                href={link.href}
                className="text-sm leading-[22.4px] tracking-[0.14px] font-light text-nav-muted sm:text-[18px]"
                whileHover={{ color: "#6757e8", scale: 1.15 }}
                whileTap={{ scale: 1.08 }}
                transition={linkHoverTransition}
              >
                {link.label}
              </MotionLink>
            ) : (
              <span
                key={link.label}
                aria-disabled="true"
                title="Coming soon"
                className="text-sm leading-[22.4px] tracking-[0.14px] font-light text-nav-muted opacity-40 sm:text-[18px]"
              >
                {link.label}
              </span>
            ),
          )}
        </div>
        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          className="inline-flex size-10 items-center justify-center rounded-full md:hidden"
        >
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-[#FEFCFF] md:hidden"
          >
            <div className="flex items-center justify-end px-8 pt-[38px] pb-5">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setIsOpen(false)}
                className="inline-flex size-10 items-center justify-center rounded-full"
              >
                <HamburgerIcon isOpen />
              </button>
            </div>
            <motion.div
              className="flex flex-1 flex-col justify-center gap-2 px-8 pb-16"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={menuListVariants}
            >
              {menuLinks.map((link) =>
                link.href ? (
                  <MotionLink
                    key={link.label}
                    variants={fadeInUp}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between border-b border-border py-5 text-3xl font-light text-foreground"
                    whileHover={{ color: "#6757e8" }}
                    whileTap={{ scale: 0.98 }}
                    transition={linkHoverTransition}
                  >
                    {link.label}
                    <Chevron />
                  </MotionLink>
                ) : (
                  <motion.div
                    key={link.label}
                    variants={fadeInUp}
                    aria-disabled="true"
                    title="Coming soon"
                    className="flex items-center justify-between border-b border-border py-5 text-3xl font-light text-foreground opacity-40"
                  >
                    {link.label}
                  </motion.div>
                ),
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
