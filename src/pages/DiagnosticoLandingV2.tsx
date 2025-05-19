
import React, { useEffect } from "react";
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
  // Effect to track page view specifically for DiagnosticoLandingV2
  useEffect(() => {
    // Make sure gtag is defined
    if (window.gtag) {
      // Send a custom page view for this specific page
      window.gtag('event', 'page_view', {
        page_title: 'Diagnóstico Landing V2',
        page_location: window.location.href,
        page_path: '/diagnostico-v2'
      });
      
      console.log('Google Analytics event sent for DiagnosticoLandingV2');
    }
  }, []);

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
      <CTASection source="diagnostico_landing_v2" />
      <Footer />
    </div>
  );
};

export default DiagnosticoLandingV2;
