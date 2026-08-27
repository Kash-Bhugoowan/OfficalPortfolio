import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_SUBTITLE,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_TIGHT,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
} from "@/lib/case-studies/styles";
import ImageCarousel from "@/components/case-studies/ImageCarousel";

// GAiL-specific "Co-creation" layout: the image gallery top-aligns with
// the body copy (items-start) rather than Minerva's CoCreationSection,
// which bottom-aligns the gallery against the text column (items-end).
// The first paragraph reads as a subtitle directly under the title (same
// CASE_STUDY_SUBTITLE treatment as MainPrioritySection), not as the first
// item in the paragraphs column. Same gallery mechanics otherwise.
export type GailCoCreationSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  paragraphs: string[];
  images: { src: string; alt: string }[];
};

export default function GailCoCreationSection({ data }: { data: GailCoCreationSectionData }) {
  const { eyebrow, title, subtitle, paragraphs, images } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div className={`mx-auto flex w-full max-w-[1227px] flex-col ${CASE_STUDY_GAP_CONTENT}`}>
        <div className={`flex flex-col ${CASE_STUDY_GAP_TIGHT}`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
            <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
            <h2 className={CASE_STUDY_TITLE}>{title}</h2>
          </div>
          <p className={CASE_STUDY_SUBTITLE}>{subtitle}</p>
        </div>

        <div className={`grid grid-cols-1 items-start ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={CASE_STUDY_BODY}>
                {paragraph}
              </p>
            ))}
          </div>

          <ImageCarousel media={images} objectFit="contain" />
        </div>
      </div>
    </section>
  );
}
