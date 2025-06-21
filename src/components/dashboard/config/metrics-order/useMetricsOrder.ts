
import { DashboardConfig } from '@/types/dashboardConfig';
import { MetricItem } from './types';
import { METRIC_TITLES, ALL_METRIC_KEYS } from './constants';

export const useMetricsOrder = (config: DashboardConfig) => {
  const getEnabledMetrics = (): MetricItem[] => {
    const enabledMetrics: MetricItem[] = [];

    // Lista específica de métricas comerciais com suas chaves exatas
    const commercialMetrics = [
      'showConversion',
      'showTicketFaturamento', 
      'showTicketReceita',
      'showFaturamento',
      'showReceita', 
      'showQuantidadeVendas',
      'showMetaFaturamento',
      'showMetaReceita',
      'showSuperMetaFaturamento',
      'showSuperMetaReceita', 
      'showHiperMetaFaturamento',
      'showHiperMetaReceita',
      'showFaltaFaturamento',
      'showFaltaReceita',
      'showFaltaFaturamentoSuper',
      'showFaltaFaturamentoHiper',
      'showFaltaReceitaSuper', 
      'showFaltaReceitaHiper',
      'showDiariaReceita',
      'showDiariaFaturamento',
      'showCashCollect',
      'showCac',
      'showProjecaoReceita',
      'showProjecaoFaturamento', 
      'showNoShow',
      'showClosersPerformanceTable'
    ];

    // Verificar apenas métricas comerciais específicas
    commercialMetrics.forEach(key => {
      const configValue = config[key as keyof DashboardConfig];
      if (configValue === true) {
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

    console.log('🔍 [DEBUG] Enabled metrics found:', enabledMetrics.length, enabledMetrics.map(m => m.key));
    return enabledMetrics;
  };

  const getOrderedMetrics = (metricsOrder: string[]): MetricItem[] => {
    const enabledMetrics = getEnabledMetrics();
    
    // Se não há métricas habilitadas, retornar array vazio
    if (enabledMetrics.length === 0) {
      console.log('🔍 [DEBUG] No enabled metrics, returning empty array');
      return [];
    }
    
    // Filtrar apenas os itens que estão habilitados
    const orderedEnabledMetrics = metricsOrder
      .map(key => enabledMetrics.find(metric => metric.key === key))
      .filter((metric): metric is MetricItem => metric !== undefined);
    
    // Adicionar métricas habilitadas que não estão na ordem personalizada
    const unorderedEnabledMetrics = enabledMetrics.filter(
      metric => !metricsOrder.includes(metric.key)
    );
    
    const finalOrder = [...orderedEnabledMetrics, ...unorderedEnabledMetrics];
    console.log('🔍 [DEBUG] Final ordered metrics:', finalOrder.length, finalOrder.map(m => m.key));
    
    return finalOrder;
  };

  return {
    getOrderedMetrics
  };
};
