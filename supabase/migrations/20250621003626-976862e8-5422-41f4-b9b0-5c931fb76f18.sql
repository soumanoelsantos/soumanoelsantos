
-- Garantir que a tabela seller_individual_sales tenha permissões adequadas
ALTER TABLE public.seller_individual_sales DISABLE ROW LEVEL SECURITY;

-- Conceder permissões completas para usuários anônimos e autenticados
GRANT ALL ON public.seller_individual_sales TO anon;
GRANT ALL ON public.seller_individual_sales TO authenticated;

-- Garantir que a tabela products também seja acessível
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;

-- Criar uma política mais permissiva para seller_individual_sales se necessário
DROP POLICY IF EXISTS "Authenticated users can manage individual sales" ON public.seller_individual_sales;

-- Re-habilitar RLS mas com política mais permissiva
ALTER TABLE public.seller_individual_sales ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all operations on individual sales" ON public.seller_individual_sales
  FOR ALL 
  USING (true)
  WITH CHECK (true);
