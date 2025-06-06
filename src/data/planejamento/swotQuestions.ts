
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const swotQuestions: PerguntaPlanejamento[] = [
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
  }
];
