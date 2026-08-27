import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkillHeader from "@/components/skills/SkillHeader";
import PrinciplesSection from "@/components/skills/PrinciplesSection";
import ExperienceSection from "@/components/skills/ExperienceSection";
import ProcessSection from "@/components/skills/ProcessSection";
import ExampleFlowsSection from "@/components/skills/ExampleFlowsSection";
import {
  CaseStudyPageBackground,
  CaseStudyTopGradient,
  CaseStudyBottomGradient,
} from "@/components/case-studies/CaseStudyPageBackground";
import {
  workshopFacilitationHeader,
  workshopFacilitationPrinciples,
  workshopFacilitationExperience,
  workshopFacilitationProcess,
  workshopFacilitationExampleFlows,
  workshopFacilitationPrevious,
} from "@/lib/skills/workshop-facilitation";

export default function WorkshopFacilitationSkillPage() {
  return (
    <CaseStudyPageBackground>
      <CaseStudyTopGradient />
      <Nav />
      <SkillHeader data={workshopFacilitationHeader} previous={workshopFacilitationPrevious} />
      <ExperienceSection data={workshopFacilitationExperience} />
      <PrinciplesSection data={workshopFacilitationPrinciples} />
      <ProcessSection data={workshopFacilitationProcess} />
      <ExampleFlowsSection data={workshopFacilitationExampleFlows} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
