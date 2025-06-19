
import { DashboardConfig } from '@/types/dashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    console.log('useDashboardOrder - Getting ordered items with config:', config);
    
    // Se existe uma ordem personalizada, usar ela
    if (config.metricsOrder && config.metricsOrder.length > 0) {
      console.log('useDashboardOrder - Using custom order:', config.metricsOrder);
      
      // Garantir que os gráficos de evolução estejam incluídos se habilitados
      let finalOrder = [...config.metricsOrder];
      
      if (config.showRevenueEvolutionChart && !finalOrder.includes('revenueEvolutionChart')) {
        finalOrder.push('revenueEvolutionChart');
      }
      
      if (config.showBillingEvolutionChart && !finalOrder.includes('billingEvolutionChart')) {
        finalOrder.push('billingEvolutionChart');
      }
      
      console.log('useDashboardOrder - Final custom order with evolution charts:', finalOrder);
      return finalOrder;
    }

    // Ordem padrão com todos os itens incluindo os novos indicadores de projeção
    const defaultOrder = [
      'showConversion', 'showRevenue', 'showTicketFaturamento', 'showTicketReceita',
      'showFaltaFaturamento', 'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
      'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento', 'showHiperMetaReceita',
      'showFaltaReceitaSuper', 'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
      'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita',
      'showQuantidadeVendas', 'showCashCollect', 'showCac',
      // Novos indicadores de projeção
      'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow',
      'specificGoals'
    ];

    // Adicionar gráficos de evolução se habilitados
    if (config.showRevenueEvolutionChart) {
      defaultOrder.push('revenueEvolutionChart');
    }
    
    if (config.showBillingEvolutionChart) {
      defaultOrder.push('billingEvolutionChart');
    }

    console.log('useDashboardOrder - Using default order with projection indicators:', defaultOrder);
    return defaultOrder;
  };

  return {
    getOrderedItems
  };
};
