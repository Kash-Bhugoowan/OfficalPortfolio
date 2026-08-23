"use client";

import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";

const container = {
  hidden: {},
  visible: {
    transition: { delayChildren: 0.2 },
  },
};

const item = fadeInUp;

export default function Community() {
  return (
    <section className="flex flex-col items-center gap-8 px-6 py-[37px]">
      <motion.div
        className="flex w-full flex-col items-center gap-2 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={container}
      >
        <motion.span
          variants={item}
          className="text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]"
        >
          My contributions outside the office
        </motion.span>
        <motion.h2 variants={item} className="-mt-1 text-4xl leading-[60px] text-accent">
          My community & giveback
        </motion.h2>
        <motion.p variants={item} className="max-w-[867px] text-xl leading-8 text-text-secondary">
          Beyond my day-to-day work, I&apos;m passionate about giving back; whether that&apos;s
          running innovation days in schools, speaking at early professional events, or
          mentoring the next wave of talent into tech. Community isn&apos;t a side project;
          it&apos;s how I measure the impact I want to have in the world.
        </motion.p>
      </motion.div>
    </section>
  );
}
