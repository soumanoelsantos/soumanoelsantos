
import { SellerChartDataPoint } from './types';

export const processPerformanceData = (
  sellersData: any[],
  performanceData: any[],
  currentDate: Date
): { revenueData: SellerChartDataPoint[], billingData: SellerChartDataPoint[] } => {
  const revenueChartData: SellerChartDataPoint[] = [];
  const billingChartData: SellerChartDataPoint[] = [];

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
    const revenueDataPoint: SellerChartDataPoint = { day: dayStr };
    const billingDataPoint: SellerChartDataPoint = { day: dayStr };

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

      // Normalizar nome da Ana Carvalho para garantir consistência
      let sellerDisplayName = seller.name;
      if (seller.name === 'Ana Carcalho') {
        sellerDisplayName = 'Ana Carvalho';
      }

      // Usar o nome normalizado como chave
      revenueDataPoint[sellerDisplayName] = sellerRevenue;
      billingDataPoint[sellerDisplayName] = sellerBilling;

      console.log(`📈 [DEBUG] useSellerPerformanceCharts - Dia ${dayStr}, Vendedor ${sellerDisplayName}: Revenue=${sellerRevenue}, Billing=${sellerBilling}`);
    });

    revenueChartData.push(revenueDataPoint);
    billingChartData.push(billingDataPoint);
  }

  return { revenueData: revenueChartData, billingData: billingChartData };
};
