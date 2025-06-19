
export type SellerType = 'pap' | 'sdr' | 'closer' | 'vendedor_interno' | 'outro';

export interface Seller {
  id: string;
  user_id: string;
  name: string;
  email?: string;
  phone?: string;
  seller_type: SellerType;
  is_active: boolean;
  access_token: string;
  created_at: string;
  updated_at: string;
}

export interface SellerMonthlyGoal {
  id: string;
  seller_id: string;
  month: number;
  year: number;
  sales_goal: number;
  revenue_goal: number;
  billing_goal: number;
  created_at: string;
  updated_at: string;
}

export interface SellerDailyPerformance {
  id: string;
  seller_id: string;
  date: string;
  sales_count: number;
  revenue_amount: number;
  billing_amount: number;
  leads_count: number;
  meetings_count: number;
  calls_count: number;
  notes?: string;
  submitted_at: string;
  submitted_by_seller: boolean;
  created_at: string;
  updated_at: string;
}

export interface SellerWithGoals extends Seller {
  monthly_goals?: SellerMonthlyGoal[];
  daily_performance?: SellerDailyPerformance[];
}
