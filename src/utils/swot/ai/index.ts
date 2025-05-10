
import { SwotData } from "@/types/swot";
import { CompanyInfoData } from "@/types/companyInfo";
import { callDeepseekApi } from "./deepseekClient";
import { generateSwotPrompt, prepareSwotDataForApi } from "./promptGenerator";
import { parseSwotActionPlan } from "./responseParser";

/**
 * Generate enhanced action plan using DeepSeek AI
 * This is the main function that external modules should interact with
 */
export const generateEnhancedActionPlan = async (swotData: any) => {
  try {
    // Call the DeepSeek API with the prepared prompt
    const prompt = generateSwotPrompt(swotData);
    const apiResponse = await callDeepseekApi(prompt);
    
    if (!apiResponse) {
      return null;
    }
    
    // Parse the API response into our expected action plan format
    const actionPlan = parseSwotActionPlan(apiResponse);
    return actionPlan;
  } catch (error) {
    console.error("Error generating enhanced action plan:", error);
    return null;
  }
};

/**
 * Prepare SWOT data and generate an enhanced action plan
 */
export const generateEnhancedSwotPlan = async (data: SwotData, companyInfo?: CompanyInfoData | null) => {
  try {
    // Prepare SWOT data for API
    const swotForApi = prepareSwotDataForApi(data, companyInfo);
    
    console.log("Sending SWOT data to DeepSeek API:", swotForApi);
    
    // Generate the enhanced action plan
    const enhancedPlan = await generateEnhancedActionPlan(swotForApi);
    
    if (enhancedPlan) {
      console.log("Received enhanced action plan:", enhancedPlan);
      return enhancedPlan;
    }
    
    return null;
  } catch (error) {
    console.error("Error calling DeepSeek API:", error);
    return null;
  }
};
