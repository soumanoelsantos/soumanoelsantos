
import React from 'react';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { ItemRenderer } from '../renderers/ItemRenderer';

interface BasicMetricsSectionProps {
  config: DashboardConfig;
  orderedItems: string[];
}

const BasicMetricsSection: React.FC<BasicMetricsSectionProps> = ({ config, orderedItems }) => {
  const basicMetrics = [
    'showLeads', 'showConversion', 'showRevenue', 'showTeam'
  ];

  const basicItems = orderedItems.filter(key => basicMetrics.includes(key));

  if (basicItems.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Métricas Básicas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {basicItems.map((key, index) => {
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

export default BasicMetricsSection;
