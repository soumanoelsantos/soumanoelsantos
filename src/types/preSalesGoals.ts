
export interface GoalType {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  unit: string; // 'tentativas', 'agendamentos', 'percentage', 'calls', etc.
  category: string; // 'pre_vendas', 'vendas', 'geral'
  target_scope: 'individual' | 'empresa';
  created_at: string;
  updated_at: string;
}

export interface PreSalesGoal {
  id: string;
  user_id: string;
  goal_type_id: string;
  seller_id?: string; // NULL para metas da empresa
  month: number;
  year: number;
  target_value: number;
  current_value: number;
  created_at: string;
  updated_at: string;
  goal_type?: GoalType;
  seller?: {
    id: string;
    name: string;
  };
}

export interface CreateGoalTypeData {
  name: string;
  description?: string;
  unit: string;
  category: string;
  target_scope: 'individual' | 'empresa';
}

export interface CreatePreSalesGoalData {
  goal_type_id: string;
  seller_id?: string;
  month: number;
  year: number;
  target_value: number;
}
