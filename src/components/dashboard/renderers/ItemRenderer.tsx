
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { allMetricsCards } from '../data/metrics';
import { RevenueEvolutionChart, BillingEvolutionChart } from '../charts/EvolutionCharts';
import SpecificGoalsCards from '../goals/SpecificGoalsCards';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ itemKey, config }) => {
  console.log('🔍 ItemRenderer - Processing key:', itemKey);
  console.log('🔍 ItemRenderer - Config value for key:', config[itemKey as keyof DashboardConfig]);
  
  // Lista completa de todas as chaves de métricas que devem ser renderizadas como cards
  const metricKeys = [
    'showConversion', 'showRevenue',
    'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
    'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
    'showHiperMetaReceita', 'showFaltaReceitaSuper',
    'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita', 
    'showQuantidadeVendas', 'showCashCollect', 'showCac',
    // Incluir explicitamente os novos indicadores de projeção
    'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow'
  ];

  // Verificar se a chave é uma métrica e se está habilitada
  if (metricKeys.includes(itemKey)) {
    const isEnabled = config[itemKey as keyof DashboardConfig] as boolean;
    console.log(`🔍 Metric ${itemKey} is enabled:`, isEnabled);
    
    // Se não está habilitada, não renderizar nada
    if (!isEnabled) {
      console.log(`❌ Metric ${itemKey} is disabled, not rendering`);
      return null;
    }
    
    // Buscar a métrica correspondente nos dados
    const metric = allMetricsCards.find(m => m.key === itemKey);
    console.log(`🔍 Found metric for key ${itemKey}:`, metric);
    
    // Se encontrou a métrica, renderizar o card sem bordas individuais
    if (metric) {
      console.log(`✅ Rendering metric card for ${itemKey}`);
      return (
        <div className="h-40 flex flex-col border-r border-b border-gray-200 last:border-r-0">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0 p-3">
            <div className="text-xs font-medium text-gray-600">
              {metric.title}
            </div>
            <metric.icon className={`h-3 w-3 ${metric.color} flex-shrink-0`} />
          </div>
          <div className="flex-1 flex flex-col justify-between p-3 pt-0">
            <div className="text-lg font-bold">{metric.value}</div>
            <div className="mt-auto">
              <p className="text-xs text-gray-600 mt-1">
                {metric.description}
              </p>
              <div className="text-xs text-green-600 mt-2">
                {metric.trend} vs mês anterior
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log(`❌ No metric data found for key: ${itemKey}`);
    }
    
    return null;
  }

  // Metas específicas - renderizar cada meta como um card individual
  if (itemKey === 'specificGoals') {
    if (!config.showSpecificGoals) {
      console.log('❌ Specific goals is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering specific goals cards');
    return <SpecificGoalsCards config={config} />;
  }

  // Gráfico de evolução de receita - verificar configuração específica
  if (itemKey === 'revenueEvolutionChart') {
    console.log('🔍 Revenue evolution chart - Config value:', config.showRevenueEvolutionChart);
    if (!config.showRevenueEvolutionChart) {
      console.log('❌ Revenue evolution chart is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering revenue evolution chart');
    return <RevenueEvolutionChart />;
  }

  // Gráfico de evolução de faturamento - verificar configuração específica
  if (itemKey === 'billingEvolutionChart') {
    console.log('🔍 Billing evolution chart - Config value:', config.showBillingEvolutionChart);
    if (!config.showBillingEvolutionChart) {
      console.log('❌ Billing evolution chart is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering billing evolution chart');
    return <BillingEvolutionChart />;
  }

  console.log(`❓ No render logic found for key: ${itemKey}`);
  return null;
};
