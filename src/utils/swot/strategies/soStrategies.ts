
import { CompanyInfoData } from "@/types/companyInfo";

/**
 * Generate SO strategies (strengths + opportunities)
 */
export const generateSOStrategies = (strengths: string[], opportunities: string[], companyInfo?: CompanyInfoData | null): string[] => {
  const strategies = [];
  
  // Use company info if available to generate personalized strategies
  if (companyInfo) {
    const { industry, mainProducts, targetAudience, goals } = companyInfo;
    
    if (industry && industry.trim() !== "") {
      strategies.push(`Desenvolver campanha de marketing direcionada ao setor de ${industry}, destacando ${strengths[0] || 'seus pontos fortes'}`);
    }
    
    if (mainProducts && mainProducts.trim() !== "") {
      strategies.push(`Criar uma linha premium de ${mainProducts} aproveitando ${strengths[0] || 'suas competências principais'}`);
    }
    
    if (targetAudience && targetAudience.trim() !== "") {
      strategies.push(`Expandir a base de clientes para incluir mais ${targetAudience} através de ${opportunities[0] || 'novas oportunidades de mercado'}`);
    }
    
    if (goals && goals.trim() !== "") {
      strategies.push(`Alinhar ${strengths[0] || 'suas forças principais'} com o objetivo de ${goals} para maximizar resultados`);
    }
  }
  
  // Add more generic strategies based on SWOT
  if (strategies.length < 3) {
    if (strengths.length > 0) {
      strategies.push(`Utilizar "${strengths[0]}" para aproveitar as oportunidades de mercado`);
    }
    
    if (strengths.length > 0 && opportunities.length > 0) {
      strategies.push(`Desenvolver uma campanha de marketing destacando "${strengths[0]}" para capitalizar sobre "${opportunities[0]}"`);
    }
    
    if (strengths.length > 1 && opportunities.length > 0) {
      strategies.push(`Criar parcerias estratégicas baseadas em "${strengths[1]}" para maximizar "${opportunities[0]}"`);
    }
    
    // Add more generic strategies
    strategies.push("Investir no desenvolvimento de novos produtos ou serviços que aproveitem suas forças");
    strategies.push("Expandir para novos mercados onde suas forças serão mais valorizadas");
  }
  
  return strategies.slice(0, 5); // Limit to 5 strategies
};
