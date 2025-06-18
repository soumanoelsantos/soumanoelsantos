
-- Adicionar a coluna show_diaria_faturamento na tabela dashboard_configs
ALTER TABLE public.dashboard_configs 
ADD COLUMN show_diaria_faturamento boolean DEFAULT false;
