
-- Criar a política que permite acesso público às ações marcadas como públicas
DROP POLICY IF EXISTS "Public actions are viewable by everyone" ON public.action_calendar;
CREATE POLICY "Public actions are viewable by everyone"
  ON public.action_calendar
  FOR SELECT
  USING (is_public = true);

-- Também permitir acesso público às configurações do dashboard quando is_public = true
DROP POLICY IF EXISTS "Public dashboard configs are viewable" ON public.dashboard_configs;
CREATE POLICY "Public dashboard configs are viewable"
  ON public.dashboard_configs
  FOR SELECT
  USING (is_public = true);
