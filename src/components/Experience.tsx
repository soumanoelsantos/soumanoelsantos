
import { Award, Users, Target, TrendingUp } from "lucide-react";

const Experience = () => {
  const stats = [
    {
      icon: <Users className="w-8 h-8" />,
      value: "180+",
      label: "Empresas Transformadas",
      description: "Em 23 estados e 2 países"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: "1B+",
      label: "Em Vendas Geradas",
      description: "Para nossos clientes"
    },
    {
      icon: <Award className="w-8 h-8" />,
      value: "18",
      label: "Anos de Experiência",
      description: "Em Gestão e Marketing"
    },
    {
      icon: <Target className="w-8 h-8" />,
      value: "97%",
      label: "Taxa de Sucesso",
      description: "Clientes Satisfeitos"
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-black to-dark-background relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-dark-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <span className="text-dark-primary text-sm font-medium tracking-widest uppercase">Resultados Comprovados</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-6 font-serif">
            Números que Comprovam Nossa Excelência
          </h2>
          <div className="w-20 h-1 bg-dark-primary mx-auto mb-8"></div>
          <p className="text-xl text-dark-text/70">
            Transformando negócios com resultados mensuráveis e duradouros
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="card-glow">
              <div className="glass-morphism rounded-xl p-8 text-center relative z-10 hover-scale h-full">
                <div className="w-16 h-16 rounded-full bg-dark-primary/20 flex items-center justify-center mx-auto mb-6">
                  <span className="text-dark-primary">{stat.icon}</span>
                </div>
                <div className="text-4xl lg:text-5xl font-bold text-dark-primary mb-4">{stat.value}</div>
                <h3 className="text-xl font-semibold text-dark-text mb-2">{stat.label}</h3>
                <p className="text-dark-text/70">{stat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Experience;
