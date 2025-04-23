
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
    <div className="py-20 bg-dark-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark-primary">
          Metodologia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((area) => (
            <div key={area.title} className="bg-dark-secondary rounded-lg shadow-modern p-6">
              <h3 className="text-xl font-bold mb-4 text-dark-primary">{area.title}</h3>
              <ul className="space-y-2">
                {area.items.map((item) => (
                  <li key={item} className="text-dark-text/70 flex items-center">
                    <span className="w-2 h-2 bg-dark-primary rounded-full mr-2"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Methodology;
