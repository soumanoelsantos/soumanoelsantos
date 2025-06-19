
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Calendar, UserCheck, UserX, Users, TrendingUp } from 'lucide-react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { usePreSalesOrder } from './config/pre-sales-order/usePreSalesOrder';
import { usePreSalesData } from '@/hooks/usePreSalesData';
import PreSalesCallsChart from './charts/PreSalesCallsChart';
import PreSalesSchedulingChart from './charts/PreSalesSchedulingChart';
import PreSalesNoShowChart from './charts/PreSalesNoShowChart';
import PreSalesSDRComparisonChart from './charts/PreSalesSDRComparisonChart';
import PreSalesSDRTable from './tables/PreSalesSDRTable';

const PreSalesMetrics = () => {
  const { config } = useDashboardConfig();
  const { getOrderedPreSalesItems } = usePreSalesOrder(config);
  const { data: preSalesData, isLoading, error } = usePreSalesData();
  const orderedItems = getOrderedPreSalesItems(config.preSalesOrder);
  
  console.log('🔍 PreSalesMetrics - Rendering pre-sales dashboard with config:', config);
  console.log('🔍 PreSalesMetrics - Ordered items:', orderedItems);
  console.log('🔍 PreSalesMetrics - Pre-sales data:', preSalesData);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
              </CardHeader>
              <CardContent>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse mb-2"></div>
                <div className="h-3 w-20 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-8">
        <Card>
          <CardContent className="p-6">
            <div className="text-center text-red-600">
              <p>Erro ao carregar dados de pré-vendas: {error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!preSalesData) {
    return null;
  }

  // Função para renderizar cada componente baseado na ordem configurada
  const renderComponent = (itemKey: string) => {
    switch (itemKey) {
      case 'showPreSalesCalls':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Tentativas de Ligação
              </CardTitle>
              <Phone className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{preSalesData.dailyCalls}</div>
              <p className="text-xs text-gray-600 mt-1">
                Meta: {preSalesData.dailyCallsTarget}
              </p>
              <div className="text-xs text-green-600 mt-2">
                {((preSalesData.dailyCalls / preSalesData.dailyCallsTarget) * 100).toFixed(1)}% da meta
              </div>
            </CardContent>
          </Card>
        );

      case 'showPreSalesSchedulings':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                Agendamentos Diários
              </CardTitle>
              <Calendar className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{preSalesData.dailySchedulings}</div>
              <p className="text-xs text-gray-600 mt-1">
                Meta: {preSalesData.dailySchedulingsTarget}
              </p>
              <div className="text-xs text-green-600 mt-2">
                {((preSalesData.dailySchedulings / preSalesData.dailySchedulingsTarget) * 100).toFixed(1)}% da meta
              </div>
            </CardContent>
          </Card>
        );

      case 'showPreSalesNoShow':
        return (
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                No-Show Diário
              </CardTitle>
              <UserX className="h-4 w-4 text-red-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{preSalesData.dailyNoShow}</div>
              <p className="text-xs text-gray-600 mt-1">
                Taxa: {preSalesData.dailyNoShowRate}%
              </p>
              <div className="text-xs text-red-600 mt-2">
                {preSalesData.dailyNoShowRate > 20 ? 'Acima do ideal' : 'Dentro do esperado'}
              </div>
            </CardContent>
          </Card>
        );

      case 'showPreSalesCallsChart':
        return <PreSalesCallsChart data={preSalesData.weeklyData} />;

      case 'showPreSalesSchedulingChart':
        return <PreSalesSchedulingChart data={preSalesData.weeklyData} />;

      case 'showPreSalesNoShowChart':
        return <PreSalesNoShowChart data={preSalesData.weeklyData} />;

      case 'showPreSalesSDRComparisonChart':
        return <PreSalesSDRComparisonChart data={preSalesData.sdrPerformance} />;

      case 'showPreSalesSDRTable':
        return <PreSalesSDRTable data={preSalesData.sdrPerformance} />;

      default:
        return null;
    }
  };

  return (
    <div className="space-y-8">
      {/* Renderizar componentes na ordem configurada */}
      {orderedItems.map((item, index) => {
        const component = renderComponent(item.key);
        if (!component) return null;
        
        console.log(`🔍 PreSalesMetrics - Rendering component ${item.key} at position ${index}`);
        
        return (
          <div key={`${item.key}-${index}`} className="w-full">
            {component}
          </div>
        );
      })}
      
      {/* Card fixo da média por SDR (sempre no final) */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">
            Média por SDR
          </CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{preSalesData.averageSchedulingsPerSDR}</div>
          <p className="text-xs text-gray-600 mt-1">
            Agendamentos/SDR
          </p>
          <div className="text-xs text-purple-600 mt-2">
            {preSalesData.totalSDRs} SDRs ativos
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PreSalesMetrics;
