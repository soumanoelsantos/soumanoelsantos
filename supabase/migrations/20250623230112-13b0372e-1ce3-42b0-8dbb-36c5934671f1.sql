
-- Adicionar campos de data de início e fim das vendas na tabela products
ALTER TABLE public.products 
ADD COLUMN start_date DATE,
ADD COLUMN end_date DATE;

-- Adicionar comentários para documentar os campos
COMMENT ON COLUMN public.products.start_date IS 'Data de início das vendas do produto';
COMMENT ON COLUMN public.products.end_date IS 'Data de fim das vendas do produto';
