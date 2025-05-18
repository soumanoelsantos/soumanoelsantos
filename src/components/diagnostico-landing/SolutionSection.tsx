import React from "react";
import { Check, Clock, Handshake } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const SolutionSection = () => {
  return (
    <section className="py-16 bg-[#0d1829]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-yellow-400">O Plano de Ação Completo</span> para escalar seu negócio digital
          </h2>

          <div className="bg-gray-800 rounded-lg p-8 shadow-lg mb-8">
            <div className="flex justify-center mb-8">
              <div className="flex flex-wrap justify-center gap-3">
                <span className="bg-blue-900/30 rounded-full px-4 py-1 text-sm font-medium text-blue-300">Gestão Comercial</span>
                <span className="bg-green-900/30 rounded-full px-4 py-1 text-sm font-medium text-green-300">Aceleração de Vendas</span>
                <span className="bg-purple-900/30 rounded-full px-4 py-1 text-sm font-medium text-purple-300">Alta Performance</span>
                <span className="bg-yellow-900/30 rounded-full px-4 py-1 text-sm font-medium text-yellow-300">Estratégias de Vendas</span>
              </div>
            </div>
            
            <p className="text-xl mb-6">
              O <strong>plano de ação profissional completo</strong> que você receberá gratuitamente:
            </p>
            
            <SolutionColumns />
            
            <div className="bg-blue-900/20 p-5 rounded-lg border border-blue-800/30 mb-6">
              <p className="text-lg">
                Na consultoria gratuita, você receberá um diagnóstico completo e um <strong>plano de ação personalizado</strong> para estruturar seu negócio digital profissionalmente, garantindo o máximo de ROI em seus investimentos.
              </p>
            </div>
            
            <div className="mt-8 flex items-center justify-center text-gray-300">
              <Clock className="h-5 w-5 mr-2" />
              <span>Duração: 45 minutos | Online | Sem compromisso</span>
            </div>

            <div className="mt-8 p-4 bg-blue-900/20 rounded-lg border border-blue-800/50">
              <div className="flex">
                <Handshake className="h-6 w-6 text-blue-400 mr-3 flex-shrink-0 mt-1" />
                <p className="text-blue-200">
                  Como <strong>conselheiro e estrategista digital</strong>, já implementei estas estratégias em mais de 160 empresas no Brasil e Portugal, desde pequenos negócios até players que faturam mais de 1 milhão por mês, resultando em crescimentos de até <strong>900% em apenas 8 meses</strong>.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-8">
              <LeadCaptureForm 
                source="diagnostico_landing_v2_solution_section"
                showChallengeField={true}
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-black text-lg py-4 px-6 rounded-full shadow-lg transform hover:scale-105 transition-all duration-300"
                buttonText="QUERO MEU PLANO DE AÇÃO COMERCIAL GRATUITO"
              />
              <p className="mt-3 text-sm text-gray-400">
                Você será redirecionado para agendar seu melhor horário
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SolutionColumns = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gray-700/50 p-6 rounded-lg border border-blue-900/30">
        <h3 className="font-bold text-xl mb-4 text-blue-300">Comercial</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Estruturação de processos comerciais</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Treinamento de SDRs e Closers</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Processo seletivo para equipe</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Acompanhamento de métricas</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-gray-700/50 p-6 rounded-lg border border-green-900/30">
        <h3 className="font-bold text-xl mb-4 text-green-300">Marketing</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Criação de funis de vendas otimizados</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Otimização de tráfego pago</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Estratégias de captação de leads</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Alinhamento entre MKT e vendas</span>
          </li>
        </ul>
      </div>
      
      <div className="bg-gray-700/50 p-6 rounded-lg border border-purple-900/30">
        <h3 className="font-bold text-xl mb-4 text-purple-300">Produto</h3>
        <ul className="space-y-3">
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Estruturação de ofertas high ticket</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Definição de proposta de valor única</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Posicionamento estratégico</span>
          </li>
          <li className="flex items-start">
            <div className="bg-green-500 rounded-full p-1 mr-3 mt-1">
              <Check className="h-4 w-4 text-black" />
            </div>
            <span>Modelo de negócio escalável</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SolutionSection;
