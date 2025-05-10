
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
      throw error;
    }

    if (!data || data.length === 0) {
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
      }
    }
    
    // Parse answers data
    if (firstResult.answers_data && typeof firstResult.answers_data === 'object') {
      const loadedAnswersData = firstResult.answers_data as Json;
      
      if (isValidAnswersData(loadedAnswersData)) {
        parsedAnswersData = loadedAnswersData;
      }
    }
    
    // Parse action plan
    if (firstResult.action_plan && typeof firstResult.action_plan === 'object') {
      const loadedActionPlan = firstResult.action_plan as Json;
      
      if (isValidActionPlan(loadedActionPlan)) {
        parsedActionPlan = loadedActionPlan;
      }
    }

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
    const diagnosticData = {
      user_id: userId,
      results: results as unknown as Json,
      answers_data: answersData as unknown as Json,
      action_plan: actionPlan as unknown as Json
    };
    
    let result;
    
    if (diagnosticId) {
      // Update existing diagnostic
      result = await supabase
        .from('diagnostic_results')
        .update({
          results: diagnosticData.results,
          answers_data: diagnosticData.answers_data,
          action_plan: diagnosticData.action_plan
        })
        .eq('id', diagnosticId);
    } else {
      // Insert new diagnostic
      result = await supabase
        .from('diagnostic_results')
        .insert({
          user_id: userId,
          results: diagnosticData.results,
          answers_data: diagnosticData.answers_data,
          action_plan: diagnosticData.action_plan
        });
        
      // Get the new diagnostic ID - changed to handle array results
      const { data, error } = await supabase
        .from('diagnostic_results')
        .select('id')
        .eq('user_id', userId);
        
      if (!error && data && data.length > 0) {
        return { result, diagnosticId: data[0].id };
      }
    }
    
    return { result, diagnosticId };
  } catch (error) {
    console.error("Erro ao salvar diagnóstico:", error);
    throw error;
  }
};

// Melhorando a função para excluir diagnóstico
export const deleteDiagnosticFromSupabase = async (userId: string) => {
  try {
    console.log("Attempting to delete diagnostic for user:", userId);
    
    // First attempt with specific table
    const { error, count } = await supabase
      .from('diagnostic_results')
      .delete({ count: 'exact' })
      .eq('user_id', userId);
      
    if (error) {
      console.error("Error during diagnostic deletion:", error);
      throw error;
    }
    
    console.log(`Deleted ${count || 0} diagnostic results`);
    return true;
  } catch (error) {
    console.error("Error deleting diagnostic:", error);
    
    // Remove the RPC call that's causing the error
    // Since we're already trying to delete via direct table access,
    // we don't need this secondary approach
    console.error("Failed to delete diagnostic results:", error);
    throw error;
  }
};

// Função para verificar se o diagnóstico está completo
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
      throw error;
    }
    
    // Check if we have results and they have an action plan
    if (!data || data.length === 0) {
      return false;
    }
    
    const firstEntry = data[0];
    // Verifica se há resultados e plano de ação
    return !!(firstEntry && firstEntry.results && firstEntry.action_plan &&
      typeof firstEntry.action_plan === 'object' && 
      Object.keys(firstEntry.action_plan).length > 0);
  } catch (error) {
    console.error("Erro ao verificar conclusão do diagnóstico:", error);
    return false;
  }
};

// Export the function for the module to use
export const loadDiagnosticCompletion = isDiagnosticComplete;
