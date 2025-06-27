
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
    dashboardType,
    enableCommercialTab: config.enableCommercialTab,
    enableProductTab: config.enableProductTab,
    enablePreSalesTab: config.enablePreSalesTab
  });

  const renderMetrics = () => {
    const metricsComponents: JSX.Element[] = [];
    const chartsComponents: JSX.Element[] = [];

    // Para dashboard comercial, renderizar métricas básicas e gráficos
    if (dashboardType === 'comercial') {
      console.log('📊 [DEBUG] Rendering commercial dashboard');
      
      // Métricas comerciais básicas
      const commercialMetrics = [
        'showConversion', 'showRevenue', 'showTicketFaturamento', 'showTicketReceita',
        'showFaltaFaturamento', 'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
        'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento', 'showHiperMetaReceita',
        'showFaltaReceitaSuper', 'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
        'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita',
        'showQuantidadeVendas', 'showCashCollect', 'showCac',
        'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow'
      ];

      // Renderizar métricas comerciais habilitadas
      commercialMetrics.forEach((metricKey, index) => {
        if (config[metricKey as keyof DashboardConfig]) {
          console.log('📊 [DEBUG] Adding commercial metric:', metricKey);
          const component = (
            <ItemRenderer 
              key={`commercial-${metricKey}-${index}`}
              itemKey={metricKey} 
              config={config} 
              selectedProductId={null} 
            />
          );
          if (component) {
            metricsComponents.push(component);
          }
        }
      });

      // Gráficos comerciais
      const commercialCharts = [
        'revenueEvolutionChart',
        'billingEvolutionChart', 
        'sellerRevenueChart',
        'sellerBillingChart',
        'temporalRevenueChart',
        'temporalBillingChart',
        'showClosersPerformanceTable'
      ];

      commercialCharts.forEach((chartKey, index) => {
        const configKey = chartKey === 'revenueEvolutionChart' ? 'showRevenueEvolutionChart' :
                         chartKey === 'billingEvolutionChart' ? 'showBillingEvolutionChart' :
                         chartKey;
        
        if (config[configKey as keyof DashboardConfig]) {
          console.log('📊 [DEBUG] Adding commercial chart:', chartKey);
          const component = (
            <ItemRenderer 
              key={`commercial-chart-${chartKey}-${index}`}
              itemKey={chartKey} 
              config={config} 
              selectedProductId={null} 
            />
          );
          if (component) {
            chartsComponents.push(component);
          }
        }
      });
    }

    // Para dashboard de produtos
    else if (dashboardType === 'produtos') {
      console.log('📊 [DEBUG] Rendering products dashboard');
      
      const productIndicators = [
        'showProductReceita', 'showProductFaturamento', 'showProductQuantidadeVendas',
        'showProductTicketReceita', 'showProductTicketFaturamento',
        'showProductMetaReceita', 'showProductMetaFaturamento', 'showProductMetaQuantidadeVendas',
        'showProductFaltaReceita', 'showProductFaltaFaturamento',
        'showProductCashCollect', 'showProductProjecaoReceita', 'showProductProjecaoFaturamento'
      ];

      productIndicators.forEach((metricKey, index) => {
        if (config[metricKey as keyof DashboardConfig] && selectedProductId) {
          console.log('📊 [DEBUG] Adding product metric:', metricKey);
          const component = (
            <ItemRenderer 
              key={`product-${metricKey}-${index}`}
              itemKey={metricKey} 
              config={config} 
              selectedProductId={selectedProductId} 
            />
          );
          if (component) {
            metricsComponents.push(component);
          }
        }
      });

      // Gráficos de produtos
      const productCharts = [
        'showProductRevenueEvolutionChart',
        'showProductBillingEvolutionChart',
        'showSellerRevenueChart',
        'showSellerBillingChart',
        'showTemporalRevenueChart',
        'showTemporalBillingChart'
      ];

      productCharts.forEach((chartKey, index) => {
        if (config[chartKey as keyof DashboardConfig] && selectedProductId) {
          console.log('📊 [DEBUG] Adding product chart:', chartKey);
          const component = (
            <ItemRenderer 
              key={`product-chart-${chartKey}-${index}`}
              itemKey={chartKey} 
              config={config} 
              selectedProductId={selectedProductId} 
            />
          );
          if (component) {
            chartsComponents.push(component);
          }
        }
      });
    }

    console.log('📊 [DEBUG] Total metrics rendered:', metricsComponents.length);
    console.log('📊 [DEBUG] Total charts rendered:', chartsComponents.length);
    
    return { metricsComponents, chartsComponents };
  };

  const { metricsComponents, chartsComponents } = renderMetrics();

  return (
    <div className="space-y-6">
      {/* Grid para métricas em cards pequenos */}
      {metricsComponents.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
          {metricsComponents}
        </div>
      )}
      
      {/* Layout de uma coluna para gráficos */}
      {chartsComponents.length > 0 && (
        <div className="space-y-6">
          {chartsComponents}
        </div>
      )}

      {/* Fallback para quando não há métricas habilitadas */}
      {metricsComponents.length === 0 && chartsComponents.length === 0 && dashboardType === 'comercial' && (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhuma métrica comercial ativa
          </h3>
          <p className="text-gray-600 mb-4">
            Vá para as configurações para ativar métricas comerciais.
          </p>
          <a 
            href="/dashboard-config" 
            className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Configurar Métricas
          </a>
        </div>
      )}
    </div>
  );
};

export default DashboardMetrics;
