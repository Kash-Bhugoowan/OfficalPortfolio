import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkillHeader from "@/components/skills/SkillHeader";
import PrinciplesSection from "@/components/skills/PrinciplesSection";
import ProcessSection from "@/components/skills/ProcessSection";
import ExampleFlowsSection from "@/components/skills/ExampleFlowsSection";
import NextProjectNav from "@/components/case-studies/NextProjectNav";
import {
  CaseStudyPageBackground,
  CaseStudyTopGradient,
  CaseStudyBottomGradient,
} from "@/components/case-studies/CaseStudyPageBackground";
import {
  workshopFacilitationHeader,
  workshopFacilitationPrinciples,
  workshopFacilitationProcess,
  workshopFacilitationExampleFlows,
  workshopFacilitationPrevious,
  workshopFacilitationNext,
} from "@/lib/skills/workshop-facilitation";

export default function WorkshopFacilitationSkillPage() {
  return (
    <CaseStudyPageBackground>
      <div className="relative z-0">
        <CaseStudyTopGradient />
        <Nav />
        <SkillHeader data={workshopFacilitationHeader} previous={workshopFacilitationPrevious} />
      </div>
      <PrinciplesSection data={workshopFacilitationPrinciples} />
      <ProcessSection data={workshopFacilitationProcess} />
      <ExampleFlowsSection data={workshopFacilitationExampleFlows} />
      <NextProjectNav next={workshopFacilitationNext} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
