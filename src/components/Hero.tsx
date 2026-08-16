"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { linkHoverTransition } from "@/lib/motion";
import RolesMarquee from "@/components/RolesMarquee";
import PhotoGallery from "@/components/PhotoGallery";

const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.3, staggerChildren: 0.35 },
  },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <motion.section
      className="flex flex-col items-center gap-12 px-6 pt-12 pb-24 text-center"
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
          className="rounded-full object-cover"
          unoptimized
          priority
        />
      </motion.div>
      <div className="flex w-full max-w-4xl flex-col items-center gap-8">
        <motion.h1
          variants={item}
          className="text-[40px] leading-[60px] text-foreground"
        >
          Hi! I&apos;m Karishma, and I&apos;m a{" "}
          <span className="text-accent">Product Designer</span>
        </motion.h1>
        <motion.p
          variants={item}
          className="text-[22px] leading-8 font-light text-text-secondary"
        >
          I take complex problems and reframe them into opportunities,
          focusing on crafting innovative solutions that meet real user needs
          and deliver business value.
        </motion.p>
        <motion.p
          variants={item}
          className="text-[18px] leading-[35px] text-text-secondary"
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
        <motion.div variants={item} className="w-full">
          <RolesMarquee />
        </motion.div>
      </div>
      <motion.div variants={item} className="-mt-4 w-full">
        <PhotoGallery />
      </motion.div>
    </motion.section>
  );
}
