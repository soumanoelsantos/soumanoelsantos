
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, Target, DollarSign } from 'lucide-react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();
  
  // Dados mockados baseados nas imagens
  const salesData = [
    { month: 'Jan', value: 3500 },
    { month: 'Fev', value: 3000 },
    { month: 'Mar', value: 5500 },
    { month: 'Abr', value: 4500 },
    { month: 'Mai', value: 6000 },
  ];

  const metricsCards = [
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
    }
  ];

  const filteredMetrics = metricsCards.filter(metric => config[metric.key as keyof typeof config]);

  return (
    <div className="space-y-6">
      {/* Cards de Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredMetrics.map((metric, index) => (
          <Card key={index}>
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

      {/* Gráficos - só exibe se showCharts estiver habilitado */}
      {config.showCharts && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Gráfico de Barras - Vendas por Mês */}
          <Card>
            <CardHeader>
              <CardTitle>Vendas por Mês</CardTitle>
              <CardDescription>Evolução das vendas mensais</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
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

          {/* Gráfico de Linha - Tendência */}
          <Card>
            <CardHeader>
              <CardTitle>Tendência de Crescimento</CardTitle>
              <CardDescription>Projeção baseada nos dados atuais</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
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
        </div>
      )}

      {/* Indicadores Adicionais - só exibe se showMonthlyGoals estiver habilitado */}
      {config.showMonthlyGoals && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {config.showConversion && (
            <Card>
              <CardHeader>
                <CardTitle>Taxa de Conversão</CardTitle>
                <CardDescription>Percentual de conversão no período</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">68%</div>
                <div className="text-sm text-gray-600 mt-2">da Meta</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                </div>
              </CardContent>
            </Card>
          )}

          {config.showRevenue && (
            <>
              <Card>
                <CardHeader>
                  <CardTitle>Meta de Faturamento</CardTitle>
                  <CardDescription>Progresso da meta mensal</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-blue-600">R$ 0,00</div>
                  <div className="text-sm text-gray-600 mt-2">Meta do Mês</div>
                  <div className="text-sm text-gray-500 mt-1">Progresso: 0,0%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Meta de Receita</CardTitle>
                  <CardDescription>Progresso da meta de receita</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-600">R$ 0,00</div>
                  <div className="text-sm text-gray-600 mt-2">Meta do Mês</div>
                  <div className="text-sm text-gray-500 mt-1">Progresso: 0,0%</div>
                </CardContent>
              </Card>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default DashboardMetrics;
