
import { ActionItem } from '@/components/diagnostic/NewDiagnosticTestContent';

export interface DiagnosticResults {
  [key: string]: {
    pontuacao: number;
    nivel: 'critico' | 'atencao' | 'bom' | 'excelente';
    problemas: string[];
    solucoes: string[];
  };
}

export interface GenerateActionsParams {
  results: DiagnosticResults;
  companyName: string;
  maxActions?: number;
}

export type ActionCategory = 'comercial' | 'marketing' | 'gestao' | 'financeiro' | 'rh' | 'operacional' | 'tecnologia' | 'cultura' | 'relacionamento' | 'produto' | 'sucesso-cliente';

export type Priority = 'alta' | 'media' | 'baixa';
export type Status = 'pendente' | 'em_andamento' | 'realizado' | 'atrasado';
