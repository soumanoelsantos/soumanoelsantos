
-- Remover TODAS as políticas RLS da tabela seller_daily_performance
DROP POLICY IF EXISTS "Admins can manage all performance data" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can view their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can insert their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can update their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Users can view seller performance they manage" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Allow seller access via token" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Public access to seller performance via token" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Users can manage their sellers performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Users can view and manage performance for their sellers" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can manage their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Users can manage performance for their sellers" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can insert their own performance via token" ON public.seller_daily_performance;

-- Desabilitar RLS na tabela seller_daily_performance
ALTER TABLE public.seller_daily_performance DISABLE ROW LEVEL SECURITY;

-- Garantir acesso público total à tabela
GRANT ALL ON public.seller_daily_performance TO anon;
GRANT ALL ON public.seller_daily_performance TO authenticated;
