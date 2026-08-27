import { CASE_STUDY_SECTION_GAP_PX } from "@/lib/motion";
import {
  CASE_STUDY_EYEBROW,
  CASE_STUDY_TITLE,
  CASE_STUDY_BODY,
  CASE_STUDY_GAP_EYEBROW,
  CASE_STUDY_GAP_CONTENT,
  CASE_STUDY_GAP_BLOCK,
} from "@/lib/case-studies/styles";
import ImageCarousel, { type CarouselMedia } from "@/components/case-studies/ImageCarousel";

export type CoCreationMedia = CarouselMedia;

export type CoCreationSectionData = {
  eyebrow: string;
  title: string;
  paragraphs: string[];
  images: CoCreationMedia[];
};

export default function CoCreationSection({ data }: { data: CoCreationSectionData }) {
  const { eyebrow, title, paragraphs, images } = data;

  return (
    <section
      className="flex flex-col items-center px-6"
      style={{ marginTop: CASE_STUDY_SECTION_GAP_PX }}
    >
      <div
        className={`mx-auto grid w-full max-w-[1227px] grid-cols-1 items-end ${CASE_STUDY_GAP_BLOCK} md:grid-cols-2`}
      >
        <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
          <div className={`flex flex-col ${CASE_STUDY_GAP_EYEBROW}`}>
            <span className={CASE_STUDY_EYEBROW}>{eyebrow}</span>
            <h2 className={CASE_STUDY_TITLE}>{title}</h2>
          </div>
          <div className={`flex flex-col ${CASE_STUDY_GAP_CONTENT}`}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className={CASE_STUDY_BODY}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        <ImageCarousel media={images} />
      </div>
    </section>
  );
}
