
const Pillars = () => {
  const pillars = [
    {
      title: "Produto",
      items: ["Churn", "NPS e Pós venda", "Esteira de produto", "Head de produto", "Farmer / CS", "Encantamento do cliente"]
    },
    {
      title: "Marketing",
      items: ["CAC / CPL / MQL", "Conect Rate", "Conversão da página", "Ajuste nos materiais", "Análise de ICP", "Head de Marketing"]
    },
    {
      title: "Vendas",
      items: ["Closer/SDR/BDR", "Análise de Calls e Scripts", "Acompanhamento", "Treinamentos", "Análise de performance", "Head comercial"]
    },
    {
      title: "Gestão",
      items: ["Processo seletivo", "Dashboard", "Feedbacks", "Pesquisa de clima", "Processos", "Cultura"]
    }
  ];

  return (
    <div className="py-20 bg-dark-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-dark-primary">
          Pilares do Programa
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar) => (
            <div key={pillar.title} className="bg-dark-accent rounded-lg shadow-modern p-6">
              <h3 className="text-xl font-bold mb-4 text-dark-primary">{pillar.title}</h3>
              <ul className="space-y-2">
                {pillar.items.map((item) => (
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

export default Pillars;
