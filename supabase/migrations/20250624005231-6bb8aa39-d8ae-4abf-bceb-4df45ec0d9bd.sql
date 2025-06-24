
-- Create storage bucket for process files
INSERT INTO storage.buckets (id, name, public) 
VALUES ('process-files', 'process-files', true);

-- Create RLS policies for the storage bucket
CREATE POLICY "Users can view their own files" ON storage.objects
FOR SELECT USING (bucket_id = 'process-files' AND auth.uid()::text = (storage.foldername(name))[2]);

CREATE POLICY "Users can upload their own files" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'process-files' AND auth.uid()::text = (storage.foldername(name))[2]);

CREATE POLICY "Users can update their own files" ON storage.objects
FOR UPDATE USING (bucket_id = 'process-files' AND auth.uid()::text = (storage.foldername(name))[2]);

CREATE POLICY "Users can delete their own files" ON storage.objects
FOR DELETE USING (bucket_id = 'process-files' AND auth.uid()::text = (storage.foldername(name))[2]);

-- Add file-related columns to process_documents table
ALTER TABLE process_documents 
ADD COLUMN file_path TEXT,
ADD COLUMN file_name TEXT,
ADD COLUMN file_size BIGINT,
ADD COLUMN file_type TEXT;
