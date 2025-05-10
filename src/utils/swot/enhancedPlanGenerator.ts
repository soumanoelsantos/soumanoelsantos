
import { SwotData } from "@/types/swot";
import { CompanyInfoData } from "@/types/companyInfo";
import { generateEnhancedActionPlan } from '@/utils/deepseekApi';

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
