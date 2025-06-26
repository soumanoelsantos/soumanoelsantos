
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, UserX, Users } from 'lucide-react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { usePreSalesGoals } from '@/hooks/usePreSalesGoals';

interface PreSalesData {
  dailyCalls: number;
  dailyCallsTarget: number;
  dailySchedulings: number;
  dailySchedulingsTarget: number;
  dailyNoShow: number;
  dailyNoShowRate: number;
  totalSDRs: number;
  averageSchedulingsPerSDR: number;
  // Novos campos
  monthlyCallsAverage: number;
  monthlySchedulingsAverage: number;
  monthlyNoShowRate: number;
  sdrPerformance: Array<{
    name: string;
    calls: number;
    schedulings: number;
    noShow: number;
    conversionRate: number;
  }>;
  weeklyData: Array<{
    date: string;
    calls: number;
    schedulings: number;
    noShow: number;
  }>;
}

interface PreSalesMetricsCardsProps {
  config: DashboardConfig;
  preSalesData: PreSalesData;
}

const PreSalesMetricsCards: React.FC<PreSalesMetricsCardsProps> = ({ config, preSalesData }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  const { preSalesGoals } = usePreSalesGoals(currentMonth, currentYear);
  
  console.log('🔍 PreSalesMetricsCards - Goals loaded:', preSalesGoals);
  
  // Buscar meta de tentativas de ligação (agora busca por nome exato)
  const dailyCallsGoal = preSalesGoals.find(goal => 
    goal.goal_type?.category === 'pre_vendas' && 
    goal.goal_type?.name === 'Tentativas de Ligação Diárias'
  );

  // Buscar meta de agendamentos
  const dailySchedulingsGoal = preSalesGoals.find(goal => 
    goal.goal_type?.category === 'pre_vendas' && 
    goal.goal_type?.name === 'Agendamentos Diários'
  );

  console.log('🔍 PreSalesMetricsCards - Daily calls goal found:', dailyCallsGoal);
  console.log('🔍 PreSalesMetricsCards - Daily schedulings goal found:', dailySchedulingsGoal);

  const cards = [
    {
      key: 'showPreSalesCalls',
      title: 'Média Diária de Tentativas',
      subtitle: 'No mês atual (dias úteis)',
      value: preSalesData.monthlyCallsAverage,
      target: dailyCallsGoal?.target_value || preSalesData.dailyCallsTarget,
      icon: Phone,
      show: config.showPreSalesCalls,
      format: (val: number) => val.toFixed(1)
    },
    {
      key: 'showPreSalesSchedulings',
      title: 'Média Diária de Agendamentos',
      subtitle: 'No mês atual (dias úteis)',
      value: preSalesData.monthlySchedulingsAverage,
      target: dailySchedulingsGoal?.target_value || preSalesData.dailySchedulingsTarget,
      icon: Calendar,
      show: config.showPreSalesSchedulings,
      format: (val: number) => val.toFixed(1)
    },
    {
      key: 'showPreSalesNoShow',
      title: 'No-Show Mensal',
      subtitle: 'Taxa do mês atual',
      value: preSalesData.monthlyNoShowRate,
      target: null,
      icon: UserX,
      show: config.showPreSalesNoShow,
      format: (val: number) => `${val.toFixed(1)}%`
    },
    {
      key: 'showPreSalesSDRTable',
      title: 'Total SDRs',
      subtitle: 'Vendedores ativos',
      value: preSalesData.totalSDRs,
      target: null,
      icon: Users,
      show: config.showPreSalesSDRTable,
      format: (val: number) => val.toString()
    }
  ];

  const visibleCards = cards.filter(card => card.show);

  return (
    <div className="space-y-4">
      {/* Cards de métricas atualizados */}
      {visibleCards.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleCards.map((card) => {
            const Icon = card.icon;
            const percentage = card.target ? Math.round((card.value / card.target) * 100) : null;
            
            return (
              <Card key={card.key}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <div className="space-y-1">
                    <CardTitle className="text-sm font-medium text-gray-600">
                      {card.title}
                    </CardTitle>
                    {card.subtitle && (
                      <p className="text-xs text-gray-500">{card.subtitle}</p>
                    )}
                  </div>
                  <Icon className="h-4 w-4 text-gray-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">
                    {card.format(card.value)}
                  </div>
                  {card.target && (
                    <p className="text-xs text-gray-600 mt-1">
                      Meta: {card.format(card.target)} ({percentage}%)
                    </p>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default PreSalesMetricsCards;
