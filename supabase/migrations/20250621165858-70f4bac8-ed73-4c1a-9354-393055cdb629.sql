
-- Criar tabela para metas de produtos
CREATE TABLE public.product_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.products(id) ON DELETE CASCADE,
  quantity_goal INTEGER NOT NULL DEFAULT 0,
  revenue_goal NUMERIC NOT NULL DEFAULT 0,
  billing_goal NUMERIC NOT NULL DEFAULT 0,
  currency TEXT NOT NULL DEFAULT 'BRL' CHECK (currency IN ('BRL', 'USD')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Habilitar Row Level Security
ALTER TABLE public.product_goals ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para product_goals
CREATE POLICY "Users can view their own product goals" 
  ON public.product_goals 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own product goals" 
  ON public.product_goals 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own product goals" 
  ON public.product_goals 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own product goals" 
  ON public.product_goals 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Adicionar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_product_goals_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$;

CREATE TRIGGER update_product_goals_updated_at
    BEFORE UPDATE ON public.product_goals
    FOR EACH ROW
    EXECUTE FUNCTION public.update_product_goals_updated_at();
