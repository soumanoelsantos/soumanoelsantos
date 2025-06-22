
-- Verificar se a tabela seller_individual_sales tem a coluna client_name
-- e se precisamos adicionar relacionamento com a tabela seller_daily_performance

-- Verificar estrutura atual
SELECT column_name, data_type, is_nullable, column_default 
FROM information_schema.columns 
WHERE table_name = 'seller_individual_sales' 
AND table_schema = 'public';

-- Verificar se temos dados de vendas individuais
SELECT COUNT(*) as total_individual_sales FROM public.seller_individual_sales;

-- Verificar relacionamento entre as tabelas
SELECT 
  sdp.id as performance_id,
  sdp.date,
  sdp.seller_id,
  sis.client_name,
  sis.product_id,
  sis.revenue_amount,
  sis.billing_amount
FROM public.seller_daily_performance sdp
LEFT JOIN public.seller_individual_sales sis ON sdp.id = sis.performance_id
LIMIT 5;
