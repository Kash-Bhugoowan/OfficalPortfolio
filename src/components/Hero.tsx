"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { linkHoverTransition, fadeInUp } from "@/lib/motion";
import RolesMarquee from "@/components/RolesMarquee";
import PhotoGallery from "@/components/PhotoGallery";

const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.3, staggerChildren: 0.35 },
  },
};

const item = fadeInUp;

export default function Hero() {
  return (
    <motion.section
      // Standard section vertical padding across the site: 74px top and
      // bottom (left/right unaffected). Match this on any new section.
      className="flex flex-col items-center gap-12 px-6 py-[74px] text-center"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={item}>
        <Image
          src="/images/karishma-headshot.png"
          alt="Portrait of Karishma Bhugoowan"
          width={260}
          height={260}
          className="rounded-full border border-accent object-cover shadow-[0px_8px_32px_0px_rgba(103,87,232,0.22)]"
          unoptimized
          priority
        />
      </motion.div>
      {/*
        Deliberate, escalating spacing rhythm (24 / 24 / 32 / 48px) reflecting
        actual content grouping, rather than a uniform gap patched with
        one-off px nudges: title+description+"Financial Times" form one
        tightly-related intro-text block (24px apart), the pills are a
        distinct UI element getting a clearer break (32px), and the photo
        carousel is a full section boundary getting the largest gap (48px).
      */}
      <div className="flex w-full max-w-4xl flex-col items-center">
        <motion.h1
          variants={item}
          className="text-[40px] leading-[60px] text-foreground"
        >
          Hi! I&apos;m Karishma, and I&apos;m a{" "}
          <span className="text-accent">Product Designer</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="mt-6 text-[22px] leading-8 font-light text-text-secondary"
        >
          I take complex problems and reframe them into opportunities,
          focusing on crafting innovative solutions that meet real user needs
          and deliver business value.
        </motion.p>
        <motion.p
          variants={item}
          className="mt-6 text-[18px] leading-[35px] text-text-secondary"
        >
          Interviewed by the{" "}
          <motion.a
            href="https://www.ft.com/partnercontent/ibm/what-if-ai-s-greatest-superpower-is-people.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent"
            whileHover={{ color: "#6757e8", fontSize: "20.7px" }}
            whileTap={{ fontSize: "19.4px" }}
            transition={linkHoverTransition}
          >
            Financial Times
          </motion.a>{" "}
          on putting people first whilst working with AI.
        </motion.p>
        <motion.div variants={item} className="mt-[27px] w-full">
          <RolesMarquee />
        </motion.div>
      </div>
      <motion.div variants={item} className="-mt-2 w-full">
        <PhotoGallery />
      </motion.div>
    </motion.section>
  );
}
