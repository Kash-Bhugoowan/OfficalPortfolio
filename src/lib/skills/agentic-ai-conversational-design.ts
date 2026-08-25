import type { SkillShowcaseHeaderData } from "@/components/skills/SkillShowcaseHeader";
import type { PrinciplesSectionData } from "@/components/skills/PrinciplesSection";
import type { ProcessSectionData } from "@/components/skills/ProcessSection";
import type { ExampleFlowsSectionData } from "@/components/skills/ExampleFlowsSection";
import type { NextProjectNavData } from "@/components/case-studies/NextProjectNav";

export const agenticAiConversationalDesignHeader: SkillShowcaseHeaderData = {
  eyebrow: "SKILL SHOWCASE",
  tags: ["Conversation Design", "Gen AI", "Accessibility", "Service Design"],
  title: "Generative AI Conversational design",
  dek: "I design intelligent, inclusive and trustworthy Generative AI assistants. Drawing on user experience best practice and close technical collaboration, I craft assistants rooted in real value through meaningful interactions.",
};

export const agenticAiConversationalDesignPrinciples: PrinciplesSectionData = {
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

export const agenticAiConversationalDesignProcess: ProcessSectionData = {
  eyebrow: "How I work",
  title: "My process for designing conversational flows",
  leftSteps: [
    {
      number: "01.",
      title: "Define Scope & Intent",
      description: "Outline the topic, the assistant’s purpose and the goals users arrive with.",
    },
    {
      number: "02.",
      title: "Script & Sentiment Mapping",
      description:
        "Map dialogue, tone and actions to match user expectations and emotional context.",
    },
    {
      number: "03.",
      title: "Collaborative Iteration",
      description:
        "Work closely with developers and solution architects, diverse feedback makes generative flows more resilient.",
    },
  ],
  rightSteps: [
    {
      number: "04.",
      title: "Build, Tune & Test",
      description:
        "Simulate and test conversations against real use cases, tuning intents and responses.",
    },
    {
      number: "05.",
      title: "Validation",
      description:
        "I validate logic and tone through regular playback sessions turning feedback into fast improvements.",
    },
  ],
};

export const agenticAiConversationalDesignExampleFlows: ExampleFlowsSectionData = {
  eyebrow: "Example flows",
  image: {
    src: "https://placehold.co/1530x503",
    alt: "Example conversational flow diagram placeholder",
  },
};

export const agenticAiConversationalDesignNextProject: NextProjectNavData = {
  label: "Showcase skill",
  title: "Workshop facilitation",
  href: "/skills/workshop-facilitation", // TODO: replace once that skill showcase page exists
  ctaLabel: "View case study →",
};
