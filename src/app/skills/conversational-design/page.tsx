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
import PageTransition from "@/components/PageTransition";
import {
  conversationalDesignHeader,
  conversationalDesignPrinciples,
  conversationalDesignProcess,
  conversationalDesignExampleFlows,
  conversationalDesignPrevious,
  conversationalDesignNext,
} from "@/lib/skills/conversational-design";

export default function ConversationalDesignSkillPage() {
  return (
    <CaseStudyPageBackground>
      <CaseStudyTopGradient />
      <Nav />
      <PageTransition>
        <SkillHeader data={conversationalDesignHeader} previous={conversationalDesignPrevious} />
        <PrinciplesSection data={conversationalDesignPrinciples} underHeader />
        <ProcessSection data={conversationalDesignProcess} />
        <ExampleFlowsSection data={conversationalDesignExampleFlows} />
        <NextProjectNav next={conversationalDesignNext} />
        <Footer />
      </PageTransition>
      <CaseStudyBottomGradient />
    </CaseStudyPageBackground>
  );
}
