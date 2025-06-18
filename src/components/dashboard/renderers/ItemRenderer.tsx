
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { allMetricsCards } from '../data/metrics';
import { SalesChart, GrowthChart } from '../charts/ChartComponents';
import { ConversionRateCard, RevenueGoalCard, SalesGoalCard } from '../goals/GoalComponents';
import SpecificGoalsCards from '../goals/SpecificGoalsCards';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ itemKey, config }) => {
  console.log('ItemRenderer - Processing key:', itemKey, 'Config value:', config[itemKey as keyof DashboardConfig]);
  
  // Lista de todas as chaves de métricas que devem ser renderizadas como cards
  const metricKeys = [
    'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
    'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
    'showHiperMetaReceita', 'showFaltaReceitaSuper',
    'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita', 
    'showQuantidadeVendas', 'showCashCollect'
  ];

  // Verificar se a chave é uma métrica e se está habilitada
  if (metricKeys.includes(itemKey)) {
    const isEnabled = config[itemKey as keyof DashboardConfig] as boolean;
    console.log(`Metric ${itemKey} is enabled:`, isEnabled);
    
    // Se não está habilitada, não renderizar nada
    if (!isEnabled) {
      console.log(`Metric ${itemKey} is disabled, not rendering`);
      return null;
    }
    
    const metrics = allMetricsCards.filter(m => m.key === itemKey);
    console.log(`Found ${metrics.length} metrics for key ${itemKey}:`, metrics);
    
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

  // Metas específicas - verificar se está habilitado
  if (itemKey === 'specificGoals') {
    if (!config.showSpecificGoals) {
      console.log('Specific goals is disabled, not rendering');
      return null;
    }
    console.log('Rendering specific goals cards');
    return (
      <div className="col-span-full">
        <SpecificGoalsCards config={config} />
      </div>
    );
  }

  // Gráfico de vendas por mês - verificar se está habilitado
  if (itemKey === 'salesChart') {
    if (!config.showCharts) {
      console.log('Charts are disabled, not rendering sales chart');
      return null;
    }
    console.log('Rendering sales chart');
    return (
      <div className="col-span-full lg:col-span-3">
        <SalesChart />
      </div>
    );
  }

  // Gráfico de tendência de crescimento - verificar se está habilitado
  if (itemKey === 'growthChart') {
    if (!config.showCharts) {
      console.log('Charts are disabled, not rendering growth chart');
      return null;
    }
    console.log('Rendering growth chart');
    return (
      <div className="col-span-full lg:col-span-3">
        <GrowthChart />
      </div>
    );
  }

  // Taxa de conversão - verificar múltiplas condições
  if (itemKey === 'conversionRate') {
    if (!config.showMonthlyGoals || !config.showConversion) {
      console.log('Conversion rate card disabled - showMonthlyGoals:', config.showMonthlyGoals, 'showConversion:', config.showConversion);
      return null;
    }
    console.log('Rendering conversion rate card');
    return <ConversionRateCard />;
  }

  // Meta de faturamento - verificar múltiplas condições
  if (itemKey === 'revenueGoal') {
    if (!config.showMonthlyGoals || !config.showMetaFaturamento) {
      console.log('Revenue goal card disabled - showMonthlyGoals:', config.showMonthlyGoals, 'showMetaFaturamento:', config.showMetaFaturamento);
      return null;
    }
    console.log('Rendering revenue goal card');
    return <RevenueGoalCard />;
  }

  // Meta de receita - verificar múltiplas condições
  if (itemKey === 'salesGoal') {
    if (!config.showMonthlyGoals || !config.showMetaReceita) {
      console.log('Sales goal card disabled - showMonthlyGoals:', config.showMonthlyGoals, 'showMetaReceita:', config.showMetaReceita);
      return null;
    }
    console.log('Rendering sales goal card');
    return <SalesGoalCard />;
  }

  console.log(`No render for key: ${itemKey}`);
  return null;
};
