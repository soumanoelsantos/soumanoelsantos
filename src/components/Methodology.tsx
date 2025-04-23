
import { CheckCircle } from "lucide-react";

const Methodology = () => {
  const areas = [
    {
      title: "Acompanhamento",
      items: ["Time comercial", "Time de sucesso do cliente", "Time de marketing", "Time de produto"]
    },
    {
      title: "Implementação",
      items: ["Treinamentos personalizados", "Metodologia", "Implementação"]
    },
    {
      title: "Transformação",
      items: ["Novos funis de vendas", "Novos funis de marketing", "Overdelivery no produto", "Endomarketing nas vendas"]
    },
    {
      title: "Análise",
      items: ["Dashboard comercial", "Dashboard de pré venda", "Dashboard do marketing", "Scripts e Reuniões", "NPS / PDI / DISC"]
    }
  ];

  return (
    <div className="py-32 bg-gradient-to-b from-black to-dark-background relative overflow-hidden">
      {/* Elementos decorativos */}
      <div className="absolute inset-0">
        <div className="absolute top-1/3 right-1/3 w-80 h-80 bg-dark-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-dark-primary/5 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-xl mx-auto mb-20">
          <span className="text-dark-primary text-sm font-medium tracking-widest uppercase">Nossa Estratégia</span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 font-serif text-dark-text">
            Metodologia
          </h2>
          <div className="w-16 h-1 bg-dark-primary mx-auto"></div>
          <p className="text-dark-text/70 mt-6 text-lg">
            Um processo estruturado para garantir resultados consistentes e duradouros
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {areas.map((area, index) => (
            <div key={area.title} className="glass-morphism rounded-2xl p-8 hover-scale">
              <div className="inline-block rounded-full bg-dark-primary/20 px-4 py-1 mb-6">
                <h3 className="text-xl font-bold text-dark-primary">{area.title}</h3>
              </div>
              <ul className="space-y-4">
                {area.items.map((item) => (
                  <li key={item} className="text-dark-text flex items-center">
                    <span className="text-dark-primary mr-3">
                      <CheckCircle className="w-5 h-5" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-20 text-center">
          <div className="glass-morphism inline-block px-8 py-4 rounded-xl">
            <span className="text-dark-primary font-medium">Transformação empresarial completa</span>
            <div className="flex items-center justify-center mt-2">
              <div className="w-3 h-3 rounded-full bg-dark-primary"></div>
              <div className="w-24 h-0.5 bg-dark-primary/30"></div>
              <div className="w-3 h-3 rounded-full bg-dark-primary"></div>
              <div className="w-24 h-0.5 bg-dark-primary/30"></div>
              <div className="w-3 h-3 rounded-full bg-dark-primary"></div>
              <div className="w-24 h-0.5 bg-dark-primary/30"></div>
              <div className="w-3 h-3 rounded-full bg-dark-primary"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Methodology;
