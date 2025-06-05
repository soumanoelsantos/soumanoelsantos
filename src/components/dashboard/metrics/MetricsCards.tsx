
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Target, DollarSign, Award } from 'lucide-react';
import { DashboardConfig } from '@/hooks/useDashboardConfig';

interface MetricsCardsProps {
  config: DashboardConfig;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ config }) => {
  const allMetricsCards = [
    {
      key: 'showSales',
      title: 'Total de Vendas',
      value: 'R$ 30.000,00',
      description: 'Total do período',
      icon: DollarSign,
      trend: '+12%',
      color: 'text-green-600'
    },
    {
      key: 'showSales',
      title: 'Número de Vendas',
      value: '7',
      description: 'Total de vendas',
      icon: Target,
      trend: '+5%',
      color: 'text-blue-600'
    },
    {
      key: 'showLeads',
      title: 'Leads Gerados',
      value: '3',
      description: 'Novos leads',
      icon: Users,
      trend: '+8%',
      color: 'text-purple-600'
    },
    {
      key: 'showTicketMedio',
      title: 'Ticket Médio',
      value: 'R$ 5.420',
      description: 'Valor médio por venda',
      icon: TrendingUp,
      trend: '+15%',
      color: 'text-orange-600'
    },
    {
      key: 'showTeam',
      title: 'Performance da Equipe',
      value: '85%',
      description: 'Média geral da equipe',
      icon: Award,
      trend: '+3%',
      color: 'text-indigo-600'
    }
  ];

  const getOrderedMetrics = () => {
    if (!config.metricsOrder || config.metricsOrder.length === 0) {
      return allMetricsCards.filter(metric => config[metric.key as keyof typeof config]);
    }

    const orderedMetrics: typeof allMetricsCards = [];
    
    config.metricsOrder.forEach(key => {
      const metrics = allMetricsCards.filter(m => m.key === key && config[key as keyof typeof config]);
      orderedMetrics.push(...metrics);
    });

    allMetricsCards.forEach(metric => {
      if (!config.metricsOrder.includes(metric.key) && config[metric.key as keyof typeof config]) {
        orderedMetrics.push(metric);
      }
    });

    return orderedMetrics;
  };

  const orderedMetrics = getOrderedMetrics();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {orderedMetrics.map((metric, index) => (
        <Card key={`${metric.key}-${index}`}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              {metric.title}
            </CardTitle>
            <metric.icon className={`h-4 w-4 ${metric.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metric.value}</div>
            <p className="text-xs text-gray-600 mt-1">
              {metric.description}
            </p>
            <div className="text-sm text-green-600 mt-2">
              {metric.trend} vs mês anterior
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
