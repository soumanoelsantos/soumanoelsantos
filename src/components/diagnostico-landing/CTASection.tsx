
import React from "react";
import { Calendar } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const CTASection = () => {
  return (
    <section className="py-10 sm:py-16 bg-gradient-to-b from-[#1a1a2e] to-[#0d112b]">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-3 flex justify-center">
            <Calendar className="h-8 w-8 sm:h-10 sm:w-10 text-dark-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 px-1">
            Receba seu plano de ação comercial personalizado — garanta sua vaga agora
          </h2>
          
          <div className="mb-6 sm:mb-8">
            <LeadCaptureForm 
              source="diagnostico_landing_v2_bottom"
              buttonClassName="w-full sm:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-base sm:text-xl py-4 sm:py-6 px-6 sm:px-10 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              buttonText="QUERO MEU PLANO DE AÇÃO COMERCIAL GRATUITO"
            />
            <p className="mt-3 text-xs sm:text-sm text-gray-400">
              Você será redirecionado para agendar seu melhor horário
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
