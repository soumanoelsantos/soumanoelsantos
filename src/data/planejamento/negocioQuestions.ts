
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const negocioQuestions: PerguntaPlanejamento[] = [
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
  }
];
