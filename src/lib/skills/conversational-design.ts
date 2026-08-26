import type { SkillHeaderData } from "@/components/skills/SkillHeader";
import type { SkillPrinciplesSectionData } from "@/components/skills/PrinciplesSection";
import type { SkillProcessSectionData } from "@/components/skills/ProcessSection";
import type { SkillExampleFlowsSectionData } from "@/components/skills/ExampleFlowsSection";
import type {
  NextProjectNavData,
  PreviousProjectNavData,
} from "@/components/case-studies/NextProjectNav";

export const conversationalDesignHeader: SkillHeaderData = {
  backHref: "/#process",
  eyebrow: "Skill showcase",
  tags: ["Conversation Design", "Gen AI", "Accessibility", "Service Design"],
  title: "Generative AI Conversational design",
  dek: "I design intelligent, inclusive and trustworthy Generative AI assistants. Drawing on user experience best practice and close technical collaboration, I craft assistants rooted in real value through meaningful interactions.",
};

export const conversationalDesignPrinciples: SkillPrinciplesSectionData = {
  eyebrow: "Principles",
  title: "My core principles for designing AI conversational flows",
  cards: [
    {
      icon: "◈",
      title: "Human-centred intelligence",
      description:
        "I distinguish between “natural” and “human-like” conversation design. An assistant should feel intuitive — not imitate people. This avoids uncanny experiences and builds trust.",
    },
    {
      icon: "◎",
      title: "Inclusive by design",
      description:
        "Accessibility is rooted into every decision. I design with empathy, considering the needs of users with cognitive, visual or speech impairments.",
    },
    {
      icon: "◑",
      title: "Fail-safe flows",
      description:
        "Assistants should never dead-end. Every path is built with clear error handling, recovery options and graceful exits, so users always feel guided, not stuck.",
    },
  ],
};

export const conversationalDesignProcess: SkillProcessSectionData = {
  eyebrow: "How I work",
  title: "My process for designing conversational flows",
  steps: [
    {
      number: "01.",
      title: "Define Scope & Intent",
      description: "Outline the topic, the assistant’s purpose and the goals users arrive with.",
    },
    {
      number: "02.",
      title: "Script & Sentiment Mapping",
      description: "Map dialogue, tone and actions to match user expectations and emotional context.",
    },
    {
      number: "03.",
      title: "Collaborative Iteration",
      description:
        "Work closely with developers and solution architects, diverse feedback makes generative flows more resilient.",
    },
    {
      number: "04.",
      title: "Build, Tune & Test",
      description: "Simulate and test conversations against real use cases, tuning intents and responses.",
    },
    {
      number: "05.",
      title: "Validation",
      description:
        "I validate logic and tone through regular playback sessions turning feedback into fast improvements.",
    },
  ],
};

export const conversationalDesignExampleFlows: SkillExampleFlowsSectionData = {
  eyebrow: "Example flows",
  image: {
    src: "https://placehold.co/1530x503?text=Example+conversation+flow",
    alt: "Example conversational flow diagram placeholder",
  },
};

// Mirrors hsbcSkillShowcase's reverse-direction labeling: this page is a
// skill, but it's stepping back into a case study, so the label says what
// the destination is, not what the current page is.
export const conversationalDesignPrevious: PreviousProjectNavData = {
  label: "Previous case study",
  title: "HSBC Financial Coach",
  href: "/case-studies/hsbc",
};

export const conversationalDesignNext: NextProjectNavData = {
  label: "Next skill",
  title: "Workshop facilitation",
  href: "/#process", // TODO: point to /skills/workshop-facilitation once that page exists
  ctaLabel: "View skill →",
};
