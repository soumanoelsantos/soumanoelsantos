
import { CheckCircle, Award, Target, Users, TrendingUp } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      title: "Resultados Exponenciais",
      description: "Média de crescimento de 300% em faturamento dos nossos alunos em até 12 meses",
      icon: TrendingUp
    },
    {
      title: "Mentoria Personalizada",
      description: "Acompanhamento individual do seu caso com mentores especializados",
      icon: Target
    },
    {
      title: "Network Premium",
      description: "Conexão direta com empresários de alto nível de diferentes setores",
      icon: Users
    },
    {
      title: "Metodologia Comprovada",
      description: "Sistema desenvolvido e aperfeiçoado ao longo de 18 anos de mercado",
      icon: Award
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-dark-background to-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-dark-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-dark-primary text-sm font-medium tracking-widest uppercase">Por que escolher nosso programa</span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6 font-serif text-dark-text">
            Benefícios <span className="text-dark-primary">Exclusivos</span>
          </h2>
          <div className="w-20 h-1 bg-dark-primary mx-auto mb-8"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <div key={index} className="glass-morphism rounded-xl p-8 hover-scale transition-all duration-300 hover:bg-dark-primary/5">
              <div className="flex items-start gap-6">
                <div className="bg-dark-primary/20 p-4 rounded-xl">
                  <benefit.icon className="w-8 h-8 text-dark-primary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-dark-primary mb-3">{benefit.title}</h3>
                  <p className="text-dark-text/80 text-lg leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Benefits;
