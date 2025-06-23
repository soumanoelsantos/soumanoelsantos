
import { SellerChartDataPoint } from './types';

export const generateExampleData = (): {
  revenueData: SellerChartDataPoint[],
  billingData: SellerChartDataPoint[],
  sellerNames: string[]
} => {
  console.log('🎯 [DEBUG] useSellerPerformanceCharts - Gerando dados de exemplo');
  const exampleNames = ['Renata', 'Will', 'Ana Carcalho']; // Mantém o nome como está no banco

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
      'Ana Carcalho': ana_revenue, // Corrigido para corresponder ao nome no banco
      media: revenueMedia
    });

    billingChartData.push({
      day: dayStr,
      'Renata': renata_billing,
      'Will': will_billing,
      'Ana Carcalho': ana_billing, // Corrigido para corresponder ao nome no banco
      media: billingMedia
    });
  }

  console.log('✅ [DEBUG] useSellerPerformanceCharts - Dados de exemplo gerados com vendedores específicos');
  
  return {
    revenueData: revenueChartData,
    billingData: billingChartData,
    sellerNames: exampleNames
  };
};
