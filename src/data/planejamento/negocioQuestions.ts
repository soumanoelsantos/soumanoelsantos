
import { PerguntaPlanejamento } from "@/types/planejamentoEstrategico";

export const negocioQuestions: PerguntaPlanejamento[] = [
  {
    id: "modelo_negocio",
    categoria: "negocio",
    pergunta: "Qual é o modelo de negócio da sua empresa?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "produtos_servicos",
    categoria: "negocio",
    pergunta: "Quais são os principais produtos ou serviços oferecidos?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "publico_alvo",
    categoria: "negocio",
    pergunta: "Quem é o seu público-alvo principal?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "numero_funcionarios",
    categoria: "negocio",
    pergunta: "Quantos funcionários a empresa possui atualmente?",
    tipo: "multipla_escolha",
    opcoes: ["1-5 funcionários", "6-15 funcionários", "16-50 funcionários", "51-100 funcionários", "Mais de 100 funcionários"],
    obrigatoria: true
  },
  {
    id: "perfil_funcionarios",
    categoria: "negocio",
    pergunta: "Como você classifica o perfil dos seus funcionários?",
    tipo: "multipla_escolha",
    opcoes: ["Iniciantes/Júnior", "Intermediário", "Experientes/Sênior", "Misto (todos os níveis)", "Especializados/Técnicos"],
    obrigatoria: true
  },
  {
    id: "principais_gaps",
    categoria: "negocio",
    pergunta: "Quais são os principais gaps (lacunas) que você identifica na sua empresa?",
    tipo: "multipla_escolha_multi",
    opcoes: ["Falta de processos definidos", "Ausência de indicadores", "Equipe sem autonomia", "Problemas de comunicação", "Falta de planejamento estratégico", "Deficiência em vendas/marketing", "Gestão financeira inadequada", "Falta de tecnologia", "Capacitação da equipe", "Estrutura organizacional"],
    obrigatoria: true
  },
  {
    id: "maiores_desafios",
    categoria: "negocio",
    pergunta: "Quais são os maiores desafios enfrentados atualmente?",
    tipo: "texto",
    obrigatoria: true
  },
  {
    id: "objetivos_principais",
    categoria: "negocio",
    pergunta: "Quais são os principais objetivos da empresa para os próximos 12 meses?",
    tipo: "texto",
    obrigatoria: true
  }
];
