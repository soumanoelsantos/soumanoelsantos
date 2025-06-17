
import React from 'react';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { ItemRenderer } from '../renderers/ItemRenderer';

interface GapsSectionProps {
  config: DashboardConfig;
  orderedItems: string[];
}

const GapsSection: React.FC<GapsSectionProps> = ({ config, orderedItems }) => {
  const gapsMetrics = [
    'showFaltaFaturamento', 'showFaltaReceita', 'showFaltaReceitaSuper', 'showFaltaReceitaHiper'
  ];

  const gapsItems = orderedItems.filter(key => gapsMetrics.includes(key));

  if (gapsItems.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Faltas e Gaps</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {gapsItems.map((key, index) => {
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

export default GapsSection;
