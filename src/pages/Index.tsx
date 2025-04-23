
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, ChartBar, CheckCircle } from "lucide-react";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Pillars from "@/components/Pillars";
import Methodology from "@/components/Methodology";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <Experience />
      <Pillars />
      <Methodology />
      <ContactForm />
    </div>
  );
};

export default Index;
