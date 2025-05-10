
export interface PhaseTest {
  id: number;
  phase: string;
  questions: string[];
  description: string;
  recommendations: string[];
}

export interface PhaseAnswer {
  question: string;
  value: number; // 1 for Yes, 2 for No
}

export interface PhaseTestResult {
  phaseName: string;
  score: number;
  description: string;
  recommendations: string[];
  enhanced_action_plan?: string[];
  answers?: PhaseAnswer[];
}
