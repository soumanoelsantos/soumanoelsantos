
import React from "react";
import HeroSection from "@/components/home/HeroSection";
import ProblemsSection from "@/components/home/ProblemsSection";
import VideoTestimonialSection from "@/components/home/VideoTestimonialSection";
import SolutionSection from "@/components/home/SolutionSection";
import Footer from "@/components/home/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <HeroSection />
      <ProblemsSection />
      <VideoTestimonialSection />
      <SolutionSection />
      <Footer />
    </div>
  );
};

export default Index;
