
import React from "react";
import Header from "@/components/diagnostico-landing/Header";
import Hero from "@/components/diagnostico-landing/Hero";
import ProblemSection from "@/components/diagnostico-landing/ProblemSection";
import WastedMoneySection from "@/components/diagnostico-landing/WastedMoneySection";
import SolutionSection from "@/components/diagnostico-landing/SolutionSection";
import IdealForSection from "@/components/diagnostico-landing/IdealForSection";
import TestimonialSection from "@/components/diagnostico-landing/TestimonialSection";
import StatsSection from "@/components/diagnostico-landing/StatsSection";
import CTASection from "@/components/diagnostico-landing/CTASection";
import Footer from "@/components/diagnostico-landing/Footer";
import MarketingPainSection from "@/components/marketing/sections/MarketingPainSection";

const DiagnosticoLandingV2 = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />
      <Hero />
      <ProblemSection />
      <WastedMoneySection />
      <MarketingPainSection />
      <SolutionSection />
      <IdealForSection />
      <TestimonialSection />
      <StatsSection />
      <CTASection />
      <Footer />
    </div>
  );
};

export default DiagnosticoLandingV2;
