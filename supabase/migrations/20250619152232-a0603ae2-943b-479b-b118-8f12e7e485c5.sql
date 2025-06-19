
-- Adicionar colunas necessárias na tabela monthly_goals
ALTER TABLE public.monthly_goals 
ADD COLUMN IF NOT EXISTS financial_category text,
ADD COLUMN IF NOT EXISTS currency text;

-- Adicionar comentários para documentar as colunas
COMMENT ON COLUMN public.monthly_goals.financial_category IS 'Categoria financeira: faturamento ou receita';
COMMENT ON COLUMN public.monthly_goals.currency IS 'Moeda: BRL ou USD';
