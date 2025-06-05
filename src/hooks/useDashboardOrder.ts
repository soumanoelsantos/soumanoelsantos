
import { DashboardConfig } from './useDashboardConfig';

export const useDashboardOrder = (config: DashboardConfig) => {
  const getOrderedItems = () => {
    if (!config.metricsOrder || config.metricsOrder.length === 0) {
      // Ordem padrão
      const defaultOrder = ['showSales', 'showLeads', 'showConversion', 'showRevenue', 'showTicketMedio', 'showTeam'];
      if (config.showCharts) {
        defaultOrder.push('salesChart', 'growthChart');
      }
      if (config.showMonthlyGoals) {
        defaultOrder.push('conversionRate', 'revenueGoal', 'salesGoal');
      }
      return defaultOrder;
    }

    return config.metricsOrder;
  };

  return { getOrderedItems };
};
