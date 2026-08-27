import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ResumeHeader from "@/components/resume/ResumeHeader";
import ExperienceTimelineSection from "@/components/resume/ExperienceTimelineSection";
import ResumeListSection from "@/components/resume/ResumeListSection";
import {
  CaseStudyPageBackground,
  CaseStudyTopGradient,
  CaseStudyBottomGradient,
} from "@/components/case-studies/CaseStudyPageBackground";
import { resumeHeader, resumeExperience, resumeSkills, resumeTraining } from "@/lib/resume";

export default function ResumePage() {
  return (
    <CaseStudyPageBackground>
      <CaseStudyTopGradient />
      <Nav />
      <ResumeHeader data={resumeHeader} />
      <ExperienceTimelineSection data={resumeExperience} />
      <ResumeListSection data={resumeSkills} />
      <ResumeListSection data={resumeTraining} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
