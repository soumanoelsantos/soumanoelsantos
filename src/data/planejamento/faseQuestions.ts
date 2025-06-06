
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const faseQuestions: PerguntaPlanejamento[] = [
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
