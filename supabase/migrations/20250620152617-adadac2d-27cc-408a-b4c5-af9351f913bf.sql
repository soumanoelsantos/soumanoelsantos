
-- Add missing columns to dashboard_configs table for sharing functionality
ALTER TABLE dashboard_configs 
ADD COLUMN IF NOT EXISTS share_token text,
ADD COLUMN IF NOT EXISTS is_public boolean DEFAULT false;

-- Create unique index for share_token to ensure uniqueness
CREATE UNIQUE INDEX IF NOT EXISTS idx_dashboard_configs_share_token 
ON dashboard_configs(share_token) 
WHERE share_token IS NOT NULL;
