import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkillHeader from "@/components/skills/SkillHeader";
import PrinciplesSection from "@/components/skills/PrinciplesSection";
import ExperienceSection from "@/components/skills/ExperienceSection";
import ProcessSection from "@/components/skills/ProcessSection";
import ExampleFlowsSection from "@/components/skills/ExampleFlowsSection";
import NextProjectNav from "@/components/case-studies/NextProjectNav";
import {
  CaseStudyPageBackground,
  CaseStudyTopGradient,
  CaseStudyBottomGradient,
} from "@/components/case-studies/CaseStudyPageBackground";
import { SKILL_HEADER_TO_BODY_GAP_PX } from "@/lib/skills/styles";
import {
  workshopFacilitationHeader,
  workshopFacilitationPrinciples,
  workshopFacilitationExperience,
  workshopFacilitationProcess,
  workshopFacilitationExampleFlows,
  workshopFacilitationPrevious,
  workshopFacilitationNext,
} from "@/lib/skills/workshop-facilitation";

export default function WorkshopFacilitationSkillPage() {
  return (
    <CaseStudyPageBackground>
      <CaseStudyTopGradient />
      <Nav />
      <SkillHeader data={workshopFacilitationHeader} previous={workshopFacilitationPrevious} />
      <ExperienceSection
        data={workshopFacilitationExperience}
        marginTopPx={SKILL_HEADER_TO_BODY_GAP_PX}
      />
      <PrinciplesSection data={workshopFacilitationPrinciples} />
      <ProcessSection data={workshopFacilitationProcess} />
      <ExampleFlowsSection data={workshopFacilitationExampleFlows} />
      <NextProjectNav next={workshopFacilitationNext} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
