
import { CompanyInfoData } from "@/types/companyInfo";

/**
 * Generate ST strategies (strengths + threats)
 */
export const generateSTStrategies = (strengths: string[], threats: string[], companyInfo?: CompanyInfoData | null): string[] => {
  const strategies = [];
  
  // Use company info if available
  if (companyInfo) {
    const { industry, competitors, mainChallenges } = companyInfo;
    
    if (competitors && competitors.trim() !== "") {
      strategies.push(`Desenvolver estratégia de diferenciação contra ${competitors} destacando ${strengths[0] || 'seus diferenciais'}`);
    }
    
    if (industry && industry.trim() !== "") {
      strategies.push(`Criar barreiras competitivas no setor de ${industry} usando ${strengths[0] || 'suas competências principais'}`);
    }
    
    if (mainChallenges && mainChallenges.trim() !== "") {
      strategies.push(`Utilizar ${strengths[0] || 'suas principais forças'} para neutralizar o desafio: ${mainChallenges}`);
    }
  }
  
  // Add generic strategies if needed
  if (strategies.length < 3) {
    if (strengths.length > 0 && threats.length > 0) {
      strategies.push(`Usar "${strengths[0]}" para neutralizar a ameaça "${threats[0]}"`);
    }
    
    if (strengths.length > 1 && threats.length > 0) {
      strategies.push(`Desenvolver um plano de contingência usando "${strengths[1]}" para minimizar o impacto de "${threats[0]}"`);
    }
    
    // Add more generic strategies
    strategies.push("Fortalecer a proposta de valor única do seu negócio para se diferenciar da concorrência");
    strategies.push("Investir em inovação contínua para manter-se à frente das ameaças do mercado");
    strategies.push("Diversificar ofertas para reduzir o impacto potencial das ameaças externas");
  }
  
  return strategies.slice(0, 5); // Limit to 5 strategies
};
