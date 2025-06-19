
-- Adicionar coluna para a tabela de performance dos closers na configuração do dashboard
ALTER TABLE dashboard_configs 
ADD COLUMN show_closers_performance_table boolean DEFAULT true;
