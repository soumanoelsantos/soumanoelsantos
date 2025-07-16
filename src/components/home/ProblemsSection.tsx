
import React from "react";
import { AlertTriangle, Target, Users, TrendingUp } from "lucide-react";

const ProblemsSection = () => {
  const problems = [
    {
      icon: Target,
      title: "Querem mais do que estão colhendo",
      description: "Cansados de resultados abaixo do esperado e prontos para escalar o negócio com mais consistência."
    },
    {
      icon: TrendingUp,
      title: "Buscam retorno proporcional ao esforço",
      description: "Querem sair da rotina exaustiva e transformar esforço em lucro real, com organização e estratégia."
    },
    {
      icon: Users,
      title: "Lidam com uma equipe fora de sintonia",
      description: "Sofrem com uma equipe desmotivada, sem direção clara e que não executa como deveria."
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            🎯 É para <span className="text-dark-primary">empresários</span> que:
          </h2>

          <div className="grid md:grid-cols-1 gap-8 mb-12">
            {problems.map((problem, index) => (
              <div key={index} className="bg-gradient-to-r from-dark-primary/20 to-blue-600/20 p-8 rounded-2xl border border-dark-primary/30 backdrop-blur-sm hover:bg-dark-primary/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-dark-primary rounded-xl p-3 flex-shrink-0">
                    <problem.icon className="h-6 w-6 text-dark-background" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white mb-3">{index + 1}. {problem.title}</h3>
                    <p className="text-gray-300">➡️ {problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
