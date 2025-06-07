
import React from "react";
import { Check, Target, Users, TrendingUp, DollarSign, BarChart3, Zap } from "lucide-react";
import LeadCaptureForm from "@/components/lead-form/LeadCaptureForm";

const SolutionSection = () => {
  const pillars = [
    {
      icon: Target,
      title: "Domínio Pessoal",
      description: "Desenvolva controle emocional e mental para liderar com clareza e tomar decisões estratégicas assertivas."
    },
    {
      icon: Users,
      title: "Cultura Organizacional",
      description: "Construa uma cultura forte baseada em seus valores, criando engajamento e alinhamento total da equipe."
    },
    {
      icon: TrendingUp,
      title: "Liderança Eficaz",
      description: "Aprenda a delegar, desenvolver pessoas e criar uma equipe autônoma que entrega resultados."
    },
    {
      icon: BarChart3,
      title: "Gestão por Resultados",
      description: "Implemente o método MPE (Meta, Plano de Ação e Execução) para acelerar os resultados da empresa."
    },
    {
      icon: DollarSign,
      title: "Gestão Financeira",
      description: "Domine os números do seu negócio e tome decisões baseadas em dados concretos e indicadores."
    },
    {
      icon: Zap,
      title: "Tração Comercial",
      description: "Estruture marketing e vendas para gerar crescimento consistente e previsível da receita."
    }
  ];

  return (
    <section className="py-20 bg-[#0d1829]">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Os <span className="text-dark-primary">6 Pilares</span> do Acelerador Empresarial
            </h2>
            <p className="text-xl text-gray-300 max-w-4xl mx-auto">
              Metodologia comprovada para transformar sua empresa em uma <strong>máquina de resultados</strong> autogerenciável
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl border border-dark-primary/30 hover:border-dark-primary/50 transition-all duration-300 backdrop-blur-sm">
                <div className="bg-gradient-to-br from-dark-primary to-dark-primary/80 rounded-2xl p-4 w-16 h-16 flex items-center justify-center mb-6">
                  <pillar.icon className="h-8 w-8 text-dark-background" />
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{pillar.title}</h3>
                <p className="text-gray-300 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-dark-primary/20 to-blue-600/20 p-8 rounded-2xl border border-dark-primary/30 mb-12">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-6">
                Mais de <span className="text-dark-primary">15.000</span> empresas já foram certificadas
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Junte-se aos empresários que já transformaram seus negócios com nossa metodologia
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mb-8">
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <span className="text-2xl font-bold text-dark-primary">200M+</span>
                  <p className="text-sm text-gray-300">Faturamento Gerado</p>
                </div>
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <span className="text-2xl font-bold text-dark-primary">750+</span>
                  <p className="text-sm text-gray-300">Colaboradores</p>
                </div>
                <div className="bg-white/10 rounded-lg px-6 py-3">
                  <span className="text-2xl font-bold text-dark-primary">65+</span>
                  <p className="text-sm text-gray-300">Turmas Realizadas</p>
                </div>
              </div>

              <LeadCaptureForm 
                source="solution_section"
                buttonClassName="w-full md:w-auto bg-dark-primary hover:bg-dark-primary/90 text-dark-background text-lg py-4 px-8 rounded-full font-bold transform hover:scale-105 transition-all duration-300"
                buttonText="QUERO ACELERAR MEU NEGÓCIO"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
