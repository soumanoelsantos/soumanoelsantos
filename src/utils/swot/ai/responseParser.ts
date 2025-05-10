
/**
 * Parse the DeepSeek API response into the expected action plan format
 */
export const parseSwotActionPlan = (apiResponse: string) => {
  try {
    console.log("Raw API response to parse:", apiResponse);
    
    // Try to extract JSON from the response if it's wrapped in text
    const jsonMatch = apiResponse.match(/```json([\s\S]*?)```/) || 
                      apiResponse.match(/{[\s\S]*}/);
    
    let jsonStr = jsonMatch ? 
                  (jsonMatch[1] ? jsonMatch[1].trim() : jsonMatch[0]) : 
                  apiResponse;
    
    console.log("Extracted JSON string:", jsonStr);
    
    // Clean up the string if needed
    if (!jsonStr.startsWith('{')) {
      jsonStr = '{' + jsonStr.split('{').slice(1).join('{');
    }
    
    const parsedPlan = JSON.parse(jsonStr);
    console.log("Successfully parsed JSON:", parsedPlan);
    
    // Ensure the plan has the expected structure
    const actionPlan: {[key: string]: string[]} = {
      strengthsOpportunities: [],
      strengthsThreats: [],
      weaknessesOpportunities: [],
      weaknessesThreats: []
    };
    
    // Map the API response to our expected format
    if (parsedPlan.strengthsOpportunities) actionPlan.strengthsOpportunities = parsedPlan.strengthsOpportunities;
    if (parsedPlan.strengthsThreats) actionPlan.strengthsThreats = parsedPlan.strengthsThreats;
    if (parsedPlan.weaknessesOpportunities) actionPlan.weaknessesOpportunities = parsedPlan.weaknessesOpportunities;
    if (parsedPlan.weaknessesThreats) actionPlan.weaknessesThreats = parsedPlan.weaknessesThreats;
    
    // Check for alternative formats
    if (parsedPlan.so) actionPlan.strengthsOpportunities = parsedPlan.so;
    if (parsedPlan.st) actionPlan.strengthsThreats = parsedPlan.st;
    if (parsedPlan.wo) actionPlan.weaknessesOpportunities = parsedPlan.wo;
    if (parsedPlan.wt) actionPlan.weaknessesThreats = parsedPlan.wt;
    
    // Check if we have at least one non-empty section
    const hasContent = Object.values(actionPlan).some(arr => arr && arr.length > 0);
    
    if (!hasContent) {
      console.error("Parsed plan has no content:", actionPlan);
      return null;
    }
    
    return actionPlan;
  } catch (error) {
    console.error("Error parsing DeepSeek API response:", error);
    return null;
  }
};
