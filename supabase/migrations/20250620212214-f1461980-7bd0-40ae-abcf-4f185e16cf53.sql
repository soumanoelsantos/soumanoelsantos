
-- Add product metrics columns to dashboard_configs table
ALTER TABLE dashboard_configs 
ADD COLUMN IF NOT EXISTS selected_product_ids jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS show_product_metrics boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_ticket_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_quantidade_vendas boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_meta_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_meta_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_falta_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_falta_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_diaria_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_diaria_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_cash_collect boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_projecao_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_projecao_faturamento boolean DEFAULT false;
