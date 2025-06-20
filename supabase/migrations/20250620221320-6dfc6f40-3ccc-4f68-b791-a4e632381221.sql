
-- Adicionar novos indicadores de produtos na tabela dashboard_configs
ALTER TABLE public.dashboard_configs 
ADD COLUMN IF NOT EXISTS show_product_meta_quantidade_vendas boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS show_product_ticket_faturamento boolean DEFAULT false;

-- Comentários para documentação
COMMENT ON COLUMN public.dashboard_configs.show_product_meta_quantidade_vendas IS 'Controla a exibição da meta de quantidade de vendas por produto';
COMMENT ON COLUMN public.dashboard_configs.show_product_ticket_faturamento IS 'Controla a exibição do ticket médio de faturamento por produto';
