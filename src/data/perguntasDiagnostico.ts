
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const perguntasDiagnostico: PerguntaPlanejamento[] = [
  // Informações básicas da empresa
  {
    id: "empresa_nome",
    categoria: "negocio",
    pergunta: "Qual é o nome da sua empresa?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "empresa_setor",
    categoria: "negocio",
    pergunta: "Em qual setor sua empresa atua?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "empresa_produtos",
    categoria: "negocio",
    pergunta: "Quais são os principais produtos ou serviços oferecidos?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "empresa_publico",
    categoria: "negocio",
    pergunta: "Quem é seu público-alvo principal?",
    tipo: "texto",
    obrigatoria: true
  },

  // Diagnóstico das dores - Área Comercial
  {
    id: "dores_comercial",
    categoria: "diagnostico",
    pergunta: "Quais são os principais problemas que você enfrenta na área comercial/vendas? (Ex: baixa conversão, poucos leads, equipe desmotivada, falta de processo, etc.)",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "vendas_processo",
    categoria: "diagnostico",
    pergunta: "Existe um processo de vendas bem definido e documentado na empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "vendas_metas",
    categoria: "diagnostico",
    pergunta: "A equipe de vendas possui metas claras e acompanhamento regular?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "vendas_treinamento",
    categoria: "diagnostico",
    pergunta: "A equipe comercial recebe treinamento e capacitação regular?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },

  // Diagnóstico das dores - Gestão
  {
    id: "dores_gestao",
    categoria: "diagnostico",
    pergunta: "Quais são os principais desafios na gestão da empresa? (Ex: falta de organização, processos não documentados, dificuldade de controle, etc.)",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "gestao_processos",
    categoria: "diagnostico",
    pergunta: "Os principais processos do negócio estão documentados e padronizados?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "gestao_indicadores",
    categoria: "diagnostico",
    pergunta: "Existem indicadores e métricas sendo monitorados regularmente?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "gestao_reunioes",
    categoria: "diagnostico",
    pergunta: "Acontecem reuniões regulares de alinhamento com as equipes?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },

  // Diagnóstico das dores - RH/Pessoas
  {
    id: "dores_rh",
    categoria: "diagnostico",
    pergunta: "Quais são os principais problemas relacionados à equipe/RH? (Ex: alta rotatividade, desmotivação, falta de perfil adequado, conflitos, etc.)",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "rh_recrutamento",
    categoria: "diagnostico",
    pergunta: "O processo de recrutamento e seleção é bem estruturado?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "rh_feedback",
    categoria: "diagnostico",
    pergunta: "Os colaboradores recebem feedback regular sobre seu desempenho?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "rh_engajamento",
    categoria: "diagnostico",
    pergunta: "Existem ações para manter a equipe motivada e engajada?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },

  // Diagnóstico das dores - Marketing
  {
    id: "dores_marketing",
    categoria: "diagnostico",
    pergunta: "Quais são os principais desafios na área de marketing? (Ex: falta de visibilidade, poucos leads, baixo ROI, sem estratégia, etc.)",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "marketing_estrategia",
    categoria: "diagnostico",
    pergunta: "Existe uma estratégia de marketing bem definida e em execução?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "marketing_digital",
    categoria: "diagnostico",
    pergunta: "A empresa possui presença digital ativa (redes sociais, site, etc.)?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "marketing_leads",
    categoria: "diagnostico",
    pergunta: "Existe um processo estruturado de geração de leads?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },

  // Diagnóstico das dores - Financeiro
  {
    id: "dores_financeiro",
    categoria: "diagnostico",
    pergunta: "Quais são os principais problemas financeiros da empresa? (Ex: fluxo de caixa, inadimplência, falta de controle, margem baixa, etc.)",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "financeiro_controle",
    categoria: "diagnostico",
    pergunta: "Existe um controle financeiro detalhado (entradas, saídas, fluxo de caixa)?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "financeiro_planejamento",
    categoria: "diagnostico",
    pergunta: "É feito planejamento financeiro (orçamento, projeções, metas)?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "financeiro_margem",
    categoria: "diagnostico",
    pergunta: "A margem de lucro é mensurada e está em nível satisfatório?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },

  // Diagnóstico das dores - Sucesso do Cliente
  {
    id: "dores_cliente",
    categoria: "diagnostico",
    pergunta: "Quais são os principais problemas relacionados ao atendimento e satisfação dos clientes? (Ex: reclamações, cancelamentos, baixo NPS, etc.)",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "cliente_satisfacao",
    categoria: "diagnostico",
    pergunta: "A satisfação do cliente é mensurada regularmente?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "cliente_pos_venda",
    categoria: "diagnostico",
    pergunta: "Existe um processo estruturado de pós-venda e relacionamento?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "cliente_fidelizacao",
    categoria: "diagnostico",
    pergunta: "Existem ações para fidelização e retenção de clientes?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },

  // Sistema de Gestão
  {
    id: "sistema_gestao_planejamento",
    categoria: "diagnostico",
    pergunta: "É feito planejamento estratégico (anual, metas de longo prazo)?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "sistema_gestao_software",
    categoria: "diagnostico",
    pergunta: "Os sistemas de informação (softwares) são adequados para o negócio?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },
  {
    id: "sistema_gestao_tempo",
    categoria: "diagnostico",
    pergunta: "Os líderes dedicam tempo adequado para atividades estratégicas?",
    tipo: "multipla_escolha",
    opcoes: ["Existe e é satisfatório", "Existe, mas não é satisfatório", "Não existe"],
    obrigatoria: true
  },

  // Proposta Única de Valor
  {
    id: "diferencial_competitivo",
    categoria: "puv",
    pergunta: "O que diferencia sua empresa da concorrência?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "problema_cliente",
    categoria: "puv",
    pergunta: "Qual o principal problema que seus clientes enfrentam e você resolve?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "beneficio_principal",
    categoria: "puv",
    pergunta: "Qual o principal benefício que seus clientes obtêm?",
    tipo: "texto",
    obrigatoria: true
  },

  // Estrutura da empresa
  {
    id: "tempo_mercado",
    categoria: "fase",
    pergunta: "Há quanto tempo a empresa está no mercado?",
    tipo: "multipla_escolha",
    opcoes: ["Menos de 1 ano", "1-3 anos", "3-7 anos", "7-15 anos", "Mais de 15 anos"],
    obrigatoria: true
  },
  {
    id: "numero_funcionarios",
    categoria: "equipe",
    pergunta: "Quantos funcionários a empresa possui?",
    tipo: "multipla_escolha",
    opcoes: ["1-5", "6-15", "16-50", "51-100", "Mais de 100"],
    obrigatoria: true
  },
  {
    id: "faturamento_atual",
    categoria: "fase",
    pergunta: "Qual a faixa de faturamento mensal atual?",
    tipo: "multipla_escolha",
    opcoes: ["Até R$ 50k", "R$ 50k - R$ 200k", "R$ 200k - R$ 500k", "R$ 500k - R$ 1M", "Acima de R$ 1M"],
    obrigatoria: true
  }
];
