import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyHeader from "@/components/case-studies/CaseStudyHeader";
import ChallengeSection from "@/components/case-studies/ChallengeSection";
import ApproachSection from "@/components/case-studies/ApproachSection";
import CoreUxSection from "@/components/case-studies/CoreUxSection";
import MainPrioritySection from "@/components/case-studies/MainPrioritySection";
import CoCreationSection from "@/components/case-studies/CoCreationSection";
import OutcomesSection from "@/components/case-studies/OutcomesSection";
import {
  minervaCaseStudy,
  minervaChallenge,
  minervaApproach,
  minervaCoreUx,
  minervaMainPriority,
  minervaCoCreation,
  minervaOutcomes,
} from "@/lib/case-studies/minerva";

export default function MinervaCaseStudyPage() {
  return (
    <>
      <Nav />
      <CaseStudyHeader data={minervaCaseStudy} />
      <ChallengeSection data={minervaChallenge} />
      <ApproachSection data={minervaApproach} />
      <CoreUxSection data={minervaCoreUx} />
      <MainPrioritySection data={minervaMainPriority} />
      <CoCreationSection data={minervaCoCreation} />
      <OutcomesSection data={minervaOutcomes} />
      <Footer />
    </>
  );
}
