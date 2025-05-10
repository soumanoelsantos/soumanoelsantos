
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
  
  // Detailed instructions for the AI
  prompt += `\nCrie um plano de ação detalhado dividido em 4 tipos de estratégias:
  
1. Estratégias SO (Forças + Oportunidades): Como usar os pontos fortes para aproveitar as oportunidades
2. Estratégias ST (Forças + Ameaças): Como usar os pontos fortes para minimizar as ameaças
3. Estratégias WO (Fraquezas + Oportunidades): Como superar os pontos fracos aproveitando as oportunidades
4. Estratégias WT (Fraquezas + Ameaças): Como minimizar os pontos fracos e evitar as ameaças

Para cada tipo de estratégia, inclua pelo menos 3-5 ações PRÁTICAS e ESPECÍFICAS que podem ser implementadas imediatamente.
Cada ação deve ser clara, prática, e diretamente relacionada aos pontos da análise SWOT e às informações da empresa fornecidas.
Certifique-se de personalizar as recomendações com base no setor da empresa, produtos, público-alvo e desafios mencionados.

Formate sua resposta como um objeto JSON com estas quatro chaves:
- "strengthsOpportunities": array de ações para estratégias SO
- "strengthsThreats": array de ações para estratégias ST  
- "weaknessesOpportunities": array de ações para estratégias WO
- "weaknessesThreats": array de ações para estratégias WT

Cada array deve conter strings com ações específicas. Seja prático, direto e preciso.`;
  
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
