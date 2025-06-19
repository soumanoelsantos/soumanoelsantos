
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
  
  console.log('🔍 PreSalesMetrics - Rendering pre-sales dashboard with config:', config);
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

  // Obter itens ordenados baseado na configuração
  const orderedItems = getOrderedPreSalesItems(config.preSalesOrder || []);
  
  console.log('🔍 PreSalesMetrics - Ordered items:', orderedItems);

  // Função para renderizar cada componente baseado na chave
  const renderComponent = (itemKey: string) => {
    console.log('🔍 PreSalesMetrics - Rendering component:', itemKey);
    
    switch (itemKey) {
      case 'showPreSalesCallsChart':
        return <PreSalesCallsChart key={itemKey} data={preSalesData.weeklyData} />;

      case 'showPreSalesSchedulingChart':
        return <PreSalesSchedulingChart key={itemKey} data={preSalesData.weeklyData} />;

      case 'showPreSalesNoShowChart':
        return <PreSalesNoShowChart key={itemKey} data={preSalesData.weeklyData} />;

      case 'showPreSalesSDRComparisonChart':
        return <PreSalesSDRComparisonChart key={itemKey} data={preSalesData.sdrPerformance} />;

      case 'showPreSalesSDRTable':
        return <PreSalesSDRTable key={itemKey} data={preSalesData.sdrPerformance} />;

      default:
        return null;
    }
  };

  // Cards de métricas no mesmo estilo do comercial - renderizar apenas se algum estiver habilitado
  const showAnyMetricCard = config.showPreSalesCalls || config.showPreSalesSchedulings || config.showPreSalesNoShow;

  return (
    <div className="space-y-8">
      {/* Cards de métricas no mesmo estilo do comercial */}
      {showAnyMetricCard && (
        <div className="bg-white rounded-lg border">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            {config.showPreSalesCalls && (
              <div className="h-40 flex flex-col border-r border-b border-gray-200 last:border-r-0">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0 p-3">
                  <div className="text-xs font-medium text-gray-600">
                    Tentativas de Ligação
                  </div>
                  <Phone className="h-3 w-3 text-blue-600 flex-shrink-0" />
                </div>
                <div className="flex-1 flex flex-col justify-between p-3 pt-0">
                  <div className="text-lg font-bold">{preSalesData.dailyCalls}</div>
                  <div className="mt-auto">
                    <p className="text-xs text-gray-600 mt-1">
                      Meta: {preSalesData.dailyCallsTarget}
                    </p>
                    <div className="text-xs text-green-600 mt-2">
                      {((preSalesData.dailyCalls / preSalesData.dailyCallsTarget) * 100).toFixed(1)}% da meta
                    </div>
                  </div>
                </div>
              </div>
            )}

            {config.showPreSalesSchedulings && (
              <div className="h-40 flex flex-col border-r border-b border-gray-200 last:border-r-0">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0 p-3">
                  <div className="text-xs font-medium text-gray-600">
                    Agendamentos Diários
                  </div>
                  <Calendar className="h-3 w-3 text-green-600 flex-shrink-0" />
                </div>
                <div className="flex-1 flex flex-col justify-between p-3 pt-0">
                  <div className="text-lg font-bold">{preSalesData.dailySchedulings}</div>
                  <div className="mt-auto">
                    <p className="text-xs text-gray-600 mt-1">
                      Meta: {preSalesData.dailySchedulingsTarget}
                    </p>
                    <div className="text-xs text-green-600 mt-2">
                      {((preSalesData.dailySchedulings / preSalesData.dailySchedulingsTarget) * 100).toFixed(1)}% da meta
                    </div>
                  </div>
                </div>
              </div>
            )}

            {config.showPreSalesNoShow && (
              <div className="h-40 flex flex-col border-r border-b border-gray-200 last:border-r-0">
                <div className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0 p-3">
                  <div className="text-xs font-medium text-gray-600">
                    No-Show Diário
                  </div>
                  <UserX className="h-3 w-3 text-red-600 flex-shrink-0" />
                </div>
                <div className="flex-1 flex flex-col justify-between p-3 pt-0">
                  <div className="text-lg font-bold">{preSalesData.dailyNoShow}</div>
                  <div className="mt-auto">
                    <p className="text-xs text-gray-600 mt-1">
                      Taxa: {preSalesData.dailyNoShowRate}%
                    </p>
                    <div className="text-xs text-red-600 mt-2">
                      {preSalesData.dailyNoShowRate > 20 ? 'Acima do ideal' : 'Dentro do esperado'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Card fixo da média por SDR (sempre exibido se algum card estiver habilitado) */}
            <div className="h-40 flex flex-col border-r border-b border-gray-200 last:border-r-0">
              <div className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0 p-3">
                <div className="text-xs font-medium text-gray-600">
                  Média por SDR
                </div>
                <Users className="h-3 w-3 text-purple-600 flex-shrink-0" />
              </div>
              <div className="flex-1 flex flex-col justify-between p-3 pt-0">
                <div className="text-lg font-bold">{preSalesData.averageSchedulingsPerSDR}</div>
                <div className="mt-auto">
                  <p className="text-xs text-gray-600 mt-1">
                    Agendamentos/SDR
                  </p>
                  <div className="text-xs text-purple-600 mt-2">
                    {preSalesData.totalSDRs} SDRs ativos
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Renderizar componentes na ordem configurada */}
      {orderedItems.map((item) => {
        const component = renderComponent(item.key);
        if (!component) return null;
        
        console.log(`🔍 PreSalesMetrics - Rendering component ${item.key}`);
        
        return (
          <div key={item.key} className="w-full">
            {component}
          </div>
        );
      })}
    </div>
  );
};

export default PreSalesMetrics;
