
import { supabase } from "@/integrations/supabase/client";
import { Json } from "@/integrations/supabase/types";
import { DiagnosticResults, AnswersDataType } from "@/types/diagnostic";
import { isValidDiagnosticResults, isValidAnswersData, isValidActionPlan } from "@/types/diagnosticState";

export const loadDiagnosticDataFromSupabase = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from('diagnostic_results')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 é o código para "nenhum resultado encontrado"
      throw error;
    }

    if (!data) {
      return {
        results: null,
        answersData: null,
        actionPlan: null,
        diagnosticId: null
      };
    }
    
    let parsedResults = null;
    let parsedAnswersData = null;
    let parsedActionPlan = null;
    
    // Parse results
    if (data.results && typeof data.results === 'object') {
      const loadedResults = data.results as Json;
      
      if (isValidDiagnosticResults(loadedResults)) {
        parsedResults = loadedResults;
      }
    }
    
    // Parse answers data
    if (data.answers_data && typeof data.answers_data === 'object') {
      const loadedAnswersData = data.answers_data as Json;
      
      if (isValidAnswersData(loadedAnswersData)) {
        parsedAnswersData = loadedAnswersData;
      }
    }
    
    // Parse action plan
    if (data.action_plan && typeof data.action_plan === 'object') {
      const loadedActionPlan = data.action_plan as Json;
      
      if (isValidActionPlan(loadedActionPlan)) {
        parsedActionPlan = loadedActionPlan;
      }
    }

    return {
      results: parsedResults,
      answersData: parsedAnswersData,
      actionPlan: parsedActionPlan,
      diagnosticId: data.id
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
        
      // Get the new diagnostic ID
      const { data, error } = await supabase
        .from('diagnostic_results')
        .select('id')
        .eq('user_id', userId)
        .single();
        
      if (!error && data) {
        return { result, diagnosticId: data.id };
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

    const { data, error } = await supabase
      .from('diagnostic_results')
      .select('results, action_plan')
      .eq('user_id', userId)
      .single();
    
    if (error) {
      if (error.code === 'PGRST116') { // "No rows found"
        return false;
      }
      throw error;
    }
    
    // Verifica se há resultados e plano de ação
    return !!(data && data.results && data.action_plan &&
      typeof data.action_plan === 'object' && 
      Object.keys(data.action_plan).length > 0);
  } catch (error) {
    console.error("Erro ao verificar conclusão do diagnóstico:", error);
    return false;
  }
};

// Export the function for the module to use
export const loadDiagnosticCompletion = isDiagnosticComplete;
