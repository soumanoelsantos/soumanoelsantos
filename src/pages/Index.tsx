
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ProblemsSection from "@/components/home/ProblemsSection";
import SolutionSection from "@/components/home/SolutionSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import AboutMentorSection from "@/components/home/AboutMentorSection";
import GuaranteeSection from "@/components/home/GuaranteeSection";
import CTAFinalSection from "@/components/home/CTAFinalSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <HeroSection />
      <ProblemsSection />
      <SolutionSection />
      <TestimonialsSection />
      <AboutMentorSection />
      <GuaranteeSection />
      <CTAFinalSection />
      <Footer />
    </div>
  );
};

export default Index;
