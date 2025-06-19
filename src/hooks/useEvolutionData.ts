
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface EvolutionDataPoint {
  day: string;
  metaReceita: number;
  receita: number | null;
  receitaProjection?: number;
  superMetaReceita?: number;
  hiperMetaReceita?: number;
  metaFaturamento: number;
  faturamento: number | null;
  faturamentoProjection?: number;
  superMetaFaturamento?: number;
  hiperMetaFaturamento?: number;
}

export const useEvolutionData = () => {
  const { toast } = useToast();
  const [revenueData, setRevenueData] = useState<EvolutionDataPoint[]>([]);
  const [billingData, setBillingData] = useState<EvolutionDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchEvolutionData = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 [DEBUG] Buscando dados de evolução dos vendedores');

      // Buscar dados de performance dos vendedores do mês atual
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      const startOfMonth = `${year}-${month.toString().padStart(2, '0')}-01`;
      const endOfMonth = new Date(year, month, 0).toISOString().split('T')[0];

      const { data: performanceData, error: performanceError } = await supabase
        .from('seller_daily_performance')
        .select('date, revenue_amount, billing_amount')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth)
        .order('date', { ascending: true });

      if (performanceError) {
        console.error('❌ [DEBUG] Erro ao buscar performance:', performanceError);
        throw performanceError;
      }

      // Buscar metas dos vendedores
      const { data: goalsData, error: goalsError } = await supabase
        .from('seller_monthly_goals')
        .select('revenue_goal, billing_goal')
        .eq('month', month)
        .eq('year', year);

      if (goalsError) {
        console.error('❌ [DEBUG] Erro ao buscar metas:', goalsError);
        throw goalsError;
      }

      // Calcular totais de metas
      const totalRevenueGoal = goalsData?.reduce((acc, goal) => acc + (goal.revenue_goal || 0), 0) || 60000;
      const totalBillingGoal = goalsData?.reduce((acc, goal) => acc + (goal.billing_goal || 0), 0) || 200000;

      // Processar dados para o gráfico
      const daysInMonth = new Date(year, month, 0).getDate();
      const dailyRevenueGoal = totalRevenueGoal / daysInMonth;
      const dailyBillingGoal = totalBillingGoal / daysInMonth;

      const revenueEvolutionData: EvolutionDataPoint[] = [];
      const billingEvolutionData: EvolutionDataPoint[] = [];

      // Agrupar performances por dia e calcular acumulado
      const performanceByDay = new Map<string, { revenue: number; billing: number }>();
      
      performanceData?.forEach(perf => {
        const existing = performanceByDay.get(perf.date) || { revenue: 0, billing: 0 };
        performanceByDay.set(perf.date, {
          revenue: existing.revenue + (perf.revenue_amount || 0),
          billing: existing.billing + (perf.billing_amount || 0)
        });
      });

      let accumulatedRevenue = 0;
      let accumulatedBilling = 0;

      for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = day.toString().padStart(2, '0');
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${dayStr}`;
        
        const dayPerformance = performanceByDay.get(dateStr) || { revenue: 0, billing: 0 };
        
        // Só acumular se for até o dia atual ou antes
        if (day <= currentDay) {
          accumulatedRevenue += dayPerformance.revenue;
          accumulatedBilling += dayPerformance.billing;
        }

        const metaReceitaDiaria = dailyRevenueGoal * day;
        const metaFaturamentoDiaria = dailyBillingGoal * day;

        // Calcular projeção baseada na tendência dos últimos dados
        let receitaProjection = null;
        let faturamentoProjection = null;
        
        if (day > currentDay && currentDay > 1) {
          const dailyAverageRevenue = accumulatedRevenue / currentDay;
          const dailyAverageBilling = accumulatedBilling / currentDay;
          
          receitaProjection = accumulatedRevenue + (dailyAverageRevenue * (day - currentDay));
          faturamentoProjection = accumulatedBilling + (dailyAverageBilling * (day - currentDay));
        }

        revenueEvolutionData.push({
          day: dayStr,
          metaReceita: metaReceitaDiaria,
          receita: day <= currentDay ? accumulatedRevenue : null,
          receitaProjection: receitaProjection,
          superMetaReceita: metaReceitaDiaria * 3,
          hiperMetaReceita: metaReceitaDiaria * 5,
          metaFaturamento: 0,
          faturamento: 0
        });

        billingEvolutionData.push({
          day: dayStr,
          metaFaturamento: metaFaturamentoDiaria,
          faturamento: day <= currentDay ? accumulatedBilling : null,
          faturamentoProjection: faturamentoProjection,
          superMetaFaturamento: metaFaturamentoDiaria * 2.5,
          hiperMetaFaturamento: metaFaturamentoDiaria * 4,
          metaReceita: 0,
          receita: null
        });
      }

      console.log('✅ [DEBUG] Dados de evolução processados:', {
        revenueData: revenueEvolutionData.length,
        billingData: billingEvolutionData.length,
        currentDay
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
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchEvolutionData();
  }, []);

  return {
    revenueData,
    billingData,
    isLoading,
    refetch: fetchEvolutionData
  };
};
