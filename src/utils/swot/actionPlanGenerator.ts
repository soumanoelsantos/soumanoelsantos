
import { SwotData } from "@/types/swot";
import { CompanyInfoData } from "@/types/companyInfo";
import { extractValidSwotItems } from "./swotDataUtils";
import { generateSOStrategies } from "./strategies/soStrategies";
import { generateSTStrategies } from "./strategies/stStrategies";
import { generateWOStrategies } from "./strategies/woStrategies";
import { generateWTStrategies } from "./strategies/wtStrategies";
import { generateEnhancedSwotPlan } from "./enhancedPlanGenerator";

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

  // Extract valid items from SWOT data
  const { validStrengths, validWeaknesses, validOpportunities, validThreats } = extractValidSwotItems(data);
  
  // Strength + Opportunities (SO strategies)
  if (validStrengths.length > 0 && validOpportunities.length > 0) {
    plan.strengthsOpportunities = generateSOStrategies(validStrengths, validOpportunities, companyInfo);
  }

  // Strength + Threats (ST strategies)
  if (validStrengths.length > 0 && validThreats.length > 0) {
    plan.strengthsThreats = generateSTStrategies(validStrengths, validThreats, companyInfo);
  }

  // Weaknesses + Opportunities (WO strategies)
  if (validWeaknesses.length > 0 && validOpportunities.length > 0) {
    plan.weaknessesOpportunities = generateWOStrategies(validWeaknesses, validOpportunities, companyInfo);
  }

  // Weaknesses + Threats (WT strategies)
  if (validWeaknesses.length > 0 && validThreats.length > 0) {
    plan.weaknessesThreats = generateWTStrategies(validWeaknesses, validThreats, companyInfo);
  }

  return plan;
};

// Re-export the enhanced plan generator
export { generateEnhancedSwotPlan };
