
-- Add is_percentage column to goal_types table
ALTER TABLE public.goal_types 
ADD COLUMN IF NOT EXISTS is_percentage boolean DEFAULT false;

-- Update existing records to have default value
UPDATE public.goal_types 
SET is_percentage = false 
WHERE is_percentage IS NULL;
