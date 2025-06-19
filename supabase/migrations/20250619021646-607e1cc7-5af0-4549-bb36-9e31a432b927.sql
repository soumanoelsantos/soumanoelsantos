
-- Remover todas as políticas RLS da tabela sellers
DROP POLICY IF EXISTS "Users can manage their own sellers" ON public.sellers;
DROP POLICY IF EXISTS "Sellers can view their own data via token" ON public.sellers;

-- Desabilitar RLS na tabela sellers
ALTER TABLE public.sellers DISABLE ROW LEVEL SECURITY;

-- Conceder acesso público de leitura na tabela sellers
GRANT SELECT ON public.sellers TO anon;
GRANT SELECT ON public.sellers TO authenticated;
