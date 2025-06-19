
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, UserX, Users } from 'lucide-react';
import { DashboardConfig } from '@/types/dashboardConfig';

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

  if (visibleCards.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {visibleCards.map((card) => {
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
  );
};

export default PreSalesMetricsCards;
