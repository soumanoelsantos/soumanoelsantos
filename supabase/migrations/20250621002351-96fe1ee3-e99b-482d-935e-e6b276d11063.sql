
-- Adicionar coluna product_id à tabela seller_individual_sales
ALTER TABLE public.seller_individual_sales 
ADD COLUMN IF NOT EXISTS product_id UUID REFERENCES public.products(id);

-- Adicionar comentário para documentação
COMMENT ON COLUMN public.seller_individual_sales.product_id IS 'ID do produto associado à venda (null para vendas gerais)';
