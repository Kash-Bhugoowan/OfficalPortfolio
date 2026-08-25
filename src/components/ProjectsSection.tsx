import StickyCardStack from "@/components/StickyCardStack";
import type { Project } from "@/components/ProjectCard";

const projects: Project[] = [
  {
    id: "minerva",
    category: "Ministry of Defence",
    title: "Project Minerva: Fighting Intelligently",
    description:
      "A tool to support soldiers in planning high-stakes activity across time, resources, dependencies, and operational scenarios. I led the service-design and UX direction: translating complex handbooks and rules into an intuitive experience for the soldiers, whilst guiding the team through delivery.",
    image: "/images/home_gallery/home_usecases/minvera2.png",
    imageAspectRatio: "1643/957",
    tags: ["Automation", "Complex Systems", "UX & UI Design", "Workshop Facilitation"],
    stats: [
      { label: "Reduced error", value: "20%" },
      { label: "Increased efficiency", value: "80%" },
    ],
    // Mobile-only colors (base classes) override to the original desktop
    // ones at md+ — same pattern used elsewhere for mobile-vs-desktop
    // values that must never cross-contaminate.
    bgClass: "bg-[#CBEEA6] md:bg-[#DFEFD7]",
    glowClass: "bg-[#C6EB9E] md:bg-lime-400",
    href: "/case-studies/minerva",
    widthClass: "w-full max-w-[93%]",
    shadowClass: "shadow-[0_8px_24px_0_rgba(36,31,43,0.08)]",
    tagOutlineClass: "outline-white",
    // Desktop-only: aligns Minerva's image column with its title. Must
    // not apply on mobile (compact layout), where all three cards need
    // identical, unmodified spacing between title/body/image.
    imageColumnOffsetClass: "md:mt-[60px]",
  },
  {
    id: "gail",
    category: "Dept. for Work & Pensions",
    title: "Operation GAiL: Generative AI Learning & Development",
    description:
      "From dense policy to accessible learning content in minutes: designing an end-to-end generative AI tool for the UK Department for Work and Pensions' learning designers.",
    image: "/images/home_gallery/home_usecases/gail2.png",
    imageAspectRatio: "1570/1002",
    tags: [
      "Generative AI",
      "Workshop Facilitation",
      "Service Design",
      "Interaction design",
      "Design Strategy",
    ],
    stats: [
      { label: "Time reduced", value: "20 mins" },
      { label: "Designers very happy", value: "99.8%" },
    ],
    bgClass: "bg-[#FFD8A5] md:bg-orange-100",
    glowClass: "bg-[#FFD399] md:bg-orange-400",
    href: "/case-studies/gail",
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
    image: "/images/home_gallery/home_usecases/hsbc2.png",
    imageAspectRatio: "1279/1230",
    tags: [
      "Design Strategy",
      "Mobile UI",
      "Accessibility",
      "Design Thinking",
      "Senior C-Suite Stakeholder",
    ],
    bgClass: "bg-[#E8C5F9] md:bg-[#EAD9F3]",
    glowClass: "bg-[#E2C2F1] md:bg-purple-400",
    href: "#", // TODO: replace with real case study link
    widthClass: "w-full",
    shadowClass: "shadow-[0_8px_24px_0_rgba(36,31,43,0.08)]",
  },
];

export default function ProjectsSection() {
  return (
    // Standard site-wide section padding: 37px top and bottom on mobile,
    // 54px on desktop (left/right unchanged at px-6) — half of the
    // intended inter-section gap, so this section's top padding combines
    // with Hero's bottom padding above it to the full gap (74px mobile,
    // 108px desktop). Bottom padding eats 1:1 into the sticky stack's
    // available "stuck" room at the true end of the page (see
    // StickyCardStack's trailing spacer comment), but the
    // squeeze-compensation on each card reads its live position and
    // actively corrects for exactly this kind of shortfall, so a modest,
    // deliberate bottom padding is safe here.
    <section className="flex flex-col items-center px-6 py-[37px] md:py-[54px]">
      <div className="mx-auto w-full max-w-[1227px]">
        <StickyCardStack
          projects={projects}
          header={
            <div className="flex w-full flex-col items-center gap-2 text-center">
              {/*
                Site-wide "eyebrow + title" spacing standard: 4px between
                the small uppercase eyebrow label and the title beneath it
                (tighter than the 8px used between title and body text
                below it, via the parent's gap-2) — reuse this -mt-1 on the
                title wherever this eyebrow+title pattern appears again.
              */}
              <span className="text-xs font-semibold tracking-wider text-text-secondary uppercase font-[family-name:var(--font-dm-sans)]">
                Selected Work
              </span>
              <h2 className="-mt-1 text-4xl leading-[60px] text-accent">
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
