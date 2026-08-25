import type { CaseStudyHeaderData } from "@/components/case-studies/CaseStudyHeader";
import type { ChallengeSectionData } from "@/components/case-studies/ChallengeSection";
import type { GailApproachSectionData } from "@/components/case-studies/gail/ApproachSection";
import type { GailCoCreationSectionData } from "@/components/case-studies/gail/CoCreationSection";
import type { GailMainPrioritySectionData } from "@/components/case-studies/gail/MainPrioritySection";
import type { GailOutcomesSectionData } from "@/components/case-studies/gail/OutcomesSection";
import type { WhatsNextSectionData } from "@/components/case-studies/WhatsNextSection";
import type { ReflectionsSectionData } from "@/components/case-studies/ReflectionsSection";
import type { NextProjectNavData } from "@/components/case-studies/NextProjectNav";

export const gailCaseStudy: CaseStudyHeaderData = {
  eyebrow: "Selected work | CASE STUDY",
  primaryTag: "UK Gov: Dept Work & Pensions",
  tags: ["Gen AI", "Lead Designer", "Service Design", "UX & UI Design"],
  titleLight: "Project GAiL: ",
  titleBold: "Creating trustworthy education materials for 90,000 civil servants",
  dek: "Helping a small learning-design team create trustworthy policy learning for 90,000 people, without removing professional judgement.",
  roleLabel: "Role & Summary",
  roleSummary:
    "As IBM Client Engineering's lead designer and engagement lead, I led a generative-AI proof of concept that helped learning designers from the Department for Work and Pensions create policy-learning content faster, while keeping human judgement in control.",
  heroImage: {
    src: "https://placehold.co/1169x732",
    alt: "Project GAiL product screenshot placeholder",
  },
  stats: [
    {
      label: "Time reduced",
      value: "20 mins",
      description: "From 130 hours, to produce one module",
      bgClass: "bg-[#CFF2BE]",
    },
    {
      label: "Style-guide match",
      value: "100%",
      description: "Of the generated output was in line with DWP's style guide",
      bgClass: "bg-[#EFDAFC]",
    },
    {
      label: "Accessibility met",
      value: "82%",
      description: "Of outputs met DWP's accessibility requirements",
      bgClass: "bg-[#FCDFC3]",
    },
  ],
};

export const gailChallenge: ChallengeSectionData = {
  eyebrow: "The Challenge",
  title: "Designing for a learning system under pressure",
  intro:
    "DWP's learning-design team was responsible for translating new and amended policy into learning for a workforce of 90,000. The stakes extended beyond internal training: civil servants needed accurate, usable guidance before they could support the public.",
  askLabel: "The real constraint: ",
  askHighlight:
    "with only around ten designers, the problem wasn't a lack of expertise — it was the sheer volume of repetitive, time-intensive work required to turn source policy into consistent learning materials, on top of an existing backlog of unrevised content.",
  challengeParagraph:
    "IBM Client Engineering was brought in to prove what was possible through a working build. IBM Consulting was already engaged with DWP on the broader programme, so I also had to keep the proof of concept aligned with the longer-term direction being shaped by a separate IBM team.",
  closingParagraph:
    "The question was never whether AI could generate content. It was whether it could make the team more effective without asking them to trust a black box.",
};

export const gailApproach: GailApproachSectionData = {
  eyebrow: "My Approach",
  title: "Starting with the designers' workflow, not the technology",
  topImage: { src: "https://placehold.co/734x453", alt: "Learning-designer journey mapping workshop placeholder" },
  paragraphs: [
    "I began by bringing DWP stakeholders into workshops and mapped two learning-designer journeys, to understand where time was being spent, where quality risk entered the process, and where generative AI could add value without removing the designer's professional judgement.",
    "The workshops moved beyond a broad request to “use AI to create learning.” Using the journeys and a big-ideas activity, we identified what the tool needed to do, where designers needed to intervene, and what confidence they'd need before trusting an output.",
    "The workshops surfaced a clear design principle: the product should accelerate the repetitive work of shaping source material into learning, while keeping the learning designer accountable for review and final judgement.",
  ],
  quote:
    "Mapping the work made the opportunity specific. The aim was not to automate content creation end-to-end, but to reduce the distance between policy source and a reviewable learning draft.",
  bottomImage: { src: "https://placehold.co/734x453", alt: "Workshop synthesis placeholder" },
};

export const gailCoCreation: GailCoCreationSectionData = {
  eyebrow: "Co-creation",
  title: "Making an unfamiliar capability discussable",
  subtitle:
    "This was an early generative-AI use case for the engagement, with unfamiliar patterns for both the client and the delivery team.",
  paragraphs: [
    "I worked with the technical team to understand what the technology could do, then used low-fidelity wireframes to make the proposed experience tangible before committing to high-fidelity design.",
    "The first wireframes were deliberately simple when presenting back to DWP. They gave stakeholders a shared language for discussing an unfamiliar capability before visual detail could distract from the product decisions: where policy would enter the workflow, how learning would be generated, where a designer could review it, and how the product could support several formats rather than one final output.",
    "This created a collaborative back-and-forth with DWP. I developed the work through low, mid, and high-fidelity stages, using each stage to test the right level of control, clarity, and confidence.",
  ],
  images: [
    { src: "https://placehold.co/737x512?text=Low-fi+wireframe", alt: "Low-fidelity wireframe placeholder" },
    { src: "https://placehold.co/737x512?text=Mid-fi+flow", alt: "Mid-fidelity flow placeholder" },
    { src: "https://placehold.co/737x512?text=High-fi+screen", alt: "High-fidelity screen placeholder" },
  ],
};

export const gailMainPriority: GailMainPrioritySectionData = {
  eyebrow: "My Key Design decision",
  title: "Making AI output reviewable, traceable, and human-led",
  subtitle: "The pivotal design decision was to make AI assistance visible and controllable at every stage.",
  paragraphs: [
    "I designed the workflow so designers could provide input progressively rather than jump straight to a final answer. Generated content was broken into paragraph-sized pieces, making it far easier to review than one long, opaque block of text. Selecting a paragraph surfaced the policy source and supporting documents behind it.",
    "I also made changes and versions visible, so designers could see what had been generated, what had changed, and what still required their judgement before it became live learning content.",
    "This wasn't a decorative trust feature — it was how I translated responsible use of generative AI into an interaction model. The tool did the heavy lifting; the learning designer stayed in control of the evidence, the wording, and the final output.",
  ],
  image: { src: "https://placehold.co/732x518", alt: "Paragraph-level review flow placeholder" },
  imageQuote: "Designers could validate each paragraph against policy, rather than accept a final output on trust.",
};

export const gailTeamAndBuild: WhatsNextSectionData = {
  eyebrow: "How I work with my design team & build team",
  title: "Designing and delivering the proof of concept",
  paragraphs: [
    "I led the engagement as well as the design — aligning DWP stakeholders, coordinating with IBM Consulting, and ensuring the proof of concept stayed useful to the longer-term programme rather than becoming an isolated experiment.",
    "I worked across the full experience: the workshops and journey maps, the UX, the visual design, the testing approach, and the final handover. The proof of concept was designed as a system for producing and reviewing different learning formats from the same policy source — not as a single-purpose text generator.",
    "The delivery work balanced two needs: make content creation materially faster, and preserve DWP's standards for policy accuracy, style, accessibility, and quality.",
  ],
};

export const gailOutcomes: GailOutcomesSectionData = {
  eyebrow: "Outcomes",
  title: "Validating speed without compromising quality",
  introLines: [
    "I tested the proof of concept with eight learning designers with varying levels of experience.",
    "The results showed a significant reduction in effort alongside strong quality and satisfaction signals.",
  ],
  tiles: [
    {
      kind: "stat",
      label: "Time reduced",
      value: "20 mins",
      description: "From 130 hours, to complete the entire education-creation lifecycle",
      bgClass: "bg-[#CFF2BE]",
    },
    {
      kind: "stat",
      label: "Style-guide match",
      value: "100%",
      description: "Of the generated output was in line with DWP's style guide",
      bgClass: "bg-[#EFDAFC]",
    },
    {
      kind: "stat",
      label: "Accessibility met",
      value: "82%",
      description: "Outputs met the DWP accessibility requirements",
      bgClass: "bg-[#FCDFC3]",
    },
    {
      kind: "stat",
      label: "Generated content",
      value: "99.8%",
      description: "Were very happy with the content generated",
      bgClass: "bg-[#F9F0B3]",
    },
    {
      kind: "quote",
      label: "DWP designer testimonial",
      quote: "I can now do in 20 minutes what would have previously taken 2 weeks",
      bgClass: "bg-[#FFD1EC]",
    },
    {
      kind: "stat",
      label: "Time saving",
      value: "15 minutes",
      description: "To create the core e-learning text and supporting materials required",
      bgClass: "bg-[#B7F1E7]",
    },
  ],
  closingParagraphs: [
    "Participants also reported that the tool was intuitive, quick to learn, and reassuring because the source content and style guidance remained visible.",
    "These results validated the core design decision: speed did not have to come at the cost of control, traceability, or learning quality.",
  ],
};

export const gailWhatsNext: WhatsNextSectionData = {
  eyebrow: "What happened next?",
  title: "From proof of concept to production",
  paragraphs: [
    "The proof of concept was handed to IBM Consulting to take forward as part of the longer-term engagement with DWP.",
    "The verified results established the basis for that transition: a faster content-creation workflow, source-backed review, and quality designers could trust.",
    "The longer-term value: reducing the learning backlog, lowering error, freeing time for innovation, enabling faster staff training, and reuse across government.",
  ],
};

export const gailReflections: ReflectionsSectionData = {
  image: { src: "https://placehold.co/1169x732", alt: "Reflections placeholder" },
  label: "Reflection",
  quote:
    "This project taught me that responsible generative AI is not principally about replacing a person's work. It is about designing the hand-offs between the technology and the person's judgement.",
  supporting:
    "For DWP, the most important product decision was not generation itself. It was making every output transparent enough for learning designers to remain accountable for what learners would eventually see.",
};

export const gailNextProject: NextProjectNavData = {
  label: "Next project",
  title: "HSBC: A Reimagined Banking App for Gen Z",
  href: "#", // TODO: replace with real case study link once it exists
  ctaLabel: "View case study →",
};
