
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Experience from "@/components/Experience";
import Pillars from "@/components/Pillars";
import Methodology from "@/components/Methodology";
import ContactForm from "@/components/ContactForm";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";

const Index = () => {
  const handleScheduleClick = () => {
    window.location.href = 'https://wa.me/31986994906';
  };

  return (
    <div className="min-h-screen bg-dark-background">
      <Hero />
      <Benefits />
      <div className="container mx-auto px-4 py-12 text-center">
        <Button 
          size="lg"
          className="w-full sm:w-auto bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-base sm:text-lg py-6 px-6 sm:px-8 rounded-full shadow-gold group"
          onClick={handleScheduleClick}
        >
          <Calendar className="mr-2 h-5 w-5" />
          Agendar diagnóstico gratuito
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      <Experience />
      <Pillars />
      <div className="container mx-auto px-4 py-12 text-center">
        <Button 
          size="lg"
          className="w-full sm:w-auto bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-base sm:text-lg py-6 px-6 sm:px-8 rounded-full shadow-gold group"
          onClick={handleScheduleClick}
        >
          <Calendar className="mr-2 h-5 w-5" />
          Agendar diagnóstico gratuito
          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
      <Methodology />
      <ContactForm />
    </div>
  );
};

export default Index;
