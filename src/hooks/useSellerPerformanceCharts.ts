
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SellerChartDataPoint {
  day: string;
  seller1: number;
  seller2: number;
  seller3: number;
  media: number;
}

export const useSellerPerformanceCharts = () => {
  const { toast } = useToast();
  const [revenueData, setRevenueData] = useState<SellerChartDataPoint[]>([]);
  const [billingData, setBillingData] = useState<SellerChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSellerPerformanceData = async () => {
    try {
      setIsLoading(true);
      console.log('🔍 [DEBUG] Buscando dados de performance dos vendedores para gráficos');

      // Buscar dados de performance dos vendedores do mês atual
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const currentDay = currentDate.getDate();
      const startOfMonth = `${year}-${month.toString().padStart(2, '0')}-01`;
      const endOfMonth = new Date(year, month, 0).toISOString().split('T')[0];

      // Buscar vendedores ativos
      const { data: sellersData, error: sellersError } = await supabase
        .from('sellers')
        .select('id, name')
        .eq('is_active', true)
        .limit(3);

      if (sellersError) {
        console.error('❌ [DEBUG] Erro ao buscar vendedores:', sellersError);
        throw sellersError;
      }

      // Buscar performances dos vendedores
      const { data: performanceData, error: performanceError } = await supabase
        .from('seller_daily_performance')
        .select('seller_id, date, revenue_amount, billing_amount')
        .gte('date', startOfMonth)
        .lte('date', endOfMonth)
        .order('date', { ascending: true });

      if (performanceError) {
        console.error('❌ [DEBUG] Erro ao buscar performance:', performanceError);
        throw performanceError;
      }

      // Processar dados para os gráficos
      const daysInMonth = new Date(year, month, 0).getDate();
      const revenueChartData: SellerChartDataPoint[] = [];
      const billingChartData: SellerChartDataPoint[] = [];

      // Agrupar performances por vendedor e data
      const performanceBySellerAndDate = new Map<string, Map<string, { revenue: number; billing: number }>>();
      
      performanceData?.forEach(perf => {
        if (!performanceBySellerAndDate.has(perf.seller_id)) {
          performanceBySellerAndDate.set(perf.seller_id, new Map());
        }
        const sellerMap = performanceBySellerAndDate.get(perf.seller_id)!;
        sellerMap.set(perf.date, {
          revenue: perf.revenue_amount || 0,
          billing: perf.billing_amount || 0
        });
      });

      // Calcular acumulados para cada dia
      for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = day.toString().padStart(2, '0');
        const dateStr = `${year}-${month.toString().padStart(2, '0')}-${dayStr}`;
        
        // Calcular acumulados até este dia para cada vendedor
        let seller1Revenue = 0;
        let seller1Billing = 0;
        let seller2Revenue = 0;
        let seller2Billing = 0;
        let seller3Revenue = 0;
        let seller3Billing = 0;

        // Se temos vendedores cadastrados, usar os dados reais
        if (sellersData && sellersData.length > 0) {
          for (let d = 1; d <= day; d++) {
            const dayDate = `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
            
            sellersData.forEach((seller, index) => {
              const sellerPerf = performanceBySellerAndDate.get(seller.id)?.get(dayDate);
              if (sellerPerf) {
                if (index === 0) {
                  seller1Revenue += sellerPerf.revenue;
                  seller1Billing += sellerPerf.billing;
                } else if (index === 1) {
                  seller2Revenue += sellerPerf.revenue;
                  seller2Billing += sellerPerf.billing;
                } else if (index === 2) {
                  seller3Revenue += sellerPerf.revenue;
                  seller3Billing += sellerPerf.billing;
                }
              }
            });
          }
        } else {
          // Dados de exemplo se não há vendedores cadastrados
          const baseRevenue = 2000;
          const baseBilling = 8000;
          
          seller1Revenue = baseRevenue * day * 1.8; // Michelle - melhor performance
          seller2Revenue = baseRevenue * day * 1.2; // Fabricio - performance média
          seller3Revenue = baseRevenue * day * 0.4; // Leandro - menor performance
          
          seller1Billing = baseBilling * day * 2.0;
          seller2Billing = baseBilling * day * 0.8;
          seller3Billing = baseBilling * day * 0.2;
        }

        // Calcular média
        const revenueMedia = (seller1Revenue + seller2Revenue + seller3Revenue) / 3;
        const billingMedia = (seller1Billing + seller2Billing + seller3Billing) / 3;

        revenueChartData.push({
          day: dayStr,
          seller1: seller1Revenue,
          seller2: seller2Revenue,
          seller3: seller3Revenue,
          media: revenueMedia
        });

        billingChartData.push({
          day: dayStr,
          seller1: seller1Billing,
          seller2: seller2Billing,
          seller3: seller3Billing,
          media: billingMedia
        });
      }

      console.log('✅ [DEBUG] Dados de gráficos de vendedores processados:', {
        revenueData: revenueChartData.length,
        billingData: billingChartData.length,
        sellersCount: sellersData?.length || 0
      });

      setRevenueData(revenueChartData);
      setBillingData(billingChartData);

    } catch (error) {
      console.error('💥 [DEBUG] Erro ao carregar dados de performance dos vendedores:', error);
      toast({
        title: "Erro",
        description: "Não foi possível carregar os dados de performance dos vendedores",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchSellerPerformanceData();
  }, []);

  return {
    revenueData,
    billingData,
    isLoading,
    refetch: fetchSellerPerformanceData
  };
};
