
import { Calendar } from "lucide-react";
import LeadCaptureForm from "./LeadCaptureForm";

const ContactForm = () => {
  return (
    <div className="relative py-32 bg-gradient-to-b from-dark-background to-black" id="contato">
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
            Análise estratégica especializada do comercial, marketing e produto da sua empresa
          </p>
        </div>
        
        <div className="max-w-md mx-auto text-center">
          <LeadCaptureForm 
            source="landing_page"
            buttonClassName="w-full bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-7 rounded-full shadow-gold transform hover:scale-105 transition-all duration-300 flex items-center justify-center"
            buttonText={
              <>
                <Calendar className="mr-2 h-6 w-6" />
                Agendar diagnóstico gratuito
              </>
            }
          />
          
          <div className="mt-8 space-y-4 text-dark-text/60">
            <p className="text-lg font-medium">Seu investimento: GRATUITO</p>
            <p className="text-dark-primary">Valor aproximado deste diagnóstico: R$ 2.500,00</p>
            <p className="text-sm">Vagas limitadas - Garanta sua análise estratégica agora</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
