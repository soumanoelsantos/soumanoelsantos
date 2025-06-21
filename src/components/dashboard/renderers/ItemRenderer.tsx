
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

  // Lista de indicadores de produtos
  const productIndicators = [
    'showProductReceita',
    'showProductFaturamento',
    'showProductQuantidadeVendas',
    'showProductTicketReceita',
    'showProductTicketFaturamento',
    'showProductMetaReceita',
    'showProductMetaFaturamento',
    'showProductMetaQuantidadeVendas',
    'showProductFaltaReceita',
    'showProductFaltaFaturamento',
    'showProductCashCollect',
    'showProductProjecaoReceita',
    'showProductProjecaoFaturamento'
  ];

  // Lista de gráficos de produtos
  const productCharts = [
    'showProductRevenueEvolutionChart',
    'showProductBillingEvolutionChart',
    'showProductSalesEvolutionChart',
    'showProductPerformanceChart',
    'showProductComparisonChart',
    'showProductTemporalChart'
  ];

  // Se é um indicador de produto, só renderizar se um produto específico estiver selecionado
  if (productIndicators.includes(itemKey)) {
    console.log('🔍 [DEBUG] ItemRenderer - Detected product indicator:', itemKey);
    // Só renderizar se um produto específico estiver selecionado
    if (!selectedProductId) {
      console.log('🔍 [DEBUG] ItemRenderer - No product selected, not rendering product indicator');
      return null;
    }
    return <SingleProductMetricsCards config={config} selectedProductId={selectedProductId} />;
  }

  // Se é um gráfico de produto, só renderizar se um produto específico estiver selecionado
  if (productCharts.includes(itemKey)) {
    console.log('🔍 [DEBUG] ItemRenderer - Detected product chart:', itemKey);
    // Só renderizar se um produto específico estiver selecionado
    if (!selectedProductId) {
      console.log('🔍 [DEBUG] ItemRenderer - No product selected, not rendering product chart');
      return null;
    }
    // TODO: Implementar renderização de gráficos de produtos quando necessário
    return <SingleProductMetricsCards config={config} selectedProductId={selectedProductId} />;
  }

  switch (itemKey) {
    case 'productMetrics':
      // Só renderizar se um produto específico estiver selecionado
      if (!selectedProductId) {
        console.log('🔍 [DEBUG] ItemRenderer - No product selected, not rendering productMetrics');
        return null;
      }
      return <SingleProductMetricsCards config={config} selectedProductId={selectedProductId} />;
    
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
