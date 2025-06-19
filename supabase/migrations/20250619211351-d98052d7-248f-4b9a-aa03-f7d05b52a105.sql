
-- Remover todas as políticas RLS existentes da tabela dashboard_configs
DROP POLICY IF EXISTS "Users can view their own dashboard configs" ON dashboard_configs;
DROP POLICY IF EXISTS "Users can create their own dashboard configs" ON dashboard_configs;
DROP POLICY IF EXISTS "Users can update their own dashboard configs" ON dashboard_configs;
DROP POLICY IF EXISTS "Users can delete their own dashboard configs" ON dashboard_configs;

-- Desabilitar Row Level Security na tabela dashboard_configs
ALTER TABLE dashboard_configs DISABLE ROW LEVEL SECURITY;

-- Garantir que usuários autenticados tenham acesso total à tabela
GRANT ALL ON dashboard_configs TO authenticated;
GRANT ALL ON dashboard_configs TO anon;
