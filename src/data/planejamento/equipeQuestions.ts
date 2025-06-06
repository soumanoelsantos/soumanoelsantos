
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const equipeQuestions: PerguntaPlanejamento[] = [
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
    tipo: "multipla_escolha_multi",
    opcoes: ["Vendas", "Marketing", "Operacional/Produção", "Financeiro", "RH", "TI", "Atendimento ao Cliente", "Apenas o(s) sócio(s)"],
    obrigatoria: true
  }
];
