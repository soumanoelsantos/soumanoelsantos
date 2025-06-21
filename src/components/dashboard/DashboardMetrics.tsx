
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { ItemRenderer } from './renderers/ItemRenderer';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';

interface DashboardMetricsProps {
  config: DashboardConfig;
  selectedProductId?: string | null;
  dashboardType?: 'comercial' | 'produtos' | 'pre-vendas';
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ 
  config, 
  selectedProductId,
  dashboardType = 'comercial'
}) => {
  const { getOrderedItems } = useDashboardOrder(config);
  
  console.log('📊 [DEBUG] DashboardMetrics - Config:', {
    metricsOrder: config.metricsOrder,
    productOrder: config.productOrder,
    selectedProductIds: config.selectedProductIds,
    showProductMetrics: config.showProductMetrics,
    dashboardType
  });

  const renderMetrics = () => {
    const components: JSX.Element[] = [];
    const orderedItems = getOrderedItems();

    console.log('📊 [DEBUG] DashboardMetrics - Ordered items:', orderedItems);
    console.log('📊 [DEBUG] DashboardMetrics - Dashboard type:', dashboardType);

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
      'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow',
      'showClosersPerformanceTable', 'showRevenueEvolutionChart', 'showBillingEvolutionChart',
      'showSellerRevenueChart', 'showSellerBillingChart', 'showTemporalRevenueChart', 'showTemporalBillingChart'
    ];

    orderedItems.forEach((itemKey, index) => {
      console.log('📊 [DEBUG] Processing metric:', itemKey, 'Dashboard type:', dashboardType);

      // Filtrar por tipo de dashboard
      let shouldRender = true;
      
      if (dashboardType === 'produtos') {
        // No dashboard de produtos, mostrar apenas indicadores e gráficos de produtos
        shouldRender = productIndicators.includes(itemKey) || productCharts.includes(itemKey);
        console.log('📊 [DEBUG] Product dashboard - Should render:', shouldRender, 'for item:', itemKey);
      } else if (dashboardType === 'comercial') {
        // No dashboard comercial, mostrar apenas indicadores comerciais
        shouldRender = commercialIndicators.includes(itemKey);
      }

      if (!shouldRender) {
        console.log('📊 [DEBUG] Skipping metric for dashboard type:', itemKey, dashboardType);
        return;
      }

      // Renderizar componentes através do ItemRenderer
      const renderedComponent = (
        <ItemRenderer 
          key={`${itemKey}-${index}`}
          itemKey={itemKey} 
          config={config} 
          selectedProductId={selectedProductId} 
        />
      );

      if (renderedComponent) {
        components.push(renderedComponent);
        console.log('📊 [DEBUG] Added component for:', itemKey);
      }
    });

    console.log('📊 [DEBUG] Total components rendered:', components.length);
    return components;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {renderMetrics()}
    </div>
  );
};

export default DashboardMetrics;
