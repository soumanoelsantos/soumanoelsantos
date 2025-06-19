
import { DashboardConfig } from '@/types/dashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    console.log('🔍 useDashboardOrder - Getting ordered items with config:', config);
    
    // Se existe uma ordem personalizada, usar ela
    if (config.metricsOrder && config.metricsOrder.length > 0) {
      console.log('🔍 useDashboardOrder - Using custom order:', config.metricsOrder);
      
      let finalOrder = [...config.metricsOrder];
      
      // Garantir que os novos indicadores de projeção estejam incluídos se habilitados
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
      
      // Garantir que os gráficos de vendedores estejam incluídos se habilitados
      if (config.showSellerRevenueChart && !finalOrder.includes('sellerRevenueChart')) {
        finalOrder.push('sellerRevenueChart');
      }
      
      if (config.showSellerBillingChart && !finalOrder.includes('sellerBillingChart')) {
        finalOrder.push('sellerBillingChart');
      }
      
      // Garantir que os novos gráficos de análise temporal estejam incluídos se habilitados
      if (config.showTemporalRevenueChart && !finalOrder.includes('temporalRevenueChart')) {
        finalOrder.push('temporalRevenueChart');
      }
      
      if (config.showTemporalBillingChart && !finalOrder.includes('temporalBillingChart')) {
        finalOrder.push('temporalBillingChart');
      }
      
      // Garantir que a tabela de closers esteja incluída se habilitada (usando ambas as chaves)
      if (config.showClosersPerformanceTable) {
        if (!finalOrder.includes('closersPerformanceTable') && !finalOrder.includes('showClosersPerformanceTable')) {
          finalOrder.push('closersPerformanceTable');
        }
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
    
    // Adicionar gráficos de vendedores se habilitados
    if (config.showSellerRevenueChart) {
      defaultOrder.push('sellerRevenueChart');
    }
    
    if (config.showSellerBillingChart) {
      defaultOrder.push('sellerBillingChart');
    }
    
    // Adicionar novos gráficos de análise temporal se habilitados
    if (config.showTemporalRevenueChart) {
      defaultOrder.push('temporalRevenueChart');
    }
    
    if (config.showTemporalBillingChart) {
      defaultOrder.push('temporalBillingChart');
    }

    // Adicionar tabela de performance dos closers se habilitada
    if (config.showClosersPerformanceTable) {
      defaultOrder.push('closersPerformanceTable');
    }

    console.log('🔍 useDashboardOrder - Using default order with closers table:', defaultOrder);
    return defaultOrder;
  };

  return {
    getOrderedItems
  };
};
