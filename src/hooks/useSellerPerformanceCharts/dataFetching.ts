
import { supabase } from '@/integrations/supabase/client';

export const fetchSellersData = async (userId: string) => {
  console.log('🔍 [DEBUG] useSellerPerformanceCharts - Buscando dados de performance dos vendedores para userId:', userId);

  // Buscar vendedores ativos do usuário (tipo closer)
  const { data: sellersData, error: sellersError } = await supabase
    .from('sellers')
    .select('id, name, seller_type')
    .eq('user_id', userId)
    .eq('is_active', true)
    .in('seller_type', ['closer', 'vendedor_interno'])
    .order('name');

  if (sellersError) {
    console.error('❌ [DEBUG] useSellerPerformanceCharts - Erro ao buscar vendedores:', sellersError);
    throw sellersError;
  }

  console.log('✅ [DEBUG] useSellerPerformanceCharts - Vendedores encontrados:', sellersData?.length || 0, sellersData);
  
  return sellersData;
};

export const fetchPerformanceData = async (sellerIds: string[], startDateStr: string, endDateStr: string) => {
  console.log('📅 [DEBUG] useSellerPerformanceCharts - Período de busca:', { startDateStr, endDateStr });

  // Buscar todas as performances dos vendedores no período
  const { data: performanceData, error: performanceError } = await supabase
    .from('seller_daily_performance')
    .select(`
      seller_id, 
      date, 
      revenue_amount, 
      billing_amount,
      sellers!inner(id, name, user_id)
    `)
    .in('seller_id', sellerIds)
    .gte('date', startDateStr)
    .lte('date', endDateStr)
    .order('date', { ascending: true });

  if (performanceError) {
    console.error('❌ [DEBUG] useSellerPerformanceCharts - Erro ao buscar performance:', performanceError);
    throw performanceError;
  }

  console.log('✅ [DEBUG] useSellerPerformanceCharts - Dados de performance encontrados:', performanceData?.length || 0);
  console.log('🔍 [DEBUG] useSellerPerformanceCharts - Sample performance data:', performanceData?.slice(0, 5));

  return performanceData;
};
