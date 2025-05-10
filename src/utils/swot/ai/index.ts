
import { SwotData } from "@/types/swot";
import { CompanyInfoData } from "@/types/companyInfo";
import { callDeepseekApi } from "./deepseekClient";
import { generateSwotPrompt, generatePhaseTestPrompt, prepareSwotDataForApi, preparePhaseTestDataForApi } from "./promptGenerator";
import { parseSwotActionPlan, parsePhaseTestActionPlan } from "./responseParser";

/**
 * Generate enhanced action plan using DeepSeek AI
 * This is the main function that external modules should interact with
 */
export const generateEnhancedActionPlan = async (data: any) => {
  try {
    // Determine if we're dealing with SWOT data or Phase Test data
    const isPhaseTestData = data.phaseResult !== undefined;
    
    let prompt;
    if (isPhaseTestData) {
      // Generate prompt for phase test data
      prompt = generatePhaseTestPrompt(data);
    } else {
      // Generate prompt for SWOT data
      prompt = generateSwotPrompt(data);
    }
    
    // Call the DeepSeek API with the prepared prompt
    const apiResponse = await callDeepseekApi(prompt);
    
    if (!apiResponse) {
      return null;
    }
    
    // Parse the API response into our expected action plan format
    if (isPhaseTestData) {
      return parsePhaseTestActionPlan(apiResponse);
    } else {
      return parseSwotActionPlan(apiResponse);
    }
  } catch (error) {
    console.error("Error generating enhanced action plan:", error);
    return null;
  }
};

/**
 * Prepare SWOT data and generate an enhanced action plan
 * This is renamed from generateEnhancedSwotPlan to avoid naming conflicts
 */
export const generateEnhancedPlan = async (data: SwotData, companyInfo?: CompanyInfoData | null) => {
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

// Re-export the function with the old name for backward compatibility
// This is needed temporarily until we update all references
export const generateEnhancedSwotPlan = generateEnhancedPlan;
