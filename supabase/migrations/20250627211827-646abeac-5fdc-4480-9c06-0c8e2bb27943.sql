
-- Create storage bucket for mind map attachments
INSERT INTO storage.buckets (id, name, public) 
VALUES ('mind-map-attachments', 'mind-map-attachments', true);

-- Create RLS policies for the storage bucket
CREATE POLICY "Users can view mind map attachments" ON storage.objects
FOR SELECT USING (bucket_id = 'mind-map-attachments');

CREATE POLICY "Users can upload mind map attachments" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'mind-map-attachments');

CREATE POLICY "Users can update mind map attachments" ON storage.objects
FOR UPDATE USING (bucket_id = 'mind-map-attachments');

CREATE POLICY "Users can delete mind map attachments" ON storage.objects
FOR DELETE USING (bucket_id = 'mind-map-attachments');

-- Create table for mind map attachments metadata
CREATE TABLE public.mind_map_attachments (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  mind_map_id UUID NOT NULL REFERENCES public.mind_maps(id) ON DELETE CASCADE,
  node_id TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size BIGINT NOT NULL,
  storage_path TEXT NOT NULL,
  attachment_type TEXT NOT NULL CHECK (attachment_type IN ('pdf', 'image', 'video')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.mind_map_attachments ENABLE ROW LEVEL SECURITY;

-- Create policies for mind_map_attachments
CREATE POLICY "Users can view attachments from their mind maps or public ones" 
  ON public.mind_map_attachments 
  FOR SELECT 
  USING (
    EXISTS (
      SELECT 1 FROM public.mind_maps 
      WHERE mind_maps.id = mind_map_attachments.mind_map_id 
      AND (mind_maps.user_id = auth.uid() OR mind_maps.is_public = true)
    )
  );

CREATE POLICY "Users can create attachments for their mind maps" 
  ON public.mind_map_attachments 
  FOR INSERT 
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.mind_maps 
      WHERE mind_maps.id = mind_map_attachments.mind_map_id 
      AND mind_maps.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update attachments from their mind maps" 
  ON public.mind_map_attachments 
  FOR UPDATE 
  USING (
    EXISTS (
      SELECT 1 FROM public.mind_maps 
      WHERE mind_maps.id = mind_map_attachments.mind_map_id 
      AND mind_maps.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can delete attachments from their mind maps" 
  ON public.mind_map_attachments 
  FOR DELETE 
  USING (
    EXISTS (
      SELECT 1 FROM public.mind_maps 
      WHERE mind_maps.id = mind_map_attachments.mind_map_id 
      AND mind_maps.user_id = auth.uid()
    )
  );

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_mind_map_attachments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_mind_map_attachments_updated_at_trigger
  BEFORE UPDATE ON public.mind_map_attachments
  FOR EACH ROW
  EXECUTE FUNCTION update_mind_map_attachments_updated_at();
