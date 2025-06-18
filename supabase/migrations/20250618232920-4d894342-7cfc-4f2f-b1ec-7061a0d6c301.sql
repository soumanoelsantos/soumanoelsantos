
-- Adicionar coluna show_cac na tabela dashboard_configs
ALTER TABLE public.dashboard_configs 
ADD COLUMN show_cac boolean DEFAULT false;
