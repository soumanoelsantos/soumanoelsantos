
import { generateEnhancedActionPlan } from './deepseekApi';

interface DiagnosticResults {
  processos: { score: number; total: number; percentage: number };
  resultados: { score: number; total: number; percentage: number };
  sistemaGestao: { score: number; total: number; percentage: number };
  pessoas: { score: number; total: number; percentage: number };
}

export const generateActionPlan = async (answersData: any, detailed: boolean = false) => {
  console.log("Starting action plan generation with answers data:", answersData);
  
  // First try to get an enhanced plan from the DeepSeek API
  try {
    console.log("Attempting to generate enhanced action plan via DeepSeek API...");
    
    if (!answersData || Object.keys(answersData).length === 0) {
      throw new Error("Dados insuficientes para gerar um plano de ação personalizado");
    }
    
    // Extract strengths and weaknesses from answers data
    const strengths = [];
    const weaknesses = [];
    const opportunities = [];
    
    // Process each section
    Object.keys(answersData).forEach(section => {
      const sectionData = answersData[section];
      if (sectionData && sectionData.answers) {
        sectionData.answers.forEach(answer => {
          if (answer.answer === 'satisfactory') {
            strengths.push({
              area: section,
              question: answer.question
            });
          } else if (answer.answer === 'nonexistent') {
            weaknesses.push({
              area: section,
              question: answer.question
            });
          } else if (answer.answer === 'unsatisfactory') {
            opportunities.push({
              area: section,
              question: answer.question
            });
          }
        });
      }
    });
    
    if (weaknesses.length === 0 && opportunities.length === 0) {
      console.log("Nenhuma área de melhoria identificada, gerando recomendações gerais");
    }
    
    const inputData = {
      strengths,
      weaknesses,
      opportunities,
      threats: [],
      detailed // Pass the detailed flag to request more detailed action plans
    };
    
    console.log("Prepared data for AI:", inputData);
    
    // Set up timeout for API call - reduced from 30s to 15s to fail faster
    const timeoutPromise = new Promise((_, reject) => 
      setTimeout(() => reject(new Error("Tempo esgotado ao tentar gerar o plano de ação")), 15000)
    );
    
    // Race the API call against the timeout
    try {
      const enhancedPlan = await Promise.race([
        generateEnhancedActionPlan(inputData),
        timeoutPromise
      ]);
      
      // If we got a successful response from the API, use it
      if (enhancedPlan && Object.keys(enhancedPlan).length > 0) {
        console.log("Successfully generated enhanced plan:", enhancedPlan);
        return enhancedPlan;
      } else {
        console.log("DeepSeek API returned empty or invalid response, falling back to local generation");
        throw new Error("API retornou uma resposta vazia ou inválida");
      }
    } catch (error) {
      console.error("Timeout or error with API call:", error);
      throw error; // Rethrow to trigger the fallback
    }
  } catch (error) {
    console.error("Error with enhanced action plan generation:", error);
    console.log("Falling back to local generation");
    
    // Add more detailed error logging
    if (error.response) {
      console.error("API response error:", error.response.status, error.response.data);
    }
  }
  
  // Fallback to local generation if API fails
  console.log("Generating fallback local action plan");
  let actionPlan: {
    [key: string]: string[];
  } = {
    processos: [],
    resultados: [],
    sistemaGestao: [],
    pessoas: []
  };
  
  try {
    // Process each section to generate basic recommendations
    Object.keys(answersData).forEach(section => {
      const sectionData = answersData[section];
      if (sectionData && sectionData.answers) {
        const weakAnswers = sectionData.answers.filter(a => a.answer === 'nonexistent' || a.answer === 'unsatisfactory');
        
        weakAnswers.forEach(answer => {
          const action = answer.answer === 'nonexistent' 
            ? `Implementar ${answer.question.toLowerCase()}.` 
            : `Melhorar ${answer.question.toLowerCase()}.`;
          
          if (actionPlan[section]) {
            actionPlan[section].push(action);
          }
        });
      }
    });
    
    // If any section has no recommendations, add a generic one
    Object.keys(actionPlan).forEach(key => {
      if (actionPlan[key].length === 0) {
        actionPlan[key].push(`Desenvolver um plano de melhoria contínua para a área de ${translateArea(key)}.`);
      }
    });
    
    console.log("Generated fallback action plan:", actionPlan);
    return actionPlan;
  } catch (error) {
    console.error("Error generating fallback action plan:", error);
    // Return a simple action plan instead of throwing an error
    return {
      processos: ["Desenvolver um plano de melhoria contínua para a área de Processos."],
      resultados: ["Desenvolver um plano de melhoria contínua para a área de Resultados."],
      sistemaGestao: ["Desenvolver um plano de melhoria contínua para a área de Sistema de Gestão."],
      pessoas: ["Desenvolver um plano de melhoria contínua para a área de Pessoas."]
    };
  }
};

// Helper function to translate area codes to readable names
function translateArea(area: string): string {
  switch(area) {
    case 'processos': return 'Processos';
    case 'resultados': return 'Resultados';
    case 'sistemaGestao': return 'Sistema de Gestão';
    case 'pessoas': return 'Pessoas';
    default: return area;
  }
}
