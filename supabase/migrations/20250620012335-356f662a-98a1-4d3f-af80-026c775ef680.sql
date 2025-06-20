
-- Garantir que a tabela sellers seja totalmente acessível
ALTER TABLE public.sellers DISABLE ROW LEVEL SECURITY;

-- Garantir que a tabela seller_daily_performance seja totalmente acessível  
ALTER TABLE public.seller_daily_performance DISABLE ROW LEVEL SECURITY;

-- Conceder permissões completas para usuários anônimos e autenticados
GRANT ALL ON public.sellers TO anon;
GRANT ALL ON public.sellers TO authenticated;
GRANT ALL ON public.seller_daily_performance TO anon;
GRANT ALL ON public.seller_daily_performance TO authenticated;

-- Garantir que as sequências também tenham permissões
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO authenticated;

-- Remover todas as políticas RLS que podem estar bloqueando o acesso
DROP POLICY IF EXISTS "Users can manage their own sellers" ON public.sellers;
DROP POLICY IF EXISTS "Sellers can view their own data via token" ON public.sellers;
DROP POLICY IF EXISTS "Users can manage performance for their sellers" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can insert their own performance via token" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Users can view and manage performance for their sellers" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can manage their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Allow seller access via token" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Public access to seller performance via token" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Admins can manage all performance data" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can view their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can insert their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can update their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Users can view seller performance they manage" ON public.seller_daily_performance;

-- Criar uma função para buscar vendedor por token (mais robusta)
CREATE OR REPLACE FUNCTION public.get_seller_by_access_token(token_param text)
RETURNS TABLE(
  id uuid,
  user_id uuid,
  name text,
  email text,
  phone text,
  seller_type text,
  is_active boolean,
  access_token text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    s.id,
    s.user_id,
    s.name,
    s.email,
    s.phone,
    s.seller_type::text,
    s.is_active,
    s.access_token,
    s.created_at,
    s.updated_at
  FROM public.sellers s
  WHERE s.access_token = token_param
  AND s.is_active = true;
END;
$$;

-- Conceder execução da função para todos
GRANT EXECUTE ON FUNCTION public.get_seller_by_access_token(text) TO anon;
GRANT EXECUTE ON FUNCTION public.get_seller_by_access_token(text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.get_seller_by_access_token(text) TO public;
