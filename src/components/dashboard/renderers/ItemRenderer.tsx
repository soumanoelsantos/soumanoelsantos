
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import CommercialMetricsCards from '@/components/dashboard/metrics/CommercialMetricsCards';
import PreSalesMetricsCards from '@/components/dashboard/metrics/PreSalesMetricsCards';
import SingleProductMetricsCards from '@/components/dashboard/products/SingleProductMetricsCards';
import RevenueEvolutionChart from '@/components/dashboard/charts/RevenueEvolutionChart';
import BillingEvolutionChart from '@/components/dashboard/charts/BillingEvolutionChart';
import SellerRevenueChart from '@/components/dashboard/charts/SellerRevenueChart';
import SellerBillingChart from '@/components/dashboard/charts/SellerBillingChart';
import TemporalRevenueChart from '@/components/dashboard/charts/TemporalRevenueChart';
import TemporalBillingChart from '@/components/dashboard/charts/TemporalBillingChart';
import ProductRevenueEvolutionChart from '@/components/dashboard/charts/ProductRevenueEvolutionChart';
import ProductBillingEvolutionChart from '@/components/dashboard/charts/ProductBillingEvolutionChart';
import ClosersPerformanceTable from '@/components/dashboard/tables/ClosersPerformanceTable';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
  selectedProductId?: string | null;
  isPublicView?: boolean;
  sharedUserId?: string;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ 
  itemKey, 
  config, 
  selectedProductId,
  isPublicView = false,
  sharedUserId
}) => {
  console.log('🔍 [DEBUG] ItemRenderer - Rendering item:', itemKey);

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

  // Lista de indicadores de produtos
  const productIndicators = [
    'showProductReceita', 'showProductFaturamento', 'showProductQuantidadeVendas',
    'showProductTicketReceita', 'showProductTicketFaturamento',
    'showProductMetaReceita', 'showProductMetaFaturamento', 'showProductMetaQuantidadeVendas',
    'showProductFaltaReceita', 'showProductFaltaFaturamento',
    'showProductCashCollect', 'showProductProjecaoReceita', 'showProductProjecaoFaturamento'
  ];

  // Se é um indicador de produto, só renderizar se um produto específico estiver selecionado
  if (productIndicators.includes(itemKey)) {
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

  // Lista de gráficos de produtos
  const productCharts = [
    'showProductRevenueEvolutionChart',
    'showProductBillingEvolutionChart',
    'showSellerRevenueChart',
    'showSellerBillingChart', 
    'showTemporalRevenueChart',
    'showTemporalBillingChart'
  ];

  // Se é um gráfico de produto, renderizar o gráfico específico
  if (productCharts.includes(itemKey)) {
    if (!config[itemKey as keyof DashboardConfig]) {
      return null;
    }

    if (selectedProductId) {
      switch (itemKey) {
        case 'showProductRevenueEvolutionChart':
          return <ProductRevenueEvolutionChart selectedProductId={selectedProductId} />;
        
        case 'showProductBillingEvolutionChart':
          return <ProductBillingEvolutionChart selectedProductId={selectedProductId} />;
        
        case 'showSellerRevenueChart':
          return <SellerRevenueChart />;
        
        case 'showSellerBillingChart':
          return <SellerBillingChart />;
        
        case 'showTemporalRevenueChart':
          return <TemporalRevenueChart />;
        
        case 'showTemporalBillingChart':
          return <TemporalBillingChart />;
        
        default:
          return null;
      }
    }
    return null;
  }

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

  // Verificar se é um indicador comercial - USAR NOVO COMPONENTE
  if (commercialIndicators.includes(itemKey)) {
    if (config[itemKey as keyof DashboardConfig]) {
      console.log('🔍 [DEBUG] ItemRenderer - Rendering commercial metric with new component:', itemKey);
      return <CommercialMetricsCards config={config} indicatorKey={itemKey} />;
    }
    return null;
  }

  // Verificar se é um indicador de pré-vendas
  if (itemKey.startsWith('showPreSales')) {
    const mockPreSalesData = {
      dailyCalls: 0,
      dailyCallsTarget: 40,
      dailySchedulings: 0,
      dailySchedulingsTarget: 8,
      dailyNoShow: 0,
      dailyNoShowRate: 0,
      totalSDRs: 0,
      averageSchedulingsPerSDR: 0,
      monthlyCallsAverage: 0,
      monthlySchedulingsAverage: 0,
      monthlyNoShowRate: 0,
      sdrPerformance: [],
      weeklyData: []
    };
    return <PreSalesMetricsCards config={config} preSalesData={mockPreSalesData} />;
  }

  console.log('🔍 [DEBUG] ItemRenderer - No match found for:', itemKey);
  return null;
};
