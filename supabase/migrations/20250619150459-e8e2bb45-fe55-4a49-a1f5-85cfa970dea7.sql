
-- Habilitar RLS na tabela seller_daily_performance se ainda não estiver habilitado
ALTER TABLE public.seller_daily_performance ENABLE ROW LEVEL SECURITY;

-- Remover políticas existentes se houver conflito
DROP POLICY IF EXISTS "Admins can manage all performance data" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can view their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can insert their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Sellers can update their own performance" ON public.seller_daily_performance;
DROP POLICY IF EXISTS "Users can view seller performance they manage" ON public.seller_daily_performance;

-- Política para admins terem acesso completo
CREATE POLICY "Admins can manage all performance data"
ON public.seller_daily_performance
FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND is_admin = true
  )
);

-- Política para vendedores poderem ver suas próprias performances
CREATE POLICY "Sellers can view their own performance"
ON public.seller_daily_performance
FOR SELECT
TO authenticated
USING (
  seller_id IN (
    SELECT id FROM public.sellers 
    WHERE user_id = auth.uid()
  )
);

-- Política para vendedores poderem inserir suas próprias performances
CREATE POLICY "Sellers can insert their own performance"
ON public.seller_daily_performance
FOR INSERT
TO authenticated
WITH CHECK (
  seller_id IN (
    SELECT id FROM public.sellers 
    WHERE user_id = auth.uid()
  )
);

-- Política para vendedores poderem atualizar suas próprias performances
CREATE POLICY "Sellers can update their own performance"
ON public.seller_daily_performance
FOR UPDATE
TO authenticated
USING (
  seller_id IN (
    SELECT id FROM public.sellers 
    WHERE user_id = auth.uid()
  )
)
WITH CHECK (
  seller_id IN (
    SELECT id FROM public.sellers 
    WHERE user_id = auth.uid()
  )
);

-- Política para usuários autenticados poderem ver performances dos vendedores que eles gerenciam
CREATE POLICY "Users can view seller performance they manage"
ON public.seller_daily_performance
FOR SELECT
TO authenticated
USING (
  seller_id IN (
    SELECT id FROM public.sellers 
    WHERE user_id = auth.uid()
  )
);

-- Política especial para permitir acesso público aos vendedores via token (para o formulário do vendedor)
CREATE POLICY "Allow seller access via token"
ON public.seller_daily_performance
FOR ALL
TO anon, authenticated
USING (
  seller_id IN (
    SELECT id FROM public.sellers 
    WHERE access_token IS NOT NULL
  )
)
WITH CHECK (
  seller_id IN (
    SELECT id FROM public.sellers 
    WHERE access_token IS NOT NULL
  )
);
