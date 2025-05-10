
// DeepSeek API integration for enhanced SWOT action plan generation
export const generateEnhancedActionPlan = async (swotData: any) => {
  try {
    const apiKey = "sk-92fe5ce2bc9b4ff2bb125ec8edf6b684";
    const endpoint = "https://api.deepseek.com/v1/chat/completions";
    
    // Prepare the prompt for the API call
    const prompt = prepareSwotPrompt(swotData);
    
    console.log("Calling DeepSeek API with prompt:", prompt);

    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          {
            role: "system",
            content: "You are a business strategy expert that specializes in creating practical, actionable SWOT strategy recommendations. Focus on specific, concrete actions a business can take immediately."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error("DeepSeek API error:", errorData);
      throw new Error(`API Error: ${response.status}`);
    }
    
    const data = await response.json();
    console.log("DeepSeek API response:", data);
    
    const actionPlan = parseSwotActionPlan(data.choices[0].message.content);
    console.log("Parsed SWOT action plan:", actionPlan);
    
    return actionPlan;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    return null;
  }
};

// Prepare the prompt for the DeepSeek API
const prepareSwotPrompt = (swotData: any) => {
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

// Parse the API response into the expected action plan format
const parseSwotActionPlan = (apiResponse: string) => {
  try {
    console.log("Raw API response to parse:", apiResponse);
    
    // Try to extract JSON from the response if it's wrapped in text
    const jsonMatch = apiResponse.match(/```json([\s\S]*?)```/) || 
                      apiResponse.match(/{[\s\S]*}/);
    
    let jsonStr = jsonMatch ? 
                  (jsonMatch[1] ? jsonMatch[1].trim() : jsonMatch[0]) : 
                  apiResponse;
    
    console.log("Extracted JSON string:", jsonStr);
    
    // Clean up the string if needed
    if (!jsonStr.startsWith('{')) {
      jsonStr = '{' + jsonStr.split('{').slice(1).join('{');
    }
    
    const parsedPlan = JSON.parse(jsonStr);
    console.log("Successfully parsed JSON:", parsedPlan);
    
    // Ensure the plan has the expected structure
    const actionPlan: {[key: string]: string[]} = {
      strengthsOpportunities: [],
      strengthsThreats: [],
      weaknessesOpportunities: [],
      weaknessesThreats: []
    };
    
    // Map the API response to our expected format
    if (parsedPlan.strengthsOpportunities) actionPlan.strengthsOpportunities = parsedPlan.strengthsOpportunities;
    if (parsedPlan.strengthsThreats) actionPlan.strengthsThreats = parsedPlan.strengthsThreats;
    if (parsedPlan.weaknessesOpportunities) actionPlan.weaknessesOpportunities = parsedPlan.weaknessesOpportunities;
    if (parsedPlan.weaknessesThreats) actionPlan.weaknessesThreats = parsedPlan.weaknessesThreats;
    
    // Check for alternative formats
    if (parsedPlan.so) actionPlan.strengthsOpportunities = parsedPlan.so;
    if (parsedPlan.st) actionPlan.strengthsThreats = parsedPlan.st;
    if (parsedPlan.wo) actionPlan.weaknessesOpportunities = parsedPlan.wo;
    if (parsedPlan.wt) actionPlan.weaknessesThreats = parsedPlan.wt;
    
    // Check if we have at least one non-empty section
    const hasContent = Object.values(actionPlan).some(arr => arr && arr.length > 0);
    
    if (!hasContent) {
      console.error("Parsed plan has no content:", actionPlan);
      return null;
    }
    
    return actionPlan;
  } catch (error) {
    console.error("Error parsing DeepSeek API response:", error);
    return null;
  }
};
