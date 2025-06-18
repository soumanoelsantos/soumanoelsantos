
-- Adicionar colunas faltantes na tabela dashboard_configs
ALTER TABLE dashboard_configs 
ADD COLUMN IF NOT EXISTS show_falta_faturamento_hiper boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_falta_receita_hiper boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_falta_faturamento_super boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_falta_receita_super boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_super_meta_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_super_meta_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_hiper_meta_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_hiper_meta_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_calls_diarias boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_ticket_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_ticket_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_falta_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_falta_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_conversao boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_diaria_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_meta_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_meta_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_faturamento boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_receita boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_quantidade_vendas boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_cash_collect boolean DEFAULT false;
