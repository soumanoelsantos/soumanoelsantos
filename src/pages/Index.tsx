
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Hero />
      {/* Button removed as requested */}
      <ContactForm />
    </div>
  );
};

export default Index;
