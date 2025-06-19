
-- Criar tabela para tipos de metas personalizáveis
CREATE TABLE public.goal_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  unit TEXT NOT NULL, -- 'tentativas', 'agendamentos', 'percentage', 'calls', etc.
  category TEXT NOT NULL, -- 'pre_vendas', 'vendas', 'geral'
  target_scope TEXT NOT NULL, -- 'individual', 'empresa'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para metas de pré-vendas
CREATE TABLE public.pre_sales_goals (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  goal_type_id UUID REFERENCES public.goal_types(id) ON DELETE CASCADE,
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE, -- NULL para metas da empresa
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  target_value NUMERIC NOT NULL,
  current_value NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para otimização
CREATE INDEX idx_goal_types_user_id ON public.goal_types(user_id);
CREATE INDEX idx_goal_types_category ON public.goal_types(category);
CREATE INDEX idx_pre_sales_goals_user_id ON public.pre_sales_goals(user_id);
CREATE INDEX idx_pre_sales_goals_seller_id ON public.pre_sales_goals(seller_id);
CREATE INDEX idx_pre_sales_goals_month_year ON public.pre_sales_goals(month, year);

-- Triggers para atualizar updated_at
CREATE TRIGGER update_goal_types_updated_at
  BEFORE UPDATE ON public.goal_types
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_pre_sales_goals_updated_at
  BEFORE UPDATE ON public.pre_sales_goals
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies para goal_types
ALTER TABLE public.goal_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own goal types" 
  ON public.goal_types 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own goal types" 
  ON public.goal_types 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own goal types" 
  ON public.goal_types 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own goal types" 
  ON public.goal_types 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- RLS Policies para pre_sales_goals
ALTER TABLE public.pre_sales_goals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own pre sales goals" 
  ON public.pre_sales_goals 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own pre sales goals" 
  ON public.pre_sales_goals 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own pre sales goals" 
  ON public.pre_sales_goals 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own pre sales goals" 
  ON public.pre_sales_goals 
  FOR DELETE 
  USING (auth.uid() = user_id);
