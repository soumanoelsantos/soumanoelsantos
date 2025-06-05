
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

  // Cards de métricas básicas
  if (metricKeys.includes(itemKey) && config[itemKey as keyof typeof config]) {
    const metrics = allMetricsCards.filter(m => m.key === itemKey);
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

  // Gráfico de vendas por mês
  if (itemKey === 'salesChart' && config.showCharts) {
    return <SalesChart />;
  }

  // Gráfico de tendência de crescimento
  if (itemKey === 'growthChart' && config.showCharts) {
    return <GrowthChart />;
  }

  // Taxa de conversão
  if (itemKey === 'conversionRate' && config.showMonthlyGoals && config.showConversion) {
    return <ConversionRateCard />;
  }

  // Meta de faturamento
  if (itemKey === 'revenueGoal' && config.showMonthlyGoals && config.showRevenue) {
    return <RevenueGoalCard />;
  }

  // Meta de receita
  if (itemKey === 'salesGoal' && config.showMonthlyGoals && config.showRevenue) {
    return <SalesGoalCard />;
  }

  return null;
};
