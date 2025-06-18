
-- Criar tabela para mapas mentais
CREATE TABLE public.mind_maps (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  title TEXT NOT NULL,
  content JSONB NOT NULL DEFAULT '{"nodes": [], "edges": []}',
  share_token TEXT NOT NULL UNIQUE DEFAULT encode(gen_random_bytes(32), 'hex'),
  is_public BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para otimização
CREATE INDEX idx_mind_maps_user_id ON public.mind_maps(user_id);
CREATE INDEX idx_mind_maps_share_token ON public.mind_maps(share_token);

-- Trigger para atualizar updated_at
CREATE TRIGGER update_mind_maps_updated_at
  BEFORE UPDATE ON public.mind_maps
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- RLS Policies
ALTER TABLE public.mind_maps ENABLE ROW LEVEL SECURITY;

-- Política para que usuários vejam apenas seus próprios mapas
CREATE POLICY "Users can view their own mind maps" 
  ON public.mind_maps 
  FOR SELECT 
  USING (auth.uid() = user_id);

-- Política para criar mapas
CREATE POLICY "Users can create their own mind maps" 
  ON public.mind_maps 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

-- Política para atualizar mapas próprios
CREATE POLICY "Users can update their own mind maps" 
  ON public.mind_maps 
  FOR UPDATE 
  USING (auth.uid() = user_id);

-- Política para deletar mapas próprios
CREATE POLICY "Users can delete their own mind maps" 
  ON public.mind_maps 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Política para acesso público via share_token (qualquer pessoa pode editar se tiver o link)
CREATE POLICY "Public access to shared mind maps" 
  ON public.mind_maps 
  FOR ALL
  USING (is_public = true);
