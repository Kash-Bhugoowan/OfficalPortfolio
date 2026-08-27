import type { ResumeHeaderData } from "@/components/resume/ResumeHeader";
import type { ResumeExperienceSectionData } from "@/components/resume/ExperienceTimelineSection";
import type { ResumeListSectionData } from "@/components/resume/ResumeListSection";

export const resumeHeader: ResumeHeaderData = {
  title: "My Resume",
  eyebrowRole: "Senior Product Designer",
  eyebrowMeta: "7+ Years ・ IBM",
  description:
    "I turn ambiguous, complex problems into clear, intuitive solutions through rapid prototyping and deep user insight. My most recent position is design lead for IBM's Public & Defence client engineering squad.",
  primaryCta: { label: "Download CV", href: "/resume/karishma-bhugoowan-cv.pdf" },
  secondaryCta: { label: "Connect on LinkedIn", href: "https://www.linkedin.com/in/karishma-bhugoowan/" },
  stats: [
    {
      label: "Experience",
      value: "7+ years",
      description: "across defence, healthcare & telecoms",
      bgClass: "bg-yellow-100",
    },
    {
      label: "My contributions to the bottom line",
      value: "Secured 2 major contracts for the MoD",
      bgClass: "bg-emerald-100",
    },
    {
      label: "Workshops facilitation",
      value: "100+",
      description: "Certified Enterprise Design Thinking coach",
      bgClass: "bg-pink-200",
    },
  ],
};

export const resumeExperience: ResumeExperienceSectionData = {
  eyebrow: "The short version",
  title: "Where I have worked",
  items: [
    {
      dateRange: "Jul 2021 — Present",
      title: "Senior Product Designer — Generative AI & Design Strategy",
      company: "IBM Client Engineering · London",
      description:
        "Design lead for IBM's Client Engineering Public & Defence squad, taking emerging technology from concept to MVP. Promoted Junior → Associate → Senior, the last after a £1B Ministry of Defence contract win.",
    },
    {
      dateRange: "Jul 2019 — Oct 2020",
      title: "UX & UI Design Consultant",
      company: "IBM iX · London",
      description:
        "Cross-industry delivery for Abcam Pharmaceuticals, Liverpool Football Club and Raise Green, plus an end-to-end, accessible design system for a healthcare client.",
    },
  ],
};

export const resumeSkills: ResumeListSectionData = {
  eyebrow: "Skills & tools",
  title: "What I work with",
  rows: [
    {
      label: "Core UX & product",
      items: [
        "UX & UI design",
        "Interaction design",
        "Information architecture",
        "Wireframing",
        "Rapid prototyping",
        "Responsive design",
        "Design systems",
        "WCAG & inclusive design",
      ],
    },
    {
      label: "Research & strategy",
      items: [
        "Stakeholder mapping",
        "Service design",
        "Journey mapping",
        "User story mapping",
        "MVP definition",
        "Workshop facilitation",
        "Enterprise Design Thinking",
        "Innovation Days",
        "Design leadership",
      ],
    },
    {
      label: "AI",
      items: [
        "Generative AI design principles",
        "Conversational design",
        "Responsible & ethical AI",
        "Agentic UX",
        "AI prototyping",
        "Prompting",
        "Vibe coding",
      ],
    },
    {
      label: "Tools",
      items: ["Figma", "Framer", "Vercel", "Miro", "Adobe", "Notion", "Monday", "AI coding agents", "VS Code"],
    },
  ],
};

export const resumeTraining: ResumeListSectionData = {
  eyebrow: "Training & recognition",
  title: "How I trained, and what came of it",
  rows: [
    {
      label: "Certification",
      items: [
        "Certified IBM Enterprise Design Thinking Coach",
        "Enterprise Design Thinking for AI",
        "IBM Global Sales School",
        "UX BrainStation Design",
      ],
    },
    {
      label: "Education",
      items: ["BA (2:1) Industrial Design & Technology — Brunel University London"],
    },
    {
      label: "Recognition",
      items: [
        "IBM Rising Star, Q1 2023",
        "IBM Client Engineering Top Talent Programme 2022",
        "Interviewed by the Financial Times on putting people first with AI",
        "Panellist and mentor for Women in Tech",
      ],
    },
  ],
};
