
import { SwotData } from "@/types/swot";
import { generateEnhancedActionPlan } from '@/utils/deepseekApi';
import { CompanyInfoData } from "@/hooks/useSwotActionPlan";

/**
 * Generate enhanced action plan using DeepSeek AI
 */
export const generateEnhancedSwotPlan = async (data: SwotData, companyInfo?: CompanyInfoData | null) => {
  try {
    const validStrengths = data.strengths.filter(s => s.text && s.text.trim() !== '').map(s => s.text);
    const validWeaknesses = data.weaknesses.filter(w => w.text && w.text.trim() !== '').map(w => w.text);
    const validOpportunities = data.opportunities.filter(o => o.text && o.text.trim() !== '').map(o => o.text);
    const validThreats = data.threats.filter(t => t.text && t.text.trim() !== '').map(t => t.text);
    
    // Prepare SWOT data for API
    const swotForApi = {
      strengths: validStrengths,
      weaknesses: validWeaknesses,
      opportunities: validOpportunities,
      threats: validThreats,
      companyInfo: companyInfo || undefined
    };
    
    console.log("Sending SWOT data to DeepSeek API:", swotForApi);
    
    // Call the DeepSeek API
    const enhancedPlan = await generateEnhancedActionPlan(swotForApi);
    
    if (enhancedPlan) {
      console.log("Received enhanced action plan:", enhancedPlan);
      
      // Restructure the plan to match our expected format
      const restructuredPlan = {
        strengthsOpportunities: enhancedPlan.strengthsOpportunities || enhancedPlan.so || [],
        strengthsThreats: enhancedPlan.strengthsThreats || enhancedPlan.st || [],
        weaknessesOpportunities: enhancedPlan.weaknessesOpportunities || enhancedPlan.wo || [],
        weaknessesThreats: enhancedPlan.weaknessesThreats || enhancedPlan.wt || []
      };
      
      return restructuredPlan;
    }
    
    return null;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    return null;
  }
};

/**
 * Generate basic action plan without AI
 */
export const generateBasicActionPlan = (data: SwotData, companyInfo?: CompanyInfoData | null): Record<string, string[]> => {
  const plan: Record<string, string[]> = {
    strengthsOpportunities: [],
    strengthsThreats: [],
    weaknessesOpportunities: [],
    weaknessesThreats: []
  };

  // Strength + Opportunities (SO strategies)
  const validStrengths = data.strengths.filter(s => s.text && s.text.trim() !== '').map(s => s.text);
  const validOpportunities = data.opportunities.filter(o => o.text && o.text.trim() !== '').map(o => o.text);
  
  if (validStrengths.length > 0 && validOpportunities.length > 0) {
    plan.strengthsOpportunities = generateSOStrategies(validStrengths, validOpportunities, companyInfo);
  }

  // Strength + Threats (ST strategies)
  const validThreats = data.threats.filter(t => t.text && t.text.trim() !== '').map(t => t.text);
  if (validStrengths.length > 0 && validThreats.length > 0) {
    plan.strengthsThreats = generateSTStrategies(validStrengths, validThreats, companyInfo);
  }

  // Weaknesses + Opportunities (WO strategies)
  const validWeaknesses = data.weaknesses.filter(w => w.text && w.text.trim() !== '').map(w => w.text);
  if (validWeaknesses.length > 0 && validOpportunities.length > 0) {
    plan.weaknessesOpportunities = generateWOStrategies(validWeaknesses, validOpportunities, companyInfo);
  }

  // Weaknesses + Threats (WT strategies)
  if (validWeaknesses.length > 0 && validThreats.length > 0) {
    plan.weaknessesThreats = generateWTStrategies(validWeaknesses, validThreats, companyInfo);
  }

  return plan;
};

/**
 * Generate SO strategies (strengths + opportunities)
 */
const generateSOStrategies = (strengths: string[], opportunities: string[], companyInfo?: CompanyInfoData | null): string[] => {
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

/**
 * Generate ST strategies (strengths + threats)
 */
const generateSTStrategies = (strengths: string[], threats: string[], companyInfo?: CompanyInfoData | null): string[] => {
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

/**
 * Generate WO strategies (weaknesses + opportunities)
 */
const generateWOStrategies = (weaknesses: string[], opportunities: string[], companyInfo?: CompanyInfoData | null): string[] => {
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

/**
 * Generate WT strategies (weaknesses + threats)
 */
const generateWTStrategies = (weaknesses: string[], threats: string[], companyInfo?: CompanyInfoData | null): string[] => {
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
