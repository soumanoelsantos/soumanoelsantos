
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { DiagnosticResults, AnswersDataType } from "@/types/diagnostic";
import { isValidDiagnosticResults, isValidAnswersData, isValidActionPlan } from "@/types/diagnosticState";

export const loadDiagnosticDataFromSupabase = async (userId: string) => {
  try {
    // Changed to avoid using .single() and handle array results
    const { data, error } = await supabase
      .from('diagnostic_results')
      .select('*')
      .eq('user_id', userId);

    if (error) {
      console.error("Error loading diagnostic data:", error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log("No diagnostic data found for user:", userId);
      return {
        results: null,
        answersData: null,
        actionPlan: null,
        diagnosticId: null
      };
    }
    
    // Use the first result from the array (there should be only one per user)
    const firstResult = data[0];
    let parsedResults = null;
    let parsedAnswersData = null;
    let parsedActionPlan = null;
    
    // Parse results
    if (firstResult.results && typeof firstResult.results === 'object') {
      const loadedResults = firstResult.results as Json;
      
      if (isValidDiagnosticResults(loadedResults)) {
        parsedResults = loadedResults;
      } else {
        console.warn("Invalid diagnostic results format:", loadedResults);
      }
    }
    
    // Parse answers data
    if (firstResult.answers_data && typeof firstResult.answers_data === 'object') {
      const loadedAnswersData = firstResult.answers_data as Json;
      
      if (isValidAnswersData(loadedAnswersData)) {
        parsedAnswersData = loadedAnswersData;
      } else {
        console.warn("Invalid answers data format:", loadedAnswersData);
      }
    }
    
    // Parse action plan
    if (firstResult.action_plan && typeof firstResult.action_plan === 'object') {
      const loadedActionPlan = firstResult.action_plan as Json;
      
      if (isValidActionPlan(loadedActionPlan)) {
        parsedActionPlan = loadedActionPlan;
      } else {
        console.warn("Invalid action plan format:", loadedActionPlan);
      }
    }

    console.log("Successfully loaded diagnostic data for user:", userId);
    return {
      results: parsedResults,
      answersData: parsedAnswersData,
      actionPlan: parsedActionPlan,
      diagnosticId: firstResult.id
    };
  } catch (error) {
    console.error("Erro ao carregar diagnóstico:", error);
    throw error;
  }
};

export const saveDiagnosticToSupabase = async (
  userId: string,
  diagnosticId: string | null,
  results: DiagnosticResults,
  answersData: AnswersDataType,
  actionPlan: { [key: string]: string[] }
) => {
  try {
    console.log("Saving diagnostic data for user:", userId);
    
    const diagnosticData = {
      user_id: userId,
      results: results as unknown as Json,
      answers_data: answersData as unknown as Json,
      action_plan: actionPlan as unknown as Json
    };
    
    let result;
    
    if (diagnosticId) {
      // Update existing diagnostic
      console.log("Updating existing diagnostic with ID:", diagnosticId);
      result = await supabase
        .from('diagnostic_results')
        .update({
          results: diagnosticData.results,
          answers_data: diagnosticData.answers_data,
          action_plan: diagnosticData.action_plan
        })
        .eq('id', diagnosticId);
        
      if (result.error) {
        console.error("Error updating diagnostic:", result.error);
        throw result.error;
      }
    } else {
      // Insert new diagnostic
      console.log("Creating new diagnostic for user:", userId);
      result = await supabase
        .from('diagnostic_results')
        .insert({
          user_id: userId,
          results: diagnosticData.results,
          answers_data: diagnosticData.answers_data,
          action_plan: diagnosticData.action_plan
        });
        
      if (result.error) {
        console.error("Error inserting diagnostic:", result.error);
        throw result.error;
      }
      
      // Get the new diagnostic ID - changed to handle array results
      const { data, error } = await supabase
        .from('diagnostic_results')
        .select('id')
        .eq('user_id', userId);
        
      if (!error && data && data.length > 0) {
        console.log("New diagnostic created with ID:", data[0].id);
        return { result, diagnosticId: data[0].id };
      }
    }
    
    return { result, diagnosticId };
  } catch (error) {
    console.error("Erro ao salvar diagnóstico:", error);
    throw error;
  }
};

// Improved function for deleting diagnóstico
export const deleteDiagnosticFromSupabase = async (userId: string) => {
  try {
    console.log("Attempting to delete diagnostic for user:", userId);
    
    // Using simple delete query with error handling
    const { error, count } = await supabase
      .from('diagnostic_results')
      .delete({ count: 'exact' })
      .eq('user_id', userId);
      
    if (error) {
      console.error("Error during diagnostic deletion:", error);
      throw error;
    }
    
    console.log(`Deleted ${count || 0} diagnostic results for user ${userId}`);
    return true;
  } catch (error) {
    console.error("Error deleting diagnostic:", error);
    throw error;
  }
};

// Function to check if a diagnostic is complete
export const isDiagnosticComplete = async (userId: string): Promise<boolean> => {
  try {
    if (!userId) {
      return false;
    }

    // Changed to handle array results
    const { data, error } = await supabase
      .from('diagnostic_results')
      .select('results, action_plan')
      .eq('user_id', userId);
    
    if (error) {
      console.error("Error checking diagnostic completion:", error);
      throw error;
    }
    
    // Check if we have results and they have an action plan
    if (!data || data.length === 0) {
      return false;
    }
    
    const firstEntry = data[0];
    // Check if there are results and an action plan
    return !!(firstEntry && firstEntry.results && firstEntry.action_plan &&
      typeof firstEntry.action_plan === 'object' && 
      Object.keys(firstEntry.action_plan).length > 0);
  } catch (error) {
    console.error("Error checking diagnostic completion:", error);
    return false;
  }
};

// Export the function for the module to use
export const loadDiagnosticCompletion = isDiagnosticComplete;
