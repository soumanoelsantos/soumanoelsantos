
import { SwotData } from "@/types/swot";
import { CompanyInfoData } from "@/types/companyInfo";

/**
 * Generate a prompt for the DeepSeek API based on SWOT data and company info
 */
export const generateSwotPrompt = (swotData: any) => {
  let prompt = "Com base na análise SWOT abaixo, crie um plano de ação prático e detalhado:\n\n";
  
  // Add Strengths
  prompt += "FORÇAS:\n";
  if (swotData.strengths && swotData.strengths.length > 0) {
    swotData.strengths.forEach((item: string, index: number) => {
      prompt += `${index + 1}. ${item}\n`;
    });
  } else {
    prompt += "Nenhuma força identificada.\n";
  }
  
  // Add Weaknesses
  prompt += "\nFRAQUEZAS:\n";
  if (swotData.weaknesses && swotData.weaknesses.length > 0) {
    swotData.weaknesses.forEach((item: string, index: number) => {
      prompt += `${index + 1}. ${item}\n`;
    });
  } else {
    prompt += "Nenhuma fraqueza identificada.\n";
  }
  
  // Add Opportunities
  prompt += "\nOPORTUNIDADES:\n";
  if (swotData.opportunities && swotData.opportunities.length > 0) {
    swotData.opportunities.forEach((item: string, index: number) => {
      prompt += `${index + 1}. ${item}\n`;
    });
  } else {
    prompt += "Nenhuma oportunidade identificada.\n";
  }
  
  // Add Threats
  prompt += "\nAMEAÇAS:\n";
  if (swotData.threats && swotData.threats.length > 0) {
    swotData.threats.forEach((item: string, index: number) => {
      prompt += `${index + 1}. ${item}\n`;
    });
  } else {
    prompt += "Nenhuma ameaça identificada.\n";
  }
  
  // Add company info if available
  if (swotData.companyInfo) {
    prompt += "\nINFORMAÇÕES ADICIONAIS SOBRE A EMPRESA:\n";
    const info = swotData.companyInfo;
    
    if (info.industry) prompt += `Setor/Indústria: ${info.industry}\n`;
    if (info.mainProducts) prompt += `Principais produtos/serviços: ${info.mainProducts}\n`;
    if (info.targetAudience) prompt += `Público-alvo: ${info.targetAudience}\n`;
    if (info.mainChallenges) prompt += `Principais desafios/gargalos: ${info.mainChallenges}\n`;
    if (info.competitors) prompt += `Principais concorrentes: ${info.competitors}\n`;
    if (info.goals) prompt += `Objetivos para os próximos 12 meses: ${info.goals}\n`;
  }
  
  // Check if detailed flag is set
  const isDetailed = swotData.detailed === true;
  
  // Detailed instructions for the AI
  if (isDetailed) {
    // Request even more detailed and implementation-focused action plan
    prompt += `\nCrie um plano de ação EXTREMAMENTE detalhado e implementável dividido em 4 tipos de estratégias:
  
1. Estratégias SO (Forças + Oportunidades): Como usar os pontos fortes para aproveitar as oportunidades
2. Estratégias ST (Forças + Ameaças): Como usar os pontos fortes para minimizar as ameaças
3. Estratégias WO (Fraquezas + Oportunidades): Como superar os pontos fracos aproveitando as oportunidades
4. Estratégias WT (Fraquezas + Ameaças): Como minimizar os pontos fracos e evitar as ameaças

Para cada tipo de estratégia, inclua pelo menos 4-7 ações PRÁTICAS, ESPECÍFICAS e DETALHADAS que podem ser implementadas imediatamente.
CADA ação deve seguir o formato SMART:
- Específico: Descreva exatamente o que precisa ser feito, em detalhes
- Mensurável: Como medir o sucesso dessa ação
- Atingível: Recursos necessários para implementar essa ação
- Relevante: Por que essa ação é importante e como ela se conecta à estratégia geral
- Temporal: Cronograma de implementação com prazos específicos

Para cada ação, responda estas perguntas:
1. O que precisa ser feito em detalhes práticos?
2. Quem deve ser responsável por essa tarefa?
3. Quais recursos (tempo, dinheiro, pessoas) serão necessários?
4. Como medir o sucesso dessa ação específica?
5. Quando deve ser implementada e concluída?
6. Quais são os riscos ou desafios potenciais na implementação?
7. Quais são os benefícios esperados após a implementação?

Seja extremamente prático, específico e detalhado. ÉVITE GENERALIZAÇÕES.`;
  } else {
    // Standard instructions
    prompt += `\nCrie um plano de ação detalhado dividido em 4 tipos de estratégias:
  
1. Estratégias SO (Forças + Oportunidades): Como usar os pontos fortes para aproveitar as oportunidades
2. Estratégias ST (Forças + Ameaças): Como usar os pontos fortes para minimizar as ameaças
3. Estratégias WO (Fraquezas + Oportunidades): Como superar os pontos fracos aproveitando as oportunidades
4. Estratégias WT (Fraquezas + Ameaças): Como minimizar os pontos fracos e evitar as ameaças

Para cada tipo de estratégia, inclua pelo menos 3-5 ações PRÁTICAS e ESPECÍFICAS que podem ser implementadas imediatamente.
Cada ação deve ser clara, prática, e diretamente relacionada aos pontos da análise SWOT e às informações da empresa fornecidas.
Certifique-se de personalizar as recomendações com base no setor da empresa, produtos, público-alvo e desafios mencionados.`;
  }
  
  // Format response as JSON
  prompt += `\n\nFormate sua resposta como um objeto JSON com estas quatro chaves:
- "strengthsOpportunities": array de ações para estratégias SO
- "strengthsThreats": array de ações para estratégias ST  
- "weaknessesOpportunities": array de ações para estratégias WO
- "weaknessesThreats": array de ações para estratégias WT

Cada array deve conter strings com ações específicas. Seja prático, direto e preciso.`;
  
  return prompt;
};

/**
 * Generate a prompt for creating an action plan based on phase test results
 */
export const generatePhaseTestPrompt = (data: any) => {
  let prompt = "Crie um plano de ação personalizado, prático e detalhado baseado nos seguintes dados sobre a empresa:\n\n";
  
  // Phase test results
  if (data.phaseResult) {
    prompt += `FASE ATUAL DA EMPRESA: ${data.phaseResult.phaseName}\n`;
    prompt += `Compatibilidade com esta fase: ${Math.round(data.phaseResult.score)}%\n`;
    prompt += `Descrição da fase: ${data.phaseResult.description}\n\n`;
    
    prompt += "RECOMENDAÇÕES INICIAIS:\n";
    if (data.phaseResult.recommendations && data.phaseResult.recommendations.length > 0) {
      data.phaseResult.recommendations.forEach((rec: string, index: number) => {
        prompt += `${index + 1}. ${rec}\n`;
      });
    }
  }
  
  // Add diagnostic data if available
  if (data.diagnosticData) {
    prompt += "\nRESULTADOS DO DIAGNÓSTICO GERAL:\n";
    
    if (data.diagnosticData.results) {
      const results = data.diagnosticData.results;
      
      if (results.processos) prompt += `Processos: ${results.processos.percentage}%\n`;
      if (results.pessoas) prompt += `Pessoas: ${results.pessoas.percentage}%\n`;
      if (results.resultados) prompt += `Resultados: ${results.resultados.percentage}%\n`;
      if (results.sistemaGestao) prompt += `Sistema de Gestão: ${results.sistemaGestao.percentage}%\n`;
    }
    
    if (data.diagnosticData.answers_data) {
      prompt += "\nPONTOS PRINCIPAIS IDENTIFICADOS NO DIAGNÓSTICO:\n";
      
      const answersData = data.diagnosticData.answers_data;
      Object.keys(answersData).forEach(key => {
        const section = answersData[key];
        if (section && section.answers) {
          section.answers.forEach((answer: any) => {
            if (answer.answer === 'satisfactory') {
              prompt += `- FORTE: ${answer.question}\n`;
            } else if (answer.answer === 'nonexistent') {
              prompt += `- FRACO: ${answer.question}\n`;
            }
          });
        }
      });
    }
  }
  
  // Add SWOT data if available
  if (data.swotData) {
    prompt += "\nANÁLISE SWOT DA EMPRESA:\n";
    
    if (data.swotData.strengths && data.swotData.strengths.length > 0) {
      prompt += "Forças:\n";
      data.swotData.strengths.forEach((strength: any) => {
        if (strength.text) prompt += `- ${strength.text}\n`;
      });
    }
    
    if (data.swotData.weaknesses && data.swotData.weaknesses.length > 0) {
      prompt += "\nFraquezas:\n";
      data.swotData.weaknesses.forEach((weakness: any) => {
        if (weakness.text) prompt += `- ${weakness.text}\n`;
      });
    }
    
    if (data.swotData.opportunities && data.swotData.opportunities.length > 0) {
      prompt += "\nOportunidades:\n";
      data.swotData.opportunities.forEach((opportunity: any) => {
        if (opportunity.text) prompt += `- ${opportunity.text}\n`;
      });
    }
    
    if (data.swotData.threats && data.swotData.threats.length > 0) {
      prompt += "\nAmeaças:\n";
      data.swotData.threats.forEach((threat: any) => {
        if (threat.text) prompt += `- ${threat.text}\n`;
      });
    }
  }
  
  // Instructions for the AI
  prompt += `\nCom base nessas informações, crie um plano de ação personalizado e detalhado com 10 ações práticas e específicas seguindo a metodologia SMART:
  
- Específico (Specific): Ações claras e bem definidas
- Mensurável (Measurable): Deve ser possível medir o progresso
- Atingível (Achievable): Realista e factível para esta empresa
- Relevante (Relevant): Relacionado diretamente aos desafios identificados
- Temporal (Time-bound): Com prazos claros para implementação

Para cada ação, inclua:
1. O que exatamente deve ser feito
2. Como será medido o sucesso
3. Quais recursos serão necessários
4. Por que esta ação é importante
5. O prazo recomendado para implementação (curto, médio ou longo prazo)

Formule cada ação como uma instrução clara e direta, iniciando com um verbo no infinitivo.
Retorne apenas uma lista de 10 ações SMART, sem seções ou categorias adicionais.

Lembre-se de que o plano deve ser adaptado à fase atual da empresa (${data.phaseResult?.phaseName || "Não identificada"}) e aos desafios específicos identificados nos diagnósticos.`;

  return prompt;
};

/**
 * Prepare SWOT data for the API by formatting it correctly
 */
export const prepareSwotDataForApi = (data: SwotData, companyInfo?: CompanyInfoData | null) => {
  // Extract valid items from SWOT data
  const validStrengths = data.strengths.filter(s => s.text && s.text.trim() !== '').map(s => s.text);
  const validWeaknesses = data.weaknesses.filter(w => w.text && w.text.trim() !== '').map(w => w.text);
  const validOpportunities = data.opportunities.filter(o => o.text && o.text.trim() !== '').map(o => o.text);
  const validThreats = data.threats.filter(t => t.text && t.text.trim() !== '').map(t => t.text);
  
  // Prepare SWOT data for API
  return {
    strengths: validStrengths,
    weaknesses: validWeaknesses,
    opportunities: validOpportunities,
    threats: validThreats,
    companyInfo: companyInfo || undefined
  };
};

/**
 * Prepare phase test data for the API
 */
export const preparePhaseTestDataForApi = (phaseTestData: any, diagnosticData: any = null, swotData: any = null) => {
  return {
    phaseResult: phaseTestData,
    diagnosticData: diagnosticData,
    swotData: swotData
  };
};
