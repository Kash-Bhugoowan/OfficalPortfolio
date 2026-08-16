"use client";

import { motion } from "framer-motion";
import { linkHoverTransition } from "@/lib/motion";

const links = [
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "Resume", href: "#resume" },
  { label: "Contact", href: "#contact" },
];

export default function Nav() {
  return (
    <div className="px-4 pt-6 sm:px-6">
      <nav className="mx-auto flex w-full max-w-[1528px] items-center justify-between rounded-full border-b border-border bg-[rgba(250,248,245,0.27)] px-4 py-2.5 shadow-[0_1px_2px_0_rgba(36,31,43,0.04)] sm:px-10 sm:py-3.5">
        <span className="text-sm leading-[22.4px] tracking-[0.14px] font-light text-nav-muted sm:text-[18px]">
          Karishma Bhugoowan
        </span>
        <div className="flex items-center gap-3 sm:gap-[42px]">
          {links.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              className="text-sm leading-[22.4px] tracking-[0.14px] font-light text-nav-muted sm:text-[18px]"
              whileHover={{ color: "#6757e8", scale: 1.15 }}
              whileTap={{ scale: 1.08 }}
              transition={linkHoverTransition}
            >
              {link.label}
            </motion.a>
          ))}
        </div>
      </nav>
    </div>
  );
}
