import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const perguntasPlanejamento: PerguntaPlanejamento[] = [
  // Informações básicas da empresa - Expandidas
  {
    id: "empresa_nome",
    categoria: "negocio",
    pergunta: "Qual é o nome da sua empresa?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "empresa_segmento",
    categoria: "negocio", 
    pergunta: "Em qual segmento específico sua empresa atua? (Ex: varejo de roupas femininas, consultoria em marketing digital, etc.)",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "empresa_tempo_mercado",
    categoria: "negocio",
    pergunta: "Há quanto tempo sua empresa está operando?",
    tipo: "multipla_escolha",
    opcoes: ["Menos de 6 meses", "6 meses a 1 ano", "1 a 2 anos", "2 a 5 anos", "5 a 10 anos", "Mais de 10 anos"],
    obrigatoria: true
  },
  {
    id: "empresa_faturamento_mensal",
    categoria: "negocio",
    pergunta: "Qual é o faturamento mensal médio da empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Até R$ 10.000", "R$ 10.000 - R$ 50.000", "R$ 50.000 - R$ 100.000", "R$ 100.000 - R$ 300.000", "R$ 300.000 - R$ 500.000", "Acima de R$ 500.000"],
    obrigatoria: true
  },
  {
    id: "empresa_funcionarios",
    categoria: "equipe",
    pergunta: "Quantos funcionários trabalham na empresa atualmente?",
    tipo: "multipla_escolha",
    opcoes: ["Apenas eu (MEI)", "2-5 funcionários", "6-15 funcionários", "16-30 funcionários", "31-50 funcionários", "Mais de 50 funcionários"],
    obrigatoria: true
  },
  {
    id: "empresa_principal_produto",
    categoria: "negocio",
    pergunta: "Qual é o principal produto ou serviço da empresa? Descreva detalhadamente.",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "empresa_publico_alvo",
    categoria: "negocio",
    pergunta: "Quem é seu público-alvo principal? (Idade, renda, localização, comportamento)",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "empresa_concorrentes",
    categoria: "negocio",
    pergunta: "Quais são seus principais concorrentes? Como você se diferencia deles?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "empresa_canais_venda",
    categoria: "negocio",
    pergunta: "Quais canais de venda você utiliza atualmente?",
    tipo: "multipla_escolha_multi",
    opcoes: ["Loja física", "Site próprio", "Redes sociais", "Marketplace (Mercado Livre, Amazon)", "Vendas diretas", "Distribuidores/Revendedores", "WhatsApp Business", "Outros"],
    obrigatoria: true
  },

  // Diagnóstico Comercial - Detalhado
  {
    id: "diagnostico_comercial_1",
    categoria: "diagnostico",
    pergunta: "A empresa possui um processo de vendas estruturado e documentado?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e funciona muito bem", "Existe mas precisa melhorar", "Existe mas não é seguido", "Não existe processo estruturado"],
    obrigatoria: true
  },
  {
    id: "diagnostico_comercial_2",
    categoria: "diagnostico",
    pergunta: "A empresa acompanha métricas de vendas regularmente?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, temos KPIs claros e acompanhamento semanal", "Sim, apenas métricas básicas", "Raramente acompanhamos", "Não acompanhamos métricas"],
    obrigatoria: true
  },
  {
    id: "diagnostico_comercial_3",
    categoria: "diagnostico",
    pergunta: "Como está a performance da equipe comercial?",
    tipo: "multipla_escolha",
    opcoes: ["Muito boa, bate metas consistentemente", "Boa, mas pode melhorar", "Regular, não bate metas", "Ruim, precisamos reestruturar"],
    obrigatoria: true
  },
  {
    id: "diagnostico_comercial_4",
    categoria: "diagnostico",
    pergunta: "A empresa tem um CRM ou sistema de gestão de clientes?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, usamos ativamente", "Sim, mas não exploramos todo potencial", "Temos mas não usamos direito", "Não temos sistema"],
    obrigatoria: true
  },
  {
    id: "diagnostico_comercial_dores",
    categoria: "diagnostico",
    pergunta: "Quais são as principais dificuldades na área comercial? (Seja específico sobre problemas, gargalos, frustrações)",
    tipo: "texto",
    obrigatoria: true
  },

  // Diagnóstico de Gestão - Expandido
  {
    id: "diagnostico_gestao_1",
    categoria: "diagnostico",
    pergunta: "Os processos principais do negócio estão documentados?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, todos documentados e seguidos", "Parcialmente documentados", "Poucos processos documentados", "Nada documentado"],
    obrigatoria: true
  },
  {
    id: "diagnostico_gestao_2",
    categoria: "diagnostico",
    pergunta: "Como é feito o controle financeiro da empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Sistema completo com DRE e fluxo de caixa", "Controle básico em planilhas", "Controle informal", "Sem controle organizado"],
    obrigatoria: true
  },
  {
    id: "diagnostico_gestao_3",
    categoria: "diagnostico",
    pergunta: "A empresa faz planejamento estratégico regular?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, anual com revisões trimestrais", "Sim, mas apenas anual", "Raramente fazemos", "Não fazemos planejamento"],
    obrigatoria: true
  },
  {
    id: "diagnostico_gestao_4",
    categoria: "diagnostico",
    pergunta: "Como são tomadas as decisões importantes na empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Com base em dados e análises", "Discussão em equipe", "Decisão do proprietário", "Improvisamos conforme necessário"],
    obrigatoria: true
  },
  {
    id: "diagnostico_gestao_dores",
    categoria: "diagnostico",
    pergunta: "Quais são os maiores desafios na gestão da empresa? (Organização, processos, controle, etc.)",
    tipo: "texto",
    obrigatoria: true
  },

  // Diagnóstico de RH/Pessoas
  {
    id: "diagnostico_rh_1",
    categoria: "diagnostico",
    pergunta: "Como está o processo de recrutamento e seleção?",
    tipo: "multipla_escolha",
    opcoes: ["Estruturado com etapas claras", "Básico mas funcional", "Informal", "Não temos processo"],
    obrigatoria: true
  },
  {
    id: "diagnostico_rh_2",
    categoria: "diagnostico",
    pergunta: "A equipe recebe treinamento e capacitação regular?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, programa estruturado", "Ocasionalmente", "Raramente", "Não oferecemos"],
    obrigatoria: true
  },
  {
    id: "diagnostico_rh_3",
    categoria: "diagnostico",
    pergunta: "Como está o clima organizacional?",
    tipo: "multipla_escolha",
    opcoes: ["Excelente, equipe motivada", "Bom, mas pode melhorar", "Regular, alguns problemas", "Ruim, alta rotatividade"],
    obrigatoria: true
  },
  {
    id: "diagnostico_rh_4",
    categoria: "diagnostico",
    pergunta: "Existe plano de carreira para os funcionários?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, bem estruturado", "Informal", "Apenas para alguns", "Não existe"],
    obrigatoria: true
  },
  {
    id: "diagnostico_rh_dores",
    categoria: "diagnostico",
    pergunta: "Quais são os principais problemas relacionados à equipe? (Rotatividade, motivação, competências, etc.)",
    tipo: "texto",
    obrigatoria: true
  },

  // Diagnóstico de Marketing
  {
    id: "diagnostico_marketing_1",
    categoria: "diagnostico",
    pergunta: "A empresa tem estratégia de marketing estruturada?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, com planejamento anual", "Básica, ações pontuais", "Informal", "Não temos estratégia"],
    obrigatoria: true
  },
  {
    id: "diagnostico_marketing_2",
    categoria: "diagnostico",
    pergunta: "Como está a presença digital da empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Forte em múltiplos canais", "Presente mas pode melhorar", "Básica", "Quase inexistente"],
    obrigatoria: true
  },
  {
    id: "diagnostico_marketing_3",
    categoria: "diagnostico",
    pergunta: "A empresa gera leads de forma consistente?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, pipeline sempre cheio", "Sim, mas irregular", "Poucos leads", "Dependemos de indicação"],
    obrigatoria: true
  },
  {
    id: "diagnostico_marketing_4",
    categoria: "diagnostico",
    pergunta: "Como é medido o ROI das ações de marketing?",
    tipo: "multipla_escolha",
    opcoes: ["Métricas detalhadas por canal", "Acompanhamento básico", "Raramente medimos", "Não medimos"],
    obrigatoria: true
  },
  {
    id: "diagnostico_marketing_dores",
    categoria: "diagnostico",
    pergunta: "Quais são os maiores desafios no marketing? (Visibilidade, geração de leads, conversão, etc.)",
    tipo: "texto",
    obrigatoria: true
  },

  // Diagnóstico Financeiro
  {
    id: "diagnostico_financeiro_1",
    categoria: "diagnostico",
    pergunta: "Como está o controle do fluxo de caixa?",
    tipo: "multipla_escolha",
    opcoes: ["Controle diário detalhado", "Controle semanal", "Controle básico", "Sem controle estruturado"],
    obrigatoria: true
  },
  {
    id: "diagnostico_financeiro_2",
    categoria: "diagnostico",
    pergunta: "A empresa tem reserva de emergência?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, 6+ meses de despesas", "Sim, 3-6 meses", "Sim, menos de 3 meses", "Não temos reserva"],
    obrigatoria: true
  },
  {
    id: "diagnostico_financeiro_3",
    categoria: "diagnostico",
    pergunta: "Como está a margem de lucro da empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Muito boa, acima de 20%", "Boa, entre 10-20%", "Regular, 5-10%", "Baixa, menos de 5%"],
    obrigatoria: true
  },
  {
    id: "diagnostico_financeiro_4",
    categoria: "diagnostico",
    pergunta: "A empresa faz projeções financeiras?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, anuais com revisões", "Ocasionalmente", "Raramente", "Não fazemos"],
    obrigatoria: true
  },
  {
    id: "diagnostico_financeiro_dores",
    categoria: "diagnostico",
    pergunta: "Quais são os principais problemas financeiros? (Fluxo de caixa, inadimplência, custos, etc.)",
    tipo: "texto",
    obrigatoria: true
  },

  // Diagnóstico de Atendimento/Cliente
  {
    id: "diagnostico_cliente_1",
    categoria: "diagnostico",
    pergunta: "Como está a satisfação dos clientes?",
    tipo: "multipla_escolha",
    opcoes: ["Excelente, muitos elogios", "Boa, poucos problemas", "Regular, alguns problemas", "Ruim, muitas reclamações"],
    obrigatoria: true
  },
  {
    id: "diagnostico_cliente_2",
    categoria: "diagnostico",
    pergunta: "Existe processo de pós-venda estruturado?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, acompanhamento completo", "Básico", "Informal", "Não temos"],
    obrigatoria: true
  },
  {
    id: "diagnostico_cliente_3",
    categoria: "diagnostico",
    pergunta: "Como é a retenção de clientes?",
    tipo: "multipla_escolha",
    opcoes: ["Alta, clientes fiéis", "Boa retenção", "Regular", "Baixa retenção"],
    obrigatoria: true
  },
  {
    id: "diagnostico_cliente_4",
    categoria: "diagnostico",
    pergunta: "A empresa coleta feedback dos clientes?",
    tipo: "multipla_escolha",
    opcoes: ["Sim, sistema estruturado", "Ocasionalmente", "Raramente", "Não coletamos"],
    obrigatoria: true
  },
  {
    id: "diagnostico_cliente_dores",
    categoria: "diagnostico",
    pergunta: "Quais são os principais problemas com clientes? (Reclamações, cancelamentos, expectativas, etc.)",
    tipo: "texto",
    obrigatoria: true
  },

  // Análise SWOT Guiada - Fix the type issues
  {
    id: "swot_forca_1",
    categoria: "swot",
    pergunta: "Qual você considera a MAIOR FORÇA da sua empresa?",
    tipo: "swot_guiada_multi",
    opcoes: [
      "Equipe altamente qualificada e experiente",
      "Produto/serviço diferenciado no mercado",
      "Forte relacionamento com clientes",
      "Localização estratégica privilegiada", 
      "Tecnologia/sistema avançado",
      "Marca forte e reconhecida",
      "Preços competitivos",
      "Agilidade e flexibilidade"
    ],
    direcionamento: {
      "Equipe altamente qualificada e experiente": "Força",
      "Produto/serviço diferenciado no mercado": "Força", 
      "Forte relacionamento com clientes": "Força",
      "Localização estratégica privilegiada": "Força",
      "Tecnologia/sistema avançado": "Força",
      "Marca forte e reconhecida": "Força",
      "Preços competitivos": "Força",
      "Agilidade e flexibilidade": "Força"
    },
    obrigatoria: true
  },
  {
    id: "swot_forca_2",
    categoria: "swot",
    pergunta: "Qual a SEGUNDA maior força da empresa?",
    tipo: "swot_guiada_multi",
    opcoes: [
      "Processos bem estruturados",
      "Inovação constante",
      "Atendimento excepcional",
      "Controle financeiro rigoroso",
      "Parcerias estratégicas",
      "Capacidade de adaptação",
      "Know-how específico do setor",
      "Cultura organizacional forte"
    ],
    direcionamento: {
      "Processos bem estruturados": "Força",
      "Inovação constante": "Força",
      "Atendimento excepcional": "Força", 
      "Controle financeiro rigoroso": "Força",
      "Parcerias estratégicas": "Força",
      "Capacidade de adaptação": "Força",
      "Know-how específico do setor": "Força",
      "Cultura organizacional forte": "Força"
    },
    obrigatoria: true
  },
  {
    id: "swot_fraqueza_1",
    categoria: "swot", 
    pergunta: "Qual você considera a MAIOR FRAQUEZA da empresa?",
    tipo: "swot_guiada_multi",
    opcoes: [
      "Falta de capital de giro",
      "Equipe pequena/sobrecarregada",
      "Processos desorganizados",
      "Marketing fraco/inexistente",
      "Dependência de poucos clientes",
      "Tecnologia/sistemas defasados",
      "Falta de planejamento estratégico",
      "Alta rotatividade de funcionários"
    ],
    direcionamento: {
      "Falta de capital de giro": "Fraqueza",
      "Equipe pequena/sobrecarregada": "Fraqueza",
      "Processos desorganizados": "Fraqueza",
      "Marketing fraco/inexistente": "Fraqueza", 
      "Dependência de poucos clientes": "Fraqueza",
      "Tecnologia/sistemas defasados": "Fraqueza",
      "Falta de planejamento estratégico": "Fraqueza",
      "Alta rotatividade de funcionários": "Fraqueza"
    },
    obrigatoria: true
  },
  {
    id: "swot_fraqueza_2",
    categoria: "swot",
    pergunta: "Qual a SEGUNDA maior fraqueza?",
    tipo: "swot_guiada_multi", 
    opcoes: [
      "Controle financeiro deficiente",
      "Falta de presença digital",
      "Localização desfavorável",
      "Produtos/serviços limitados",
      "Preços pouco competitivos",
      "Falta de diferenciação",
      "Gestão centralizada demais",
      "Falta de inovação"
    ],
    direcionamento: {
      "Controle financeiro deficiente": "Fraqueza",
      "Falta de presença digital": "Fraqueza",
      "Localização desfavorável": "Fraqueza",
      "Produtos/serviços limitados": "Fraqueza",
      "Preços pouco competitivos": "Fraqueza", 
      "Falta de diferenciação": "Fraqueza",
      "Gestão centralizada demais": "Fraqueza",
      "Falta de inovação": "Fraqueza"
    },
    obrigatoria: true
  },
  {
    id: "swot_oportunidade_1",
    categoria: "swot",
    pergunta: "Qual a MAIOR OPORTUNIDADE que você vê para a empresa?",
    tipo: "swot_guiada_multi",
    opcoes: [
      "Crescimento do mercado digital", 
      "Expansão para novos mercados/regiões",
      "Lançamento de novos produtos/serviços",
      "Parcerias estratégicas disponíveis",
      "Mudanças no comportamento do consumidor",
      "Incentivos governamentais para o setor",
      "Concorrentes saindo do mercado",
      "Novas tecnologias disponíveis"
    ],
    direcionamento: {
      "Crescimento do mercado digital": "Oportunidade",
      "Expansão para novos mercados/regiões": "Oportunidade",
      "Lançamento de novos produtos/serviços": "Oportunidade",
      "Parcerias estratégicas disponíveis": "Oportunidade",
      "Mudanças no comportamento do consumidor": "Oportunidade",
      "Incentivos governamentais para o setor": "Oportunidade", 
      "Concorrentes saindo do mercado": "Oportunidade",
      "Novas tecnologias disponíveis": "Oportunidade"
    },
    obrigatoria: true
  },
  {
    id: "swot_oportunidade_2", 
    categoria: "swot",
    pergunta: "Qual a SEGUNDA maior oportunidade?",
    tipo: "swot_guiada_multi",
    opcoes: [
      "Demanda crescente por sustentabilidade",
      "Mercado de exportação em crescimento", 
      "Possibilidade de automação de processos",
      "Novos canais de distribuição",
      "Segmentos de nicho inexplorados",
      "Tendências favoráveis do setor",
      "Melhoria na logística/infraestrutura",
      "Acesso facilitado a crédito/investimento"
    ],
    direcionamento: {
      "Demanda crescente por sustentabilidade": "Oportunidade",
      "Mercado de exportação em crescimento": "Oportunidade",
      "Possibilidade de automação de processos": "Oportunidade",
      "Novos canais de distribuição": "Oportunidade",
      "Segmentos de nicho inexplorados": "Oportunidade",
      "Tendências favoráveis do setor": "Oportunidade",
      "Melhoria na logística/infraestrutura": "Oportunidade", 
      "Acesso facilitado a crédito/investimento": "Oportunidade"
    },
    obrigatoria: true
  },
  {
    id: "swot_ameaca_1",
    categoria: "swot",
    pergunta: "Qual a MAIOR AMEAÇA para o negócio?",
    tipo: "swot_guiada_multi",
    opcoes: [
      "Concorrência muito forte/desleal",
      "Crise econômica/recessão", 
      "Mudanças na legislação/regulamentação",
      "Aumento dos custos operacionais",
      "Dependência de poucos fornecedores",
      "Mudanças tecnológicas disruptivas",
      "Perda de clientes importantes",
      "Instabilidade política/econômica"
    ],
    direcionamento: {
      "Concorrência muito forte/desleal": "Ameaça",
      "Crise econômica/recessão": "Ameaça",
      "Mudanças na legislação/regulamentação": "Ameaça",
      "Aumento dos custos operacionais": "Ameaça",
      "Dependência de poucos fornecedores": "Ameaça",
      "Mudanças tecnológicas disruptivas": "Ameaça",
      "Perda de clientes importantes": "Ameaça",
      "Instabilidade política/econômica": "Ameaça"
    },
    obrigatoria: true
  },
  {
    id: "swot_ameaca_2",
    categoria: "swot",
    pergunta: "Qual a SEGUNDA maior ameaça?",
    tipo: "swot_guiada_multi",
    opcoes: [
      "Entrada de grandes players no mercado",
      "Sazonalidade das vendas",
      "Dificuldade para encontrar mão de obra",
      "Inflação/alta dos custos",
      "Mudanças no comportamento do consumidor",
      "Problemas com fornecedores/supply chain",
      "Novos impostos/taxações",
      "Risco de inadimplência dos clientes"
    ],
    direcionamento: {
      "Entrada de grandes players no mercado": "Ameaça",
      "Sazonalidade das vendas": "Ameaça", 
      "Dificuldade para encontrar mão de obra": "Ameaça",
      "Inflação/alta dos custos": "Ameaça",
      "Mudanças no comportamento do consumidor": "Ameaça",
      "Problemas com fornecedores/supply chain": "Ameaça",
      "Novos impostos/taxações": "Ameaça",
      "Risco de inadimplência dos clientes": "Ameaça"
    },
    obrigatoria: true
  },

  // Proposta Única de Valor - Expandida
  {
    id: "puv_problema",
    categoria: "puv",
    pergunta: "Qual o PRINCIPAL PROBLEMA que seus clientes enfrentam e que sua empresa resolve?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "puv_solucao",
    categoria: "puv", 
    pergunta: "Como exatamente sua empresa resolve esse problema? O que faz vocês serem únicos?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "puv_beneficio",
    categoria: "puv",
    pergunta: "Qual o PRINCIPAL BENEFÍCIO que seus clientes obtêm ao escolher vocês?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "puv_diferencial",
    categoria: "puv",
    pergunta: "O que diferencia vocês da concorrência? Por que os clientes escolhem vocês?",
    tipo: "texto", 
    obrigatoria: true
  },

  // Metas e Objetivos
  {
    id: "meta_faturamento_6meses",
    categoria: "fase",
    pergunta: "Qual meta de faturamento vocês querem atingir nos próximos 6 meses?",
    tipo: "multipla_escolha",
    opcoes: ["Crescer 20-50%", "Crescer 50-100%", "Dobrar o faturamento", "Triplicar o faturamento", "Manter estável", "Outro valor"],
    obrigatoria: true
  },
  {
    id: "meta_equipe_6meses", 
    categoria: "equipe",
    pergunta: "Quantas pessoas vocês pretendem contratar nos próximos 6 meses?",
    tipo: "multipla_escolha",
    opcoes: ["Nenhuma", "1-2 pessoas", "3-5 pessoas", "6-10 pessoas", "Mais de 10 pessoas"],
    obrigatoria: true
  },
  {
    id: "meta_principais_6meses",
    categoria: "fase",
    pergunta: "Quais são os 3 principais objetivos da empresa para os próximos 6 meses?",
    tipo: "texto",
    obrigatoria: true
  },

  // Informações adicionais para gerar mais ações
  {
    id: "sistemas_atuais",
    categoria: "fase",
    pergunta: "Quais sistemas/ferramentas a empresa usa atualmente?",
    tipo: "multipla_escolha_multi",
    opcoes: ["ERP", "CRM", "Sistema financeiro", "E-commerce", "Automação de marketing", "Gestão de estoque", "BI/Analytics", "RH/Folha", "Nenhum sistema"],
    obrigatoria: true
  },
  {
    id: "maiores_custos",
    categoria: "fase", 
    pergunta: "Quais são os maiores custos da empresa atualmente?",
    tipo: "multipla_escolha_multi",
    opcoes: ["Folha de pagamento", "Aluguel", "Marketing", "Estoque", "Impostos", "Fornecedores", "Tecnologia", "Logística", "Outros"],
    obrigatoria: true
  },
  {
    id: "prioridades_investimento",
    categoria: "fase",
    pergunta: "Em que áreas a empresa mais precisa investir nos próximos 6 meses?",
    tipo: "multipla_escolha_multi", 
    opcoes: ["Marketing/Vendas", "Tecnologia/Sistemas", "Pessoas/Treinamento", "Processos/Organização", "Infraestrutura", "Produtos/Serviços", "Financeiro/Controles", "Expansão"],
    obrigatoria: true
  }
];
