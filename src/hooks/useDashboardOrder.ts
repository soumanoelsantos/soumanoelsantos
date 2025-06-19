
import { DashboardConfig } from '@/types/dashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    console.log('🔍 useDashboardOrder - Getting ordered items with config:', config);
    console.log('🔍 useDashboardOrder - Projection indicators in config:', {
      showProjecaoReceita: config.showProjecaoReceita,
      showProjecaoFaturamento: config.showProjecaoFaturamento,
      showNoShow: config.showNoShow
    });
    
    // Se existe uma ordem personalizada, usar ela
    if (config.metricsOrder && config.metricsOrder.length > 0) {
      console.log('🔍 useDashboardOrder - Using custom order:', config.metricsOrder);
      
      // Garantir que os novos indicadores de projeção estejam incluídos se habilitados
      let finalOrder = [...config.metricsOrder];
      
      // Adicionar indicadores de projeção se não estiverem na ordem e estiverem habilitados
      if (config.showProjecaoReceita && !finalOrder.includes('showProjecaoReceita')) {
        finalOrder.push('showProjecaoReceita');
      }
      
      if (config.showProjecaoFaturamento && !finalOrder.includes('showProjecaoFaturamento')) {
        finalOrder.push('showProjecaoFaturamento');
      }
      
      if (config.showNoShow && !finalOrder.includes('showNoShow')) {
        finalOrder.push('showNoShow');
      }
      
      // Garantir que os gráficos de evolução estejam incluídos se habilitados
      if (config.showRevenueEvolutionChart && !finalOrder.includes('revenueEvolutionChart')) {
        finalOrder.push('revenueEvolutionChart');
      }
      
      if (config.showBillingEvolutionChart && !finalOrder.includes('billingEvolutionChart')) {
        finalOrder.push('billingEvolutionChart');
      }
      
      console.log('🔍 useDashboardOrder - Final custom order with all items:', finalOrder);
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
      // Incluir explicitamente os novos indicadores de projeção
      'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow'
    ];

    // Adicionar metas específicas se habilitadas
    if (config.showSpecificGoals && config.selectedGoalIds.length > 0) {
      defaultOrder.push('specificGoals');
    }

    // Adicionar gráficos de evolução se habilitados
    if (config.showRevenueEvolutionChart) {
      defaultOrder.push('revenueEvolutionChart');
    }
    
    if (config.showBillingEvolutionChart) {
      defaultOrder.push('billingEvolutionChart');
    }

    console.log('🔍 useDashboardOrder - Using default order with projection indicators:', defaultOrder);
    return defaultOrder;
  };

  return {
    getOrderedItems
  };
};
