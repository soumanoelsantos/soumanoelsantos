
-- Criar tabela para vendas individuais
CREATE TABLE public.seller_individual_sales (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID NOT NULL REFERENCES public.sellers(id),
  performance_id UUID NOT NULL REFERENCES public.seller_daily_performance(id),
  client_name TEXT NOT NULL,
  revenue_amount NUMERIC NOT NULL DEFAULT 0,
  billing_amount NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar RLS
ALTER TABLE public.seller_individual_sales ENABLE ROW LEVEL SECURITY;

-- Política para que apenas usuários autenticados possam ver/editar
CREATE POLICY "Authenticated users can manage individual sales" 
  ON public.seller_individual_sales 
  FOR ALL 
  USING (true);

-- Adicionar trigger para updated_at
CREATE TRIGGER update_seller_individual_sales_updated_at
  BEFORE UPDATE ON public.seller_individual_sales
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
