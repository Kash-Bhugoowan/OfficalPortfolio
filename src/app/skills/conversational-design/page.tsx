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
      <div className="relative z-0">
        <CaseStudyTopGradient />
        <Nav />
        <SkillHeader data={conversationalDesignHeader} />
      </div>
      <PrinciplesSection data={conversationalDesignPrinciples} />
      <ProcessSection data={conversationalDesignProcess} />
      <ExampleFlowsSection data={conversationalDesignExampleFlows} />
      <NextProjectNav next={conversationalDesignNext} previous={conversationalDesignPrevious} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
