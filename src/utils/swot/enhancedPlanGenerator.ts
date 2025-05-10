
import { SwotData } from "@/types/swot";
import { CompanyInfoData } from "@/types/companyInfo";
import { generateEnhancedPlan } from '@/utils/swot/ai';

/**
 * Generate enhanced action plan using DeepSeek AI
 */
export const generateEnhancedSwotPlan = async (data: SwotData, companyInfo?: CompanyInfoData | null) => {
  return await generateEnhancedPlan(data, companyInfo);
};
