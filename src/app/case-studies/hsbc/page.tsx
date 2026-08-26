import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import HsbcHeaderSection from "@/components/case-studies/hsbc/HeaderSection";
import ChallengeSection from "@/components/case-studies/ChallengeSection";
import GailApproachSection from "@/components/case-studies/gail/ApproachSection";
import HsbcVisionSection from "@/components/case-studies/hsbc/VisionSection";
import HsbcNorthStarSection from "@/components/case-studies/hsbc/NorthStarSection";
import HsbcResponsibilitiesSection from "@/components/case-studies/hsbc/ResponsibilitiesSection";
import HsbcOutcomeSection from "@/components/case-studies/hsbc/OutcomeSection";
import HsbcWhatsNextSection from "@/components/case-studies/hsbc/WhatsNextSection";
import ReflectionsSection from "@/components/case-studies/ReflectionsSection";
import NextProjectNav from "@/components/case-studies/NextProjectNav";
import {
  CaseStudyPageBackground,
  CaseStudyTopGradient,
  CaseStudyBottomGradient,
} from "@/components/case-studies/CaseStudyPageBackground";
import {
  hsbcCaseStudy,
  hsbcChallenge,
  hsbcApproach,
  hsbcVision,
  hsbcNorthStar,
  hsbcResponsibilities,
  hsbcOutcome,
  hsbcWhatsNext,
  hsbcReflections,
  hsbcPreviousProject,
  hsbcSkillShowcase,
} from "@/lib/case-studies/hsbc";

export default function HsbcCaseStudyPage() {
  return (
    <CaseStudyPageBackground>
      <div className="relative z-0">
        <CaseStudyTopGradient />
        <Nav />
        <HsbcHeaderSection data={hsbcCaseStudy} previous={hsbcPreviousProject} />
      </div>
      <ChallengeSection data={hsbcChallenge} />
      <GailApproachSection data={hsbcApproach} />
      <HsbcVisionSection data={hsbcVision} />
      <HsbcNorthStarSection data={hsbcNorthStar} />
      <HsbcResponsibilitiesSection data={hsbcResponsibilities} />
      <HsbcOutcomeSection data={hsbcOutcome} />
      <HsbcWhatsNextSection data={hsbcWhatsNext} />
      <ReflectionsSection data={hsbcReflections} />
      <NextProjectNav next={hsbcSkillShowcase} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
