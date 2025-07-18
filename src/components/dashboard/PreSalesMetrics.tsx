
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { usePreSalesOrder } from './config/pre-sales-order/usePreSalesOrder';
import { usePreSalesData } from '@/hooks/usePreSalesData';
import PreSalesMetricsCards from './metrics/PreSalesMetricsCards';
import PreSalesComponentRenderer from './renderers/PreSalesComponentRenderer';
import PreSalesMetricsLoading from './loading/PreSalesMetricsLoading';
import PreSalesMetricsError from './error/PreSalesMetricsError';

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

interface PreSalesFilters {
  startDate?: Date;
  endDate?: Date;
  selectedSalespeople?: string[];
}

interface PreSalesMetricsProps {
  config: DashboardConfig;
  preSalesData?: PreSalesData;
  isPublicView?: boolean;
  sharedUserId?: string;
  filters?: PreSalesFilters;
}

const PreSalesMetrics = ({ 
  config, 
  preSalesData, 
  isPublicView = false, 
  sharedUserId,
  filters 
}: PreSalesMetricsProps) => {
  const { config: dashboardConfig } = useDashboardConfig();
  const { getOrderedPreSalesItems } = usePreSalesOrder(config || dashboardConfig);
  const { data: realPreSalesData, isLoading, error } = usePreSalesData(sharedUserId, filters);
  
  // Use real data from hook instead of provided preSalesData
  const dataToUse = realPreSalesData;
  
  console.log('🔍 PreSalesMetrics - Rendering pre-sales dashboard with config:', config || dashboardConfig);
  console.log('🔍 PreSalesMetrics - Pre-sales data:', dataToUse);
  console.log('🔍 PreSalesMetrics - Filters:', filters);
  console.log('🔍 PreSalesMetrics - Public view:', isPublicView, 'Shared user:', sharedUserId);

  if (isLoading) {
    return <PreSalesMetricsLoading />;
  }

  if (error) {
    return <PreSalesMetricsError error={error} />;
  }

  if (!dataToUse) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-600">Nenhum dado de pré-vendas encontrado</p>
      </div>
    );
  }

  // Obter itens ordenados baseado na configuração
  const orderedItems = getOrderedPreSalesItems((config || dashboardConfig).preSalesOrder || []);
  
  console.log('🔍 PreSalesMetrics - Ordered items:', orderedItems);

  return (
    <div className="space-y-8">
      {/* Cards de métricas no mesmo estilo do comercial */}
      <PreSalesMetricsCards config={config || dashboardConfig} preSalesData={dataToUse} />
      
      {/* Renderizar componentes na ordem configurada */}
      {orderedItems.map((item) => {
        const component = (
          <PreSalesComponentRenderer 
            key={item.key}
            itemKey={item.key}
            weeklyData={dataToUse.weeklyData}
            sdrPerformance={dataToUse.sdrPerformance}
            isPublicView={isPublicView}
            sharedUserId={sharedUserId}
          />
        );
        
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
