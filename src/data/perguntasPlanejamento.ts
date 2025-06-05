
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
  
  // Análise SWOT - Perguntas Guiadas
  {
    id: "swot_marketing_plano",
    categoria: "swot",
    pergunta: "Você tem um bom plano de marketing funcionando hoje?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Força",
      "Não": "Fraqueza"
    },
    obrigatoria: true
  },
  {
    id: "swot_concorrentes_redes_sociais",
    categoria: "swot",
    pergunta: "Seus concorrentes estão investindo mais em redes sociais do que você?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Ameaça",
      "Não": "Oportunidade"
    },
    obrigatoria: true
  },
  {
    id: "swot_novo_nicho_mercado",
    categoria: "swot",
    pergunta: "Está surgindo um novo nicho de mercado que você poderia atender?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Oportunidade",
      "Não": null
    },
    obrigatoria: true
  },
  {
    id: "swot_equipe_qualificada",
    categoria: "swot",
    pergunta: "Sua equipe é mais qualificada que a dos concorrentes?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Força",
      "Não": "Fraqueza"
    },
    obrigatoria: true
  },
  {
    id: "swot_fluxo_caixa",
    categoria: "swot",
    pergunta: "Sua empresa tem problemas de fluxo de caixa?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Fraqueza",
      "Não": "Força"
    },
    obrigatoria: true
  },
  {
    id: "swot_tecnologia_atual",
    categoria: "swot",
    pergunta: "A tecnologia que você usa está desatualizada comparada ao mercado?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Fraqueza",
      "Não": "Força"
    },
    obrigatoria: true
  },
  {
    id: "swot_clientes_fieis",
    categoria: "swot",
    pergunta: "Você possui uma base sólida de clientes fiéis?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Força",
      "Não": "Fraqueza"
    },
    obrigatoria: true
  },
  {
    id: "swot_regulamentacao_setor",
    categoria: "swot",
    pergunta: "Existem novas regulamentações que podem afetar negativamente seu setor?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Ameaça",
      "Não": null
    },
    obrigatoria: true
  },
  {
    id: "swot_localizacao_estrategica",
    categoria: "swot",
    pergunta: "Sua empresa está em uma localização estratégica para o negócio?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Força",
      "Não": "Fraqueza"
    },
    obrigatoria: true
  },
  {
    id: "swot_parcerias_estrategicas",
    categoria: "swot",
    pergunta: "Existem oportunidades de parcerias estratégicas inexploradas?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Oportunidade",
      "Não": null
    },
    obrigatoria: true
  },
  {
    id: "swot_dependencia_fornecedores",
    categoria: "swot",
    pergunta: "Sua empresa depende muito de poucos fornecedores?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Fraqueza",
      "Não": "Força"
    },
    obrigatoria: true
  },
  {
    id: "swot_crise_economica",
    categoria: "swot",
    pergunta: "Uma crise econômica afetaria severamente seu negócio?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Ameaça",
      "Não": "Força"
    },
    obrigatoria: true
  },
  {
    id: "swot_expansao_geografica",
    categoria: "swot",
    pergunta: "Existem mercados geográficos que você ainda não atende?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Oportunidade",
      "Não": null
    },
    obrigatoria: true
  },
  {
    id: "swot_inovacao_produtos",
    categoria: "swot",
    pergunta: "Sua empresa é reconhecida pela inovação em produtos/serviços?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Força",
      "Não": "Fraqueza"
    },
    obrigatoria: true
  },
  {
    id: "swot_competidores_grandes",
    categoria: "swot",
    pergunta: "Grandes empresas estão entrando no seu mercado?",
    tipo: "swot_guiada",
    opcoes: ["Sim", "Não"],
    direcionamento: {
      "Sim": "Ameaça",
      "Não": null
    },
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
  
  // Equipe e estrutura - Perguntas simplificadas
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
    pergunta: "Qual o modelo da sua empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Hierárquica tradicional", "Horizontal (poucos níveis)", "Por projetos/equipes", "Familiar", "Ainda em definição"],
    obrigatoria: true
  },
  {
    id: "principais_cargos",
    categoria: "equipe",
    pergunta: "Quais áreas/departamentos existem na empresa?",
    tipo: "multipla_escolha",
    opcoes: ["Vendas", "Marketing", "Operacional/Produção", "Financeiro", "RH", "TI", "Atendimento ao Cliente", "Apenas o(s) sócio(s)"],
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
