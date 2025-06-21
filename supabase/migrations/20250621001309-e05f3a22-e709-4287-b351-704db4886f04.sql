
-- Add new product chart configuration columns to dashboard_configs table
ALTER TABLE public.dashboard_configs 
ADD COLUMN IF NOT EXISTS show_product_revenue_evolution_chart BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_billing_evolution_chart BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_sales_evolution_chart BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_performance_chart BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_comparison_chart BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_temporal_chart BOOLEAN DEFAULT false;

-- Add comments for documentation
COMMENT ON COLUMN public.dashboard_configs.show_product_revenue_evolution_chart IS 'Controls if the product revenue evolution chart should be displayed';
COMMENT ON COLUMN public.dashboard_configs.show_product_billing_evolution_chart IS 'Controls if the product billing evolution chart should be displayed';
COMMENT ON COLUMN public.dashboard_configs.show_product_sales_evolution_chart IS 'Controls if the product sales evolution chart should be displayed';
COMMENT ON COLUMN public.dashboard_configs.show_product_performance_chart IS 'Controls if the product performance chart should be displayed';
COMMENT ON COLUMN public.dashboard_configs.show_product_comparison_chart IS 'Controls if the product comparison chart should be displayed';
COMMENT ON COLUMN public.dashboard_configs.show_product_temporal_chart IS 'Controls if the product temporal analysis chart should be displayed';
