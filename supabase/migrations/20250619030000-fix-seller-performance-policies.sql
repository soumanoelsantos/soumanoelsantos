
-- Corrigir políticas RLS para seller_daily_performance
-- Remover políticas existentes que podem estar conflitando
DROP POLICY IF EXISTS "Users can manage performance for their sellers" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can insert their own performance via token" ON public.seller_daily_performance;

-- Política para usuários administradores verem performance de seus vendedores
CREATE POLICY "Users can view and manage performance for their sellers" ON public.seller_daily_performance
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.sellers 
      WHERE sellers.id = seller_daily_performance.seller_id 
      AND sellers.user_id = auth.uid()
    )
  );

-- Política para vendedores inserirem/atualizarem sua própria performance
CREATE POLICY "Sellers can manage their own performance" ON public.seller_daily_performance
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.sellers 
      WHERE sellers.id = seller_daily_performance.seller_id 
      AND sellers.access_token IS NOT NULL
    )
  );

-- Garantir que a tabela tenha RLS habilitado
ALTER TABLE public.seller_daily_performance ENABLE ROW LEVEL SECURITY;
