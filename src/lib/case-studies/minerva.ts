import type { CaseStudyHeaderData } from "@/components/case-studies/CaseStudyHeader";
import type { ChallengeSectionData } from "@/components/case-studies/ChallengeSection";
import type { ApproachSectionData } from "@/components/case-studies/ApproachSection";
import type { CoreUxSectionData } from "@/components/case-studies/CoreUxSection";
import type { MainPrioritySectionData } from "@/components/case-studies/MainPrioritySection";

export const minervaCaseStudy: CaseStudyHeaderData = {
  eyebrow: "Selected work | CASE STUDY",
  primaryTag: "Ministry of defence",
  tags: ["Automation", "AI / ML", "Service Design", "UX Research"],
  titleLight: "Project Minerva: ",
  titleBold: "Designing an AI Workflow for Operational Reality",
  dek: "Creating a tool that turns complex handbook guidance and war-room planning into a faster, more confident operational workflow.",
  roleLabel: "Role & Summary",
  roleSummary:
    "As senior product designer, I led the service design and UX for Project Minerva, working with military engineers and guiding two junior designers. The aim was to turn complex military planning guidance into a usable AI-enabled task workflow without disconnecting it from the reality of the war room.",
  heroImage: {
    src: "https://placehold.co/1169x732",
    alt: "Project Minerva product screenshot placeholder",
  },
  stats: [
    {
      label: "Time reduced",
      value: "83%",
      description: "From 90 minutes to 15 to produce a single plan",
      bgClass: "bg-[#DFEFD7]",
      glowClass: "bg-lime-600",
    },
    {
      label: "Error reduced",
      value: "93%",
      description: "Reduced planning mistakes lead to increased plan accuracy & quality",
      bgClass: "bg-zinc-200",
      glowClass: "bg-purple-400",
    },
    {
      label: "Adoption",
      value: "1-5 min",
      description: "Soldiers were able to adopt the tool within minutes",
      bgClass: "bg-orange-100",
      glowClass: "bg-orange-500",
    },
  ],
};

export const minervaChallenge: ChallengeSectionData = {
  eyebrow: "The Challenge",
  title: "Designing for the reality of operational planning",
  intro:
    "Battle Group Engineers plan and coordinate activity in demanding operational environments. Their work involves time-critical tasks, specialist handbook guidance, briefings, resource allocation, and changing dependencies.",
  askLabel: "The ask for IBM: ",
  askHighlight:
    "Demonstrate how technology could support this work without flattening its complexity.",
  challengeParagraph:
    "The challenge was not simply to make planning “easier.” The tool had to work within the reality of a war room: high cognitive load, established ways of working, complex rule logic, constrained environments, and decisions that depended on seeing the wider plan.",
  closingParagraph:
    "A simplified interface could still fail if it removed the context the soldiers needed to do their work safely and confidently.",
};

export const minervaApproach: ApproachSectionData = {
  eyebrow: "My Approach",
  title: "Starting with the work, not the interface",
  columns: [
    {
      image: { src: "https://placehold.co/733x453", alt: "Service design workshop placeholder" },
      paragraph:
        "I facilitated workshops with military engineers and mapped how tasks, decisions, and guidance moved through the operational environment. This service-design work gave the team a shared view of the people, systems, handbooks, constraints, and handovers behind the screens.",
    },
    {
      image: { src: "https://placehold.co/732x453", alt: "Research synthesis placeholder" },
      paragraph:
        "The research changed the product direction. Instead of attempting to automate every activity, we focused on the points where engineers most needed support: creating tasks, following structured guidance, and coordinating work without losing sight of the wider scenario.",
    },
  ],
  fieldObservation: {
    eyebrow: "Field observation",
    image: { src: "https://placehold.co/733x453", alt: "Field observation placeholder" },
    introPrefix: "Whilst observing the soldiers, a ",
    introHighlight: "key insight",
    introSuffix: " emerged: ",
    quote:
      "Engineers already plan through timelines. Tasks are not isolated entries; they sit within a live operational picture. Their sequence, dependencies, timing, and resourcing all matter.",
    closing:
      "That insight shaped the product direction. Rather than designing a generic task-management tool, we set out to create an experience that could support live operational planning while preserving the context engineers relied on.",
  },
};

export const minervaCoreUx: CoreUxSectionData = {
  eyebrow: "Core UX",
  title: "Turning complex guidance into a focused blueprint",
  image: { src: "https://placehold.co/1527x957", alt: "Core UX interface placeholder" },
  intro:
    "The solution needed to make handbook-led guidance easier to use while keeping it connected to the work it informed. The most difficult part of the experience was the right-hand navigation and “Add Task flow”. This was where the soldiers needed to turn complex handbook guidance into practical tasks.",
  quote:
    "I owned the UX for this flow, mapping intricate operations into a sequence soldiers could understand and act on. We could not build every military task or activity into the MVP. I worked with the product owner to narrow the scope to high-value scenarios, giving us enough depth to prove the approach without spreading the build too thinly. Focusing on representative scenarios let us test whether live planning and handbook guidance could work together before attempting to model every possible activity.",
};

export const minervaMainPriority: MainPrioritySectionData = {
  eyebrow: "My main priority",
  title: "Designing the brain of the tool",
  subtitle: "The right-hand “Add Task Flow” became the tool's mental model.",
  paragraphs: [
    "The Add Task flow became the most important interaction in the product and was my main priority during the project.",
    "My key design move was to keep the operational timeline in constant view. My position was that soldiers needed to remain in the main planning-table context while adding a task.",
    "A task has timing, dependencies, resources, and consequences for the wider plan. Moving someone away from that view risked making a high-stakes planning task harder, not easier.",
  ],
  image: { src: "https://placehold.co/596x727", alt: "Add Task flow placeholder" },
  pushback: {
    eyebrow: "Managing Design Pushback",
    image: { src: "https://placehold.co/732x494", alt: "Design pushback prototype placeholder" },
    paragraphs: [
      "An internal IBM stakeholder proposed an alternative approach. Rather than simply reject it, I prototyped both directions and made the usability trade-off visible to the soldiers.",
      "The soldiers could then make an informed decision. We retained my design direction, with the left-hand navigation.",
    ],
    quote:
      "I prototyped to protect an evidenced user need, while giving stakeholders a clear basis for the decision.",
  },
};
