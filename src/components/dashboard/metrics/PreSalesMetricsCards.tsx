
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, UserX, Users, Target } from 'lucide-react';
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
  
  // Buscar meta de tentativas de ligação diárias
  const dailyCallsGoal = preSalesGoals.find(goal => 
    goal.goal_type?.category === 'pre_vendas' && 
    goal.goal_type?.unit === 'tentativas' &&
    goal.goal_type?.name.toLowerCase().includes('tentativas')
  );

  const cards = [
    {
      key: 'showPreSalesCalls',
      title: 'Ligações Hoje',
      value: preSalesData.dailyCalls,
      target: dailyCallsGoal?.target_value || preSalesData.dailyCallsTarget,
      icon: Phone,
      show: config.showPreSalesCalls
    },
    {
      key: 'showPreSalesSchedulings',
      title: 'Agendamentos Hoje',
      value: preSalesData.dailySchedulings,
      target: preSalesData.dailySchedulingsTarget,
      icon: Calendar,
      show: config.showPreSalesSchedulings
    },
    {
      key: 'showPreSalesNoShow',
      title: 'No-Show Hoje',
      value: preSalesData.dailyNoShow,
      target: null,
      icon: UserX,
      show: config.showPreSalesNoShow
    },
    {
      key: 'showPreSalesSDRTable',
      title: 'Total SDRs',
      value: preSalesData.totalSDRs,
      target: null,
      icon: Users,
      show: config.showPreSalesSDRTable
    }
  ];

  // Adicionar card específico para meta de tentativas se existir
  if (dailyCallsGoal && config.showPreSalesCalls) {
    const dailyTarget = Math.ceil((dailyCallsGoal.target_value || 0) / 30); // Dividir meta mensal por 30 dias
    const percentage = dailyTarget > 0 ? Math.round((preSalesData.dailyCalls / dailyTarget) * 100) : 0;
    
    // Substituir o card de ligações padrão
    const callsCardIndex = cards.findIndex(card => card.key === 'showPreSalesCalls');
    if (callsCardIndex !== -1) {
      cards[callsCardIndex] = {
        ...cards[callsCardIndex],
        target: dailyTarget,
        title: 'Meta Tentativas Diárias'
      };
    }
  }

  const visibleCards = cards.filter(card => card.show);

  if (visibleCards.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {/* Meta de Tentativas Diárias - Card destacado */}
      {dailyCallsGoal && config.showPreSalesCalls && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              Meta de Tentativas Diárias
            </CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-900">
              {preSalesData.dailyCalls}
            </div>
            <div className="space-y-1">
              <p className="text-xs text-blue-700">
                Meta diária: {Math.ceil((dailyCallsGoal.target_value || 0) / 30)} tentativas
              </p>
              <p className="text-xs text-blue-700">
                Meta mensal: {dailyCallsGoal.target_value} tentativas
              </p>
              <p className="text-xs text-blue-700">
                Progresso: {Math.round(((preSalesData.dailyCalls) / Math.ceil((dailyCallsGoal.target_value || 0) / 30)) * 100)}%
              </p>
              {dailyCallsGoal.seller && (
                <p className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded inline-block">
                  SDR: {dailyCallsGoal.seller.name}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cards de métricas normais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {visibleCards.map((card) => {
          // Pular o card de tentativas se já foi mostrado acima
          if (card.key === 'showPreSalesCalls' && dailyCallsGoal) {
            return null;
          }
          
          const Icon = card.icon;
          const percentage = card.target ? Math.round((card.value / card.target) * 100) : null;
          
          return (
            <Card key={card.key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {card.title}
                </CardTitle>
                <Icon className="h-4 w-4 text-gray-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">
                  {card.value}
                </div>
                {card.target && (
                  <p className="text-xs text-gray-600 mt-1">
                    Meta: {card.target} ({percentage}%)
                  </p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PreSalesMetricsCards;
