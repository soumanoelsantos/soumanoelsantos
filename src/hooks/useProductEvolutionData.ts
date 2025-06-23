
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

export const useProductEvolutionData = (productId: string) => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [revenueData, setRevenueData] = useState<EvolutionDataPoint[]>([]);
  const [billingData, setBillingData] = useState<EvolutionDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProductEvolutionData = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 [DEBUG] Buscando dados de evolução para produto:', productId);

      if (!userId || !productId) {
        console.log('❌ [DEBUG] Nenhum userId ou productId disponível');
        setIsLoading(false);
        return;
      }

      // Buscar meta específica do produto
      const { data: productGoal, error: goalError } = await supabase
        .from('product_goals')
        .select('revenue_goal, billing_goal, quantity_goal')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .eq('is_active', true)
        .single();

      if (goalError) {
        console.error('❌ [DEBUG] Erro ao buscar meta do produto:', goalError);
        throw goalError;
      }

      if (!productGoal) {
        console.log('❌ [DEBUG] Nenhuma meta encontrada para o produto');
        setRevenueData([]);
        setBillingData([]);
        setIsLoading(false);
        return;
      }

      const revenueGoal = productGoal.revenue_goal || 0;
      const billingGoal = productGoal.billing_goal || 0;
      const quantityGoal = productGoal.quantity_goal || 0;

      console.log('📊 [DEBUG] Meta do produto:', {
        revenueGoal,
        billingGoal,
        quantityGoal
      });

      // Buscar vendas específicas do produto
      const { data: productSales, error: salesError } = await supabase
        .from('seller_individual_sales')
        .select(`
          revenue_amount,
          billing_amount,
          seller_daily_performance!inner(date)
        `)
        .eq('product_id', productId)
        .order('seller_daily_performance(date)', { ascending: true });

      if (salesError) {
        console.error('❌ [DEBUG] Erro ao buscar vendas do produto:', salesError);
        throw salesError;
      }

      console.log('📊 [DEBUG] Vendas do produto encontradas:', productSales?.length || 0);

      if (!productSales || productSales.length === 0) {
        // Se não há vendas, criar dados apenas com as metas
        const revenueEvolutionData: EvolutionDataPoint[] = [];
        const billingEvolutionData: EvolutionDataPoint[] = [];
        
        // Criar dados até completar a meta + uma semana
        const totalDaysNeeded = quantityGoal + 7;
        
        for (let i = 0; i < totalDaysNeeded; i++) {
          const dayStr = (i + 1).toString();
          
          // Meta cresce linearmente até o valor final no dia da meta
          const progressRatio = Math.min((i + 1) / quantityGoal, 1);
          const dailyRevenueGoal = revenueGoal * progressRatio;
          const dailyBillingGoal = billingGoal * progressRatio;
          
          revenueEvolutionData.push({
            day: dayStr,
            metaReceita: dailyRevenueGoal,
            receita: null,
            superMetaReceita: revenueGoal * 3,
            hiperMetaReceita: revenueGoal * 5,
            metaFaturamento: 0,
            faturamento: 0
          });

          billingEvolutionData.push({
            day: dayStr,
            metaFaturamento: dailyBillingGoal,
            faturamento: null,
            superMetaFaturamento: billingGoal * 2.5,
            hiperMetaFaturamento: billingGoal * 4,
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
      
      productSales.forEach(sale => {
        const dateStr = sale.seller_daily_performance.date;
        const existing = salesByDay.get(dateStr) || { revenue: 0, billing: 0, count: 0 };
        salesByDay.set(dateStr, {
          revenue: existing.revenue + (sale.revenue_amount || 0),
          billing: existing.billing + (sale.billing_amount || 0),
          count: existing.count + 1
        });
      });

      // Ordenar as datas
      const sortedDates = Array.from(salesByDay.keys()).sort();
      const firstSaleDate = sortedDates[0];
      const today = new Date().toISOString().split('T')[0];

      console.log('📊 [DEBUG] Primeira venda do produto:', firstSaleDate, 'Hoje:', today);

      const revenueEvolutionData: EvolutionDataPoint[] = [];
      const billingEvolutionData: EvolutionDataPoint[] = [];

      let accumulatedRevenue = 0;
      let accumulatedBilling = 0;

      // Criar data inicial
      const startDate = new Date(firstSaleDate);
      
      // Processar dados até completar a meta + uma semana a frente
      const totalDaysNeeded = quantityGoal + 7;

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
        }

        // Meta cresce linearmente até o valor final no dia da meta
        const progressRatio = Math.min((i + 1) / quantityGoal, 1);
        const dailyRevenueGoal = revenueGoal * progressRatio;
        const dailyBillingGoal = billingGoal * progressRatio;

        revenueEvolutionData.push({
          day: dayStr,
          metaReceita: dailyRevenueGoal,
          receita: dateStr <= today ? accumulatedRevenue : null,
          superMetaReceita: revenueGoal * 3,
          hiperMetaReceita: revenueGoal * 5,
          metaFaturamento: 0,
          faturamento: 0
        });

        billingEvolutionData.push({
          day: dayStr,
          metaFaturamento: dailyBillingGoal,
          faturamento: dateStr <= today ? accumulatedBilling : null,
          superMetaFaturamento: billingGoal * 2.5,
          hiperMetaFaturamento: billingGoal * 4,
          metaReceita: 0,
          receita: 0
        });
      }

      console.log('✅ [DEBUG] Dados de evolução do produto processados:', {
        revenueData: revenueEvolutionData.length,
        billingData: billingEvolutionData.length,
        revenueGoal,
        billingGoal,
        quantityGoal,
        firstSaleDate,
        totalDaysNeeded,
        finalRevenueGoal: revenueEvolutionData[quantityGoal - 1]?.metaReceita,
        finalBillingGoal: billingEvolutionData[quantityGoal - 1]?.metaFaturamento
      });

      setRevenueData(revenueEvolutionData);
      setBillingData(billingEvolutionData);

    } catch (error) {
      console.error('💥 [DEBUG] Erro ao carregar dados de evolução do produto:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de evolução do produto",
        variant: "destructive",
      });
      
      setRevenueData([]);
      setBillingData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProductEvolutionData();
  }, [userId, productId]);

  return {
    revenueData,
    billingData,
    isLoading,
    refetch: fetchProductEvolutionData
  };
};
