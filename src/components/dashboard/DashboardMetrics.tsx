
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Target, DollarSign, Award } from 'lucide-react';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();

  // Dados dos gráficos
  const salesData = [
    { month: 'Jan', value: 3500 },
    { month: 'Fev', value: 3000 },
    { month: 'Mar', value: 5500 },
    { month: 'Abr', value: 4500 },
    { month: 'Mai', value: 6000 },
  ];

  // Definição de todos os cards de métricas
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

  // Função para renderizar um item individual
  const renderItem = (key: string) => {
    // Cards de métricas básicas
    if (key.startsWith('show') && config[key as keyof typeof config]) {
      const metrics = allMetricsCards.filter(m => m.key === key);
      return metrics.map((metric, index) => (
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
      ));
    }

    // Gráfico de vendas por mês
    if (key === 'salesChart' && config.showCharts) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Mês</CardTitle>
            <CardContent className="text-sm text-gray-600">Evolução das vendas mensais</CardContent>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    }

    // Gráfico de tendência de crescimento
    if (key === 'growthChart' && config.showCharts) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Tendência de Crescimento</CardTitle>
            <CardContent className="text-sm text-gray-600">Projeção baseada nos dados atuais</CardContent>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      );
    }

    // Taxa de conversão
    if (key === 'conversionRate' && config.showMonthlyGoals && config.showConversion) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão</CardTitle>
            <CardContent className="text-sm text-gray-600">Percentual de conversão no período</CardContent>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">68%</div>
            <div className="text-sm text-gray-600 mt-2">da Meta</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </CardContent>
        </Card>
      );
    }

    // Meta de faturamento
    if (key === 'revenueGoal' && config.showMonthlyGoals && config.showRevenue) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Meta de Faturamento</CardTitle>
            <CardContent className="text-sm text-gray-600">Progresso da meta mensal</CardContent>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600">R$ 0,00</div>
            <div className="text-sm text-gray-600 mt-2">Meta do Mês</div>
            <div className="text-sm text-gray-500 mt-1">Progresso: 0,0%</div>
          </CardContent>
        </Card>
      );
    }

    // Meta de receita
    if (key === 'salesGoal' && config.showMonthlyGoals && config.showRevenue) {
      return (
        <Card>
          <CardHeader>
            <CardTitle>Meta de Receita</CardTitle>
            <CardContent className="text-sm text-gray-600">Progresso da meta de receita</CardContent>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">R$ 0,00</div>
            <div className="text-sm text-gray-600 mt-2">Meta do Mês</div>
            <div className="text-sm text-gray-500 mt-1">Progresso: 0,0%</div>
          </CardContent>
        </Card>
      );
    }

    return null;
  };

  // Gera a lista ordenada de componentes
  const getOrderedItems = () => {
    if (!config.metricsOrder || config.metricsOrder.length === 0) {
      // Ordem padrão
      const defaultOrder = ['showSales', 'showLeads', 'showConversion', 'showRevenue', 'showTicketMedio', 'showTeam'];
      if (config.showCharts) {
        defaultOrder.push('salesChart', 'growthChart');
      }
      if (config.showMonthlyGoals) {
        defaultOrder.push('conversionRate', 'revenueGoal', 'salesGoal');
      }
      return defaultOrder;
    }

    return config.metricsOrder;
  };

  const orderedItems = getOrderedItems();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {orderedItems.map((key, index) => {
        const components = renderItem(key);
        if (!components) return null;
        
        if (Array.isArray(components)) {
          return components.map((component, subIndex) => (
            <div key={`${key}-${index}-${subIndex}`}>
              {component}
            </div>
          ));
        }
        
        return (
          <div key={`${key}-${index}`}>
            {components}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardMetrics;
