
import React from 'react';
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
}

interface PreSalesMetricsCardsProps {
  config: DashboardConfig;
  preSalesData: PreSalesData;
}

const PreSalesMetricsCards: React.FC<PreSalesMetricsCardsProps> = ({ config, preSalesData }) => {
  const showAnyMetricCard = config.showPreSalesCalls || config.showPreSalesSchedulings || config.showPreSalesNoShow;

  if (!showAnyMetricCard) {
    return null;
  }

  return (
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
  );
};

export default PreSalesMetricsCards;
