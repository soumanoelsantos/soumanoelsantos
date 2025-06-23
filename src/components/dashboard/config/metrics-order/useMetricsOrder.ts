
import { useMemo } from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { AVAILABLE_METRICS } from './constants';

export const useMetricsOrder = (config: DashboardConfig) => {
  const availableMetrics = useMemo(() => {
    return AVAILABLE_METRICS.filter(metric => {
      // Verificar se a métrica está habilitada na configuração
      const configKey = metric.key as keyof DashboardConfig;
      return config[configKey] === true;
    });
  }, [config]);

  const orderedMetrics = useMemo(() => {
    if (!config.metricsOrder || config.metricsOrder.length === 0) {
      return availableMetrics;
    }

    // Ordenar baseado na ordem personalizada
    const ordered = config.metricsOrder
      .map(key => availableMetrics.find(metric => metric.key === key))
      .filter(Boolean);

    // Adicionar métricas que não estão na ordem personalizada
    const orderedKeys = ordered.map(m => m?.key);
    const missing = availableMetrics.filter(metric => !orderedKeys.includes(metric.key));

    return [...ordered, ...missing] as typeof availableMetrics;
  }, [availableMetrics, config.metricsOrder]);

  return {
    availableMetrics,
    orderedMetrics
  };
};
