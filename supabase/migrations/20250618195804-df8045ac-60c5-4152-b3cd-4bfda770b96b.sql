
-- Adicionar constraint única no user_id da tabela dashboard_configs
ALTER TABLE dashboard_configs 
ADD CONSTRAINT dashboard_configs_user_id_unique UNIQUE (user_id);
