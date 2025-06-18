
import { DashboardConfig } from './useDashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    console.log('Getting ordered items with config:', config);
    console.log('Metrics order from config:', config.metricsOrder);
    
    // Lista de todas as chaves de métricas possíveis (apenas as que existem na configuração)
    const allMetricKeys = [
      'showConversion', 'showRevenue',
      'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
      'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
      'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
      'showHiperMetaReceita', 'showFaltaReceitaSuper',
      'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
      'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita', 
      'showQuantidadeVendas', 'showCashCollect'
    ];

    // Filtrar apenas as métricas que estão habilitadas
    const enabledMetrics = allMetricKeys.filter(key => {
      const isEnabled = config[key as keyof DashboardConfig] as boolean;
      console.log(`Metric ${key} enabled:`, isEnabled);
      return isEnabled;
    });

    console.log('Enabled metrics:', enabledMetrics);

    let orderedItems: string[] = [];

    // Se há uma ordem definida, usar ela como prioridade
    if (config.metricsOrder && config.metricsOrder.length > 0) {
      console.log('Using custom metrics order:', config.metricsOrder);
      
      // Primeiro, adicionar itens na ordem especificada (apenas os que estão habilitados)
      config.metricsOrder.forEach(key => {
        // Verificar se é uma métrica habilitada
        if (enabledMetrics.includes(key)) {
          orderedItems.push(key);
        }
        // Verificar se são metas específicas
        else if (key === 'specificGoals' && config.showSpecificGoals && config.selectedGoalIds.length > 0) {
          orderedItems.push(key);
        }
        // Verificar se são gráficos
        else if ((key === 'salesChart' || key === 'growthChart') && config.showCharts) {
          orderedItems.push(key);
        }
      });

      // Adicionar métricas habilitadas que não estão na ordem especificada
      enabledMetrics.forEach(key => {
        if (!orderedItems.includes(key)) {
          orderedItems.push(key);
        }
      });

      // Adicionar metas específicas se habilitadas e não estão na lista
      if (config.showSpecificGoals && config.selectedGoalIds.length > 0 && !orderedItems.includes('specificGoals')) {
        orderedItems.push('specificGoals');
      }

      // Adicionar gráficos se habilitados e não estão na lista
      if (config.showCharts) {
        if (!orderedItems.includes('salesChart')) {
          orderedItems.push('salesChart');
        }
        if (!orderedItems.includes('growthChart')) {
          orderedItems.push('growthChart');
        }
      }
    } else {
      // Se não há ordem definida, usar ordem padrão
      
      // Adicionar todas as métricas habilitadas
      orderedItems.push(...enabledMetrics);

      // Adicionar metas específicas se habilitadas
      if (config.showSpecificGoals && config.selectedGoalIds.length > 0) {
        orderedItems.push('specificGoals');
      }

      // Por último, adicionar gráficos se habilitados
      if (config.showCharts) {
        orderedItems.push('salesChart', 'growthChart');
      }
    }

    console.log('Final ordered items:', orderedItems);
    return orderedItems;
  };

  return { getOrderedItems };
};
