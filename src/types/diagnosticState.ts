
import { DiagnosticResults, AnswersDataType } from "@/types/diagnostic";
import { Json } from "@/integrations/supabase/types";

export interface DiagnosticState {
  results: DiagnosticResults;
  showResults: boolean;
  isLoading: boolean;
  isGeneratingPlan: boolean;
  actionPlan: { [key: string]: string[] };
  answersData: AnswersDataType;
  shouldGeneratePlan: boolean;
  diagnosticId: string | null;
}

export const initialDiagnosticState: DiagnosticState = {
  results: {
    processos: { score: 0, total: 100, percentage: 0 },
    resultados: { score: 0, total: 100, percentage: 0 },
    sistemaGestao: { score: 0, total: 100, percentage: 0 },
    pessoas: { score: 0, total: 100, percentage: 0 },
  },
  showResults: false,
  isLoading: true,
  isGeneratingPlan: false,
  actionPlan: {},
  answersData: {
    processos: { title: "", answers: [] },
    resultados: { title: "", answers: [] },
    sistemaGestao: { title: "", answers: [] },
    pessoas: { title: "", answers: [] }
  },
  shouldGeneratePlan: false,
  diagnosticId: null
};

export const isValidDiagnosticResults = (data: unknown): data is DiagnosticResults => {
  if (!data || typeof data !== 'object') return false;
  
  const results = data as Record<string, unknown>;
  const requiredSections = ['processos', 'resultados', 'sistemaGestao', 'pessoas'];
  
  for (const section of requiredSections) {
    if (!(section in results)) return false;
    
    const sectionData = results[section] as Record<string, unknown>;
    if (!sectionData || typeof sectionData !== 'object') return false;
    
    if (!('score' in sectionData && 'total' in sectionData && 'percentage' in sectionData)) return false;
  }
  
  return true;
};

export const isValidAnswersData = (data: unknown): data is AnswersDataType => {
  if (!data || typeof data !== 'object') return false;
  
  const answersData = data as Record<string, unknown>;
  const requiredSections = ['processos', 'resultados', 'sistemaGestao', 'pessoas'];
  
  for (const section of requiredSections) {
    if (!(section in answersData)) return false;
    
    const sectionData = answersData[section] as Record<string, unknown>;
    if (!sectionData || typeof sectionData !== 'object') return false;
    
    if (!('title' in sectionData && 'answers' in sectionData)) return false;
    
    const answers = sectionData.answers;
    if (!Array.isArray(answers)) return false;
  }
  
  return true;
};

export const isValidActionPlan = (data: unknown): data is { [key: string]: string[] } => {
  if (!data || typeof data !== 'object') return false;
  
  const actionPlan = data as Record<string, unknown>;
  
  for (const key in actionPlan) {
    const value = actionPlan[key];
    if (!Array.isArray(value)) return false;
    
    for (const item of value) {
      if (typeof item !== 'string') return false;
    }
  }
  
  return true;
};
