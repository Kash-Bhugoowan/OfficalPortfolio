"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { fadeInUp, linkHoverTransition } from "@/lib/motion";

const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2 },
  },
};

const item = fadeInUp;

const EMAIL = "karishma.bhugoowan@gmail.com";

const details: { label: string; value: string; href?: string }[] = [
  { label: "Email", value: EMAIL },
  { label: "Based in", value: "London・Remote-friendly" },
  { label: "Open to", value: "Contract・Consulting・Speaking" },
  {
    label: "Alternative contact",
    value: "LinkedIn →",
    href: "https://www.linkedin.com/in/karishma-bhugoowan/",
  },
];

function CopyableEmail({ email }: { email: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      return;
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="flex flex-col items-start gap-1">
      <button
        type="button"
        onClick={handleCopy}
        className="text-base font-medium text-foreground transition-colors hover:text-accent"
      >
        {email}
      </button>
      <span className="text-sm" style={{ color: "#4434B8" }}>
        {copied ? "Copied!" : " "}
      </span>
    </div>
  );
}

export default function Contact() {
  return (
    <section id="contact" className="flex flex-col items-center gap-16 px-6 py-[37px] md:py-[54px]">
      <motion.div
        className="flex w-full max-w-[476px] flex-col items-center gap-6 text-center md:max-w-[970px]"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={container}
      >
        <div className="flex flex-col items-center gap-2">
          <motion.span
            variants={item}
            className="text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]"
          >
            Get in touch
          </motion.span>
          <motion.h2 variants={item} className="-mt-1 text-4xl leading-[60px] text-accent">
            Let&apos;s work together
          </motion.h2>
        </div>
        <motion.p variants={item} className="text-xl leading-8 font-light text-text-secondary">
          Whether it&apos;s a complex problem that needs reframing, an assistant that needs a
          voice, or a room that needs facilitating - I&apos;d love to hear about it. I read every
          message myself and usually reply within a day or two.
        </motion.p>
        <motion.div variants={item} className="flex items-center gap-4">
          <motion.a
            href={`mailto:${EMAIL}`}
            className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97, backgroundColor: "#4434B8" }}
            transition={linkHoverTransition}
          >
            Get in touch →
          </motion.a>
          <motion.a
            href="#work"
            className="rounded-full border border-border bg-[#eeeafd] px-8 py-3 text-sm font-medium text-accent"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97, backgroundColor: "#ddd3fc" }}
            transition={linkHoverTransition}
          >
            View my work →
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        className="grid w-full max-w-[1528px] grid-cols-1 gap-8 rounded-2xl border border-border bg-white px-10 py-12 sm:grid-cols-2 md:py-16 lg:flex lg:items-center lg:justify-between"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={container}
      >
        {details.map((detail) => (
          <motion.div key={detail.label} variants={item} className="flex flex-col items-start gap-2">
            <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]">
              {detail.label}
            </span>
            {detail.label === "Email" ? (
              <CopyableEmail email={detail.value} />
            ) : detail.label === "Alternative contact" && detail.href ? (
              <motion.a
                href={detail.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-base font-medium text-foreground"
                whileHover={{ color: "#6757e8", scale: 1.15 }}
                whileTap={{ scale: 1.08 }}
                transition={linkHoverTransition}
              >
                {detail.value}
              </motion.a>
            ) : detail.href ? (
              <a href={detail.href} className="text-base font-medium text-foreground hover:text-accent">
                {detail.value}
              </a>
            ) : (
              <span className="text-base font-medium text-foreground">{detail.value}</span>
            )}
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
