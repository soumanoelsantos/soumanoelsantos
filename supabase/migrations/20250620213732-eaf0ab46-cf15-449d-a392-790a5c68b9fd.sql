
-- Remove a constraint atual que é muito restritiva
ALTER TABLE monthly_goals DROP CONSTRAINT IF EXISTS monthly_goals_user_id_month_year_product_id_goal_type_targe_key;

-- Adiciona uma nova constraint que permite diferentes financial_category para o mesmo produto
ALTER TABLE monthly_goals ADD CONSTRAINT monthly_goals_unique_constraint 
UNIQUE (user_id, month, year, product_id, goal_type, target_type, financial_category);
