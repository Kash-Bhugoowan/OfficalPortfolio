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
import PageTransition from "@/components/PageTransition";
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
  gailPreviousProject,
  gailNextProject,
} from "@/lib/case-studies/gail";

export default function GailCaseStudyPage() {
  return (
    <CaseStudyPageBackground>
      <CaseStudyTopGradient />
      <Nav />
      <PageTransition>
        <CaseStudyHeader data={gailCaseStudy} previous={gailPreviousProject} />
        <ChallengeSection data={gailChallenge} />
        <GailApproachSection data={gailApproach} />
        <GailCoCreationSection data={gailCoCreation} />
        <GailMainPrioritySection data={gailMainPriority} />
        <WhatsNextSection data={gailTeamAndBuild} />
        <GailOutcomesSection data={gailOutcomes} />
        <WhatsNextSection data={gailWhatsNext} />
        <ReflectionsSection data={gailReflections} />
        <NextProjectNav next={gailNextProject} />
        <Footer />
      </PageTransition>
      <CaseStudyBottomGradient />
    </CaseStudyPageBackground>
  );
}
