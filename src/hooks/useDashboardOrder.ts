
import { DashboardConfig } from './useDashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    console.log('Getting ordered items with config:', config);
    
    // Lista de todas as chaves de métricas possíveis (removidas showSales, showTicketMedio)
    const allMetricKeys = [
      'showLeads', 'showConversion', 'showRevenue', 'showTeam',
      'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
      'showFaltaReceita', 'showConversao', 'showDiariaReceita',
      'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
      'showHiperMetaReceita', 'showCallsDiarias', 'showFaltaReceitaSuper',
      'showFaltaReceitaHiper', 'showMetaFaturamento', 'showMetaReceita',
      'showFaturamento', 'showReceita', 'showQuantidadeVendas', 'showCashCollect'
    ];

    // Filtrar apenas as métricas que estão habilitadas
    const enabledMetrics = allMetricKeys.filter(key => {
      const isEnabled = config[key as keyof DashboardConfig] as boolean;
      console.log(`Metric ${key} enabled:`, isEnabled);
      return isEnabled;
    });

    console.log('Enabled metrics:', enabledMetrics);

    let orderedItems: string[] = [];

    // Primeiro, adicionar metas mensais se habilitadas (prioridade máxima)
    if (config.showMonthlyGoals) {
      if (config.showMetaFaturamento) {
        orderedItems.push('revenueGoal');
      }
      if (config.showMetaReceita) {
        orderedItems.push('salesGoal');
      }
      if (config.showConversion) {
        orderedItems.push('conversionRate');
      }
    }

    // Adicionar metas específicas se habilitadas
    if (config.showSpecificGoals && config.selectedGoalIds.length > 0) {
      orderedItems.push('specificGoals');
    }

    // Depois, adicionar métricas de cards
    let cardMetrics: string[] = [];
    
    // Se há uma ordem definida, usar ela como base
    if (config.metricsOrder && config.metricsOrder.length > 0) {
      console.log('Using custom metrics order:', config.metricsOrder);
      
      // Adicionar itens na ordem especificada (apenas os que estão habilitados)
      config.metricsOrder.forEach(key => {
        if (enabledMetrics.includes(key)) {
          cardMetrics.push(key);
        }
      });

      // Adicionar métricas habilitadas que não estão na ordem especificada
      enabledMetrics.forEach(key => {
        if (!cardMetrics.includes(key)) {
          cardMetrics.push(key);
        }
      });
    } else {
      // Se não há ordem definida, usar todas as métricas habilitadas
      cardMetrics = [...enabledMetrics];
    }

    // Adicionar as métricas de cards à lista ordenada
    orderedItems.push(...cardMetrics);

    // Por último, adicionar gráficos se habilitados
    if (config.showCharts) {
      orderedItems.push('salesChart', 'growthChart');
    }

    console.log('Final ordered items:', orderedItems);
    return orderedItems;
  };

  return { getOrderedItems };
};
