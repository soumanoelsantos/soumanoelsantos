
import React from "react";
import LeadCaptureForm from "@/components/LeadCaptureForm";

const WastedMoneySection = () => {
  return (
    <section className="py-16 bg-[#0d1829]">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center">
            <span className="text-red-500">Pare de Rasgar Dinheiro</span> com Tráfego Sem Retorno
          </h2>
          
          <div className="bg-gray-800/50 rounded-lg p-8 shadow-lg mb-10 border border-red-900/30">
            <p className="text-xl mb-8 text-gray-300">
              Muitos empresários acreditam que o problema está apenas na geração de leads, mas a verdade é que:
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-red-900/20 p-5 rounded-lg border border-red-800/30">
                <h3 className="font-bold text-xl mb-3 text-red-400">O que empresários fazem:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span> Aumentam investimento em tráfego constantemente
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span> Trocam de agência ou consultor frequentemente
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span> Culpam a "qualidade dos leads" pelo baixo resultado
                  </li>
                  <li className="flex items-start">
                    <span className="text-red-500 mr-2">✗</span> Ignoram as falhas no processo comercial interno
                  </li>
                </ul>
              </div>
              
              <div className="bg-green-900/20 p-5 rounded-lg border border-green-800/30">
                <h3 className="font-bold text-xl mb-3 text-green-400">O que realmente funciona:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Estruturar processos comerciais profissionais
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Implementar treinamento constante de vendedores
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Criar sistemas de gestão e acompanhamento
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span> Alinhar marketing e vendas com estratégia integrada
                  </li>
                </ul>
              </div>
            </div>
            
            <p className="text-lg bg-yellow-900/20 p-4 rounded-lg border border-yellow-800/30 mt-6 mb-8">
              <strong className="text-yellow-400">A verdade inconveniente:</strong> Seu negócio não tem um problema de tráfego, mas sim um problema de <strong>estrutura comercial profissional</strong>. Sem isso, qualquer investimento em marketing é praticamente dinheiro desperdiçado.
            </p>
            
            <div className="text-center">
              <LeadCaptureForm 
                source="diagnostico_landing_v2_wasted_money"
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

export default WastedMoneySection;
