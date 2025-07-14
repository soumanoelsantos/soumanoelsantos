
-- Habilitar RLS na tabela process_folders se não estiver habilitado
ALTER TABLE process_folders ENABLE ROW LEVEL SECURITY;

-- Criar políticas para process_folders
CREATE POLICY "Users can view their own folders" 
  ON process_folders 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own folders" 
  ON process_folders 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own folders" 
  ON process_folders 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own folders" 
  ON process_folders 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Criar políticas para process_documents também
ALTER TABLE process_documents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own documents" 
  ON process_documents 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own documents" 
  ON process_documents 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents" 
  ON process_documents 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents" 
  ON process_documents 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Políticas para acesso público via share_token
CREATE POLICY "Anyone can view public folders via share token" 
  ON process_folders 
  FOR SELECT 
  USING (is_public = true);

CREATE POLICY "Anyone can view public documents via share token" 
  ON process_documents 
  FOR SELECT 
  USING (is_public = true);
