
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { allMetricsCards } from '../data/metrics';
import { SalesChart, GrowthChart } from '../charts/ChartComponents';
import { RevenueEvolutionChart, BillingEvolutionChart } from '../charts/EvolutionCharts';
import SpecificGoalsCards from '../goals/SpecificGoalsCards';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ itemKey, config }) => {
  console.log('🔍 ItemRenderer - Processing key:', itemKey);
  console.log('🔍 ItemRenderer - Full config:', config);
  
  // Lista de todas as chaves de métricas que devem ser renderizadas como cards
  const metricKeys = [
    'showConversion', 'showRevenue',
    'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
    'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
    'showHiperMetaReceita', 'showFaltaReceitaSuper',
    'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita', 
    'showQuantidadeVendas', 'showCashCollect', 'showCac'
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
    
    const metrics = allMetricsCards.filter(m => m.key === itemKey);
    console.log(`✅ Found ${metrics.length} metrics for key ${itemKey}`);
    
    return (
      <>
        {metrics.map((metric, index) => (
          <Card key={`${metric.key}-${index}`} className="h-40 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
              <CardTitle className="text-xs font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-3 w-3 ${metric.color} flex-shrink-0`} />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-3">
              <div className="text-lg font-bold">{metric.value}</div>
              <div className="mt-auto">
                <p className="text-xs text-gray-600 mt-1">
                  {metric.description}
                </p>
                <div className="text-xs text-green-600 mt-2">
                  {metric.trend} vs mês anterior
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    );
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

  // Gráfico de vendas por mês - verificar se está habilitado
  if (itemKey === 'salesChart') {
    if (!config.showCharts) {
      console.log('❌ Charts are disabled, not rendering sales chart');
      return null;
    }
    console.log('✅ Rendering sales chart');
    return <SalesChart />;
  }

  // Gráfico de tendência de crescimento - verificar se está habilitado
  if (itemKey === 'growthChart') {
    if (!config.showCharts) {
      console.log('❌ Charts are disabled, not rendering growth chart');
      return null;
    }
    console.log('✅ Rendering growth chart');
    return <GrowthChart />;
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
