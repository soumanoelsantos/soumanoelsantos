
import { DashboardConfig } from '@/types/dashboardConfig';

export interface PreSalesOrderItem {
  key: string;
  label: string;
  enabled: boolean;
}

export const usePreSalesOrder = (config: DashboardConfig) => {
  const getAllPreSalesItems = (): PreSalesOrderItem[] => {
    return [
      {
        key: 'showPreSalesCalls',
        label: 'Tentativas de Ligação Diárias',
        enabled: config.showPreSalesCalls
      },
      {
        key: 'showPreSalesSchedulings',
        label: 'Agendamentos Diários',
        enabled: config.showPreSalesSchedulings
      },
      {
        key: 'showPreSalesNoShow',
        label: 'No-Show Diário',
        enabled: config.showPreSalesNoShow
      },
      {
        key: 'showPreSalesSDRTable',
        label: 'Tabela de Performance dos SDRs',
        enabled: config.showPreSalesSDRTable
      },
      {
        key: 'showPreSalesCallsChart',
        label: 'Gráfico de Tentativas de Ligação',
        enabled: config.showPreSalesCallsChart
      },
      {
        key: 'showPreSalesSchedulingChart',
        label: 'Gráfico de Agendamentos',
        enabled: config.showPreSalesSchedulingChart
      },
      {
        key: 'showPreSalesNoShowChart',
        label: 'Gráfico de No-Show',
        enabled: config.showPreSalesNoShowChart
      },
      {
        key: 'showPreSalesSDRComparisonChart',
        label: 'Comparação entre SDRs',
        enabled: config.showPreSalesSDRComparisonChart
      }
    ];
  };

  const getOrderedPreSalesItems = (customOrder: string[]): PreSalesOrderItem[] => {
    const allItems = getAllPreSalesItems();
    const enabledItems = allItems.filter(item => item.enabled);

    if (!customOrder || customOrder.length === 0) {
      return enabledItems;
    }

    // Ordenar baseado na ordem customizada
    const orderedItems: PreSalesOrderItem[] = [];
    
    // Primeiro, adicionar itens na ordem especificada
    customOrder.forEach(key => {
      const item = enabledItems.find(item => item.key === key);
      if (item) {
        orderedItems.push(item);
      }
    });

    // Depois, adicionar itens habilitados que não estão na ordem customizada
    enabledItems.forEach(item => {
      if (!orderedItems.find(orderedItem => orderedItem.key === item.key)) {
        orderedItems.push(item);
      }
    });

    return orderedItems;
  };

  return {
    getAllPreSalesItems,
    getOrderedPreSalesItems
  };
};
