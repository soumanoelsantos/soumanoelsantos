
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const perguntasPlanejamento: PerguntaPlanejamento[] = [
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
  {
    id: "empresa_concorrentes",
    categoria: "swot",
    pergunta: "Quais são seus principais concorrentes?",
    tipo: "texto",
    obrigatoria: true
  },
  
  // Diagnóstico empresarial
  {
    id: "processos_documentados",
    categoria: "diagnostico",
    pergunta: "Sua empresa possui processos documentados e padronizados?",
    tipo: "sim_nao",
    obrigatoria: true
  },
  {
    id: "controle_qualidade",
    categoria: "diagnostico",
    pergunta: "Existe um sistema de controle de qualidade implementado?",
    tipo: "sim_nao",
    obrigatoria: true
  },
  {
    id: "metas_definidas",
    categoria: "diagnostico",
    pergunta: "A empresa possui metas claras e mensuráveis?",
    tipo: "sim_nao",
    obrigatoria: true
  },
  {
    id: "acompanhamento_resultados",
    categoria: "diagnostico",
    pergunta: "Há acompanhamento regular dos resultados e indicadores?",
    tipo: "sim_nao",
    obrigatoria: true
  },
  {
    id: "sistema_gestao",
    categoria: "diagnostico",
    pergunta: "Utiliza algum sistema de gestão (ERP, CRM, etc.)?",
    tipo: "sim_nao",
    obrigatoria: true
  },
  {
    id: "capacitacao_equipe",
    categoria: "diagnostico",
    pergunta: "A equipe recebe capacitação e treinamento regular?",
    tipo: "sim_nao",
    obrigatoria: true
  },
  
  // Análise SWOT
  {
    id: "forcas_empresa",
    categoria: "swot",
    pergunta: "Quais considera serem os principais pontos fortes da sua empresa?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "fraquezas_empresa",
    categoria: "swot",
    pergunta: "Quais são as principais fraquezas ou pontos de melhoria?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "oportunidades_mercado",
    categoria: "swot",
    pergunta: "Que oportunidades você vê no mercado atual?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "ameacas_mercado",
    categoria: "swot",
    pergunta: "Quais ameaças ou desafios enxerga no mercado?",
    tipo: "texto",
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
  
  // Equipe e estrutura
  {
    id: "numero_funcionarios",
    categoria: "equipe",
    pergunta: "Quantos funcionários a empresa possui?",
    tipo: "multipla_escolha",
    opcoes: ["1-5", "6-15", "16-50", "51-100", "Mais de 100"],
    obrigatoria: true
  },
  {
    id: "estrutura_hierarquica",
    categoria: "equipe",
    pergunta: "Como está organizada a estrutura hierárquica da empresa?",
    tipo: "texto",
    obrigatoria: false
  },
  {
    id: "principais_cargos",
    categoria: "equipe",
    pergunta: "Quais são os principais cargos e responsabilidades?",
    tipo: "texto",
    obrigatoria: true
  },
  
  // Fase da empresa
  {
    id: "tempo_mercado",
    categoria: "fase",
    pergunta: "Há quanto tempo a empresa está no mercado?",
    tipo: "multipla_escolha",
    opcoes: ["Menos de 1 ano", "1-3 anos", "3-7 anos", "7-15 anos", "Mais de 15 anos"],
    obrigatoria: true
  },
  {
    id: "faturamento_atual",
    categoria: "fase",
    pergunta: "Qual a faixa de faturamento mensal atual?",
    tipo: "multipla_escolha",
    opcoes: ["Até R$ 50k", "R$ 50k - R$ 200k", "R$ 200k - R$ 500k", "R$ 500k - R$ 1M", "Acima de R$ 1M"],
    obrigatoria: true
  },
  {
    id: "crescimento_atual",
    categoria: "fase",
    pergunta: "Como avalia o crescimento atual da empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Crescimento acelerado", "Crescimento estável", "Estagnado", "Em declínio"],
    obrigatoria: true
  }
];
