
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { usePreSalesOrder } from './config/pre-sales-order/usePreSalesOrder';
import { usePreSalesData } from '@/hooks/usePreSalesData';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import PreSalesMetricsCards from './metrics/PreSalesMetricsCards';
import PreSalesComponentRenderer from './renderers/PreSalesComponentRenderer';
import PreSalesMetricsLoading from './loading/PreSalesMetricsLoading';
import PreSalesMetricsError from './error/PreSalesMetricsError';
import PreSalesDashboardFilters from './filters/PreSalesDashboardFilters';

interface PreSalesMetricsProps {
  isPublicView?: boolean;
  sharedUserId?: string;
}

const PreSalesMetrics = ({ isPublicView = false, sharedUserId }: PreSalesMetricsProps) => {
  const { config } = useDashboardConfig(sharedUserId);
  const { getOrderedPreSalesItems } = usePreSalesOrder(config);
  const { data: preSalesData, isLoading, error } = usePreSalesData(sharedUserId);
  const { 
    filters, 
    updateDateRange, 
    updateSalespeople, 
    resetFilters 
  } = useDashboardFilters();
  
  console.log('🔍 PreSalesMetrics - Rendering pre-sales dashboard with config:', config);
  console.log('🔍 PreSalesMetrics - Pre-sales data:', preSalesData);
  console.log('🔍 PreSalesMetrics - Public view:', isPublicView, 'Shared user:', sharedUserId);

  if (isLoading) {
    return <PreSalesMetricsLoading />;
  }

  if (error) {
    return <PreSalesMetricsError error={error} />;
  }

  if (!preSalesData) {
    return null;
  }

  // Obter itens ordenados baseado na configuração
  const orderedItems = getOrderedPreSalesItems(config.preSalesOrder || []);
  
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
      <PreSalesMetricsCards config={config} preSalesData={preSalesData} />
      
      {/* Renderizar componentes na ordem configurada */}
      {orderedItems.map((item) => {
        const component = (
          <PreSalesComponentRenderer 
            key={item.key}
            itemKey={item.key}
            weeklyData={preSalesData.weeklyData}
            sdrPerformance={preSalesData.sdrPerformance}
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
