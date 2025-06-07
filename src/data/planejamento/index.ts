
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";
import { diagnosticoQuestions } from "./diagnosticoQuestions";
import { swotQuestions } from "./swotQuestions";
import { negocioQuestions } from "./negocioQuestions";
import { equipeQuestions } from "./equipeQuestions";

export const perguntasPlanejamento: PerguntaPlanejamento[] = [
  // Pergunta inicial sobre nome da empresa
  {
    id: "empresa_nome",
    categoria: "diagnostico",
    pergunta: "Qual é o nome da sua empresa?",
    tipo: "texto",
    obrigatoria: true
  },
  
  // Perguntas de diagnóstico
  ...diagnosticoQuestions,
  
  // Perguntas SWOT
  ...swotQuestions,
  
  // Perguntas sobre o negócio (incluindo funcionários e gaps)
  ...negocioQuestions,
  
  // Perguntas sobre equipe
  ...equipeQuestions
];
