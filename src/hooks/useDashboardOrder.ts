
import { DashboardConfig } from '@/types/dashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    console.log('🔍 useDashboardOrder - Getting ordered items with config:', config);
    
    let finalOrder: string[] = [];

    // Se existe uma ordem personalizada, usar ela como base
    if (config.metricsOrder && config.metricsOrder.length > 0) {
      console.log('🔍 useDashboardOrder - Using custom order:', config.metricsOrder);
      finalOrder = [...config.metricsOrder];
    } else {
      // Ordem padrão com todos os itens incluindo os novos indicadores de projeção
      finalOrder = [
        'showConversion', 'showRevenue', 'showTicketFaturamento', 'showTicketReceita',
        'showFaltaFaturamento', 'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
        'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento', 'showHiperMetaReceita',
        'showFaltaReceitaSuper', 'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
        'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita',
        'showQuantidadeVendas', 'showCashCollect', 'showCac',
        'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow'
      ];
    }

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

    // Lista de gráficos de produtos (incluindo os novos 4 gráficos)
    const productCharts = [
      'showProductRevenueEvolutionChart',
      'showProductBillingEvolutionChart',
      'showSellerRevenueChart',
      'showSellerBillingChart',
      'showTemporalRevenueChart',
      'showTemporalBillingChart'
    ];

    // USAR A ORDEM PERSONALIZADA DE PRODUTOS se existir
    if (config.productOrder && config.productOrder.length > 0) {
      console.log('🔍 useDashboardOrder - Using custom product order:', config.productOrder);
      // Usar a ordem personalizada dos produtos
      config.productOrder.forEach(indicator => {
        if (config[indicator as keyof DashboardConfig] && !finalOrder.includes(indicator)) {
          finalOrder.push(indicator);
          console.log('🔍 useDashboardOrder - Adding product indicator from custom order:', indicator);
        }
      });
      
      // Adicionar indicadores habilitados que não estão na ordem personalizada
      productIndicators.forEach(indicator => {
        if (config[indicator as keyof DashboardConfig] && !config.productOrder.includes(indicator) && !finalOrder.includes(indicator)) {
          finalOrder.push(indicator);
          console.log('🔍 useDashboardOrder - Adding missing product indicator:', indicator);
        }
      });
    } else {
      // SEMPRE adicionar indicadores de produtos se habilitados, independente de selectedProductIds
      if (config.showProductMetrics) {
        productIndicators.forEach(indicator => {
          if (config[indicator as keyof DashboardConfig] && !finalOrder.includes(indicator)) {
            finalOrder.push(indicator);
            console.log('🔍 useDashboardOrder - Adding product indicator:', indicator);
          }
        });
      }
    }

    // SEMPRE adicionar gráficos de produtos se habilitados
    productCharts.forEach(chart => {
      if (config[chart as keyof DashboardConfig] && !finalOrder.includes(chart)) {
        finalOrder.push(chart);
        console.log('🔍 useDashboardOrder - Adding product chart:', chart);
      }
    });

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
    
    // Converter closersPerformanceTable para showClosersPerformanceTable para consistência
    finalOrder = finalOrder.map(item => 
      item === 'closersPerformanceTable' ? 'showClosersPerformanceTable' : item
    );
    
    console.log('🔍 useDashboardOrder - Final order with all items:', finalOrder);
    return finalOrder;
  };

  return {
    getOrderedItems
  };
};
