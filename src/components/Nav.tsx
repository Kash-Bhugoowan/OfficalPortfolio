"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { linkHoverTransition } from "@/lib/motion";
import { useIsDesktop } from "@/lib/useIsDesktop";
import { runExit, requestScrollReset } from "@/lib/pageTransitionBus";

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

// Defensive cap: how long we wait for the current page's exit fade before
// navigating anyway (mirrors RouteTransitionController's EXIT_TIMEOUT_MS),
// and also the fallback delay for the mobile overlay's own close fade — if
// AnimatePresence's onExitComplete is ever interrupted and never fires (e.g.
// the menu is reopened mid-exit, cancelling that exit cycle), a tap must
// still navigate rather than silently dead-end.
const EXIT_TIMEOUT_MS = 600;

function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// The "curtain" sequence for an in-page hash tap (see handleMenuLinkClick):
// link list fades out, screen holds fully covered, scroll jumps instantly,
// then the overlay itself fades away to reveal the destination already in
// place. Total ~650ms. Values below reduced-motion halve down to a single
// short cover-and-reveal with no stagger — the fade still has to survive
// long enough to hide the scroll jump, so it can't drop to zero.
const LIST_FADE_MS = 150;
const HOLD_MS = 80;
const OVERLAY_EXIT_S = 0.42;
const REDUCED_LIST_FADE_MS = 60;
const REDUCED_HOLD_MS = 0;
const REDUCED_OVERLAY_EXIT_S = 0.15;
const CURTAIN_EASE = [0.22, 1, 0.36, 1] as const;

// Waits a beat for the panel's own fade to mostly settle, then reveals
// each link one after another rather than all at once — a soft entrance
// that reads as considered rather than a hard on/off toggle.
const menuListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.12 } },
};

// No stagger under reduced motion — links appear together rather than
// cascading in one after another.
const reducedMenuListVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0, delayChildren: 0 } },
};

// Deliberately its own fast variant rather than the shared fadeInUp (1.6s
// entrance meant for passive hero/page-content reveals — see SkillHeader.tsx
// for the same tradeoff). This is a tappable overlay, and real taps land
// well before a 1.6s cascade finishes: retargeting several mid-flight 1.6s
// tweens to their exit state at once was enough main-thread work to stall
// the close -> navigate sequence for a second or more. Also gives "hidden"
// its own explicit transition so exit doesn't fall back to the MotionLink's
// hover spring. The "hidden" duration doubles as the curtain's list-fade
// step (LIST_FADE_MS above), so the two stay in lockstep.
const menuItemVariants = {
  hidden: {
    opacity: 0,
    y: 14,
    transition: { duration: LIST_FADE_MS / 1000, ease: CURTAIN_EASE },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: CURTAIN_EASE },
  },
};

// Opacity-only under reduced motion — no y travel — and matched to
// REDUCED_LIST_FADE_MS so the curtain's wait lines up with what's on screen.
const reducedMenuItemVariants = {
  hidden: { opacity: 0, transition: { duration: REDUCED_LIST_FADE_MS / 1000 } },
  visible: { opacity: 1, transition: { duration: REDUCED_LIST_FADE_MS / 1000 } },
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
  // Drives the link list's own fade independently of `isOpen` — the curtain
  // sequence (runCurtainNav) needs the list gone while the overlay itself
  // stays fully opaque, ahead of the overlay's own close. Reset to true by
  // the hamburger button's own onClick below, whenever it opens the
  // overlay (that button is covered by the overlay once open, so it never
  // fires on the way back down — only the dedicated X button and link taps
  // close it, neither of which should re-arm this).
  const [showLinks, setShowLinks] = useState(true);
  const isDesktop = useIsDesktop();
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  // Stashed by a mobile-menu link tap; consumed once the overlay's exit
  // animation has fully finished (AnimatePresence's onExitComplete), or by
  // the EXIT_TIMEOUT_MS fallback if that never fires. Cleared by every
  // non-navigating way the overlay can close, so a stale tap from an
  // aborted close never fires a late/wrong navigation. Only used for the
  // cross-route/no-hash paths — an in-page hash tap goes through
  // runCurtainNav instead and never touches this.
  const pendingHrefRef = useRef<string | null>(null);
  // Guards against a double-tap re-entering the curtain sequence mid-flight.
  const curtainRunningRef = useRef(false);

  // If the viewport crosses into desktop while the mobile overlay is
  // open (resize, orientation change), close it — the overlay and its
  // trigger are md:hidden, so leaving it "open" in state with nothing
  // rendered would just mean it snaps back open if the viewport shrinks
  // again without the user having tapped anything.
  useEffect(() => {
    if (isDesktop) {
      setIsOpen(false);
      pendingHrefRef.current = null;
    }
  }, [isDesktop]);

  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  function handleMenuLinkClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    // Mirrors RouteTransitionController's own new-tab/modifier-click checks —
    // only a plain, same-tab primary click is ours to sequence. Cmd/ctrl/
    // shift/alt-click, middle-click, or an explicit target/download should
    // open exactly as the browser would natively, unintercepted.
    const target = e.currentTarget.getAttribute("target");
    const isPlainClick =
      e.button === 0 &&
      !e.metaKey &&
      !e.ctrlKey &&
      !e.shiftKey &&
      !e.altKey &&
      !e.currentTarget.hasAttribute("download") &&
      (!target || target === "_self");

    if (!isPlainClick) {
      setIsOpen(false);
      return;
    }

    e.preventDefault();

    let url: URL | null;
    try {
      url = new URL(href, window.location.href);
    } catch {
      url = null;
    }

    const here = window.location;
    const samePath = !!url && url.pathname === here.pathname && url.search === here.search;

    if (url && samePath && url.hash) {
      // In-page hash target (Work/Skills/Process/Contact) — curtain, not a
      // native/router scroll. Deliberately doesn't touch pendingHrefRef or
      // isOpen yet; runCurtainNav closes the overlay itself once the jump
      // is safely hidden behind it.
      runCurtainNav(url);
      return;
    }

    // Everything else — a real route change (Resume), or the same-path/
    // no-hash edge case (Home tapped while already home) — unchanged from
    // before: hand off to handleOverlayExitComplete once the overlay's own
    // close finishes (or the fallback timer fires).
    pendingHrefRef.current = href;
    setTimeout(handleOverlayExitComplete, EXIT_TIMEOUT_MS);
    setIsOpen(false);
  }

  async function runCurtainNav(url: URL) {
    if (curtainRunningRef.current) return; // ignore a double-tap mid-sequence
    curtainRunningRef.current = true;

    const listFadeMs = reduceMotion ? REDUCED_LIST_FADE_MS : LIST_FADE_MS;
    const holdMs = reduceMotion ? REDUCED_HOLD_MS : HOLD_MS;

    setShowLinks(false); // list fades out
    await wait(listFadeMs);
    await wait(holdMs); // fully covered

    document.getElementById(url.hash.slice(1))?.scrollIntoView({ behavior: "instant", block: "start" });
    router.replace(url.pathname + url.hash, { scroll: false });

    setIsOpen(false); // overlay's existing exit fade reveals the destination
    curtainRunningRef.current = false;
  }

  async function handleOverlayExitComplete() {
    const href = pendingHrefRef.current;
    pendingHrefRef.current = null;
    if (!href) return; // already handled (real completion or fallback beat us to it), closed via X, desktop-breakpoint auto-close, or a curtain nav that doesn't use this ref

    let url: URL;
    try {
      url = new URL(href, window.location.href);
    } catch {
      return;
    }

    const here = window.location;
    const samePath = url.pathname === here.pathname && url.search === here.search;
    const destination = url.pathname + url.search + url.hash;

    if (samePath) {
      // Same-path, no-hash edge case only (e.g. Home tapped while already
      // home) — the hash case is diverted to runCurtainNav before this is
      // ever reached, so there's no scroll to worry about uncovering here.
      router.push(destination);
      return;
    }

    const hasHash = url.hash.length > 0;
    try {
      await Promise.race([runExit(), wait(EXIT_TIMEOUT_MS)]);
      if (hasHash) {
        router.push(destination);
      } else {
        requestScrollReset();
        router.push(destination, { scroll: false });
      }
    } catch {
      window.location.assign(destination); // fail open
    }
  }

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
          onClick={() => {
            setIsOpen((v) => !v);
            setShowLinks(true);
          }}
          className="inline-flex size-10 items-center justify-center rounded-full md:hidden"
        >
          <HamburgerIcon isOpen={isOpen} />
        </button>
      </nav>

      <AnimatePresence onExitComplete={handleOverlayExitComplete}>
        {isOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            // Own embedded transition rather than the shared `transition`
            // prop below (which still governs entrance, untouched) — the
            // curtain wants this close to use the site's shared expo-out
            // curve (matches PageTransition.tsx/fadeInUp) so the reveal
            // reads as the same fade-in language as /resume, and to shrink
            // under reduced motion (still needs *some* fade to hide the
            // scroll jump it's covering, so this never drops to 0).
            exit={{
              opacity: 0,
              transition: {
                duration: reduceMotion ? REDUCED_OVERLAY_EXIT_S : OVERLAY_EXIT_S,
                ease: CURTAIN_EASE,
              },
            }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed inset-0 z-50 flex flex-col bg-[#FEFCFF] md:hidden"
          >
            <div className="flex items-center justify-end px-8 pt-[38px] pb-5">
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => {
                  pendingHrefRef.current = null;
                  setIsOpen(false);
                }}
                className="inline-flex size-10 items-center justify-center rounded-full"
              >
                <HamburgerIcon isOpen />
              </button>
            </div>
            <motion.div
              className="flex flex-1 flex-col justify-center gap-2 px-8 pb-16"
              initial="hidden"
              animate={showLinks ? "visible" : "hidden"}
              exit="hidden"
              variants={reduceMotion ? reducedMenuListVariants : menuListVariants}
            >
              {menuLinks.map((link) =>
                link.href ? (
                  <MotionLink
                    key={link.label}
                    variants={reduceMotion ? reducedMenuItemVariants : menuItemVariants}
                    href={link.href}
                    data-nav-overlay-link="true"
                    onClick={(e) => handleMenuLinkClick(e, link.href)}
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
                    variants={reduceMotion ? reducedMenuItemVariants : menuItemVariants}
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
