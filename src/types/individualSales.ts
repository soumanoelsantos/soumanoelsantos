
export interface IndividualSale {
  id: string;
  seller_id: string;
  performance_id: string;
  client_name: string;
  revenue_amount: number;
  billing_amount: number;
  product_id?: string | null;
  created_at: string;
  updated_at: string;
  products?: {
    id: string;
    name: string;
  } | null;
}

export interface IndividualSaleFormData {
  client_name: string;
  revenue_amount: number;
  billing_amount: number;
  product_id?: string | null;
}
