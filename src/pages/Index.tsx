
import Hero from "@/components/Hero";
import ContactForm from "@/components/ContactForm";
import QuemEManoel from "@/components/QuemEManoel";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen bg-dark-background">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-end">
          <Link to="/ferramentas">
            <Button variant="outline" className="border-dark-primary/30 text-dark-text hover:bg-dark-primary/10">
              Ver ferramentas gratuitas
            </Button>
          </Link>
        </div>
      </div>
      <Hero />
      <QuemEManoel />
      <ContactForm />
    </div>
  );
};

export default Index;
