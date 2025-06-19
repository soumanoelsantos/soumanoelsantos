
-- Adicionar as novas colunas de projeção para a tabela dashboard_configs
ALTER TABLE public.dashboard_configs 
ADD COLUMN IF NOT EXISTS show_projecao_receita BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_projecao_faturamento BOOLEAN DEFAULT false,
ADD COLUMN IF NOT EXISTS show_no_show BOOLEAN DEFAULT false;

-- Comentários para documentação
COMMENT ON COLUMN public.dashboard_configs.show_projecao_receita IS 'Controla se o indicador de projeção de receita deve ser exibido';
COMMENT ON COLUMN public.dashboard_configs.show_projecao_faturamento IS 'Controla se o indicador de projeção de faturamento deve ser exibido';
COMMENT ON COLUMN public.dashboard_configs.show_no_show IS 'Controla se o indicador de no-show deve ser exibido';
