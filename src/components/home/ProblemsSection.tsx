
import React from "react";
import { AlertTriangle, Clock, Users, TrendingDown } from "lucide-react";

const ProblemsSection = () => {
  const problems = [
    {
      icon: AlertTriangle,
      title: "Sobrecarga de trabalho",
      description: "Mais de 12 horas por dia trabalhando na empresa"
    },
    {
      icon: Clock,
      title: "Falta de tempo",
      description: "Dificuldade em se ausentar da empresa e tirar férias"
    },
    {
      icon: Users,
      title: "Time dependente",
      description: "Equipe sem autonomia ou iniciativa própria"
    },
    {
      icon: TrendingDown,
      title: "Processos desorganizados",
      description: "Falta de indicadores e clareza no crescimento"
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Você sofre com esses <span className="text-red-500">problemas</span> em sua empresa?
          </h2>
          
          <p className="text-xl text-gray-300 mb-12">
            Se você disse sim a qualquer item, então o <strong className="text-dark-primary">Acelerador Empresarial</strong> é para você.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {problems.map((problem, index) => (
              <div key={index} className="bg-red-900/20 p-8 rounded-2xl border border-red-500/30 backdrop-blur-sm hover:bg-red-900/30 transition-all duration-300">
                <div className="flex items-start gap-4">
                  <div className="bg-red-500 rounded-xl p-3 flex-shrink-0">
                    <problem.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white mb-3">{problem.title}</h3>
                    <p className="text-gray-300">{problem.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-red-600/20 to-orange-600/20 p-8 rounded-2xl border border-red-500/30">
            <h3 className="text-2xl font-bold text-white mb-4">
              Reflexos na sua vida pessoal:
            </h3>
            <ul className="text-lg text-gray-300 space-y-2 max-w-2xl mx-auto">
              <li>• Falta de tempo para a família, amigos e lazer</li>
              <li>• Reflexos na saúde, como estresse e vida sedentária</li>
              <li>• Sensação de estar preso ao próprio negócio</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSection;
