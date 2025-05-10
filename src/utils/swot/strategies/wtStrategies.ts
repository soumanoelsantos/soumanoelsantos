
import { CompanyInfoData } from "@/types/companyInfo";

/**
 * Generate WT strategies (weaknesses + threats)
 */
export const generateWTStrategies = (weaknesses: string[], threats: string[], companyInfo?: CompanyInfoData | null): string[] => {
  const strategies = [];
  
  // Use company info if available
  if (companyInfo) {
    const { mainChallenges, competitors, industry } = companyInfo;
    
    if (mainChallenges && mainChallenges.trim() !== "") {
      strategies.push(`Criar plano de contingência para lidar com "${mainChallenges}" e minimizar riscos relacionados a ${threats[0] || 'ameaças externas'}`);
    }
    
    if (competitors && competitors.trim() !== "") {
      strategies.push(`Desenvolver estratégia defensiva contra ${competitors} enquanto trabalha na melhoria de ${weaknesses[0] || 'pontos fracos'}`);
    }
    
    if (industry && industry.trim() !== "") {
      strategies.push(`Buscar mentorias especializadas no setor de ${industry} para mitigar rapidamente ${weaknesses[0] || 'fraquezas operacionais'}`);
    }
  }
  
  // Add generic strategies if needed
  if (strategies.length < 3) {
    if (weaknesses.length > 0 && threats.length > 0) {
      strategies.push(`Desenvolver um plano para mitigar "${weaknesses[0]}" antes que a ameaça "${threats[0]}" se materialize`);
    }
    
    if (weaknesses.length > 1 && threats.length > 0) {
      strategies.push(`Priorizar a melhoria em "${weaknesses[1]}" para reduzir o impacto potencial de "${threats[0]}"`);
    }
    
    // Add more generic strategies
    strategies.push("Criar um plano de gestão de riscos detalhado para proteger o negócio em áreas vulneráveis");
    strategies.push("Considerar parcerias estratégicas que possam compensar fraquezas internas");
    strategies.push("Investir em treinamento e desenvolvimento para transformar pontos fracos em neutros ou fortes");
  }
  
  return strategies.slice(0, 5); // Limit to 5 strategies
};
