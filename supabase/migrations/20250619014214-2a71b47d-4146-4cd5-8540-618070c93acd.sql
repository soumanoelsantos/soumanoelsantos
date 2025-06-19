
-- Criar tabela para tipos de vendedor
CREATE TYPE public.seller_type AS ENUM ('pap', 'sdr', 'closer', 'vendedor_interno', 'outro');

-- Criar tabela de vendedores
CREATE TABLE public.sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  seller_type seller_type NOT NULL,
  is_active BOOLEAN DEFAULT true,
  access_token TEXT UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Criar tabela de metas mensais por vendedor
CREATE TABLE public.seller_monthly_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE NOT NULL,
  month INTEGER NOT NULL CHECK (month >= 1 AND month <= 12),
  year INTEGER NOT NULL CHECK (year >= 2020),
  sales_goal INTEGER DEFAULT 0,
  revenue_goal NUMERIC DEFAULT 0,
  billing_goal NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(seller_id, month, year)
);

-- Criar tabela de lançamentos de performance diária
CREATE TABLE public.seller_daily_performance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID REFERENCES public.sellers(id) ON DELETE CASCADE NOT NULL,
  date DATE NOT NULL,
  sales_count INTEGER DEFAULT 0,
  revenue_amount NUMERIC DEFAULT 0,
  billing_amount NUMERIC DEFAULT 0,
  leads_count INTEGER DEFAULT 0,
  meetings_count INTEGER DEFAULT 0,
  calls_count INTEGER DEFAULT 0,
  notes TEXT,
  submitted_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  submitted_by_seller BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(seller_id, date)
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_monthly_goals ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.seller_daily_performance ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para sellers
CREATE POLICY "Users can manage their own sellers" ON public.sellers
  FOR ALL USING (auth.uid() = user_id);

-- Política para vendedores acessarem seus próprios dados via token
CREATE POLICY "Sellers can view their own data via token" ON public.sellers
  FOR SELECT USING (
    auth.uid() IS NULL AND 
    access_token = current_setting('request.jwt.claims', true)::json->>'seller_token'
  );

-- Políticas RLS para seller_monthly_goals
CREATE POLICY "Users can manage goals for their sellers" ON public.seller_monthly_goals
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.sellers 
      WHERE sellers.id = seller_monthly_goals.seller_id 
      AND sellers.user_id = auth.uid()
    )
  );

-- Políticas RLS para seller_daily_performance
CREATE POLICY "Users can manage performance for their sellers" ON public.seller_daily_performance
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.sellers 
      WHERE sellers.id = seller_daily_performance.seller_id 
      AND sellers.user_id = auth.uid()
    )
  );

-- Política para vendedores lançarem sua própria performance via token
CREATE POLICY "Sellers can insert their own performance via token" ON public.seller_daily_performance
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.sellers 
      WHERE sellers.id = seller_daily_performance.seller_id 
      AND sellers.access_token = current_setting('request.jwt.claims', true)::json->>'seller_token'
    )
  );

-- Criar índices para melhor performance
CREATE INDEX idx_sellers_user_id ON public.sellers(user_id);
CREATE INDEX idx_sellers_access_token ON public.sellers(access_token);
CREATE INDEX idx_seller_monthly_goals_seller_id ON public.seller_monthly_goals(seller_id);
CREATE INDEX idx_seller_monthly_goals_year_month ON public.seller_monthly_goals(year, month);
CREATE INDEX idx_seller_daily_performance_seller_id ON public.seller_daily_performance(seller_id);
CREATE INDEX idx_seller_daily_performance_date ON public.seller_daily_performance(date);

-- Criar triggers para updated_at
CREATE TRIGGER update_sellers_updated_at
  BEFORE UPDATE ON public.sellers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seller_monthly_goals_updated_at
  BEFORE UPDATE ON public.seller_monthly_goals
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_seller_daily_performance_updated_at
  BEFORE UPDATE ON public.seller_daily_performance
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
