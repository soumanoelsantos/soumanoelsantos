
import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import Experience from "@/components/Experience";
import Pillars from "@/components/Pillars";
import Methodology from "@/components/Methodology";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <div className="relative overflow-hidden">
        <Hero />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,rgba(0,0,0,0)_70%)] pointer-events-none"></div>
      </div>
      <Benefits />
      <Experience />
      <Pillars />
      <Methodology />
      <ContactForm />
    </div>
  );
};

export default Index;
