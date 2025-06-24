
-- Create table for action calendar
CREATE TABLE public.action_calendar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id),
  title TEXT NOT NULL,
  description TEXT,
  responsible_person TEXT NOT NULL,
  department TEXT NOT NULL,
  due_date DATE NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'em_andamento', 'concluida', 'atrasada')),
  details TEXT,
  is_public BOOLEAN NOT NULL DEFAULT false,
  share_token TEXT NOT NULL DEFAULT encode(extensions.gen_random_bytes(32), 'hex'),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.action_calendar ENABLE ROW LEVEL SECURITY;

-- Create policies for action_calendar
CREATE POLICY "Users can view their own actions" 
  ON public.action_calendar 
  FOR SELECT 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own actions" 
  ON public.action_calendar 
  FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own actions" 
  ON public.action_calendar 
  FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own actions" 
  ON public.action_calendar 
  FOR DELETE 
  USING (auth.uid() = user_id);

-- Create policy for public actions (shared via token)
CREATE POLICY "Anyone can view public actions via share token" 
  ON public.action_calendar 
  FOR SELECT 
  USING (is_public = true);

-- Create trigger to update updated_at
CREATE OR REPLACE FUNCTION update_action_calendar_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_action_calendar_updated_at_trigger
  BEFORE UPDATE ON public.action_calendar
  FOR EACH ROW
  EXECUTE FUNCTION update_action_calendar_updated_at();
