
import React from 'react';
import { Calendar } from "lucide-react";
import LeadCaptureForm from "./LeadCaptureForm";

interface CTASectionProps {
  source: string;
}

const CTASection = ({ source }: CTASectionProps) => {
  return (
    <div className="bg-white p-6 border rounded-lg shadow-sm text-center mt-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        <div className="md:w-1/3">
          <img
            src="/lovable-uploads/e1debcb2-0d7b-4cbc-acde-70bc7dc129fd.png"
            alt="CRO - Manoel Santos"
            className="w-full h-64 md:h-80 rounded-lg object-cover object-center"
          />
        </div>
        <div className="md:w-2/3">
          <h2 className="text-3xl font-bold mb-4 text-gray-800">
            Transforme sua empresa em <br />
            uma <span className="text-[#D4AF37]">máquina de vendas</span>
          </h2>
          
          <p className="text-base font-medium text-dark-primary mb-4">
            Exclusivo para empresas com faturamento acima de R$ 50.000,00 por mês
          </p>
          
          <p className="text-lg text-gray-700 mb-6">
            Em 30 minutos farei um <strong>PLANO DE AÇÃO GRATUITO</strong> para sua empresa <strong>DOBRAR</strong> o faturamento em 90 dias!
          </p>
          
          <div className="mb-2">
            <LeadCaptureForm 
              source={source}
              buttonClassName="px-8 py-6 text-lg mx-auto bg-dark-primary hover:bg-dark-primary/90 text-black font-medium flex items-center gap-2"
              buttonText={
                <>
                  <Calendar className="h-4 w-4" />
                  Agendar diagnóstico gratuito
                </>
              }
            />
          </div>
          
          <p className="text-sm text-gray-500 mt-2">
            Clique acima e agende agora – As vagas são limitadas!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTASection;
