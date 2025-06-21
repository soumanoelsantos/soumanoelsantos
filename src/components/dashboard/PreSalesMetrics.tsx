
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { usePreSalesOrder } from './config/pre-sales-order/usePreSalesOrder';
import { usePreSalesData } from '@/hooks/usePreSalesData';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import PreSalesMetricsCards from './metrics/PreSalesMetricsCards';
import PreSalesComponentRenderer from './renderers/PreSalesComponentRenderer';
import PreSalesMetricsLoading from './loading/PreSalesMetricsLoading';
import PreSalesMetricsError from './error/PreSalesMetricsError';
import PreSalesDashboardFilters from './filters/PreSalesDashboardFilters';

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

interface PreSalesMetricsProps {
  config: DashboardConfig;
  preSalesData: PreSalesData;
  isPublicView?: boolean;
  sharedUserId?: string;
}

const PreSalesMetrics = ({ config, preSalesData, isPublicView = false, sharedUserId }: PreSalesMetricsProps) => {
  const { config: dashboardConfig } = useDashboardConfig(sharedUserId);
  const { getOrderedPreSalesItems } = usePreSalesOrder(config || dashboardConfig);
  const { data: realPreSalesData, isLoading, error } = usePreSalesData(sharedUserId);
  const { 
    filters, 
    updateDateRange, 
    updateSalespeople, 
    resetFilters 
  } = useDashboardFilters();
  
  // Use provided preSalesData or fallback to real data
  const dataToUse = preSalesData || realPreSalesData;
  
  console.log('🔍 PreSalesMetrics - Rendering pre-sales dashboard with config:', config || dashboardConfig);
  console.log('🔍 PreSalesMetrics - Pre-sales data:', dataToUse);
  console.log('🔍 PreSalesMetrics - Public view:', isPublicView, 'Shared user:', sharedUserId);

  if (isLoading && !preSalesData) {
    return <PreSalesMetricsLoading />;
  }

  if (error && !preSalesData) {
    return <PreSalesMetricsError error={error} />;
  }

  if (!dataToUse) {
    return null;
  }

  // Obter itens ordenados baseado na configuração
  const orderedItems = getOrderedPreSalesItems((config || dashboardConfig).preSalesOrder || []);
  
  console.log('🔍 PreSalesMetrics - Ordered items:', orderedItems);

  return (
    <div className="space-y-8">
      {/* Filtros específicos para pré-vendas - somente se não for visualização pública */}
      {!isPublicView && (
        <PreSalesDashboardFilters
          startDate={filters.startDate}
          endDate={filters.endDate}
          selectedSalespeople={filters.selectedSalespeople}
          onDateChange={updateDateRange}
          onSalespeopleChange={updateSalespeople}
          onReset={resetFilters}
        />
      )}

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
