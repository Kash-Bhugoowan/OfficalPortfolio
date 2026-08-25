import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkillShowcaseHeader from "@/components/skills/SkillShowcaseHeader";
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
  agenticAiConversationalDesignHeader,
  agenticAiConversationalDesignPrinciples,
  agenticAiConversationalDesignProcess,
  agenticAiConversationalDesignExampleFlows,
  agenticAiConversationalDesignNextProject,
} from "@/lib/skills/agentic-ai-conversational-design";

export default function AgenticAiConversationalDesignPage() {
  return (
    <CaseStudyPageBackground>
      <div className="relative z-0">
        <CaseStudyTopGradient />
        <Nav />
        <SkillShowcaseHeader data={agenticAiConversationalDesignHeader} />
      </div>
      <PrinciplesSection data={agenticAiConversationalDesignPrinciples} />
      <ProcessSection data={agenticAiConversationalDesignProcess} />
      <ExampleFlowsSection data={agenticAiConversationalDesignExampleFlows} />
      <NextProjectNav data={agenticAiConversationalDesignNextProject} />
      <CaseStudyBottomGradient />
      <Footer />
    </CaseStudyPageBackground>
  );
}
