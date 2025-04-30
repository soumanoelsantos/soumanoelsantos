
import { PhaseTest } from "../types/phaseTest";

// Test phases and questions
export const phaseTestData: PhaseTest[] = [
  {
    id: 1,
    phase: "Fase Inicial (Criação)",
    questions: [
      "Você está tentando validar seu produto/serviço no mercado?",
      "Sua empresa existe há menos de 2 anos?",
      "Você tem poucos clientes pagantes (menos de 10)?",
      "Você ainda está ajustando seu modelo de negócio?",
      "Você é o principal responsável por todas as áreas da empresa?",
    ],
    description: "Nesta fase, o foco está na validação do modelo de negócio e na busca dos primeiros clientes. O empreendedor geralmente faz quase tudo sozinho e está testando se sua solução resolve um problema real do mercado.",
    recommendations: [
      "Concentre-se em validar seu produto/serviço com clientes reais",
      "Estabeleça um modelo de negócio claro",
      "Crie um MVP (Produto Mínimo Viável) para testar suas hipóteses",
      "Busque feedback constante dos clientes",
      "Comece a construir sua rede de contatos no setor"
    ]
  },
  {
    id: 2,
    phase: "Fase de Estruturação (Sobrevivência)",
    questions: [
      "Sua empresa já tem um fluxo constante de clientes?",
      "Você está começando a contratar pessoas para funções específicas?",
      "Sua receita mensal cobre os custos operacionais básicos?",
      "Você ainda está muito envolvido na operação diária?",
      "Você está começando a criar processos básicos na empresa?",
    ],
    description: "Nesta fase, a empresa já tem um produto/serviço validado e está começando a construir uma base de clientes recorrentes. O foco passa a ser a estruturação de processos básicos e a garantia da sobrevivência financeira.",
    recommendations: [
      "Estruture processos básicos de vendas e atendimento",
      "Comece a delegar atividades operacionais",
      "Estabeleça metas de crescimento realistas",
      "Implemente controles financeiros básicos",
      "Desenvolva uma estratégia de marketing mais estruturada"
    ]
  },
  {
    id: 3,
    phase: "Fase de Crescimento (Escala)",
    questions: [
      "Você já tem uma equipe estabelecida com funções bem definidas?",
      "Sua empresa possui processos documentados nas principais áreas?",
      "Você está conseguindo crescer sem aumentar proporcionalmente os custos?",
      "Você passa mais tempo planejando do que executando tarefas operacionais?",
      "Sua empresa já possui uma marca reconhecida no mercado?",
    ],
    description: "Na fase de crescimento, a empresa já possui uma base sólida de clientes e está expandindo rapidamente. O foco está em otimizar processos, escalar a operação e construir uma equipe eficiente.",
    recommendations: [
      "Implemente sistemas de gestão mais robustos",
      "Desenvolva um processo de recrutamento eficiente",
      "Crie um plano de marketing e vendas escalável",
      "Busque novas fontes de financiamento se necessário",
      "Estabeleça KPIs claros para todas as áreas"
    ]
  },
  {
    id: 4,
    phase: "Fase de Maturidade (Estabilidade)",
    questions: [
      "Sua empresa possui múltiplas unidades de negócio ou produtos?",
      "Você tem um time de liderança que gerencia as operações sem sua intervenção constante?",
      "Sua empresa consegue manter crescimento sustentável ano após ano?",
      "Você possui sistemas de gestão bem estabelecidos em todas as áreas?",
      "Sua empresa é referência no setor em que atua?",
    ],
    description: "Na fase de maturidade, a empresa já é bem estabelecida no mercado e possui operações estáveis. O foco passa a ser a diversificação, eficiência operacional e busca por novos mercados ou produtos.",
    recommendations: [
      "Desenvolva estratégias de diversificação",
      "Implemente programas de desenvolvimento de lideranças",
      "Busque inovações para manter a competitividade",
      "Considere aquisições estratégicas",
      "Avalie oportunidades de expansão para novos mercados"
    ]
  },
  {
    id: 5,
    phase: "Fase de Expansão (Liderança)",
    questions: [
      "Sua empresa atua em múltiplos mercados ou países?",
      "Você tem uma estrutura corporativa complexa com múltiplos níveis de gestão?",
      "Sua empresa é líder de mercado com forte vantagem competitiva?",
      "Você está mais focado na visão estratégica de longo prazo do que na gestão diária?",
      "Sua empresa tem presença de marca consolidada nacionalmente ou internacionalmente?",
    ],
    description: "Na fase de expansão, a empresa já é líder em seu setor e está buscando novos horizontes. O foco está na internacionalização, diversificação de negócios e consolidação da liderança de mercado.",
    recommendations: [
      "Desenvolva estratégias de internacionalização",
      "Busque parcerias estratégicas de alto nível",
      "Invista em pesquisa e desenvolvimento",
      "Considere abrir capital ou buscar investimentos significativos",
      "Estruture uma governança corporativa robusta"
    ]
  }
];
