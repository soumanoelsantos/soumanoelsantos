
// DeepSeek API integration
export const generateEnhancedActionPlan = async (results: any, answersData: any) => {
  try {
    const apiKey = "sk-92fe5ce2bc9b4ff2bb125ec8edf6b684";
    const endpoint = "https://api.deepseek.com/v1/chat/completions";
    
    // Prepare the data for the API call
    const prompt = preparePrompt(results, answersData);
    
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
            content: "You are a business consultant specialized in creating comprehensive action plans based on business diagnostics. Focus on providing actionable, concrete steps organized by business areas."
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
    
    const actionPlan = parseActionPlan(data.choices[0].message.content);
    console.log("Parsed action plan:", actionPlan);
    
    return actionPlan;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    // Fallback to the local generation if API fails
    return null;
  }
};

// Helper function to create the prompt for the API
const preparePrompt = (results: any, answersData: any) => {
  let prompt = "Based on the following business diagnostic results, create a comprehensive action plan:\n\n";
  
  // Add scores
  prompt += "SCORES BY AREA:\n";
  Object.entries(results).forEach(([key, value]: [string, any]) => {
    const areaName = key === 'processos' ? 'PROCESSOS' : 
                     key === 'resultados' ? 'RESULTADOS' : 
                     key === 'sistemaGestao' ? 'SISTEMA DE GESTÃO' : 'PESSOAS';
    prompt += `${areaName}: ${value.percentage}% (Score: ${value.score}/${value.total})\n`;
  });
  
  // Add detailed answers if available
  if (answersData) {
    prompt += "\nDETAILED ANSWERS:\n";
    Object.entries(answersData).forEach(([sectionKey, section]: [string, any]) => {
      prompt += `\n${section.title}:\n`;
      section.answers.forEach((item: any, index: number) => {
        const answerText = 
          item.answer === 'satisfactory' ? 'Existe e é satisfatório' :
          item.answer === 'unsatisfactory' ? 'Existe, mas não é satisfatório' :
          item.answer === 'nonexistent' ? 'Não existe' : item.answer;
        
        prompt += `- Question ${index + 1}: ${item.question}\n`;
        prompt += `  Answer: ${answerText}\n`;
      });
    });
  }
  
  prompt += "\nCreate a detailed action plan divided into four sections: PROCESSOS, RESULTADOS, SISTEMA DE GESTÃO, and PESSOAS. " +
           "For each section, provide at least 3-5 specific, actionable items based on the diagnostic results. " +
           "Each action item should be clear, practical, and directly address the identified issues. " +
           "Format the response as a JSON object with these four keys, each containing an array of action items as strings.";
  
  return prompt;
};

// Helper function to parse the API response into the expected action plan format
const parseActionPlan = (apiResponse: string) => {
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
      processos: [],
      resultados: [],
      sistemaGestao: [],
      pessoas: []
    };
    
    // Map the API response to our expected format
    if (parsedPlan.processos) actionPlan.processos = parsedPlan.processos;
    if (parsedPlan.resultados) actionPlan.resultados = parsedPlan.resultados;
    if (parsedPlan.sistemaGestao) actionPlan.sistemaGestao = parsedPlan.sistemaGestao;
    if (parsedPlan.pessoas) actionPlan.pessoas = parsedPlan.pessoas;
    
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
