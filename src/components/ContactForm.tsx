
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

const ContactForm = () => {
  return (
    <div className="relative py-32 bg-gradient-to-b from-dark-background to-black" id="contato">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-dark-primary text-sm font-medium tracking-widest uppercase">Comece Agora</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif text-dark-text">
            Agende seu diagnóstico
          </h2>
          <div className="w-16 h-1 bg-dark-primary mx-auto"></div>
          <p className="text-dark-text/70 mt-6 text-lg">
            Análise gratuita do comercial, marketing e produto da sua empresa
          </p>
        </div>
        
        <div className="max-w-md mx-auto text-center">
          <Button 
            size="lg"
            className="w-full bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-7 rounded-full shadow-gold"
            onClick={() => window.open('https://calendly.com/contato-soumanoelsantos/45min', '_blank')}
          >
            <Calendar className="mr-2 h-6 w-6" />
            Agendar diagnóstico gratuito
          </Button>
          
          <div className="text-center mt-12 text-dark-text/60 text-sm">
            <p>Seu investimento: GRATUITO • Valor aproximado deste diagnóstico: R$ 2.500,00</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
