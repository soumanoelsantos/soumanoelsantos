
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';
import { ItemRenderer } from './renderers/ItemRenderer';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();
  const { getOrderedItems } = useDashboardOrder(config);

  const orderedItems = getOrderedItems();
  
  console.log('DashboardMetrics - Config:', config);
  console.log('DashboardMetrics - Ordered items:', orderedItems);

  return (
    <div className="space-y-6">
      {/* Cards de métricas em grid de 6 colunas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {orderedItems.map((key, index) => {
          // Só renderiza cards que não são gráficos
          if (key === 'salesChart' || key === 'growthChart' || key === 'conversionRate' || key === 'revenueGoal' || key === 'salesGoal') {
            return null;
          }
          
          console.log(`Rendering card for key: ${key} at index ${index}`);
          const components = <ItemRenderer itemKey={key} config={config} />;
          if (!components) {
            console.log(`No components returned for key: ${key}`);
            return null;
          }
          
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
          
          console.log(`Rendering chart for key: ${key}`);
          const components = <ItemRenderer itemKey={key} config={config} />;
          if (!components) return null;
          
          return (
            <React.Fragment key={`${key}-${index}`}>
              {components}
            </React.Fragment>
          );
        })}
      </div>

      {/* Seção de metas mensais */}
      {config.showMonthlyGoals && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {orderedItems.map((key, index) => {
            // Só renderiza componentes de metas
            if (key !== 'conversionRate' && key !== 'revenueGoal' && key !== 'salesGoal') return null;
            
            console.log(`Rendering goal for key: ${key}`);
            const components = <ItemRenderer itemKey={key} config={config} />;
            if (!components) return null;
            
            return (
              <React.Fragment key={`${key}-${index}`}>
                {components}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardMetrics;
