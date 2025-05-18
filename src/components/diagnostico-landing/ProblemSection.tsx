
import React from "react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const ProblemSection = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-[#0d1829] to-[#0d112b]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-dark-primary">Aumente seu faturamento</span> através de um plano comercial estruturado
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-xl mb-4 text-dark-primary">Você está enfrentando...</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span> Altos investimentos em tráfego sem resultados proporcionais
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span> Equipe comercial sem processos definidos
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span> CAC alto e dificuldade para escalar
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span> Falta de acompanhamento de métricas comerciais
                </li>
              </ul>
            </div>
            
            <div className="bg-gray-800/50 p-6 rounded-lg shadow-lg">
              <h3 className="font-bold text-xl mb-4 text-green-400">Seu plano de ação gratuito incluirá...</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Processos comerciais estruturados e profissionais
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Estratégias para treinar e focar sua equipe em resultados
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Táticas para melhorar a conversão de leads em vendas
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> Método de acompanhamento consistente de KPIs comerciais
                </li>
              </ul>
            </div>
          </div>

          <div className="text-center mb-8">
            <LeadCaptureForm 
              source="diagnostico_landing_v2_problem_section"
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

export default ProblemSection;
