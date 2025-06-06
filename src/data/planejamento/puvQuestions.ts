
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const puvQuestions: PerguntaPlanejamento[] = [
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
  }
];
