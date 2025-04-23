
const Methodology = () => {
  const areas = [
    {
      title: "Times Especializados",
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
    <div className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-[#1A365D]">
          Metodologia
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {areas.map((area) => (
            <div key={area.title} className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-xl font-bold mb-4 text-[#1A365D]">{area.title}</h3>
              <ul className="space-y-2">
                {area.items.map((item) => (
                  <li key={item} className="text-gray-600 flex items-center">
                    <span className="w-2 h-2 bg-[#C4A14D] rounded-full mr-2"></span>
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
