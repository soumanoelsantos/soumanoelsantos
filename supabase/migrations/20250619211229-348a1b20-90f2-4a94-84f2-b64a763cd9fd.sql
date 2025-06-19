
-- Adicionar colunas que estão faltando na tabela dashboard_configs
ALTER TABLE dashboard_configs 
ADD COLUMN IF NOT EXISTS pre_sales_order jsonb DEFAULT '[]'::jsonb;

-- Adicionar colunas para configurações de pré-vendas que estão sendo usadas no código
ALTER TABLE dashboard_configs 
ADD COLUMN IF NOT EXISTS show_pre_sales_calls boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_pre_sales_schedulings boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_pre_sales_no_show boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_pre_sales_sdr_table boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_pre_sales_calls_chart boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_pre_sales_scheduling_chart boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_pre_sales_no_show_chart boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_pre_sales_sdr_comparison_chart boolean DEFAULT true;

-- Atualizar as configurações existentes com valores padrão para pre_sales_order
UPDATE dashboard_configs 
SET pre_sales_order = '["showPreSalesCalls", "showPreSalesSchedulings", "showPreSalesNoShow", "showPreSalesSDRTable", "showPreSalesCallsChart", "showPreSalesSchedulingChart", "showPreSalesNoShowChart", "showPreSalesSDRComparisonChart"]'::jsonb
WHERE pre_sales_order IS NULL OR pre_sales_order = '[]'::jsonb;
