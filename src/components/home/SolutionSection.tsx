
import React from "react";
import { Check, Target, Users, TrendingUp, DollarSign, BarChart3, Zap } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const SolutionSection = () => {
  const steps = [
    {
      number: "1",
      title: "Entendimento da situação atual",
      description: "Vamos investigar o que está travando seus resultados e identificar os principais obstáculos que estão limitando o avanço do seu time."
    },
    {
      number: "2", 
      title: "Alinhamento de objetivos",
      description: "Vamos conversar sobre suas metas, entender suas prioridades e traçar um novo caminho mais claro e viável para atingi-las."
    },
    {
      number: "3",
      title: "Roteiro de crescimento personalizado",
      description: "Você sairá da sessão com um plano estruturado e prático para aplicar no seu negócio e acelerar suas vendas de forma consistente."
    }
  ];

  return (
    <section className="py-20 bg-[#0d1829]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              🚀 Como vai funcionar a <span className="text-dark-primary">Sessão Estratégica Gratuita?</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Durante um encontro individual de 30 minutos, vamos seguir três etapas essenciais para destravar o crescimento da sua empresa:
            </p>
          </div>

          <div className="grid md:grid-cols-1 gap-8 mb-16">
            {steps.map((step, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-dark-primary/30 hover:border-dark-primary/50 transition-all duration-300 backdrop-blur-sm">
                <div className="flex items-start gap-6">
                  <div className="bg-gradient-to-br from-dark-primary to-dark-primary/80 rounded-full p-4 w-16 h-16 flex items-center justify-center flex-shrink-0">
                    <span className="text-2xl font-bold text-dark-background">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">{step.title}</h3>
                    <p className="text-gray-300 leading-relaxed text-lg">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* About Manoel Santos Section */}
          <div className="bg-gradient-to-r from-dark-primary/20 to-blue-600/20 p-8 rounded-2xl border border-dark-primary/30 mb-12">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-6">
                Quem é <span className="text-dark-primary">Manoel Santos?</span>
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Mais de 20 anos de experiência em Gestão comercial, marketing e vendas, já trabalhou nas principais multinacionais farmacêuticas do país, e tem vasta experiência em liderar equipes de vendas de alta performance.
              </p>
              
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-dark-primary mb-4">Formação Acadêmica:</h4>
                  <ul className="text-gray-300 space-y-2 text-center">
                    <li>• Mestrando em Administração de Empresas</li>
                    <li>• Pós-Graduação em Administração de Empresas</li>
                    <li>• Pós-Graduação em Marketing</li>
                    <li>• Extensão em Gestão de Recursos Humanos</li>
                    <li>• Graduação em Psicologia com ênfase Organizacional</li>
                  </ul>
                </div>
                <div className="bg-white/10 rounded-lg p-6">
                  <h4 className="text-xl font-bold text-dark-primary mb-4">Resultados Comprovados:</h4>
                  <div className="space-y-4">
                    <div>
                      <span className="text-2xl font-bold text-dark-primary">500+</span>
                      <p className="text-sm text-gray-300">empresas transformadas de 23 estados e 2 países</p>
                    </div>
                    <div>
                      <span className="text-2xl font-bold text-dark-primary">1 Bilhão</span>
                      <p className="text-sm text-gray-300">em vendas geradas através das estratégias implementadas</p>
                    </div>
                  </div>
                </div>
              </div>

              <LeadCaptureForm 
                source="solution_section"
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-4 px-8 rounded-full font-bold transform hover:scale-105 transition-all duration-300"
                buttonText="QUERO ACELERAR MEU NEGÓCIO"
              />
              <p className="text-sm text-gray-400 mt-3">
                Preencha o formulário e participe do programa exclusivo
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
