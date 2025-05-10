
/**
 * Parse the DeepSeek API response into the expected action plan format
 */
export const parseSwotActionPlan = (apiResponse: string) => {
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

/**
 * Parse the DeepSeek API response for phase test action plan
 * This expects a list of action items in the response
 */
export const parsePhaseTestActionPlan = (apiResponse: string) => {
  try {
    console.log("Raw phase test API response to parse:", apiResponse);
    
    // Try different parsing strategies
    let actionItems: string[] = [];
    
    // First try to extract as a JSON array
    try {
      const jsonMatch = apiResponse.match(/```json([\s\S]*?)```/) || 
                        apiResponse.match(/\[([\s\S]*?)\]/) ||
                        apiResponse.match(/{[\s\S]*?}/);
      
      if (jsonMatch) {
        const jsonContent = jsonMatch[1] || jsonMatch[0];
        // Check if it's an array or an object with an items property
        const parsedData = JSON.parse(jsonContent);
        
        if (Array.isArray(parsedData)) {
          actionItems = parsedData;
        } else if (parsedData.actions && Array.isArray(parsedData.actions)) {
          actionItems = parsedData.actions;
        } else if (parsedData.items && Array.isArray(parsedData.items)) {
          actionItems = parsedData.items;
        } else {
          // If it's an object with string values, convert to array
          actionItems = Object.values(parsedData).filter(item => typeof item === 'string');
        }
      }
    } catch (jsonError) {
      console.log("Failed to parse as JSON, trying alternative parsing");
    }
    
    // If JSON parsing failed, try to extract numbered list items
    if (actionItems.length === 0) {
      // Match numbered list items (1. Item text)
      const numberedListRegex = /(?:^|\n)(\d+\.\s+.+?)(?=(?:\n\d+\.)|$)/g;
      const matches = [...apiResponse.matchAll(numberedListRegex)];
      
      if (matches.length > 0) {
        actionItems = matches.map(match => match[1].trim());
      } else {
        // Try to find lines that start with a number
        const lineByLineRegex = /^\d+\.\s+.+$/gm;
        const lineMatches = [...apiResponse.matchAll(lineByLineRegex)];
        
        if (lineMatches.length > 0) {
          actionItems = lineMatches.map(match => match[0].trim());
        }
      }
    }
    
    // If still no items, try to split by new lines and filter out empty lines
    if (actionItems.length === 0) {
      actionItems = apiResponse.split('\n')
        .map(line => line.trim())
        .filter(line => line && line.length > 10 && /^\d+\./.test(line)); // Only keep non-empty lines with numbering
    }
    
    console.log("Parsed action items:", actionItems);
    
    if (actionItems.length === 0) {
      // Se mesmo assim não conseguir extrair itens numerados, tente dividir por parágrafos
      const paragraphs = apiResponse.split('\n\n')
        .map(p => p.trim())
        .filter(p => p && p.length > 20);
        
      if (paragraphs.length > 0) {
        // Formatar cada parágrafo como um item de ação numerado
        actionItems = paragraphs.map((p, i) => `${i+1}. ${p}`);
      } else {
        throw new Error("Could not extract action items from response");
      }
    }
    
    return actionItems;
  } catch (error) {
    console.error("Error parsing phase test action plan:", error);
    // Return a fallback plan in case of error
    return [
      "1. Implementar processo de planejamento estratégico trimestral com metas SMART.",
      "2. Desenvolver sistema de controle financeiro com indicadores claros de desempenho.",
      "3. Criar programa de treinamento para equipe focado nas habilidades necessárias para a fase atual.",
      "4. Estabelecer rotina de reuniões semanais com equipe para acompanhamento de metas.",
      "5. Documentar principais processos da empresa em formato de passo a passo.",
      "6. Implementar avaliação de desempenho trimestral para identificar necessidades de desenvolvimento.",
      "7. Criar manual de processos operacionais para padronização das atividades.",
      "8. Desenvolver sistema de feedback contínuo entre liderança e colaboradores.",
      "9. Estabelecer indicadores-chave de desempenho (KPIs) para cada área da empresa.",
      "10. Implementar programa de reconhecimento e recompensa baseado em resultados."
    ];
  }
};
