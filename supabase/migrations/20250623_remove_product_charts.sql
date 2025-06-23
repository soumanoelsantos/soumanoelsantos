
-- Remove product chart configuration columns that are no longer needed
ALTER TABLE public.dashboard_configs 
DROP COLUMN IF EXISTS show_product_sales_evolution_chart,
DROP COLUMN IF EXISTS show_product_performance_chart,
DROP COLUMN IF EXISTS show_product_comparison_chart,
DROP COLUMN IF EXISTS show_product_temporal_chart;
