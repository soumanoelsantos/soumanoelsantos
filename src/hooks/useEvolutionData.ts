
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface EvolutionDataPoint {
  day: string;
  metaReceita: number;
  receita: number | null;
  superMetaReceita?: number;
  hiperMetaReceita?: number;
  metaFaturamento: number;
  faturamento: number | null;
  superMetaFaturamento?: number;
  hiperMetaFaturamento?: number;
}

export const useEvolutionData = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [revenueData, setRevenueData] = useState<EvolutionDataPoint[]>([]);
  const [billingData, setBillingData] = useState<EvolutionDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvolutionData = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 [DEBUG] Buscando dados de evolução dos produtos');

      if (!userId) {
        console.log('❌ [DEBUG] Nenhum userId disponível');
        setIsLoading(false);
        return;
      }

      // Buscar metas dos produtos ativos
      const { data: productGoals, error: goalsError } = await supabase
        .from('product_goals')
        .select('revenue_goal, billing_goal, quantity_goal')
        .eq('user_id', userId)
        .eq('is_active', true);

      if (goalsError) {
        console.error('❌ [DEBUG] Erro ao buscar metas dos produtos:', goalsError);
        throw goalsError;
      }

      console.log('📊 [DEBUG] Metas dos produtos encontradas:', productGoals);

      // Calcular totais das metas
      const totalRevenueGoal = productGoals?.reduce((acc, goal) => acc + (goal.revenue_goal || 0), 0) || 0;
      const totalBillingGoal = productGoals?.reduce((acc, goal) => acc + (goal.billing_goal || 0), 0) || 0;
      const totalQuantityGoal = productGoals?.reduce((acc, goal) => acc + (goal.quantity_goal || 0), 0) || 0;

      console.log('📊 [DEBUG] Totais calculados:', {
        totalRevenueGoal,
        totalBillingGoal,
        totalQuantityGoal
      });

      // Buscar TODAS as vendas dos produtos com suas datas
      const { data: performanceData, error: performanceError } = await supabase
        .from('seller_individual_sales')
        .select(`
          revenue_amount,
          billing_amount,
          seller_daily_performance!inner(date)
        `)
        .order('seller_daily_performance(date)', { ascending: true });

      if (performanceError) {
        console.error('❌ [DEBUG] Erro ao buscar performance:', performanceError);
        throw performanceError;
      }

      console.log('📊 [DEBUG] Dados de performance encontrados:', performanceData?.length || 0);

      if (!performanceData || performanceData.length === 0) {
        // Se não há vendas, criar dados apenas com as metas
        const revenueEvolutionData: EvolutionDataPoint[] = [];
        const billingEvolutionData: EvolutionDataPoint[] = [];
        
        // Criar dados até completar a meta + uma semana
        const totalDaysNeeded = totalQuantityGoal + 7;
        
        for (let i = 0; i < totalDaysNeeded; i++) {
          const dayStr = (i + 1).toString();
          
          // Meta acumulativa: valor proporcional ao dia atual
          const dailyRevenueGoal = (totalRevenueGoal / totalDaysNeeded) * (i + 1);
          const dailyBillingGoal = (totalBillingGoal / totalDaysNeeded) * (i + 1);
          
          revenueEvolutionData.push({
            day: dayStr,
            metaReceita: dailyRevenueGoal, // VALOR ACUMULATIVO
            receita: null,
            superMetaReceita: totalRevenueGoal * 3,
            hiperMetaReceita: totalRevenueGoal * 5,
            metaFaturamento: 0,
            faturamento: 0
          });

          billingEvolutionData.push({
            day: dayStr,
            metaFaturamento: dailyBillingGoal, // VALOR ACUMULATIVO
            faturamento: null,
            superMetaFaturamento: totalBillingGoal * 2.5,
            hiperMetaFaturamento: totalBillingGoal * 4,
            metaReceita: 0,
            receita: 0
          });
        }
        
        setRevenueData(revenueEvolutionData);
        setBillingData(billingEvolutionData);
        setIsLoading(false);
        return;
      }

      // Agrupar vendas por dia e calcular acumulado
      const salesByDay = new Map<string, { revenue: number; billing: number; count: number }>();
      
      performanceData.forEach(perf => {
        const dateStr = perf.seller_daily_performance.date;
        const existing = salesByDay.get(dateStr) || { revenue: 0, billing: 0, count: 0 };
        salesByDay.set(dateStr, {
          revenue: existing.revenue + (perf.revenue_amount || 0),
          billing: existing.billing + (perf.billing_amount || 0),
          count: existing.count + 1
        });
      });

      // Ordenar as datas
      const sortedDates = Array.from(salesByDay.keys()).sort();
      const firstSaleDate = sortedDates[0];
      const today = new Date().toISOString().split('T')[0];

      console.log('📊 [DEBUG] Primeira venda:', firstSaleDate, 'Hoje:', today);

      const revenueEvolutionData: EvolutionDataPoint[] = [];
      const billingEvolutionData: EvolutionDataPoint[] = [];

      let accumulatedRevenue = 0;
      let accumulatedBilling = 0;
      let accumulatedSales = 0;

      // Criar data inicial
      const startDate = new Date(firstSaleDate);
      
      // Processar dados até completar a meta + uma semana a frente
      const totalDaysNeeded = totalQuantityGoal + 7;

      for (let i = 0; i < totalDaysNeeded; i++) {
        const currentDateIter = new Date(startDate);
        currentDateIter.setDate(startDate.getDate() + i);
        const dateStr = currentDateIter.toISOString().split('T')[0];
        
        const dayStr = (i + 1).toString();
        const dayData = salesByDay.get(dateStr);
        
        // Se há vendas neste dia e não passou do dia atual, acumular
        if (dayData && dateStr <= today) {
          accumulatedRevenue += dayData.revenue;
          accumulatedBilling += dayData.billing;
          accumulatedSales += dayData.count;
        }

        // Meta acumulativa: valor proporcional ao dia atual
        const dailyRevenueGoal = (totalRevenueGoal / totalDaysNeeded) * (i + 1);
        const dailyBillingGoal = (totalBillingGoal / totalDaysNeeded) * (i + 1);

        revenueEvolutionData.push({
          day: dayStr,
          metaReceita: dailyRevenueGoal, // META ACUMULATIVA - cresce diariamente
          receita: dateStr <= today ? accumulatedRevenue : null,
          superMetaReceita: totalRevenueGoal * 3,
          hiperMetaReceita: totalRevenueGoal * 5,
          metaFaturamento: 0,
          faturamento: 0
        });

        billingEvolutionData.push({
          day: dayStr,
          metaFaturamento: dailyBillingGoal, // META ACUMULATIVA - cresce diariamente
          faturamento: dateStr <= today ? accumulatedBilling : null,
          superMetaFaturamento: totalBillingGoal * 2.5,
          hiperMetaFaturamento: totalBillingGoal * 4,
          metaReceita: 0,
          receita: 0
        });
      }

      console.log('✅ [DEBUG] Dados de evolução processados:', {
        revenueData: revenueEvolutionData.length,
        billingData: billingEvolutionData.length,
        totalRevenueGoal,
        totalBillingGoal,
        totalQuantityGoal,
        firstSaleDate,
        accumulatedSales,
        sampleRevenueData: revenueEvolutionData.slice(-3),
        sampleBillingData: billingEvolutionData.slice(-3)
      });

      setRevenueData(revenueEvolutionData);
      setBillingData(billingEvolutionData);

    } catch (error) {
      console.error('💥 [DEBUG] Erro ao carregar dados de evolução:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de evolução",
        variant: "destructive",
      });
      
      // Em caso de erro, usar dados vazios
      setRevenueData([]);
      setBillingData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvolutionData();
  }, [userId]);

  return {
    revenueData,
    billingData,
    isLoading,
    refetch: fetchEvolutionData
  };
};
