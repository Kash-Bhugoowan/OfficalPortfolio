import type { HsbcCaseStudyHeaderData } from "@/components/case-studies/hsbc/HeaderSection";
import type { ChallengeSectionData } from "@/components/case-studies/ChallengeSection";
import type { GailApproachSectionData } from "@/components/case-studies/gail/ApproachSection";
import type { HsbcVisionSectionData } from "@/components/case-studies/hsbc/VisionSection";
import type { HsbcNorthStarSectionData } from "@/components/case-studies/hsbc/NorthStarSection";
import type { HsbcResponsibilitiesSectionData } from "@/components/case-studies/hsbc/ResponsibilitiesSection";
import type { HsbcOutcomeSectionData } from "@/components/case-studies/hsbc/OutcomeSection";
import type { HsbcWhatsNextSectionData } from "@/components/case-studies/hsbc/WhatsNextSection";
import type { ReflectionsSectionData } from "@/components/case-studies/ReflectionsSection";
import type {
  NextProjectNavData,
  PreviousProjectNavData,
} from "@/components/case-studies/NextProjectNav";

export const hsbcCaseStudy: HsbcCaseStudyHeaderData = {
  primaryTag: "HSBC",
  tags: ["Design strategy", "Storytelling", "C-suite stakeholders", "UX & UI design"],
  titleLight: "HSBC Financial Coach: ",
  titleBold: "Empowering Gen Z Through Smarter Banking",
  dek: "Turning a broad ambition to support Gen Z into a tangible, technology-enabled vision for more confident financial decisions.",
  roleLabel: "Role & Summary",
  roleSummary:
    "As lead designer, I ran the design-thinking workshops and the UX/UI journey from early concept to an interactive prototype — turning HSBC's ambition to better support younger customers into a shared product direction for a complex innovation conversation.",
  heroImage: {
    src: "https://placehold.co/653x1100",
    alt: "HSBC Financial Coach product screenshot placeholder",
  },
  outcome: {
    label: "Outcome",
    segments: [
      { text: "The work did not become a shipped product. The " },
      { text: "outcome was strategic", bold: true },
      { text: ": the " },
      {
        text: "prototype gave HSBC a concrete way to explore how IBM technology could strengthen an existing app",
        bold: true,
      },
      { text: " and opened a conversation about future implementation." },
    ],
  },
};

export const hsbcChallenge: ChallengeSectionData = {
  eyebrow: "The Challenge",
  title: "Designing for financial confidence, not just another banking feature",
  intro:
    "HSBC's ambition was to evolve its app experience for a younger generation of customers. Research showed that 58% of young adults reported low financial confidence — the opportunity was bigger than a better balance-checker or spend-categoriser.",
  askLabel: "The real brief: ",
  askHighlight:
    "help Gen Z feel more in control as they moved towards personal and financial independence — addressing the financial understanding, spending habits, and quiet uncertainty that come with early independence.",
  challengeParagraph:
    "The harder problem was translation, not ambition: turning a broad innovation mandate into a focused, credible product direction that could live inside HSBC's existing financial-services context, rather than becoming an abstract “Gen Z app.”",
  closingParagraph:
    "That reframe — from a demographic brief to a specific emotional outcome — set the direction for everything that followed.",
};

export const hsbcApproach: GailApproachSectionData = {
  eyebrow: "My Approach",
  title: "Creating a shared vision before creating a solution",
  topImage: { src: "https://placehold.co/730x400", alt: "Design thinking workshop placeholder" },
  paragraphs: [
    "I led in-person workshops using Design Thinking and IBM Value Engineering, starting with empathy mapping to surface the aspirations, fears, and motivations Gen Z customers hold about money.",
    "Partway through, I introduced an activity I designed for this session: Vision Statements. Rather than let stakeholders jump straight to features — which reliably produced generic ideas — I asked them to first articulate what a successful future should achieve for the user.",
    "We then reframed those shared goals into How Might We questions, user stories, and problem statements, giving the room a practical route from scattered opinions to one direction, and surfacing the detail needed to shape the journey.",
    "That was the real facilitation move: shifting the conversation from opinions about features to alignment on the change the product needed to create.",
  ],
  quote:
    "Vision Statements gave stakeholders a way to align on the outcome before debating the interface — turning a broad innovation brief into shared product intent.",
  bottomImage: { src: "https://placehold.co/730x374", alt: "Workshop synthesis placeholder" },
};

export const hsbcVision: HsbcVisionSectionData = {
  eyebrow: "Defining The Vision",
  title: "From competing ideas to one future journey",
  subtitle:
    "Co-creating the journey made the concept actionable — giving every stakeholder a shared view of what the product needed to help a user do, feel, and understand over time.",
  paragraphs: [
    "I then facilitated prioritisation and co-creation exercises to shape the future experience. Stakeholders used cards and strategic principles to weigh what mattered most, anticipate user motivation and emotion, and build a forward-looking journey together.",
    "The output was an opportunity statement and one coherent concept journey: a Financial Coach that could make financial guidance feel personal, understandable, and relevant to the individual.",
    "I made a deliberate call not to walk away with a feature list. The product needed to be a guided experience connecting everyday financial behaviour to confidence-building support — not a set of disconnected utilities.",
  ],
  image: { src: "https://placehold.co/731x396", alt: "Concept journey map placeholder" },
};

export const hsbcNorthStar: HsbcNorthStarSectionData = {
  eyebrow: "My Guiding North Star",
  title: "Making financial guidance feel personal, not prescriptive",
  subtitle:
    "The core product challenge: guidance that felt useful to Gen Z without curdling into generic advice or a lecture about money.",
  paragraphs: [
    "I translated the workshop direction into a Financial Coach concept built on personalisation and micro-categorisation — helping people understand their finances in a way that reflected their own patterns and goals, while still functioning as a guided financial service.",
    "I explored emerging interaction patterns and current app trends, then set a visual direction that connected HSBC's existing product language to a more contemporary feel: purposeful colour, typography, gradients, and interaction, without losing the trust a financial brand depends on.",
    "The point was never to make banking “look younger.” It was to make guidance feel accessible and relevant while staying recognisably part of HSBC's ecosystem.",
  ],
  images: [
    { src: "https://placehold.co/737x512?text=Screen+1", alt: "Financial Coach screen placeholder 1" },
    { src: "https://placehold.co/737x512?text=Screen+2", alt: "Financial Coach screen placeholder 2" },
    { src: "https://placehold.co/737x512?text=Screen+3", alt: "Financial Coach screen placeholder 3" },
    { src: "https://placehold.co/737x512?text=Screen+4", alt: "Financial Coach screen placeholder 4" },
    { src: "https://placehold.co/737x512?text=Screen+5", alt: "Financial Coach screen placeholder 5" },
  ],
};

export const hsbcResponsibilities: HsbcResponsibilitiesSectionData = {
  eyebrow: "My Responsibilities",
  title: "Taking the concept from workshop to interactive prototype",
  subtitle:
    "The interactive prototype made the strategy discussable. It gave stakeholders something concrete to evaluate, not whether the concept was interesting, but how it could fit a real customer experience.",
  paragraphs: [
    "I led the UX/UI journey through three builds, using feedback and playback sessions to refine the concept into a fully interactive prototype.",
    "The prototype became the vehicle for strategic storytelling. Rather than present isolated screens, I used the journey to show the concept as a connected product experience — from understanding a customer's financial context to offering more relevant guidance and support.",
    "I presented the product vision and design direction to HSBC stakeholders, including senior technology leadership, to sharpen the conversation about what IBM technology could enable inside HSBC's existing app.",
  ],
};

export const hsbcOutcome: HsbcOutcomeSectionData = {
  eyebrow: "Outcome",
  title: "A strategic vision: from storytelling to engagement",
  intro:
    "Turning an open-ended innovation brief into a coherent, interactive product vision opened conversations about how IBM technology could support HSBC's existing app, and where the concept could be taken next.",
  image: { src: "https://placehold.co/1169x732", alt: "Final presentation analysis placeholder" },
  quoteParagraphs: [
    "I presented the final direction to HSBC's senior executives alongside this analysis, giving stakeholders a clear view of how IBM would implement the feature.",
    "The value of the engagement sat in the clarity it created: an aligned customer problem, a tangible future journey, and an informed basis for the technical and product decisions that would follow.",
  ],
};

export const hsbcWhatsNext: HsbcWhatsNextSectionData = {
  eyebrow: "What happened next?",
  title: "From storytelling to roadmap",
  paragraph:
    "The prototype became the basis for a roadmap, not a shelved deck. It clarified the next bets HSBC could pursue — including how technology-enabled financial guidance could be woven into an established banking experience.",
  image: { src: "https://placehold.co/653x1100", alt: "Roadmap discussion placeholder" },
};

export const hsbcReflections: ReflectionsSectionData = {
  label: "Reflection",
  quote:
    "Design leadership is often less about the interface and more about creating alignment — and taking the time to understand the vision before reaching for a solution.",
  supporting:
    "The Vision Statements activity was a small but consequential intervention. It helped a mixed stakeholder group move from broad ambition to a shared view of the confidence, control, and guidance the product needed to create.",
};

export const hsbcPreviousProject: PreviousProjectNavData = {
  label: "Previous Case Study",
  title: "Operation GAiL",
  href: "/case-studies/gail",
};

// Per the Figma, HSBC's closing band isn't a "next project" cross-link to
// another case study — it's a "Showcase Skill" pointer to the Generative
// AI Conversational Design page.
export const hsbcSkillShowcase: NextProjectNavData = {
  label: "Showcase Skill",
  title: "Gen AI Conversational Design",
  href: "/skills/conversational-design",
  ctaLabel: "View my skill →",
};
