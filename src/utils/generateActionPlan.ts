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
    const threats = [];
    
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
      strengths: strengths.map(item => `${item.question} [${translateArea(item.area)}]`),
      weaknesses: weaknesses.map(item => `${item.question} [${translateArea(item.area)}]`),
      opportunities: opportunities.map(item => `${item.question} [${translateArea(item.area)}]`),
      threats,
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
  } = {};
  
  // Extract scores from answers data to calculate percentages for each section
  const results = {
    processos: { score: 0, total: 0, percentage: 0 },
    resultados: { score: 0, total: 0, percentage: 0 },
    sistemaGestao: { score: 0, total: 0, percentage: 0 },
    pessoas: { score: 0, total: 0, percentage: 0 }
  };

  Object.keys(answersData).forEach(section => {
    const sectionData = answersData[section];
    if (sectionData && sectionData.answers) {
      let sectionScore = 0;
      const total = sectionData.answers.length * (section === 'processos' || section === 'pessoas' ? 10 : 20);
      
      sectionData.answers.forEach(answer => {
        if (answer.answer === 'satisfactory') {
          sectionScore += (section === 'processos' || section === 'pessoas' ? 10 : 20);
        } else if (answer.answer === 'unsatisfactory') {
          sectionScore += (section === 'processos' || section === 'pessoas' ? 5 : 10);
        }
      });
      
      results[section] = {
        score: sectionScore,
        total: total,
        percentage: Math.round((sectionScore / total) * 100)
      };
    }
  });
  
  // Generate more detailed action plans with implementation steps if detailed flag is true
  // ... keep existing code (all the action plan generation logic)
  
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
