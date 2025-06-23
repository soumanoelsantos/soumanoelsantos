
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

  return { revenueData: revenueChartData, billingData: billingChartData };
};
