
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';
import { ItemRenderer } from './renderers/ItemRenderer';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();
  const { getOrderedItems } = useDashboardOrder(config);

  const orderedItems = getOrderedItems();

  return (
    <div className="space-y-6">
      {/* Cards de métricas em grid de 4 colunas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {orderedItems.map((key, index) => {
          // Só renderiza cards que não são gráficos
          if (key === 'salesChart' || key === 'growthChart') return null;
          
          const components = <ItemRenderer itemKey={key} config={config} />;
          if (!components) return null;
          
          return (
            <React.Fragment key={`${key}-${index}`}>
              {components}
            </React.Fragment>
          );
        })}
      </div>

      {/* Gráficos em grid de 2 colunas proporcionais */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {orderedItems.map((key, index) => {
          // Só renderiza gráficos
          if (key !== 'salesChart' && key !== 'growthChart') return null;
          
          const components = <ItemRenderer itemKey={key} config={config} />;
          if (!components) return null;
          
          return (
            <React.Fragment key={`${key}-${index}`}>
              {components}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default DashboardMetrics;
