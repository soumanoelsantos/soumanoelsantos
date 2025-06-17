
import React from 'react';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { ItemRenderer } from '../renderers/ItemRenderer';

interface ChartsSectionProps {
  config: DashboardConfig;
  orderedItems: string[];
}

const ChartsSection: React.FC<ChartsSectionProps> = ({ config, orderedItems }) => {
  const chartItems = orderedItems.filter(key => 
    key === 'salesChart' || key === 'growthChart'
  );

  if (chartItems.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Gráficos e Análises</h3>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {chartItems.map((key, index) => {
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

export default ChartsSection;
