
import { SellerChartDataPoint } from './types';

export const generateExampleData = (): {
  revenueData: SellerChartDataPoint[],
  billingData: SellerChartDataPoint[],
  sellerNames: string[]
} => {
  console.log('🎯 [DEBUG] useSellerPerformanceCharts - Gerando dados de exemplo');
  const exampleNames = ['Renata', 'Will', 'Ana Carvalho'];

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

    revenueChartData.push({
      day: dayStr,
      'Renata': renata_revenue,
      'Will': will_revenue,
      'Ana Carvalho': ana_revenue,
    });

    billingChartData.push({
      day: dayStr,
      'Renata': renata_billing,
      'Will': will_billing,
      'Ana Carvalho': ana_billing,
    });
  }

  console.log('✅ [DEBUG] useSellerPerformanceCharts - Dados de exemplo gerados com vendedores específicos');
  console.log('🔍 [DEBUG] Sample revenue data:', revenueChartData.slice(-3));
  console.log('🔍 [DEBUG] Sample billing data:', billingChartData.slice(-3));
  
  return {
    revenueData: revenueChartData,
    billingData: billingChartData,
    sellerNames: exampleNames
  };
};
