
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
  // Cards de métricas básicas
  if (itemKey.startsWith('show') && config[itemKey as keyof typeof config]) {
    const metrics = allMetricsCards.filter(m => m.key === itemKey);
    return (
      <>
        {metrics.map((metric, index) => (
          <Card key={`${metric.key}-${index}`} className="h-40 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className={`h-4 w-4 ${metric.color} flex-shrink-0`} />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between">
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="mt-auto">
                <p className="text-xs text-gray-600 mt-1">
                  {metric.description}
                </p>
                <div className="text-sm text-green-600 mt-2">
                  {metric.trend} vs mês anterior
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </>
    );
  }

  // Gráfico de vendas por mês - ocupa toda a linha
  if (itemKey === 'salesChart' && config.showCharts) {
    return (
      <div className="col-span-full">
        <SalesChart />
      </div>
    );
  }

  // Gráfico de tendência de crescimento - ocupa toda a linha
  if (itemKey === 'growthChart' && config.showCharts) {
    return (
      <div className="col-span-full">
        <GrowthChart />
      </div>
    );
  }

  // Taxa de conversão
  if (itemKey === 'conversionRate' && config.showMonthlyGoals && config.showConversion) {
    return (
      <div className="h-40">
        <ConversionRateCard />
      </div>
    );
  }

  // Meta de faturamento
  if (itemKey === 'revenueGoal' && config.showMonthlyGoals && config.showRevenue) {
    return (
      <div className="h-40">
        <RevenueGoalCard />
      </div>
    );
  }

  // Meta de receita
  if (itemKey === 'salesGoal' && config.showMonthlyGoals && config.showRevenue) {
    return (
      <div className="h-40">
        <SalesGoalCard />
      </div>
    );
  }

  return null;
};
