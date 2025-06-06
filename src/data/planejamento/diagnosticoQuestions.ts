
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const diagnosticoQuestions: PerguntaPlanejamento[] = [
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
  }
];
