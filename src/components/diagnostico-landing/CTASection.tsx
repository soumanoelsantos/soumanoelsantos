
import React from "react";
import { Calendar } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";
import { Button } from "@/components/ui/button";

interface CTASectionProps {
  showUrgency: boolean;
  setShowUrgency: (show: boolean) => void;
}

const CTASection = ({ showUrgency, setShowUrgency }: CTASectionProps) => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#1a1a2e] to-[#0d112b]">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-3 flex justify-center">
            <Calendar className="h-10 w-10 text-dark-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Receba seu plano de ação comercial personalizado — garanta sua vaga agora
          </h2>
          
          <Button
            onClick={() => setShowUrgency(!showUrgency)}
            className="mb-6 text-sm bg-transparent border border-gray-600 hover:bg-gray-800 text-gray-400"
          >
            {showUrgency ? "Ocultar contador" : "Mostrar urgência com contador"}
          </Button>
          
          <div className="mb-8">
            <LeadCaptureForm 
              source="diagnostico_landing_v2_bottom"
              buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-xl py-6 px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              buttonText="QUERO MEU PLANO DE AÇÃO COMERCIAL GRATUITO"
            />
            <p className="mt-3 text-sm text-gray-400">
              Você será redirecionado para agendar seu melhor horário
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
