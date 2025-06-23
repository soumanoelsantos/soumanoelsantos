
-- Criar tabela para documentos de processos
CREATE TABLE public.process_documents (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  title TEXT NOT NULL,
  content TEXT NOT NULL DEFAULT '',
  description TEXT,
  category TEXT DEFAULT 'geral',
  is_public BOOLEAN NOT NULL DEFAULT false,
  share_token TEXT NOT NULL DEFAULT encode(extensions.gen_random_bytes(32), 'hex'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela para pastas/categorias de documentos
CREATE TABLE public.process_folders (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  share_token TEXT NOT NULL DEFAULT encode(extensions.gen_random_bytes(32), 'hex'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Adicionar referência de pasta nos documentos
ALTER TABLE public.process_documents 
ADD COLUMN folder_id UUID REFERENCES public.process_folders(id) ON DELETE SET NULL;

-- Habilitar RLS nas tabelas
ALTER TABLE public.process_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.process_folders ENABLE ROW LEVEL SECURITY;

-- Políticas para documentos
CREATE POLICY "Users can view their own documents" 
  ON public.process_documents 
  FOR SELECT 
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create their own documents" 
  ON public.process_documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
  ON public.process_documents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
  ON public.process_documents 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Políticas para pastas
CREATE POLICY "Users can view their own folders" 
  ON public.process_folders 
  FOR SELECT 
  USING (auth.uid() = user_id OR is_public = true);

CREATE POLICY "Users can create their own folders" 
  ON public.process_folders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own folders" 
  ON public.process_folders 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own folders" 
  ON public.process_folders 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_process_documents_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION update_process_folders_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_process_documents_updated_at
    BEFORE UPDATE ON public.process_documents
    FOR EACH ROW
    EXECUTE FUNCTION update_process_documents_updated_at();

CREATE TRIGGER update_process_folders_updated_at
    BEFORE UPDATE ON public.process_folders
    FOR EACH ROW
    EXECUTE FUNCTION update_process_folders_updated_at();
