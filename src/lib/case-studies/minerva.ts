import type { CaseStudyHeaderData } from "@/components/case-studies/CaseStudyHeader";
import type { ChallengeSectionData } from "@/components/case-studies/ChallengeSection";

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
