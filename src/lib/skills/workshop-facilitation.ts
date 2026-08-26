import type { SkillHeaderData } from "@/components/skills/SkillHeader";
import type { SkillPrinciplesSectionData } from "@/components/skills/PrinciplesSection";
import type { SkillProcessSectionData } from "@/components/skills/ProcessSection";
import type { SkillExampleFlowsSectionData } from "@/components/skills/ExampleFlowsSection";
import type {
  NextProjectNavData,
  PreviousProjectNavData,
} from "@/components/case-studies/NextProjectNav";

export const workshopFacilitationHeader: SkillHeaderData = {
  primaryTag: "Skills showcase",
  tags: ["Workshop facilitation", "Design thinking", "Stakeholder alignment", "Service design"],
  title: "Workshop Facilitation",
  dek: "I design and lead workshops that turn broad ambition into shared direction. From discovery to co-creation, I build the structure and activities that help multi-disciplinary teams align on what matters before reaching for a solution.",
};

export const workshopFacilitationPrinciples: SkillPrinciplesSectionData = {
  eyebrow: "Principles",
  title: "My core principles for facilitating workshops",
  cards: [
    {
      icon: "◈",
      title: "Alignment before ideas",
      description:
        "Stakeholders who jump straight to features usually produce generic ones. I get the room aligned on the outcome a solution needs to create before we debate what that solution looks like.",
    },
    {
      icon: "◎",
      title: "Structure that invites participation",
      description:
        "Good facilitation is designed, not improvised. I build activities that give every voice in the room a way to contribute, not just the loudest or most senior one.",
    },
    {
      icon: "◑",
      title: "Outcome-driven, not agenda-driven",
      description:
        "A workshop that gets through its agenda but produces no shared artifact has failed. I hold the room accountable to a concrete output, not just a full itinerary.",
    },
  ],
};

export const workshopFacilitationProcess: SkillProcessSectionData = {
  eyebrow: "How I work",
  title: "My process for designing and running workshops",
  steps: [
    {
      number: "01.",
      title: "Clarify the Objective",
      description:
        "Define what decision or alignment the workshop needs to produce, and who are the participants that actually need to be in the room to produce it.",
    },
    {
      number: "02.",
      title: "Design the Format",
      description:
        "Choose and sequence exercises. From empathy mapping, vision statements to prioritisation cards. The activities are matched to the objective, not a generic agenda template.",
    },
    {
      number: "03.",
      title: "Facilitate & Adapt",
      description:
        "Read the room and listen. Understand where you need to jump from framing to discovery or straight to scoping. If you need to pivot, that's the key to keep moving towards an outcome.",
    },
    {
      number: "04.",
      title: "Synthesise Together",
      description:
        "Convert scattered input into shared artifacts: How Might We questions, journey maps, problem statements, whilst everyone is there. This ensures everyone leaves with a shared understanding of what was discussed.",
    },
    {
      number: "05.",
      title: "Playback & Validate",
      description:
        "Confirm the output reflects the room's intent before it becomes the basis for design, technical or roadmap decisions.",
    },
  ],
};

export const workshopFacilitationExampleFlows: SkillExampleFlowsSectionData = {
  eyebrow: "Example workshop",
  image: {
    src: "https://placehold.co/1530x503?text=Example+workshop+activity",
    alt: "Example workshop activity flow placeholder",
  },
};

export const workshopFacilitationPrevious: PreviousProjectNavData = {
  label: "Previous skill",
  title: "Generative AI Conversational design",
  href: "/skills/conversational-design",
};

export const workshopFacilitationNext: NextProjectNavData = {
  label: "Next skill",
  title: "Rapid Prototyping",
  href: "/#process", // TODO: point to /skills/rapid-prototyping once that page exists
  ctaLabel: "View skill →",
};
