
-- Adicionar campo para armazenar IDs das metas selecionadas
ALTER TABLE dashboard_configs 
ADD COLUMN IF NOT EXISTS show_specific_goals boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS selected_goal_ids jsonb DEFAULT '[]'::jsonb;
