
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import MetricsCards from '@/components/dashboard/metrics/MetricsCards';
import PreSalesMetricsCards from '@/components/dashboard/metrics/PreSalesMetricsCards';
import ProductMetricsCards from '@/components/dashboard/products/ProductMetricsCards';
import SingleProductMetricsCards from '@/components/dashboard/products/SingleProductMetricsCards';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
  selectedProductId?: string | null;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ itemKey, config, selectedProductId }) => {
  console.log('🔍 [DEBUG] ItemRenderer - Rendering item:', itemKey);

  switch (itemKey) {
    case 'productMetrics':
      if (selectedProductId) {
        return <SingleProductMetricsCards config={config} selectedProductId={selectedProductId} />;
      }
      return <ProductMetricsCards config={config} selectedProductId={selectedProductId} />;
    
    default:
      // Verificar se é um indicador de métrica padrão
      if (config[itemKey as keyof DashboardConfig]) {
        return <MetricsCards config={config} />;
      }
      
      // Verificar se é um indicador de pré-vendas
      if (itemKey.startsWith('showPreSales')) {
        // Criar dados simulados completos para pré-vendas
        const mockPreSalesData = {
          dailyCalls: 0,
          dailyCallsTarget: 40,
          dailySchedulings: 0,
          dailySchedulingsTarget: 8,
          dailyNoShow: 0,
          dailyNoShowRate: 0,
          totalSDRs: 0,
          averageSchedulingsPerSDR: 0,
          sdrPerformance: [],
          weeklyData: []
        };
        return <PreSalesMetricsCards config={config} preSalesData={mockPreSalesData} />;
      }
      
      return null;
  }
};
