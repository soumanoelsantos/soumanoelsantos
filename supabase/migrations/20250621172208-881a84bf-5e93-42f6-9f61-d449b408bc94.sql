
-- Adicionar as novas colunas de controle de abas na tabela dashboard_configs
ALTER TABLE dashboard_configs 
ADD COLUMN IF NOT EXISTS enable_commercial_tab BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_product_tab BOOLEAN DEFAULT true,
ADD COLUMN IF NOT EXISTS enable_pre_sales_tab BOOLEAN DEFAULT true;
