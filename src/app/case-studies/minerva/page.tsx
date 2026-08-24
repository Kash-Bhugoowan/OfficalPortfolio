import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyHeader from "@/components/case-studies/CaseStudyHeader";
import ChallengeSection from "@/components/case-studies/ChallengeSection";
import ApproachSection from "@/components/case-studies/ApproachSection";
import { minervaCaseStudy, minervaChallenge, minervaApproach } from "@/lib/case-studies/minerva";

export default function MinervaCaseStudyPage() {
  return (
    <>
      <Nav />
      <CaseStudyHeader data={minervaCaseStudy} />
      <ChallengeSection data={minervaChallenge} />
      <ApproachSection data={minervaApproach} />
      <Footer />
    </>
  );
}
