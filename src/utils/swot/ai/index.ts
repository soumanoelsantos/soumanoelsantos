
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
    // Determine if we're dealing with SWOT data, Phase Test data, or Diagnostic data
    const isPhaseTestData = data.phaseResult !== undefined;
    const isDiagnosticData = data.answersData !== undefined || 
                            (Array.isArray(data.strengths) && data.strengths.some((s: any) => s.area && s.question));
    
    let prompt;
    if (isPhaseTestData) {
      // Generate prompt for phase test data
      prompt = generatePhaseTestPrompt(data);
    } else if (isDiagnosticData) {
      // This is diagnostic data, create a prompt with the diagnostic data
      console.log("Generating prompt for diagnostic data:", data);
      
      // Create a specialized prompt for diagnostic data
      const strengths = Array.isArray(data.strengths) ? data.strengths : [];
      const weaknesses = Array.isArray(data.weaknesses) ? data.weaknesses : [];
      const opportunities = Array.isArray(data.opportunities) ? data.opportunities : [];
      const threats = Array.isArray(data.threats) ? data.threats : [];
      
      prompt = generateSwotPrompt({
        strengths: strengths.map((s: any) => typeof s === 'string' ? { text: s } : { text: s.question, area: s.area }),
        weaknesses: weaknesses.map((w: any) => typeof w === 'string' ? { text: w } : { text: w.question, area: w.area }),
        opportunities: opportunities.map((o: any) => typeof o === 'string' ? { text: o } : { text: o.question, area: o.area }),
        threats: threats.map((t: any) => typeof t === 'string' ? { text: t } : { text: t.question, area: t.area }),
        detailed: true
      });
      
      console.log("Generated prompt for diagnostic data:", prompt);
    } else {
      // Generate prompt for SWOT data
      prompt = generateSwotPrompt(data);
    }
    
    // Call the DeepSeek API with the prepared prompt
    console.log("Calling DeepSeek API with prompt:", prompt);
    const apiResponse = await callDeepseekApi(prompt);
    console.log("Received API response:", apiResponse);
    
    if (!apiResponse) {
      console.error("No response from DeepSeek API");
      return null;
    }
    
    // Parse the API response into our expected action plan format
    if (isPhaseTestData) {
      return parsePhaseTestActionPlan(apiResponse);
    } else {
      const parsedPlan = parseSwotActionPlan(apiResponse);
      console.log("Parsed action plan:", parsedPlan);
      return parsedPlan;
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
