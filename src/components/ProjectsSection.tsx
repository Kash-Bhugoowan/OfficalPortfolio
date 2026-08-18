import StickyCardStack from "@/components/StickyCardStack";
import type { Project } from "@/components/ProjectCard";

const projects: Project[] = [
  {
    id: "minerva",
    category: "Ministry of Defence",
    title: "Project Minerva: Fighting Intelligently",
    description:
      "A tool to support soldiers in planning high-stakes activity across time, resources, dependencies, and operational scenarios. I led the service-design and UX direction: translating complex handbooks and rules into an intuitive experience for the soldiers, whilst guiding the team through delivery.",
    image: "https://placehold.co/529x350",
    imageAspect: "landscape",
    tags: ["Automation", "Complex Systems", "UX & UI Design", "Workshop Facilitation"],
    stats: [
      { label: "Reduced error", value: "20%" },
      { label: "Increased efficiency", value: "80%" },
    ],
    bgClass: "bg-[#DFEFD7]",
    glowClass: "bg-lime-400",
    href: "#", // TODO: replace with real case study link
    widthClass: "w-full max-w-[93%]",
    shadowClass: "shadow-[0_8px_24px_0_rgba(36,31,43,0.08)]",
    tagOutlineClass: "outline-white",
  },
  {
    id: "gail",
    category: "Dept. for Work & Pensions",
    title: "Operation GAiL: Generative AI Learning & Development",
    description:
      "From dense policy to accessible learning content in minutes: designing an end-to-end generative AI tool for the UK Department for Work and Pensions' learning designers.",
    image: "https://placehold.co/529x350",
    imageAspect: "landscape",
    tags: [
      "Generative AI",
      "Workshop Facilitation",
      "Service Design",
      "Interaction design",
      "Design Strategy",
    ],
    stats: [
      { label: "Time reduced", value: "99.74%" },
      { label: "Successful content created", value: "99.8%" },
    ],
    bgClass: "bg-orange-100",
    glowClass: "bg-orange-400",
    href: "#", // TODO: replace with real case study link
    widthClass: "w-full max-w-[98%]",
    shadowClass: "shadow-[0_8px_24px_0_rgba(36,31,43,0.08)]",
    tagOutlineClass: "outline-white",
  },
  {
    id: "hsbc",
    category: "HSBC",
    title: "Rewiring Trust: A Reimagined Banking App for Gen Z",
    description:
      "Financial Coach was a design-led initiative between HSBC and IBM to make banking feel relevant, intuitive, and confidence-building for a generation underserved by traditional finance.",
    image: "https://placehold.co/489x472",
    imageAspect: "portrait",
    tags: [
      "Design Strategy",
      "Mobile UI",
      "Accessibility",
      "Design Thinking",
      "Senior C-Suite Stakeholder",
    ],
    bgClass: "bg-[#E7E0EB]",
    glowClass: "bg-purple-400",
    href: "#", // TODO: replace with real case study link
    widthClass: "w-full",
    shadowClass: "shadow-[0_8px_24px_0_rgba(36,31,43,0.08)]",
  },
];

export default function ProjectsSection() {
  return (
    // 42px top and bottom padding (left/right unchanged at px-6). Bottom
    // padding eats 1:1 into the sticky stack's available "stuck" room at
    // the true end of the page (see StickyCardStack's trailing spacer
    // comment), but the squeeze-compensation on each card reads its live
    // position and actively corrects for exactly this kind of shortfall,
    // so a modest, deliberate bottom padding is safe here.
    <section className="flex flex-col items-center px-6 py-[42px]">
      <div className="mx-auto w-full max-w-[1227px]">
        <StickyCardStack
          projects={projects}
          header={
            <div className="flex w-full flex-col items-center gap-2 text-center">
              <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]">
                Selected Work
              </span>
              <h2 className="text-4xl leading-[60px] text-accent">
                Projects that matter
              </h2>
              <p className="max-w-[867px] text-xl leading-8 text-text-secondary">
                A selection of client work spanning government, finance,
                defence, and emerging technology.
              </p>
            </div>
          }
        />
      </div>
    </section>
  );
}
