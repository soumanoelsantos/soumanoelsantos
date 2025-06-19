
-- Adicionar colunas para os novos gráficos de análise temporal se não existirem
ALTER TABLE public.dashboard_configs 
ADD COLUMN IF NOT EXISTS show_seller_revenue_chart boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_seller_billing_chart boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_temporal_revenue_chart boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_temporal_billing_chart boolean DEFAULT true;

-- Atualizar registros existentes para ter os valores padrão
UPDATE public.dashboard_configs 
SET 
  show_seller_revenue_chart = COALESCE(show_seller_revenue_chart, true),
  show_seller_billing_chart = COALESCE(show_seller_billing_chart, true),
  show_temporal_revenue_chart = COALESCE(show_temporal_revenue_chart, true),
  show_temporal_billing_chart = COALESCE(show_temporal_billing_chart, true)
WHERE show_seller_revenue_chart IS NULL 
   OR show_seller_billing_chart IS NULL 
   OR show_temporal_revenue_chart IS NULL 
   OR show_temporal_billing_chart IS NULL;
