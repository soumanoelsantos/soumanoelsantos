
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
      
      // Garantir que a tabela de closers esteja incluída se habilitada - usar sempre a mesma chave
      if (config.showClosersPerformanceTable && !finalOrder.includes('showClosersPerformanceTable')) {
        finalOrder.push('showClosersPerformanceTable');
      }
      
      // Adicionar gráficos de produtos se habilitados
      if (config.showProductRevenueEvolutionChart && !finalOrder.includes('showProductRevenueEvolutionChart')) {
        finalOrder.push('showProductRevenueEvolutionChart');
      }
      
      if (config.showProductBillingEvolutionChart && !finalOrder.includes('showProductBillingEvolutionChart')) {
        finalOrder.push('showProductBillingEvolutionChart');
      }
      
      if (config.showProductSalesEvolutionChart && !finalOrder.includes('showProductSalesEvolutionChart')) {
        finalOrder.push('showProductSalesEvolutionChart');
      }
      
      if (config.showProductPerformanceChart && !finalOrder.includes('showProductPerformanceChart')) {
        finalOrder.push('showProductPerformanceChart');
      }
      
      if (config.showProductComparisonChart && !finalOrder.includes('showProductComparisonChart')) {
        finalOrder.push('showProductComparisonChart');
      }
      
      if (config.showProductTemporalChart && !finalOrder.includes('showProductTemporalChart')) {
        finalOrder.push('showProductTemporalChart');
      }
      
      // Converter closersPerformanceTable para showClosersPerformanceTable para consistência
      finalOrder = finalOrder.map(item => 
        item === 'closersPerformanceTable' ? 'showClosersPerformanceTable' : item
      );
      
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

    // Adicionar tabela de performance dos closers se habilitada - usando a chave consistente
    if (config.showClosersPerformanceTable) {
      defaultOrder.push('showClosersPerformanceTable');
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

    // Adicionar gráficos de produtos se habilitados
    if (config.showProductRevenueEvolutionChart) {
      defaultOrder.push('showProductRevenueEvolutionChart');
    }
    
    if (config.showProductBillingEvolutionChart) {
      defaultOrder.push('showProductBillingEvolutionChart');
    }
    
    if (config.showProductSalesEvolutionChart) {
      defaultOrder.push('showProductSalesEvolutionChart');
    }
    
    if (config.showProductPerformanceChart) {
      defaultOrder.push('showProductPerformanceChart');
    }
    
    if (config.showProductComparisonChart) {
      defaultOrder.push('showProductComparisonChart');
    }
    
    if (config.showProductTemporalChart) {
      defaultOrder.push('showProductTemporalChart');
    }

    console.log('🔍 useDashboardOrder - Using default order with product charts:', defaultOrder);
    return defaultOrder;
  };

  return {
    getOrderedItems
  };
};
