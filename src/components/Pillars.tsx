
import { Card } from "@/components/ui/card";
import { PackageOpen, Target, BadgeDollarSign, LayoutDashboard } from "lucide-react";

const Pillars = () => {
  const pillars = [
    {
      title: "Produto",
      icon: <PackageOpen className="w-6 h-6" />,
      items: [
        "Redução de churn",
        "Encantamento do cliente",
        "Pós-venda que fideliza",
        "Esteira de produto lucrativa"
      ]
    },
    {
      title: "Marketing",
      icon: <Target className="w-6 h-6" />,
      items: [
        "Diminuição do CAC e CPL",
        "Geração de leads qualificados",
        "Páginas de alta conversão",
        "Materiais irresistíveis",
        "Análise de ICP"
      ]
    },
    {
      title: "Vendas",
      icon: <BadgeDollarSign className="w-6 h-6" />,
      items: [
        "Diagnóstico dos scripts",
        "Treinamentos de SDR, Closer e BDR",
        "Acompanhamento de performance",
        "Otimização da taxa de conversão"
      ]
    },
    {
      title: "Gestão",
      icon: <LayoutDashboard className="w-6 h-6" />,
      items: [
        "Processo seletivo estratégico",
        "Cultura de performance",
        "Dashboard de gestão",
        "Feedbacks e pesquisa de clima"
      ]
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-[#252525] to-dark-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-hero-pattern opacity-3"></div>
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-dark-primary text-sm font-medium tracking-widest uppercase">Nossa Abordagem</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif text-dark-text">
            Pilares do Programa
          </h2>
          <p className="text-lg text-dark-text/80 mt-4">
            Transforme sua empresa com nossa metodologia comprovada
          </p>
          <div className="w-16 h-1 bg-dark-primary mx-auto mt-6"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="card-glow transform hover:-translate-y-2 transition-all duration-300">
              <div className="glass-morphism rounded-xl p-8 relative z-10 h-full border border-white/10">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-dark-primary/20 flex items-center justify-center mr-4">
                    <span className="text-dark-primary">{pillar.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-dark-primary">{pillar.title}</h3>
                </div>
                <ul className="space-y-4">
                  {pillar.items.map((item) => (
                    <li key={item} className="text-dark-text/80 flex items-center group">
                      <span className="w-1.5 h-1.5 bg-dark-primary rounded-full mr-2.5 group-hover:scale-150 transition-transform"></span>
                      <span className="group-hover:text-dark-primary transition-colors">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pillars;
