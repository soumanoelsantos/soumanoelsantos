
import React from "react";
import { TrendingUp, Briefcase, Users } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const StatsSection = () => {
  return (
    <section className="py-16 bg-[#0d112b]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">
            <span className="text-dark-primary">Números</span> que falam por si
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
              <TrendingUp className="h-12 w-12 mx-auto mb-4 text-dark-primary" />
              <div className="text-4xl font-bold mb-2 text-white">+900%</div>
              <p className="text-gray-400">Crescimento em vendas de clientes em 8 meses</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
              <Briefcase className="h-12 w-12 mx-auto mb-4 text-dark-primary" />
              <div className="text-4xl font-bold mb-2 text-white">+160</div>
              <p className="text-gray-400">Empresas aceleradas no Brasil e Portugal</p>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg text-center">
              <Users className="h-12 w-12 mx-auto mb-4 text-dark-primary" />
              <div className="text-4xl font-bold mb-2 text-white">80%</div>
              <p className="text-gray-400">De aumento médio na conversão de vendas</p>
            </div>
          </div>
          
          <div className="text-center">
            <LeadCaptureForm 
              source="diagnostico_landing_v2_stats_section"
              showChallengeField={true}
              buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-xs sm:text-base py-3 sm:py-4 px-2 sm:px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
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

export default StatsSection;
