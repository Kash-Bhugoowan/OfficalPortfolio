import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyHeader from "@/components/case-studies/CaseStudyHeader";
import ChallengeSection from "@/components/case-studies/ChallengeSection";
import ApproachSection from "@/components/case-studies/ApproachSection";
import CoreUxSection from "@/components/case-studies/CoreUxSection";
import MainPrioritySection from "@/components/case-studies/MainPrioritySection";
import CoCreationSection from "@/components/case-studies/CoCreationSection";
import OutcomesSection from "@/components/case-studies/OutcomesSection";
import WhatsNextSection from "@/components/case-studies/WhatsNextSection";
import ReflectionsSection from "@/components/case-studies/ReflectionsSection";
import NextProjectNav from "@/components/case-studies/NextProjectNav";
import {
  CaseStudyPageBackground,
  CaseStudyTopGradient,
  CaseStudyBottomGradient,
} from "@/components/case-studies/CaseStudyPageBackground";
import {
  minervaCaseStudy,
  minervaChallenge,
  minervaApproach,
  minervaCoreUx,
  minervaMainPriority,
  minervaCoCreation,
  minervaOutcomes,
  minervaWhatsNext,
  minervaReflections,
  minervaNextProject,
} from "@/lib/case-studies/minerva";

export default function MinervaCaseStudyPage() {
  return (
    <CaseStudyPageBackground>
      <div className="relative z-0">
        <CaseStudyTopGradient />
        <Nav />
        <CaseStudyHeader data={minervaCaseStudy} />
      </div>
      <ChallengeSection data={minervaChallenge} />
      <ApproachSection data={minervaApproach} />
      <CoreUxSection data={minervaCoreUx} />
      <MainPrioritySection data={minervaMainPriority} />
      <CoCreationSection data={minervaCoCreation} />
      <OutcomesSection data={minervaOutcomes} />
      <WhatsNextSection data={minervaWhatsNext} />
      <ReflectionsSection data={minervaReflections} />
      <NextProjectNav data={minervaNextProject} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
