
interface DiagnosticResults {
  processos: { score: number; total: number; percentage: number };
  resultados: { score: number; total: number; percentage: number };
  sistemaGestao: { score: number; total: number; percentage: number };
  pessoas: { score: number; total: number; percentage: number };
}

export const generateActionPlan = (results: DiagnosticResults) => {
  let actionPlan: {
    [key: string]: string[];
  } = {};
  
  // Processos
  if (results.processos.percentage < 50) {
    actionPlan.processos = [
      "Implementar a documentação dos principais processos do negócio",
      "Desenvolver um sistema de investigação de causas de problemas",
      "Criar documentação clara de missão, visão e valores para compartilhar com a equipe",
      "Estabelecer indicadores chave de desempenho (KPIs) para monitoramento"
    ];
  } else if (results.processos.percentage < 80) {
    actionPlan.processos = [
      "Aprimorar a documentação dos processos existentes",
      "Implementar reuniões regulares de alinhamento com a equipe",
      "Desenvolver um manual de cultura e orientações para novos colaboradores"
    ];
  } else {
    actionPlan.processos = [
      "Refinar processos existentes para maior eficiência",
      "Implementar ciclos de melhoria contínua (PDCA)"
    ];
  }
  
  // Resultados
  if (results.resultados.percentage < 50) {
    actionPlan.resultados = [
      "Implementar sistema de medição de margem de lucro",
      "Criar pesquisas de satisfação do cliente",
      "Desenvolver pesquisas de clima organizacional para medir satisfação dos colaboradores"
    ];
  } else if (results.resultados.percentage < 80) {
    actionPlan.resultados = [
      "Aprimorar os sistemas de medição existentes",
      "Implementar programa de remuneração por desempenho"
    ];
  } else {
    actionPlan.resultados = [
      "Otimizar estratégias para aumentar a taxa de crescimento",
      "Refinar o sistema de remuneração por desempenho"
    ];
  }
  
  // Sistema de Gestão
  if (results.sistemaGestao.percentage < 50) {
    actionPlan.sistemaGestao = [
      "Implementar planejamento anual estruturado",
      "Avaliar e melhorar os sistemas de informação",
      "Estabelecer metas claras com indicadores, prazos e valores"
    ];
  } else if (results.sistemaGestao.percentage < 80) {
    actionPlan.sistemaGestao = [
      "Aprimorar o acompanhamento de indicadores",
      "Garantir tempo adequado para atividades estratégicas"
    ];
  } else {
    actionPlan.sistemaGestao = [
      "Refinar o sistema de comunicação de indicadores",
      "Otimizar o processo de planejamento estratégico"
    ];
  }
  
  // Pessoas
  if (results.pessoas.percentage < 50) {
    actionPlan.pessoas = [
      "Implementar ações de comunicação interna e endomarketing",
      "Estruturar processo de recrutamento e seleção",
      "Implementar sistema de feedback periódico",
      "Mapear talentos e perfis dos colaboradores"
    ];
  } else if (results.pessoas.percentage < 80) {
    actionPlan.pessoas = [
      "Desenvolver descrições de cargo",
      "Implementar programas de treinamento técnico e comportamental",
      "Aprimorar estratégias de engajamento da equipe"
    ];
  } else {
    actionPlan.pessoas = [
      "Aprimorar as habilidades de delegação da liderança",
      "Avaliar e melhorar o ambiente físico de trabalho"
    ];
  }
  
  return actionPlan;
};
