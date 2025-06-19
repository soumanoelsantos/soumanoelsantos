
-- Adicionar colunas para os gráficos de evolução na tabela dashboard_configs
ALTER TABLE dashboard_configs 
ADD COLUMN IF NOT EXISTS show_revenue_evolution_chart boolean DEFAULT true,
ADD COLUMN IF NOT EXISTS show_billing_evolution_chart boolean DEFAULT true;
