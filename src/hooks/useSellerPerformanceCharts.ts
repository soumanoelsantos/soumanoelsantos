
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
      console.log('❌ [DEBUG] useSellerPerformanceCharts - No userId available');
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
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

      if (!sellersData || sellersData.length === 0) {
        console.log('⚠️ [DEBUG] useSellerPerformanceCharts - Nenhum vendedor encontrado, usando dados de exemplo');
        generateExampleData();
        return;
      }

      // Extrair nomes dos vendedores
      const names = sellersData.map(seller => seller.name);
      setSellerNames(names);
      console.log('📊 [DEBUG] useSellerPerformanceCharts - Nomes dos vendedores:', names);

      // Buscar dados de performance dos últimos 30 dias
      const currentDate = new Date();
      const startDate = new Date();
      startDate.setDate(currentDate.getDate() - 30);
      
      const startDateStr = startDate.toISOString().split('T')[0];
      const endDateStr = currentDate.toISOString().split('T')[0];

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
        .in('seller_id', sellersData.map(s => s.id))
        .gte('date', startDateStr)
        .lte('date', endDateStr)
        .order('date', { ascending: true });

      if (performanceError) {
        console.error('❌ [DEBUG] useSellerPerformanceCharts - Erro ao buscar performance:', performanceError);
        throw performanceError;
      }

      console.log('✅ [DEBUG] useSellerPerformanceCharts - Dados de performance encontrados:', performanceData?.length || 0);
      console.log('🔍 [DEBUG] useSellerPerformanceCharts - Sample performance data:', performanceData?.slice(0, 5));

      // Processar dados para os gráficos (acumulado diário)
      const revenueChartData: SellerChartDataPoint[] = [];
      const billingChartData: SellerChartDataPoint[] = [];

      // Criar mapa de vendedor por ID
      const sellerMap = new Map<string, string>();
      sellersData.forEach(seller => {
        sellerMap.set(seller.id, seller.name);
      });

      // Agrupar performances por data
      const performanceByDate = new Map<string, Map<string, { revenue: number; billing: number }>>();
      
      performanceData?.forEach(perf => {
        const date = perf.date;
        if (!performanceByDate.has(date)) {
          performanceByDate.set(date, new Map());
        }
        const dateMap = performanceByDate.get(date)!;
        dateMap.set(perf.seller_id, {
          revenue: Number(perf.revenue_amount) || 0,
          billing: Number(perf.billing_amount) || 0
        });
      });

      console.log('📊 [DEBUG] useSellerPerformanceCharts - Performance agrupada por data:', performanceByDate.size);

      // Gerar dados para cada dia dos últimos 30 dias
      for (let i = 0; i <= 30; i++) {
        const date = new Date();
        date.setDate(currentDate.getDate() - (30 - i));
        const dateStr = date.toISOString().split('T')[0];
        const dayStr = date.getDate().toString().padStart(2, '0');
        
        // Inicializar dados do dia
        const revenueDataPoint: SellerChartDataPoint = { day: dayStr, media: 0 };
        const billingDataPoint: SellerChartDataPoint = { day: dayStr, media: 0 };

        let totalRevenue = 0;
        let totalBilling = 0;
        let activeSellers = 0;

        // Calcular acumulados até este dia para cada vendedor
        sellersData.forEach(seller => {
          let sellerRevenue = 0;
          let sellerBilling = 0;

          // Somar todas as performances até esta data
          for (let j = 0; j <= i; j++) {
            const checkDate = new Date();
            checkDate.setDate(currentDate.getDate() - (30 - j));
            const checkDateStr = checkDate.toISOString().split('T')[0];
            
            const datePerformances = performanceByDate.get(checkDateStr);
            if (datePerformances && datePerformances.has(seller.id)) {
              const perf = datePerformances.get(seller.id)!;
              sellerRevenue += perf.revenue;
              sellerBilling += perf.billing;
            }
          }

          // Usar o nome real do vendedor como chave
          revenueDataPoint[seller.name] = sellerRevenue;
          billingDataPoint[seller.name] = sellerBilling;

          totalRevenue += sellerRevenue;
          totalBilling += sellerBilling;
          activeSellers++;

          console.log(`📈 [DEBUG] useSellerPerformanceCharts - Dia ${dayStr}, Vendedor ${seller.name}: Revenue=${sellerRevenue}, Billing=${sellerBilling}`);
        });

        // Calcular média
        revenueDataPoint.media = activeSellers > 0 ? totalRevenue / activeSellers : 0;
        billingDataPoint.media = activeSellers > 0 ? totalBilling / activeSellers : 0;

        revenueChartData.push(revenueDataPoint);
        billingChartData.push(billingDataPoint);
      }

      console.log('✅ [DEBUG] useSellerPerformanceCharts - Dados de gráficos processados:', {
        revenueDataLength: revenueChartData.length,
        billingDataLength: billingChartData.length,
        sellerNames: names,
        sampleRevenueData: revenueChartData.slice(-3), // últimos 3 dias
        sampleBillingData: billingChartData.slice(-3)
      });

      setRevenueData(revenueChartData);
      setBillingData(billingChartData);

    } catch (error) {
      console.error('💥 [DEBUG] useSellerPerformanceCharts - Erro ao carregar dados de performance dos vendedores:', error);
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
    console.log('🎯 [DEBUG] useSellerPerformanceCharts - Gerando dados de exemplo');
    const exampleNames = ['Renata', 'Will', 'Ana Carvalho'];
    setSellerNames(exampleNames);

    const revenueChartData: SellerChartDataPoint[] = [];
    const billingChartData: SellerChartDataPoint[] = [];

    for (let day = 1; day <= 30; day++) {
      const dayStr = day.toString().padStart(2, '0');
      const baseRevenue = 1500;
      const baseBilling = 6000;
      
      const renata_revenue = baseRevenue * day * 1.5;
      const will_revenue = baseRevenue * day * 1.1;
      const ana_revenue = baseRevenue * day * 0.8;
      
      const renata_billing = baseBilling * day * 1.8;
      const will_billing = baseBilling * day * 1.0;
      const ana_billing = baseBilling * day * 0.6;

      const revenueMedia = (renata_revenue + will_revenue + ana_revenue) / 3;
      const billingMedia = (renata_billing + will_billing + ana_billing) / 3;

      revenueChartData.push({
        day: dayStr,
        'Renata': renata_revenue,
        'Will': will_revenue,
        'Ana Carvalho': ana_revenue,
        media: revenueMedia
      });

      billingChartData.push({
        day: dayStr,
        'Renata': renata_billing,
        'Will': will_billing,
        'Ana Carvalho': ana_billing,
        media: billingMedia
      });
    }

    setRevenueData(revenueChartData);
    setBillingData(billingChartData);
    console.log('✅ [DEBUG] useSellerPerformanceCharts - Dados de exemplo gerados com vendedores específicos');
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
