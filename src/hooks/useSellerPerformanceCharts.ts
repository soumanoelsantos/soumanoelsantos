
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/hooks/useAuth';

interface SellerChartDataPoint {
  day: string;
  [key: string]: string | number; // Para permitir nomes dinâmicos de vendedores
  media: number;
}

export const useSellerPerformanceCharts = () => {
  const { toast } = useToast();
  const { userId } = useAuth();
  const [revenueData, setRevenueData] = useState<SellerChartDataPoint[]>([]);
  const [billingData, setBillingData] = useState<SellerChartDataPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [sellerNames, setSellerNames] = useState<string[]>([]);

  const fetchSellerPerformanceData = async () => {
    if (!userId) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      console.log('🔍 [DEBUG] Buscando dados de performance dos vendedores para gráficos');

      // Buscar vendedores ativos do usuário
      const { data: sellersData, error: sellersError } = await supabase
        .from('sellers')
        .select('id, name')
        .eq('user_id', userId)
        .eq('is_active', true)
        .order('name');

      if (sellersError) {
        console.error('❌ [DEBUG] Erro ao buscar vendedores:', sellersError);
        throw sellersError;
      }

      console.log('✅ [DEBUG] Vendedores encontrados:', sellersData);

      // Se não há vendedores, usar dados de exemplo
      if (!sellersData || sellersData.length === 0) {
        console.log('⚠️ [DEBUG] Nenhum vendedor encontrado, usando dados de exemplo');
        generateExampleData();
        return;
      }

      // Extrair nomes dos vendedores
      const names = sellersData.map(seller => seller.name);
      setSellerNames(names);

      // Buscar dados de performance dos vendedores do mês atual
      const currentDate = new Date();
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth() + 1;
      const startOfMonth = `${year}-${month.toString().padStart(2, '0')}-01`;
      const endOfMonth = new Date(year, month, 0).toISOString().split('T')[0];

      const { data: performanceData, error: performanceError } = await supabase
        .from('seller_daily_performance')
        .select('seller_id, date, revenue_amount, billing_amount')
        .in('seller_id', sellersData.map(s => s.id))
        .gte('date', startOfMonth)
        .lte('date', endOfMonth)
        .order('date', { ascending: true });

      if (performanceError) {
        console.error('❌ [DEBUG] Erro ao buscar performance:', performanceError);
        throw performanceError;
      }

      console.log('✅ [DEBUG] Dados de performance encontrados:', performanceData);

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

      // Criar mapa de ID para nome do vendedor
      const sellerIdToName = new Map<string, string>();
      sellersData.forEach(seller => {
        sellerIdToName.set(seller.id, seller.name);
      });

      // Calcular acumulados para cada dia
      for (let day = 1; day <= daysInMonth; day++) {
        const dayStr = day.toString().padStart(2, '0');
        
        // Inicializar dados do dia
        const revenueDataPoint: SellerChartDataPoint = { day: dayStr, media: 0 };
        const billingDataPoint: SellerChartDataPoint = { day: dayStr, media: 0 };

        let totalRevenue = 0;
        let totalBilling = 0;

        // Calcular acumulados até este dia para cada vendedor
        sellersData.forEach(seller => {
          let sellerRevenue = 0;
          let sellerBilling = 0;

          for (let d = 1; d <= day; d++) {
            const dayDate = `${year}-${month.toString().padStart(2, '0')}-${d.toString().padStart(2, '0')}`;
            const sellerPerf = performanceBySellerAndDate.get(seller.id)?.get(dayDate);
            
            if (sellerPerf) {
              sellerRevenue += sellerPerf.revenue;
              sellerBilling += sellerPerf.billing;
            }
          }

          // Usar o nome real do vendedor como chave
          revenueDataPoint[seller.name] = sellerRevenue;
          billingDataPoint[seller.name] = sellerBilling;

          totalRevenue += sellerRevenue;
          totalBilling += sellerBilling;
        });

        // Calcular média
        const sellerCount = sellersData.length;
        revenueDataPoint.media = sellerCount > 0 ? totalRevenue / sellerCount : 0;
        billingDataPoint.media = sellerCount > 0 ? totalBilling / sellerCount : 0;

        revenueChartData.push(revenueDataPoint);
        billingChartData.push(billingDataPoint);
      }

      console.log('✅ [DEBUG] Dados de gráficos processados com nomes reais:', {
        revenueData: revenueChartData.length,
        billingData: billingChartData.length,
        sellerNames: names
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
      
      // Em caso de erro, usar dados de exemplo
      generateExampleData();
    } finally {
      setIsLoading(false);
    }
  };

  const generateExampleData = () => {
    const currentDate = new Date();
    const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
    const exampleNames = ['Michelle Silva', 'Fabricio Costa', 'Leandro Santos'];
    setSellerNames(exampleNames);

    const revenueChartData: SellerChartDataPoint[] = [];
    const billingChartData: SellerChartDataPoint[] = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStr = day.toString().padStart(2, '0');
      const baseRevenue = 2000;
      const baseBilling = 8000;
      
      const michelle_revenue = baseRevenue * day * 1.8;
      const fabricio_revenue = baseRevenue * day * 1.2;
      const leandro_revenue = baseRevenue * day * 0.4;
      
      const michelle_billing = baseBilling * day * 2.0;
      const fabricio_billing = baseBilling * day * 0.8;
      const leandro_billing = baseBilling * day * 0.2;

      const revenueMedia = (michelle_revenue + fabricio_revenue + leandro_revenue) / 3;
      const billingMedia = (michelle_billing + fabricio_billing + leandro_billing) / 3;

      revenueChartData.push({
        day: dayStr,
        'Michelle Silva': michelle_revenue,
        'Fabricio Costa': fabricio_revenue,
        'Leandro Santos': leandro_revenue,
        media: revenueMedia
      });

      billingChartData.push({
        day: dayStr,
        'Michelle Silva': michelle_billing,
        'Fabricio Costa': fabricio_billing,
        'Leandro Santos': leandro_billing,
        media: billingMedia
      });
    }

    setRevenueData(revenueChartData);
    setBillingData(billingChartData);
  };

  useEffect(() => {
    fetchSellerPerformanceData();
  }, [userId]);

  return {
    revenueData,
    billingData,
    sellerNames,
    isLoading,
    refetch: fetchSellerPerformanceData
  };
};
