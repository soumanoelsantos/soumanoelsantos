
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, Target, DollarSign, Award } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { DashboardConfig } from '@/types/dashboardConfig';

interface MetricsCardsProps {
  config: DashboardConfig;
}

const MetricsCards: React.FC<MetricsCardsProps> = ({ config }) => {
  const { userId } = useAuth();

  // Buscar dados reais de vendas
  const { data: salesData } = useQuery({
    queryKey: ['sales-data', userId],
    queryFn: async () => {
      if (!userId) return null;
      
      const { data, error } = await supabase
        .from('seller_individual_sales')
        .select(`
          *,
          seller_id,
          sellers!inner(user_id)
        `)
        .eq('sellers.user_id', userId);
      
      if (error) {
        console.error('Error fetching sales data:', error);
        return [];
      }
      
      return data || [];
    },
    enabled: !!userId
  });

  // Buscar dados de leads
  const { data: leadsData } = useQuery({
    queryKey: ['leads-data'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('leads')
        .select('*');
      
      if (error) {
        console.error('Error fetching leads data:', error);
        return [];
      }
      
      return data || [];
    }
  });

  // Calcular métricas reais
  const totalSales = salesData?.length || 0;
  const totalRevenue = salesData?.reduce((sum, sale) => sum + (sale.revenue_amount || 0), 0) || 0;
  const totalBilling = salesData?.reduce((sum, sale) => sum + (sale.billing_amount || 0), 0) || 0;
  const totalLeads = leadsData?.length || 0;
  const ticketMedio = totalSales > 0 ? totalRevenue / totalSales : 0;

  const allMetricsCards = [
    {
      key: 'showSales',
      title: 'Total de Vendas',
      value: `R$ ${totalRevenue.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      description: 'Total do período',
      icon: DollarSign,
      trend: totalSales > 0 ? `${totalSales} vendas` : 'Sem vendas',
      color: 'text-green-600'
    },
    {
      key: 'showSales',
      title: 'Número de Vendas',
      value: totalSales.toString(),
      description: 'Total de vendas',
      icon: Target,
      trend: totalBilling > 0 ? `R$ ${totalBilling.toLocaleString('pt-BR')} faturamento` : 'Sem faturamento',
      color: 'text-blue-600'
    },
    {
      key: 'showLeads',
      title: 'Leads Gerados',
      value: totalLeads.toString(),
      description: 'Total de leads',
      icon: Users,
      trend: leadsData?.filter(lead => lead.status !== 'Novo').length > 0 ? 
        `${leadsData?.filter(lead => lead.status !== 'Novo').length} em andamento` : 
        'Todos novos',
      color: 'text-purple-600'
    },
    {
      key: 'showTicketMedio',
      title: 'Ticket Médio',
      value: `R$ ${ticketMedio.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`,
      description: 'Valor médio por venda',
      icon: TrendingUp,
      trend: totalSales > 0 ? 'Baseado em vendas reais' : 'Aguardando vendas',
      color: 'text-orange-600'
    },
    {
      key: 'showTeam',
      title: 'Performance da Equipe',
      value: totalSales > 0 ? '100%' : '0%',
      description: 'Baseado em vendas realizadas',
      icon: Award,
      trend: totalSales > 0 ? 'Com vendas ativas' : 'Sem vendas ainda',
      color: 'text-indigo-600'
    }
  ];

  const getOrderedMetrics = () => {
    if (!config.metricsOrder || config.metricsOrder.length === 0) {
      return allMetricsCards.filter(metric => config[metric.key as keyof typeof config]);
    }

    const orderedMetrics: typeof allMetricsCards = [];
    
    config.metricsOrder.forEach(key => {
      if (key.startsWith('show') && config[key as keyof typeof config]) {
        const metrics = allMetricsCards.filter(m => m.key === key);
        orderedMetrics.push(...metrics);
      }
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
              {metric.trend}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MetricsCards;
