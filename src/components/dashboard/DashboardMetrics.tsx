
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';
import { ItemRenderer } from './renderers/ItemRenderer';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();
  const { getOrderedItems } = useDashboardOrder(config);

  const orderedItems = getOrderedItems();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {orderedItems.map((key, index) => {
        const components = <ItemRenderer itemKey={key} config={config} />;
        if (!components) return null;
        
        return (
          <div key={`${key}-${index}`}>
            {components}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardMetrics;
