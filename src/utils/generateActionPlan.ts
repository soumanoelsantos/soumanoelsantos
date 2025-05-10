
import { generateEnhancedActionPlan } from './deepseekApi';

interface DiagnosticResults {
  processos: { score: number; total: number; percentage: number };
  resultados: { score: number; total: number; percentage: number };
  sistemaGestao: { score: number; total: number; percentage: number };
  pessoas: { score: number; total: number; percentage: number };
}

export const generateActionPlan = async (results: DiagnosticResults, answersData?: any) => {
  console.log("Starting action plan generation with results:", results);
  console.log("And answers data:", answersData);
  
  // First try to get an enhanced plan from the DeepSeek API
  try {
    console.log("Attempting to generate enhanced action plan via DeepSeek API...");
    
    // Convert diagnostic results to SWOT format for the API
    const swotData = {
      strengths: [`Pontuação em Processos: ${results.processos.percentage}%`],
      weaknesses: [`Pontuação em Gestão: ${results.sistemaGestao.percentage}%`],
      opportunities: [`Pontuação em Resultados: ${results.resultados.percentage}%`],
      threats: [`Pontuação em Pessoas: ${results.pessoas.percentage}%`]
    };
    
    const enhancedPlan = await generateEnhancedActionPlan(swotData);
    
    // If we got a successful response from the API, use it
    if (enhancedPlan && Object.keys(enhancedPlan).length > 0) {
      console.log("Successfully generated enhanced plan:", enhancedPlan);
      return enhancedPlan;
    } else {
      console.log("DeepSeek API returned empty or invalid response, falling back to local generation");
    }
  } catch (error) {
    console.error("Error with enhanced action plan generation:", error);
    console.log("Falling back to local generation");
  }
  
  // Fallback to local generation if API fails
  console.log("Generating fallback local action plan");
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
  
  console.log("Generated fallback action plan:", actionPlan);
  return actionPlan;
};
