
export interface DiagnosticResults {
  processos: { score: number; total: number; percentage: number };
  resultados: { score: number; total: number; percentage: number };
  sistemaGestao: { score: number; total: number; percentage: number };
  pessoas: { score: number; total: number; percentage: number };
}

export interface AnswersDataType {
  [key: string]: {
    title: string;
    answers: { question: string; answer: string }[];
  };
}

export interface DiagnosticSection {
  title: string;
  questions: string[];
  pointValue: number;
}

export interface DiagnosticSections {
  [key: string]: DiagnosticSection;
}
