import Image from "next/image";

export type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  imageAspect: "landscape" | "portrait";
  tags: string[];
  stats?: { label: string; value: string }[];
  bgClass: string;
  glowClass: string;
  href: string;
  widthClass: string;
  shadowClass: string;
  tagOutlineClass?: string;
};

export default function ProjectCard({ project }: { project: Project }) {
  const {
    category,
    title,
    description,
    image,
    imageAspect,
    tags,
    stats,
    bgClass,
    glowClass,
    href,
    widthClass,
    shadowClass,
    tagOutlineClass = "outline-border",
  } = project;

  return (
    <div className={`mx-auto ${widthClass}`}>
      <div
        className={`relative overflow-hidden rounded-[32px] ${bgClass} ${shadowClass} p-8 sm:p-10`}
        // Forces Safari to composite this element on its own GPU layer.
        // Without it, a `position: sticky` ancestor that's actively
        // stuck can leave Safari's border-radius clip mask stale on one
        // corner (a known WebKit bug), rendering it square.
        style={{ transform: "translateZ(0)" }}
      >
        <div
          className={`pointer-events-none absolute -top-24 right-0 size-[500px] rounded-full opacity-20 blur-2xl ${glowClass}`}
        />

        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex flex-col items-start gap-6 md:max-w-sm">
            <span className="rounded-full bg-zinc-800/30 px-3 py-[5px] text-xs font-semibold tracking-wide text-white/90 uppercase outline outline-1 -outline-offset-1 outline-white/20 font-[family-name:var(--font-dm-sans)]">
              {category}
            </span>

            <h3 className="text-3xl leading-10 font-medium text-zinc-800">
              {title}
            </h3>

            <div className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className={`rounded-full bg-stone-50/90 px-3 py-1 text-xs font-medium tracking-wide text-text-secondary uppercase outline outline-1 -outline-offset-1 font-[family-name:var(--font-dm-sans)] ${tagOutlineClass}`}
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-lg leading-7 text-zinc-800">{description}</p>

            <a
              href={href} // TODO: replace with real case study link
              className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white"
            >
              View Case Study
            </a>
          </div>

          <div className="flex flex-col gap-6 md:w-[45%] md:shrink-0">
            <div
              className={
                imageAspect === "portrait"
                  ? "relative aspect-[489/472] w-full overflow-hidden rounded-lg"
                  : "relative aspect-[529/350] w-full overflow-hidden rounded-lg"
              }
            >
              <Image src={image} alt={title} fill className="object-cover" unoptimized />
            </div>

            {stats && (
              <div className="flex items-center gap-14">
                {stats.map((stat) => (
                  <div key={stat.label} className="flex flex-col gap-4">
                    <span className="text-xl leading-8 text-text-secondary">
                      {stat.label}
                    </span>
                    <span className="text-3xl leading-10 font-light text-foreground">
                      {stat.value}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
