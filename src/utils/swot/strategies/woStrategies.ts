
import { CompanyInfoData } from "@/types/companyInfo";

/**
 * Generate WO strategies (weaknesses + opportunities)
 */
export const generateWOStrategies = (weaknesses: string[], opportunities: string[], companyInfo?: CompanyInfoData | null): string[] => {
  const strategies = [];
  
  // Use company info if available
  if (companyInfo) {
    const { mainChallenges, goals, industry } = companyInfo;
    
    if (mainChallenges && mainChallenges.trim() !== "") {
      strategies.push(`Desenvolver plano de ação para superar "${mainChallenges}" e aproveitar ${opportunities[0] || 'novas oportunidades'}`);
    }
    
    if (goals && goals.trim() !== "") {
      strategies.push(`Fortalecer capacidades internas relacionadas a ${weaknesses[0] || 'áreas mais fracas'} para atingir o objetivo: ${goals}`);
    }
    
    if (industry && industry.trim() !== "") {
      strategies.push(`Buscar parceiros estratégicos no setor de ${industry} que possam complementar ${weaknesses[0] || 'suas limitações atuais'}`);
    }
  }
  
  // Add generic strategies if needed
  if (strategies.length < 3) {
    if (weaknesses.length > 0 && opportunities.length > 0) {
      strategies.push(`Investir em treinamento para superar "${weaknesses[0]}" e assim aproveitar "${opportunities[0]}"`);
    }
    
    if (weaknesses.length > 1 && opportunities.length > 0) {
      strategies.push(`Buscar parcerias estratégicas para compensar "${weaknesses[1]}" e capitalizar em "${opportunities[0]}"`);
    }
    
    // Add more generic strategies
    strategies.push("Desenvolver novas habilidades ou contratar talentos para superar limitações internas");
    strategies.push("Investir em tecnologia ou processos que possam transformar fraquezas em forças");
    strategies.push("Buscar consultorias ou mentorias externas nas áreas mais frágeis do negócio");
  }
  
  return strategies.slice(0, 5); // Limit to 5 strategies
};
