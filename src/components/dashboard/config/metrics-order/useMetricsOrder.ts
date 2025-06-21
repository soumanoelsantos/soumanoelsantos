
import { DashboardConfig } from '@/types/dashboardConfig';
import { MetricItem } from './types';
import { METRIC_TITLES, ALL_METRIC_KEYS } from './constants';

export const useMetricsOrder = (config: DashboardConfig) => {
  const getEnabledMetrics = (): MetricItem[] => {
    const enabledMetrics: MetricItem[] = [];

    // Adicionar métricas de cards habilitadas
    ALL_METRIC_KEYS.forEach(key => {
      if (config[key as keyof DashboardConfig]) {
        enabledMetrics.push({
          key,
          title: METRIC_TITLES[key] || key,
          enabled: true
        });
      }
    });

    // Adicionar gráficos de evolução se habilitados
    if (config.showRevenueEvolutionChart) {
      enabledMetrics.push({ 
        key: 'revenueEvolutionChart', 
        title: METRIC_TITLES['revenueEvolutionChart'], 
        enabled: true 
      });
    }
    
    if (config.showBillingEvolutionChart) {
      enabledMetrics.push({ 
        key: 'billingEvolutionChart', 
        title: METRIC_TITLES['billingEvolutionChart'], 
        enabled: true 
      });
    }
    
    // Adicionar gráficos de vendedores se habilitados
    if (config.showSellerRevenueChart) {
      enabledMetrics.push({ 
        key: 'sellerRevenueChart', 
        title: METRIC_TITLES['sellerRevenueChart'], 
        enabled: true 
      });
    }
    
    if (config.showSellerBillingChart) {
      enabledMetrics.push({ 
        key: 'sellerBillingChart', 
        title: METRIC_TITLES['sellerBillingChart'], 
        enabled: true 
      });
    }

    // Adicionar gráficos de análise temporal se habilitados
    if (config.showTemporalRevenueChart) {
      enabledMetrics.push({ 
        key: 'temporalRevenueChart', 
        title: METRIC_TITLES['temporalRevenueChart'], 
        enabled: true 
      });
    }
    
    if (config.showTemporalBillingChart) {
      enabledMetrics.push({ 
        key: 'temporalBillingChart', 
        title: METRIC_TITLES['temporalBillingChart'], 
        enabled: true 
      });
    }

    return enabledMetrics;
  };

  const getOrderedMetrics = (metricsOrder: string[]): MetricItem[] => {
    const enabledMetrics = getEnabledMetrics();
    
    return metricsOrder
      .map(key => enabledMetrics.find(metric => metric.key === key))
      .filter((metric): metric is MetricItem => metric !== undefined)
      .concat(
        enabledMetrics.filter(metric => !metricsOrder.includes(metric.key))
      );
  };

  return {
    getOrderedMetrics
  };
};
