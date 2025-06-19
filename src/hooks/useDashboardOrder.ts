
import { DashboardConfig } from '@/types/dashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    console.log('useDashboardOrder - Getting ordered items with config:', config);
    
    // Se existe uma ordem personalizada, usar ela
    if (config.metricsOrder && config.metricsOrder.length > 0) {
      console.log('useDashboardOrder - Using custom order:', config.metricsOrder);
      return config.metricsOrder;
    }

    // Ordem padrão com todos os itens incluindo os novos gráficos na ordem correta
    const defaultOrder = [
      'showConversion', 'showRevenue', 'showTicketFaturamento', 'showTicketReceita',
      'showFaltaFaturamento', 'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
      'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento', 'showHiperMetaReceita',
      'showFaltaReceitaSuper', 'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
      'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita',
      'showQuantidadeVendas', 'showCashCollect', 'showCac',
      'specificGoals', 'salesChart', 'growthChart', 'revenueEvolutionChart', 'billingEvolutionChart'
    ];

    console.log('useDashboardOrder - Using default order:', defaultOrder);
    return defaultOrder;
  };

  return {
    getOrderedItems
  };
};
