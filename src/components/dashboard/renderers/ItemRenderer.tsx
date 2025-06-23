
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import MetricsCards from '@/components/dashboard/metrics/MetricsCards';
import PreSalesMetricsCards from '@/components/dashboard/metrics/PreSalesMetricsCards';
import ProductMetricsCards from '@/components/dashboard/products/ProductMetricsCards';
import SingleProductMetricsCards from '@/components/dashboard/products/SingleProductMetricsCards';
import RevenueEvolutionChart from '@/components/dashboard/charts/RevenueEvolutionChart';
import BillingEvolutionChart from '@/components/dashboard/charts/BillingEvolutionChart';
import SellerRevenueChart from '@/components/dashboard/charts/SellerRevenueChart';
import SellerBillingChart from '@/components/dashboard/charts/SellerBillingChart';
import TemporalRevenueChart from '@/components/dashboard/charts/TemporalRevenueChart';
import TemporalBillingChart from '@/components/dashboard/charts/TemporalBillingChart';
import ProductRevenueEvolutionChart from '@/components/dashboard/charts/ProductRevenueEvolutionChart';
import ProductBillingEvolutionChart from '@/components/dashboard/charts/ProductBillingEvolutionChart';
import ProductSalesEvolutionChart from '@/components/dashboard/charts/ProductSalesEvolutionChart';
import ClosersPerformanceTable from '@/components/dashboard/tables/ClosersPerformanceTable';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
  selectedProductId?: string | null;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ itemKey, config, selectedProductId }) => {
  console.log('🔍 [DEBUG] ItemRenderer - Rendering item:', itemKey);
  console.log('🔍 [DEBUG] ItemRenderer - selectedProductId:', selectedProductId);
  console.log('🔍 [DEBUG] ItemRenderer - config for item:', config[itemKey as keyof DashboardConfig]);

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

  // Lista de indicadores comerciais
  const commercialIndicators = [
    'showConversion', 'showRevenue', 'showTicketFaturamento', 'showTicketReceita',
    'showFaltaFaturamento', 'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento', 'showHiperMetaReceita',
    'showFaltaReceitaSuper', 'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita',
    'showQuantidadeVendas', 'showCashCollect', 'showCac',
    'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow'
  ];

  // GRÁFICOS COMERCIAIS - renderizar diretamente
  switch (itemKey) {
    case 'revenueEvolutionChart':
      return config.showRevenueEvolutionChart ? <RevenueEvolutionChart /> : null;
    
    case 'billingEvolutionChart':
      return config.showBillingEvolutionChart ? <BillingEvolutionChart /> : null;
    
    case 'sellerRevenueChart':
      return config.showSellerRevenueChart ? <SellerRevenueChart /> : null;
    
    case 'sellerBillingChart':
      return config.showSellerBillingChart ? <SellerBillingChart /> : null;
    
    case 'temporalRevenueChart':
      return config.showTemporalRevenueChart ? <TemporalRevenueChart /> : null;
    
    case 'temporalBillingChart':
      return config.showTemporalBillingChart ? <TemporalBillingChart /> : null;
    
    case 'showClosersPerformanceTable':
      return config.showClosersPerformanceTable ? <ClosersPerformanceTable /> : null;
  }

  // Se é um indicador de produto, só renderizar se um produto específico estiver selecionado
  if (productIndicators.includes(itemKey)) {
    console.log('🔍 [DEBUG] ItemRenderer - Detected product indicator:', itemKey);
    // Só renderizar se um produto específico estiver selecionado
    if (!selectedProductId) {
      console.log('🔍 [DEBUG] ItemRenderer - No product selected, not rendering product indicator');
      return null;
    }
    return <SingleProductMetricsCards 
      config={config} 
      selectedProductId={selectedProductId} 
      indicatorKey={itemKey}
    />;
  }

  // Se é um gráfico de produto, renderizar o gráfico específico
  if (productCharts.includes(itemKey)) {
    console.log('🔍 [DEBUG] ItemRenderer - Detected product chart:', itemKey, 'enabled:', config[itemKey as keyof DashboardConfig]);
    
    // Verificar se o gráfico está habilitado na configuração
    if (!config[itemKey as keyof DashboardConfig]) {
      console.log('🔍 [DEBUG] ItemRenderer - Product chart not enabled in config');
      return null;
    }

    // Se um produto específico está selecionado, renderizar o gráfico para esse produto
    if (selectedProductId) {
      console.log('🔍 [DEBUG] ItemRenderer - Rendering specific product chart for:', selectedProductId);
      
      switch (itemKey) {
        case 'showProductRevenueEvolutionChart':
          return <ProductRevenueEvolutionChart selectedProductId={selectedProductId} />;
        
        case 'showProductBillingEvolutionChart':
          return <ProductBillingEvolutionChart selectedProductId={selectedProductId} />;
        
        case 'showProductSalesEvolutionChart':
          return <ProductSalesEvolutionChart selectedProductId={selectedProductId} />;
        
        case 'showProductPerformanceChart':
        case 'showProductComparisonChart':
        case 'showProductTemporalChart':
          // Para estes gráficos que ainda não foram totalmente implementados, não mostrar nada
          return null;
        
        default:
          return null;
      }
    }

    // Se nenhum produto específico está selecionado, não renderizar nada
    console.log('🔍 [DEBUG] ItemRenderer - No product selected, not rendering chart');
    return null;
  }

  // Verificar se é um indicador comercial
  if (commercialIndicators.includes(itemKey)) {
    console.log('🔍 [DEBUG] ItemRenderer - Detected commercial indicator:', itemKey);
    if (config[itemKey as keyof DashboardConfig]) {
      return <MetricsCards config={config} />;
    }
    return null;
  }

  // Verificar se é um indicador de pré-vendas
  if (itemKey.startsWith('showPreSales')) {
    console.log('🔍 [DEBUG] ItemRenderer - Detected pre-sales indicator:', itemKey);
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

  console.log('🔍 [DEBUG] ItemRenderer - No match found for:', itemKey);
  return null;
};
