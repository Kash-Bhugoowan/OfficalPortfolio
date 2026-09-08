"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import { motion, useAnimation } from "framer-motion";

function ChevronDown({ className = "" }: { className?: string }) {
  return <span className={`block size-1.5 rotate-45 border-r-2 border-b-2 ${className}`} />;
}

// Shared timing so every part of the accordion — icon rotation, color
// swaps, and the expand/collapse itself — moves at the same gentle pace
// instead of each element animating on its own clock.
const EASE = [0.22, 1, 0.36, 1] as const;
const DURATION = 0.4;
const colorTransitionClass = "transition-colors duration-[400ms] ease-out";

function RowImage({ src, className }: { src: string; className: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <Image src={src} alt="" fill className="object-cover" unoptimized />
    </div>
  );
}

type AccordionItem = {
  index: string;
  title: string;
  tags: string;
  body: ReactNode;
};

const items: AccordionItem[] = [
  {
    index: "01",
    title: "Mentoring",
    tags: "1:1 support · Career conversations · Industry exposure",
    body: (
      <div className="flex flex-col items-start gap-9 md:flex-row">
        <RowImage
          src="/images/Community/Mentoring1.jpeg"
          className="order-last h-[269px] w-full max-w-[456px] shrink-0 md:order-none md:w-[456px]"
        />
        <div className="flex flex-1 flex-col items-start gap-9">
          <p className="text-sm leading-6 text-foreground">
            I mentor early professionals 1:1, having the honest career conversations and
            offering the kind of steady support I wish I&apos;d had when I was finding my feet. I
            speak at universities to help students picture themselves in roles they didn&apos;t
            know existed.
          </p>
          <div className="flex flex-col items-start gap-3 border-l-2 border-accent pl-6">
            <p className="text-sm leading-6 text-text-secondary italic">
              I really enjoy our weekly sessions and am always left feeling{" "}
              <span className="text-accent">inspired</span> and{" "}
              <span className="text-accent">motivated</span>. Through showing me your work, I
              have a better idea of the industry and how{" "}
              <span className="text-accent">
                IBM bridge the gap between design and client business objectives
              </span>
              . These conversations have been very <span className="text-accent">insightful</span>{" "}
              and have <span className="text-accent">influenced</span> how I want to shape my
              career at IBM.
            </p>
            <div className="flex flex-col items-start gap-2">
              <span className="h-0.5 w-14 rounded-full bg-gradient-to-r from-accent to-[#8f6aa8]" />
              <span className="text-xs font-semibold text-text-secondary">Grace</span>
              <span className="text-xs font-light text-text-secondary">
                Early Professional Consultant
              </span>
            </div>
          </div>
        </div>
      </div>
    ),
  },
  {
    index: "02",
    title: "Workshop & Education",
    tags: "IBM Design Thinking · AI Literacy · Secondary Education",
    body: (
      <div className="flex flex-col items-start gap-11 md:flex-row">
        <RowImage
          src="/images/Community/Workshops.jpg"
          className="order-last h-[269px] w-full max-w-[456px] shrink-0 md:order-none md:w-[456px]"
        />
        <p className="text-base leading-6 text-foreground">
          I go directly into schools to run full innovation days, blending hands-on IBM Design
          Thinking sessions with real conversations about AI and technology, because the goal
          isn&apos;t to teach tools, it&apos;s to change how students approach problems and see
          themselves as problem-solvers. Through AI in Tech Days I bring accessible AI concepts
          into secondary education.
        </p>
      </div>
    ),
  },
  {
    index: "03",
    title: "Teaching the Next Generation of Female Designers",
    tags: "Empathetic Design · Facilitation · Girls in Tech",
    body: (
      <div className="flex flex-col items-start gap-11 md:flex-row">
        <RowImage
          src="/images/Community/Women%20in%20tech.png"
          className="order-last h-[269px] w-full max-w-[456px] shrink-0 md:order-none md:w-[456px]"
        />
        <p className="text-base leading-6 text-foreground">
          As the lead designer on Tech She Can, I ran a session aimed at inspiring young women to
          explore design and technology, introducing the concept of empathetic design, putting
          human needs at the centre of every solution, and leading hands-on activities that
          shifted how they approached problems. But it was about more than design skills: it was
          about showing a room full of girls that their perspective matters, that empathy is a
          superpower in tech, and that there&apos;s a seat at the table waiting for them.
        </p>
      </div>
    ),
  },
  {
    index: "04",
    title: "Events & Speaking",
    tags: "IBM THINK · Women in Tech · Innovation Sessions",
    body: (
      <div className="flex flex-col items-start gap-11 md:flex-row">
        <RowImage
          src="/images/Community/events.png"
          className="order-last h-[269px] w-full max-w-[456px] shrink-0 md:order-none md:w-[456px]"
        />
        <div className="flex flex-col gap-4 text-base leading-6 text-foreground">
          <p>
            Representing IBM at industry events, running hands-on innovation workshops with
            clients, and connecting with people across the tech ecosystem
          </p>
          <div className="flex flex-wrap gap-2">
            {["THINK UK 2023", "Women in Tech", "Ethics & AI Lunch", "D&I Panellist"].map((pill) => (
              <span
                key={pill}
                className="rounded-full border border-indigo-500/20 bg-indigo-500/5 px-4 py-2 text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]"
              >
                {pill}
              </span>
            ))}
          </div>
        </div>
      </div>
    ),
  },
];

// Built on native <details>/<summary> rather than a div-plus-onClick, so
// expand/collapse works with zero JavaScript (keyboard included — summary
// is natively focusable and Enter/Space-activatable). <details> owns
// visibility as the source of truth: without JS, clicking summary triggers
// the browser's own instant toggle, no React involved at all.
//
// Crucially, the body below must be an ALWAYS-rendered child, never
// `{isOpen && <body/>}` — the browser's native show/hide for <details>
// only works on content that's actually there. Conditionally mounting it
// on React state (as an AnimatePresence-only version would) means it's
// simply absent from the server HTML until JS flips isOpen, which can
// never happen without JS. So the height/opacity "closed" state also
// can't be a declarative `initial`/`animate` prop baked into the SSR
// markup (same trap) — it's applied imperatively, only once a click
// handler actually runs, via useAnimation's controls.set()/.start(). That
// keeps the server-rendered div unstyled (natural height, native <details>
// hides it) while still giving JS users a real 0-to-auto height animation.
function AccordionRow({ item }: { item: AccordionItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const controls = useAnimation();

  const handleSummaryClick = (e: MouseEvent<HTMLElement>) => {
    e.preventDefault();
    if (isOpen) {
      setIsOpen(false);
      controls.start({ height: 0, opacity: 0, transition: { duration: DURATION, ease: EASE } }).then(() => {
        if (detailsRef.current) detailsRef.current.open = false;
      });
    } else {
      if (detailsRef.current) detailsRef.current.open = true;
      controls.set({ height: 0, opacity: 0 });
      controls.start({ height: "auto", opacity: 1, transition: { duration: DURATION, ease: EASE } });
      setIsOpen(true);
    }
  };

  return (
    <details ref={detailsRef} className="border-b border-gray-300">
      <summary
        onClick={handleSummaryClick}
        className={`group flex list-none items-center justify-between gap-4 rounded-2xl px-4 py-6 -mx-4 [&::-webkit-details-marker]:hidden ${colorTransitionClass} cursor-pointer md:hover:bg-[#faf8ff]`}
      >
        <div className="flex items-center gap-5">
          <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]">
            {item.index}
          </span>
          <div className="flex flex-col items-start gap-0.5">
            <span
              className={`text-2xl font-light text-foreground ${colorTransitionClass} md:group-hover:text-accent`}
            >
              {item.title}
            </span>
            <span className="text-sm font-medium text-text-secondary">{item.tags}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <span
            className={`text-sm font-medium ${colorTransitionClass} ${isOpen ? "text-accent" : "text-text-secondary"}`}
          >
            {isOpen ? "Collapse" : "Expand"}
          </span>
          <motion.span
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: DURATION, ease: EASE }}
            className={`flex size-8 items-center justify-center rounded-full ${colorTransitionClass} ${
              isOpen ? "bg-white" : "border-[1.5px] border-text-secondary"
            }`}
          >
            <ChevronDown className={isOpen ? "border-accent" : "border-text-secondary"} />
          </motion.span>
        </div>
      </summary>

      <motion.div initial={false} animate={controls} className="overflow-hidden">
        <div className="pb-8">{item.body}</div>
      </motion.div>
    </details>
  );
}

export default function CommunityAccordion() {
  return (
    <div className="mx-auto w-full max-w-[1227px]">
      {items.map((item) => (
        <AccordionRow key={item.index} item={item} />
      ))}
    </div>
  );
}
