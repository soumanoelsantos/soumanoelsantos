
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import QuemEManoel from "@/components/QuemEManoel";
import CTASection from "@/components/CTASection";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <Hero />
      <QuemEManoel />
      <div className="container mx-auto px-4 py-8">
        <CTASection source="index_page" />
      </div>
      <ContactForm />
    </div>
  );
};

export default Index;
