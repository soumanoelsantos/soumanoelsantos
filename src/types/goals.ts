
export interface Product {
  id: string;
  user_id: string;
  name: string;
  description?: string;
  created_at: string;
  updated_at: string;
}

export interface MonthlyGoal {
  id: string;
  user_id: string;
  month: number;
  year: number;
  product_id?: string;
  goal_type: 'meta' | 'supermeta';
  target_type: 'quantity' | 'financial';
  financial_category?: 'faturamento' | 'receita';
  currency?: 'BRL' | 'USD';
  target_value: number;
  current_value: number;
  created_at: string;
  updated_at: string;
  product?: Product;
}

export interface CreateGoalData {
  month: number;
  year: number;
  product_id?: string;
  goal_type: 'meta' | 'supermeta';
  target_type: 'quantity' | 'financial';
  financial_category?: 'faturamento' | 'receita';
  currency?: 'BRL' | 'USD';
  target_value: number;
}

export interface CreateProductData {
  name: string;
  description?: string;
}
