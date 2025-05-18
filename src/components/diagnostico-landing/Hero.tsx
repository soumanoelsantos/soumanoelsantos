
import React from "react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

interface HeroProps {
  showUrgency: boolean;
}

const Hero = ({ showUrgency }: HeroProps) => {
  return (
    <section className="py-8 sm:py-16 bg-gradient-to-b from-[#0d112b] to-[#1a1a2e] relative overflow-hidden">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 px-1">
            Está <span className="text-red-500">jogando dinheiro fora</span> com tráfego enquanto seu <span className="text-dark-primary">comercial não converte</span>?
          </h1>
          
          <p className="text-lg sm:text-xl mb-6 sm:mb-8 text-gray-300 px-1">
            Em uma reunião gratuita de 45 minutos comigo você receberá um <strong>PLANO DE AÇÃO</strong> personalizado para estruturar seu comercial e marketing profissionalmente e <strong>DOBRAR</strong> seu faturamento em 90 dias!
          </p>
          
          {showUrgency && (
            <div className="mb-4 sm:mb-6 flex flex-col items-center">
              <p className="text-yellow-400 font-medium mb-2">Vagas limitadas para hoje</p>
            </div>
          )}
          
          <div className="mb-6">
            <LeadCaptureForm 
              source="diagnostico_landing_v2"
              buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-base sm:text-lg py-4 sm:py-6 px-4 sm:px-8 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
              buttonText="QUERO MEU PLANO DE AÇÃO COMERCIAL GRATUITO"
            />
            <p className="mt-3 text-xs sm:text-sm text-gray-400">
              Você será redirecionado para agendar seu melhor horário
            </p>
          </div>
          
          <div className="mt-6 sm:mt-8 flex justify-center">
            <img
              src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
              alt="Estrategista Digital - Manoel Santos"
              className="w-48 h-48 sm:w-64 sm:h-64 rounded-full object-cover border-4 border-dark-primary shadow-2xl"
            />
          </div>
          <div className="text-center mt-2 sm:mt-3">
            <p className="font-medium text-lg sm:text-xl text-dark-primary">CRO - Manoel Santos</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
