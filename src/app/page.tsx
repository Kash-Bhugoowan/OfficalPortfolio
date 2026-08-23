import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";
import Capabilities from "@/components/Capabilities";
import DesignPhilosophy from "@/components/DesignPhilosophy";
import Community from "@/components/Community";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <ProjectsSection />
      <Capabilities />
      <DesignPhilosophy />
      <Community />
      <Contact />
      <Footer />
    </>
  );
}
