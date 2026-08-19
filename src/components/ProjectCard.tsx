import Image from "next/image";

export type Project = {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  // Exact width/height ratio of the source image (e.g. "1643/957") — the
  // bounding box is sized to match it precisely, so the image fills it
  // completely with no cropping and no letterboxing.
  imageAspectRatio: string;
  tags: string[];
  stats?: { label: string; value: string }[];
  bgClass: string;
  glowClass: string;
  href: string;
  widthClass: string;
  shadowClass: string;
  tagOutlineClass?: string;
  // Optional extra offset for the image+stats column, when a specific
  // card needs its image pushed down relative to the text column.
  imageColumnOffsetClass?: string;
};

export default function ProjectCard({
  project,
  compact = false,
}: {
  project: Project;
  // Mobile-only simplified layout (used by MobileProjectCard): no tags,
  // no stats, CTA button moves under the image. Desktop's usage never
  // passes this, so its layout/content is completely unaffected.
  compact?: boolean;
}) {
  const {
    category,
    title,
    description,
    image,
    imageAspectRatio,
    tags,
    stats,
    bgClass,
    glowClass,
    href,
    widthClass,
    shadowClass,
    tagOutlineClass = "outline-border",
    imageColumnOffsetClass = "",
  } = project;

  return (
    <div className={`mx-auto ${widthClass}`}>
      <div
        className={`relative overflow-hidden rounded-[32px] ${bgClass} ${shadowClass} p-8 sm:p-10`}
        // On mobile, an ancestor (MobileProjectCard's wrapper) applies a
        // continuous scroll-linked `scale` transform, which promotes it to
        // its own GPU compositing layer every frame while scrolling. If
        // this card doesn't have a stable layer of its own, its rounded
        // clip mask can get recomposited incorrectly as the ancestor's
        // layer changes — losing the curve at a corner. `translateZ(0)`
        // gives the card a fixed, persistent layer that isn't at the
        // mercy of the ancestor's constantly-changing one.
        style={{ transform: "translateZ(0)" }}
      >
        {/*
          The glow is a fixed-size box regardless of viewport, but mobile
          cards are much narrower than desktop ones — at a ~390px-wide
          card, a 500px glow overhangs the left edge dramatically, meaning
          the browser has to correctly clip a large amount of blurred
          content just past the boundary. Confirmed empirically that the
          corner bug is width-dependent (fine at 552px viewport, broken at
          narrower ones) — shrinking the glow on mobile so it doesn't
          overhang nearly as much directly reduces how much clipping the
          renderer has to get right, independent of the compositing-layer
          mitigations below. Desktop's cards are wide enough that 500px
          was never dramatically oversized, so it's untouched there.

          Also given its own dedicated overflow-hidden + matching
          border-radius boundary at the same level it's rasterized on,
          rather than relying solely on the outer element's clip.
        */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]">
          <div
            className={`absolute -top-24 right-0 size-[280px] rounded-full opacity-20 blur-2xl md:size-[500px] ${glowClass}`}
          />
        </div>

        <div className="relative flex flex-col gap-8 md:flex-row md:items-start md:justify-between md:gap-10">
          <div className="flex flex-col items-start gap-6 md:max-w-sm">
            <span className="rounded-full bg-zinc-800/30 px-3 py-[5px] text-xs font-semibold tracking-wide text-white/90 uppercase outline outline-1 -outline-offset-1 outline-white/20 font-[family-name:var(--font-dm-sans)]">
              {category}
            </span>

            <h3 className="text-3xl leading-10 font-medium text-zinc-800">
              {title}
            </h3>

            {!compact && (
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
            )}

            <p className="text-lg leading-7 text-zinc-800">{description}</p>

            {!compact && (
              <a
                href={href} // TODO: replace with real case study link
                className="rounded-full bg-accent px-8 py-3 text-sm font-semibold text-white"
              >
                View Case Study
              </a>
            )}
          </div>

          <div className={`flex flex-col gap-6 md:w-[45%] md:shrink-0 ${imageColumnOffsetClass}`}>
            <div
              className="relative w-full overflow-hidden rounded-2xl"
              style={{ aspectRatio: imageAspectRatio.replace("/", " / ") }}
            >
              <Image src={image} alt={title} fill className="object-cover" unoptimized />
            </div>

            {compact ? (
              <a
                href={href} // TODO: replace with real case study link
                className="rounded-full bg-accent px-8 py-3 text-center text-sm font-semibold text-white"
              >
                View Case Study
              </a>
            ) : (
              stats && (
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
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
