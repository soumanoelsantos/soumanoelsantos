
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
    
    const inputData = {
      strengths,
      weaknesses,
      opportunities,
      threats: [],
      detailed // Pass the detailed flag to request more detailed action plans
    };
    
    console.log("Prepared data for AI:", inputData);
    
    const enhancedPlan = await generateEnhancedActionPlan(inputData);
    
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
  } = {
    processos: [],
    resultados: [],
    sistemaGestao: [],
    pessoas: []
  };
  
  // Extract scores from answers data to calculate percentages for each section
  const results = {
    processos: { score: 0, total: 0, percentage: 0 },
    resultados: { score: 0, total: 0, percentage: 0 },
    sistemaGestao: { score: 0, total: 0, percentage: 0 },
    pessoas: { score: 0, total: 0, percentage: 0 }
  };

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
