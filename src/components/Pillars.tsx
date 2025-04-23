
import { Card } from "@/components/ui/card";
import { PackageOpen, Target, BadgeDollarSign, LayoutDashboard } from "lucide-react";

const Pillars = () => {
  const pillars = [
    {
      title: "Produto",
      icon: <PackageOpen className="w-6 h-6" />,
      items: ["Churn", "NPS e Pós venda", "Esteira de produto", "Head de produto", "Farmer / CS", "Encantamento do cliente"]
    },
    {
      title: "Marketing",
      icon: <Target className="w-6 h-6" />,
      items: ["CAC / CPL / MQL", "Conect Rate", "Conversão da página", "Ajuste nos materiais", "Análise de ICP", "Head de Marketing"]
    },
    {
      title: "Vendas",
      icon: <BadgeDollarSign className="w-6 h-6" />,
      items: ["Closer/SDR/BDR", "Análise de Calls e Scripts", "Acompanhamento", "Treinamentos", "Análise de performance", "Head comercial"]
    },
    {
      title: "Gestão",
      icon: <LayoutDashboard className="w-6 h-6" />,
      items: ["Processo seletivo", "Dashboard", "Feedbacks", "Pesquisa de clima", "Processos", "Cultura"]
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-[#252525] to-dark-secondary relative overflow-hidden">
      {/* Elementos decorativos */}
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
          <div className="w-16 h-1 bg-dark-primary mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => (
            <div key={pillar.title} className="card-glow">
              <div className="glass-morphism rounded-xl p-8 relative z-10 h-full">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 rounded-full bg-dark-primary/20 flex items-center justify-center mr-4">
                    <span className="text-dark-primary">{pillar.icon}</span>
                  </div>
                  <h3 className="text-2xl font-bold text-dark-primary">{pillar.title}</h3>
                </div>
                <ul className="space-y-3">
                  {pillar.items.map((item) => (
                    <li key={item} className="text-dark-text/80 flex items-center">
                      <span className="w-1.5 h-1.5 bg-dark-primary rounded-full mr-2.5"></span>
                      {item}
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
