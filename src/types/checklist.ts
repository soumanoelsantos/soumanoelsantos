
export interface ChecklistItem {
  id: number;
  question: string;
  description: string;
  checked: boolean;
}

export interface ChecklistData {
  checklistItems: ChecklistItem[];
  score: number;
}

export const defaultChecklistItems: ChecklistItem[] = [
  {
    id: 1,
    question: "Sua empresa está estruturada financeiramente para aumentar o custo fixo da folha de pagamento?",
    description: "Pontos a considerar: o custo de contratação de um funcionário no Brasil pode ultrapassar os 60% do salário em questão, a depender do regime tributário da empresa.",
    checked: false
  },
  {
    id: 2,
    question: "Esse novo funcionário contribuirá para o crescimento efetivo do seu negócio?",
    description: "Pontos a considerar: a contratação de um novo funcionário deve fazer parte do objetivo estratégico da empresa e não apenas \"apagar um incêndio\" (quando você não está dando conta do volume de trabalho, por exemplo).",
    checked: false
  },
  {
    id: 3,
    question: "Existe uma demanda real e de longo prazo que justifique essa contratação?",
    description: "Pontos a considerar: não dá para contratar alguém fixo e em tempo integral por causa de um aumento temporário da demanda dos clientes.",
    checked: false
  },
  {
    id: 4,
    question: "Você tem certeza de que essa necessidade empresarial está diretamente relacionada à contratação de um novo funcionário?",
    description: "Pontos a considerar: Pessoas + Processos = Resultados. Sua empresa precisa de mais um profissional ou os processos é que devem ser rearranjos (implantação de um novo software, reorganização da equipe etc.)?",
    checked: false
  },
  {
    id: 5,
    question: "Está claro para você quais são as habilidades e expertise que esse novo funcionário deve aportar na empresa?",
    description: "Pontos a considerar: antes de pensar em contratar, é preciso ter claro o perfil profissional que agregará valor para a empresa.",
    checked: false
  },
  {
    id: 6,
    question: "Você já considerou a hipótese de terceirizar essa demanda específica, buscando inteligência externa para resolver o problema?",
    description: "Pontos a considerar: contar com uma ajuda pontual externa, além de ser muito mais barato, reduz dramaticamente o risco de uma contratação malsucedida.",
    checked: false
  },
  {
    id: 7,
    question: "Essa nova contratação vai desenvolver um trabalho que você ou alguém da equipe não pode executar e/ou aprender?",
    description: "Pontos a considerar: é sempre tempo de desenvolver suas próprias habilidades e expertise, portanto vale sempre a pena considerar essa hipótese.",
    checked: false
  },
  {
    id: 8,
    question: "Você tem percebido problemas na qualidade da entrega e do atendimento de sua empresa que justifiquem a contratação?",
    description: "Pontos a considerar: esse é um bom termômetro e é sempre bom ouvir o que os stakeholders têm a dizer sobre a qualidade de entrega e atendimento.",
    checked: false
  },
  {
    id: 9,
    question: "A estrutura física atual de sua empresa (espaço, mesa, computador) está preparada para receber esse novo funcionário?",
    description: "Pontos a considerar: é sempre importante lembrar que a contratação de um funcionário não representa aumento de custos apenas por seu salário e encargos. É preciso oferecer estrutura física adequada para receber este profissional.",
    checked: false
  },
  {
    id: 10,
    question: "Você já considerou e refletiu, de maneira aprofundada, sobre o que aconteceria em sua empresa se você não fizesse essa contratação?",
    description: "Pontos a considerar: este é um bom exercício para entender se a não contratação seria realmente sentida pela empresa.",
    checked: false
  }
];
