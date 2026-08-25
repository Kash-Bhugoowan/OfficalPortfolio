import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyHeader from "@/components/case-studies/CaseStudyHeader";
import ChallengeSection from "@/components/case-studies/ChallengeSection";
import GailApproachSection from "@/components/case-studies/gail/ApproachSection";
import GailCoCreationSection from "@/components/case-studies/gail/CoCreationSection";
import GailMainPrioritySection from "@/components/case-studies/gail/MainPrioritySection";
import GailOutcomesSection from "@/components/case-studies/gail/OutcomesSection";
import WhatsNextSection from "@/components/case-studies/WhatsNextSection";
import ReflectionsSection from "@/components/case-studies/ReflectionsSection";
import NextProjectNav from "@/components/case-studies/NextProjectNav";
import {
  CaseStudyPageBackground,
  CaseStudyTopGradient,
  CaseStudyBottomGradient,
} from "@/components/case-studies/CaseStudyPageBackground";
import {
  gailCaseStudy,
  gailChallenge,
  gailApproach,
  gailCoCreation,
  gailMainPriority,
  gailTeamAndBuild,
  gailOutcomes,
  gailWhatsNext,
  gailReflections,
  gailNextProject,
} from "@/lib/case-studies/gail";

export default function GailCaseStudyPage() {
  return (
    <CaseStudyPageBackground>
      <div className="relative z-0">
        <CaseStudyTopGradient />
        <Nav />
        <CaseStudyHeader data={gailCaseStudy} />
      </div>
      <ChallengeSection data={gailChallenge} />
      <GailApproachSection data={gailApproach} />
      <GailCoCreationSection data={gailCoCreation} />
      <GailMainPrioritySection data={gailMainPriority} />
      <WhatsNextSection data={gailTeamAndBuild} />
      <GailOutcomesSection data={gailOutcomes} />
      <WhatsNextSection data={gailWhatsNext} />
      <ReflectionsSection data={gailReflections} />
      <NextProjectNav data={gailNextProject} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
