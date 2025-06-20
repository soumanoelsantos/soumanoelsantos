
-- Adicionar a coluna product_order na tabela dashboard_configs
ALTER TABLE public.dashboard_configs 
ADD COLUMN IF NOT EXISTS product_order jsonb DEFAULT '[]'::jsonb;

-- Comentário para documentação
COMMENT ON COLUMN public.dashboard_configs.product_order IS 'Controla a ordem de exibição dos indicadores de produtos no dashboard';
