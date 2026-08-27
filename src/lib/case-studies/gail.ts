import type { CaseStudyHeaderData } from "@/components/case-studies/CaseStudyHeader";
import type { ChallengeSectionData } from "@/components/case-studies/ChallengeSection";
import type { GailApproachSectionData } from "@/components/case-studies/gail/ApproachSection";
import type { GailCoCreationSectionData } from "@/components/case-studies/gail/CoCreationSection";
import type { GailMainPrioritySectionData } from "@/components/case-studies/gail/MainPrioritySection";
import type { GailOutcomesSectionData } from "@/components/case-studies/gail/OutcomesSection";
import type { WhatsNextSectionData } from "@/components/case-studies/WhatsNextSection";
import type { ReflectionsSectionData } from "@/components/case-studies/ReflectionsSection";
import type {
  NextProjectNavData,
  PreviousProjectNavData,
} from "@/components/case-studies/NextProjectNav";

export const gailCaseStudy: CaseStudyHeaderData = {
  primaryTag: "UK Gov: Dept Work & Pensions",
  tags: ["Gen AI", "Lead designer", "Service design", "UX & UI design"],
  titleLight: "Project GAiL: ",
  titleBold: "Creating trustworthy education materials for 90,000 civil servants",
  dek: "Helping a small learning-design team create trustworthy policy learning for 90,000 people, without removing professional judgement.",
  roleLabel: "Role & Summary",
  roleSummary:
    "As IBM Client Engineering's lead designer and engagement lead, I led a generative-AI proof of concept that helped learning designers from the Department for Work and Pensions create policy-learning content faster, while keeping human judgement in control.",
  heroVideo: {
    src: "/images/Case_studies/GAiL/Hero%20Header.mov",
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
  topImage: {
    src: "/images/Case_studies/GAiL/myapproach1.png",
    alt: "Whiteboard journey map of the learning designer's current workflow, broken into steps, actions, and pain points using colour-coded sticky notes",
  },
  paragraphs: [
    "I began by bringing DWP stakeholders into workshops and mapped two learning-designer journeys, to understand where time was being spent, where quality risk entered the process, and where generative AI could add value without removing the designer's professional judgement.",
    "The workshops moved beyond a broad request to “use AI to create learning.” Using the journeys and a big-ideas activity, we identified what the tool needed to do, where designers needed to intervene, and what confidence they'd need before trusting an output.",
    "The workshops surfaced a clear design principle: the product should accelerate the repetitive work of shaping source material into learning, while keeping the learning designer accountable for review and final judgement.",
  ],
  quote:
    "Mapping the work made the opportunity specific. The aim was not to automate content creation end-to-end, but to reduce the distance between policy source and a reviewable learning draft.",
  bottomImage: {
    src: "/images/Case_studies/GAiL/myapproach2.png",
    alt: "Whiteboard synthesis of the proposed workflow, clustering research findings and improvement ideas by theme with colour-coded sticky notes",
  },
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
    {
      src: "/images/Case_studies/GAiL/Gallery%20Images/Image%20Gallery1.jpg",
      alt: "Early UI sketches for a mock login and document-upload flow, paired with user stories and prioritisation notes on outstanding product-owner questions",
    },
    {
      src: "/images/Case_studies/GAiL/Gallery%20Images/Image%20Gallery2.jpg",
      alt: "Detailed service-blueprint diagram mapping the three-part generation flow — input documents, generate & review outline, generate & review content — with supporting features and user stories",
    },
    {
      src: "/images/Case_studies/GAiL/Gallery%20Images/Image%20Gallery3.jpg",
      alt: "Workshop board playing back the to-be user journey across seven steps, from inputting a commissioning document through to export",
    },
    {
      src: "/images/Case_studies/GAiL/Gallery%20Images/Image%20Gallery4.jpg",
      alt: "Flow diagram linking the homepage and step-by-step content-generation screens to the underlying prompt design and RAG architecture — source documents, LLM summarisation prompts, and Postgres/Milvus storage",
    },
    {
      src: "/images/Case_studies/GAiL/Gallery%20Images/Image%20Gallery%205.jpg",
      alt: "Mid-fidelity wireframe of the module outline screen with an open version-history panel, annotated to show where output type can be changed",
    },
    {
      src: "/images/Case_studies/GAiL/Gallery%20Images/Image%20Gallery%206.jpg",
      alt: "Wireframe of the paragraph-by-paragraph content review screen, pairing generated text with reading time, key points, and knowledge sources used",
    },
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
  image: {
    src: "/images/Case_studies/GAiL/My%20Design%20Decision.png",
    alt: "Screenshot of the Review Generated Learning screen, showing paragraph-by-paragraph content review with policy source extracts and a knowledge-sources panel",
  },
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
  video: { src: "/images/Case_studies/GAiL/Reflection.mov" },
  label: "Reflection",
  quote:
    "This project taught me that responsible generative AI is not principally about replacing a person's work. It is about designing the hand-offs between the technology and the person's judgement.",
  supporting:
    "For DWP, the most important product decision was not generation itself. It was making every output transparent enough for learning designers to remain accountable for what learners would eventually see.",
};

export const gailPreviousProject: PreviousProjectNavData = {
  label: "Previous Case Study",
  title: "Project Minerva",
  href: "/case-studies/minerva",
};

export const gailNextProject: NextProjectNavData = {
  label: "Next project",
  title: "HSBC Financial Coach",
  href: "/case-studies/hsbc",
  ctaLabel: "View case study →",
};
