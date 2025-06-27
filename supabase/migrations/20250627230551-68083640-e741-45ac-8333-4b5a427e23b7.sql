
-- Adicionar coluna parent_folder_id para suportar pastas aninhadas
ALTER TABLE process_folders 
ADD COLUMN parent_folder_id UUID REFERENCES process_folders(id) ON DELETE CASCADE;

-- Criar índice para melhorar performance nas consultas de pastas aninhadas
CREATE INDEX idx_process_folders_parent_id ON process_folders(parent_folder_id);

-- Criar bucket de storage se não existir com configurações sem limite de tamanho
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'process-files', 
  'process-files', 
  true, 
  NULL, -- Remove limite de tamanho
  ARRAY[
    'application/pdf',
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp'
  ]
)
ON CONFLICT (id) DO UPDATE SET
  file_size_limit = NULL,
  allowed_mime_types = ARRAY[
    'application/pdf',
    'application/msword', 
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'text/plain',
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp'
  ];

-- Criar políticas para o storage bucket
CREATE POLICY "Allow authenticated users to upload files" ON storage.objects
FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'process-files');

CREATE POLICY "Allow authenticated users to view files" ON storage.objects
FOR SELECT TO authenticated
USING (bucket_id = 'process-files');

CREATE POLICY "Allow authenticated users to update files" ON storage.objects
FOR UPDATE TO authenticated
USING (bucket_id = 'process-files');

CREATE POLICY "Allow authenticated users to delete files" ON storage.objects
FOR DELETE TO authenticated
USING (bucket_id = 'process-files');
