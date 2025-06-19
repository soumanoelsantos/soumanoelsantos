
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, UserCheck, UserX, Users, TrendingUp } from 'lucide-react';
import PreSalesCallsChart from './charts/PreSalesCallsChart';
import PreSalesSchedulingChart from './charts/PreSalesSchedulingChart';
import PreSalesNoShowChart from './charts/PreSalesNoShowChart';
import PreSalesSDRComparisonChart from './charts/PreSalesSDRComparisonChart';
import PreSalesSDRTable from './tables/PreSalesSDRTable';

const PreSalesMetrics = () => {
  console.log('🔍 PreSalesMetrics - Rendering pre-sales dashboard');

  // Dados mock para demonstração
  const mockData = {
    dailyCalls: 125,
    dailyCallsTarget: 150,
    dailySchedulings: 18,
    dailySchedulingsTarget: 25,
    dailyNoShow: 3,
    dailyNoShowRate: 16.7,
    totalSDRs: 4,
    averageSchedulingsPerSDR: 4.5
  };

  return (
    <div className="space-y-8">
      {/* Cards de métricas principais */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Tentativas de Ligação
            </CardTitle>
            <Phone className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.dailyCalls}</div>
            <p className="text-xs text-gray-600 mt-1">
              Meta: {mockData.dailyCallsTarget}
            </p>
            <div className="text-xs text-green-600 mt-2">
              {((mockData.dailyCalls / mockData.dailyCallsTarget) * 100).toFixed(1)}% da meta
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Agendamentos Diários
            </CardTitle>
            <Calendar className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.dailySchedulings}</div>
            <p className="text-xs text-gray-600 mt-1">
              Meta: {mockData.dailySchedulingsTarget}
            </p>
            <div className="text-xs text-green-600 mt-2">
              {((mockData.dailySchedulings / mockData.dailySchedulingsTarget) * 100).toFixed(1)}% da meta
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              No-Show Diário
            </CardTitle>
            <UserX className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.dailyNoShow}</div>
            <p className="text-xs text-gray-600 mt-1">
              Taxa: {mockData.dailyNoShowRate}%
            </p>
            <div className="text-xs text-red-600 mt-2">
              {mockData.dailyNoShowRate > 20 ? 'Acima do ideal' : 'Dentro do esperado'}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-600">
              Média por SDR
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockData.averageSchedulingsPerSDR}</div>
            <p className="text-xs text-gray-600 mt-1">
              Agendamentos/SDR
            </p>
            <div className="text-xs text-purple-600 mt-2">
              {mockData.totalSDRs} SDRs ativos
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PreSalesCallsChart />
        <PreSalesSchedulingChart />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <PreSalesNoShowChart />
        <PreSalesSDRComparisonChart />
      </div>

      {/* Tabela de SDRs */}
      <PreSalesSDRTable />
    </div>
  );
};

export default PreSalesMetrics;
