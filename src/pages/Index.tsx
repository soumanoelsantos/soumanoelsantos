
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Experience from "@/components/Experience";
import Pillars from "@/components/Pillars";
import Methodology from "@/components/Methodology";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Hero />
      <Benefits />
      <Experience />
      <Pillars />
      <Methodology />
      <ContactForm />
    </div>
  );
};

export default Index;
