
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { allMetricsCards } from '../data/metricsDefinitions';
import { SalesChart, GrowthChart } from '../charts/ChartComponents';
import { ConversionRateCard, RevenueGoalCard, SalesGoalCard } from '../goals/GoalComponents';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ itemKey, config }) => {
  console.log('ItemRenderer - Processing key:', itemKey, 'Config value:', config[itemKey as keyof DashboardConfig]);
  
  // Lista de todas as chaves de métricas que devem ser renderizadas como cards
  const metricKeys = [
    'showSales', 'showLeads', 'showTicketMedio', 'showTeam',
    'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
    'showFaltaReceita', 'showConversao', 'showDiariaReceita',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
    'showHiperMetaReceita', 'showCallsDiarias', 'showFaltaReceitaSuper',
    'showFaltaReceitaHiper', 'showMetaFaturamento', 'showMetaReceita',
    'showFaturamento', 'showReceita', 'showQuantidadeVendas', 'showCashCollect'
  ];

  // Verificar se a chave é uma métrica e se está habilitada
  if (metricKeys.includes(itemKey)) {
    const isEnabled = config[itemKey as keyof DashboardConfig] as boolean;
    console.log(`Metric ${itemKey} is enabled:`, isEnabled);
    
    if (isEnabled) {
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
  }

  // Gráfico de vendas por mês
  if (itemKey === 'salesChart' && config.showCharts) {
    console.log('Rendering sales chart');
    return <SalesChart />;
  }

  // Gráfico de tendência de crescimento
  if (itemKey === 'growthChart' && config.showCharts) {
    console.log('Rendering growth chart');
    return <GrowthChart />;
  }

  // Taxa de conversão
  if (itemKey === 'conversionRate' && config.showMonthlyGoals && config.showConversion) {
    console.log('Rendering conversion rate card');
    return <ConversionRateCard />;
  }

  // Meta de faturamento
  if (itemKey === 'revenueGoal' && config.showMonthlyGoals && config.showRevenue) {
    console.log('Rendering revenue goal card');
    return <RevenueGoalCard />;
  }

  // Meta de receita
  if (itemKey === 'salesGoal' && config.showMonthlyGoals && config.showRevenue) {
    console.log('Rendering sales goal card');
    return <SalesGoalCard />;
  }

  console.log(`No render for key: ${itemKey}`);
  return null;
};
