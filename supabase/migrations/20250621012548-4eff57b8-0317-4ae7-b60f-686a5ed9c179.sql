
-- Adicionar foreign key para products na tabela seller_individual_sales
ALTER TABLE public.seller_individual_sales 
ADD CONSTRAINT fk_seller_individual_sales_product 
FOREIGN KEY (product_id) REFERENCES public.products(id) ON DELETE SET NULL;

-- Garantir que a tabela products seja acessível para usuários anônimos (para o formulário de vendas)
GRANT SELECT ON public.products TO anon;
GRANT SELECT ON public.products TO authenticated;

-- Criar uma política mais permissiva para products se necessário
DROP POLICY IF EXISTS "Allow read access to products" ON public.products;

CREATE POLICY "Allow read access to products" ON public.products
  FOR SELECT 
  USING (true);

-- Habilitar RLS na tabela products se não estiver habilitado
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
