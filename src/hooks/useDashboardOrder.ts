
import { DashboardConfig } from './useDashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    console.log('Getting ordered items with config:', config);
    
    // Lista de todas as chaves de métricas possíveis
    const allMetricKeys = [
      'showSales', 'showLeads', 'showConversion', 'showRevenue', 'showTicketMedio', 'showTeam',
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

    // Se há uma ordem definida, usar ela como base
    if (config.metricsOrder && config.metricsOrder.length > 0) {
      console.log('Using custom metrics order:', config.metricsOrder);
      
      // Adicionar itens na ordem especificada (apenas os que estão habilitados)
      config.metricsOrder.forEach(key => {
        if (enabledMetrics.includes(key)) {
          orderedItems.push(key);
        }
      });

      // Adicionar métricas habilitadas que não estão na ordem especificada
      enabledMetrics.forEach(key => {
        if (!orderedItems.includes(key)) {
          orderedItems.push(key);
        }
      });
    } else {
      // Se não há ordem definida, usar todas as métricas habilitadas
      orderedItems = [...enabledMetrics];
    }

    // Adicionar gráficos se habilitados
    if (config.showCharts) {
      orderedItems.push('salesChart', 'growthChart');
    }

    // Adicionar metas mensais se habilitadas
    if (config.showMonthlyGoals) {
      if (config.showConversion) {
        orderedItems.push('conversionRate');
      }
      if (config.showRevenue) {
        orderedItems.push('revenueGoal', 'salesGoal');
      }
    }

    console.log('Final ordered items:', orderedItems);
    return orderedItems;
  };

  return { getOrderedItems };
};
