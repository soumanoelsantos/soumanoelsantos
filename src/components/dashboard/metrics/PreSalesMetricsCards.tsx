
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
  
  console.log('🔍 PreSalesMetricsCards - Goals loaded:', preSalesGoals);
  
  // Buscar meta de tentativas de ligação diárias - lógica mais flexível
  const dailyCallsGoal = preSalesGoals.find(goal => 
    goal.goal_type?.category === 'pre_vendas' && 
    goal.goal_type?.unit === 'tentativas'
  );

  console.log('🔍 PreSalesMetricsCards - Daily calls goal found:', dailyCallsGoal);

  const cards = [
    {
      key: 'showPreSalesCalls',
      title: 'Ligações Hoje',
      value: preSalesData.dailyCalls,
      target: preSalesData.dailyCallsTarget,
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

  const visibleCards = cards.filter(card => card.show);

  return (
    <div className="space-y-4">
      {/* Meta de Tentativas Diárias - Card destacado - SEMPRE VISÍVEL quando configurado */}
      {dailyCallsGoal && config.showPreSalesCalls && (
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-blue-800">
              🎯 Meta de Tentativas Diárias
            </CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-900">
              {preSalesData.dailyCalls}
            </div>
            <div className="space-y-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Meta diária:</span>
                <span className="text-sm font-semibold text-blue-800">
                  {Math.ceil((dailyCallsGoal.target_value || 0) / 30)} tentativas
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Meta mensal:</span>
                <span className="text-sm font-semibold text-blue-800">
                  {dailyCallsGoal.target_value} tentativas
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-700">Progresso:</span>
                <span className="text-sm font-semibold text-blue-800">
                  {Math.round(((preSalesData.dailyCalls) / Math.ceil((dailyCallsGoal.target_value || 0) / 30)) * 100)}%
                </span>
              </div>
              {dailyCallsGoal.seller && (
                <div className="mt-2">
                  <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded inline-block">
                    SDR: {dailyCallsGoal.seller.name}
                  </span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Mensagem quando não há metas configuradas */}
      {!dailyCallsGoal && config.showPreSalesCalls && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-yellow-800 flex items-center gap-2">
              <Target className="h-4 w-4" />
              Meta de Tentativas não configurada
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-yellow-700">
              Configure uma meta de tentativas de ligação em{' '}
              <span className="font-semibold">Gerenciar Metas</span> para visualizar 
              o indicador de desempenho.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Cards de métricas normais */}
      {visibleCards.length > 0 && (
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
      )}
    </div>
  );
};

export default PreSalesMetricsCards;
