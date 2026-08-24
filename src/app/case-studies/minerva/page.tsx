import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import CaseStudyHeader from "@/components/case-studies/CaseStudyHeader";
import ChallengeSection from "@/components/case-studies/ChallengeSection";
import { minervaCaseStudy, minervaChallenge } from "@/lib/case-studies/minerva";

export default function MinervaCaseStudyPage() {
  return (
    <>
      <Nav />
      <CaseStudyHeader data={minervaCaseStudy} />
      <ChallengeSection data={minervaChallenge} />
      <Footer />
    </>
  );
}
