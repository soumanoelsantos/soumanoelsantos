
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { ItemRenderer } from './renderers/ItemRenderer';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';

interface DashboardMetricsProps {
  config: DashboardConfig;
  selectedProductId?: string | null;
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ config, selectedProductId }) => {
  const { getOrderedItems } = useDashboardOrder(config);
  
  console.log('📊 [DEBUG] DashboardMetrics - Config:', {
    metricsOrder: config.metricsOrder,
    selectedProductIds: config.selectedProductIds,
    showProductMetrics: config.showProductMetrics
  });

  const renderMetrics = () => {
    const components: JSX.Element[] = [];
    const orderedItems = getOrderedItems();

    console.log('📊 [DEBUG] DashboardMetrics - Ordered items:', orderedItems);

    orderedItems.forEach((itemKey, index) => {
      console.log('📊 [DEBUG] Processing metric:', itemKey);

      // Renderizar componentes através do ItemRenderer
      const renderedComponent = (
        <ItemRenderer 
          key={`${itemKey}-${index}`}
          itemKey={itemKey} 
          config={config} 
          selectedProductId={selectedProductId} 
        />
      );

      if (renderedComponent) {
        components.push(renderedComponent);
      }
    });

    return components;
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {renderMetrics()}
    </div>
  );
};

export default DashboardMetrics;
