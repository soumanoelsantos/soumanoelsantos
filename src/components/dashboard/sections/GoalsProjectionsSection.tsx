
import React from 'react';
import { DashboardConfig } from '@/hooks/useDashboardConfig';
import { ItemRenderer } from '../renderers/ItemRenderer';

interface GoalsProjectionsSectionProps {
  config: DashboardConfig;
  orderedItems: string[];
}

const GoalsProjectionsSection: React.FC<GoalsProjectionsSectionProps> = ({ config, orderedItems }) => {
  const goalsMetrics = [
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 
    'showHiperMetaFaturamento', 'showHiperMetaReceita'
  ];

  const goalsItems = orderedItems.filter(key => goalsMetrics.includes(key));

  // Incluir as metas mensais se habilitadas, mas excluir as métricas regulares duplicadas
  const monthlyGoalItems = orderedItems.filter(key => 
    ['conversionRate', 'revenueGoal', 'salesGoal'].includes(key)
  );

  // Filtrar métricas regulares que são duplicadas das metas mensais
  const filteredGoalsItems = goalsItems.filter(key => {
    // Se as metas mensais estão habilitadas, não mostrar as métricas regulares duplicadas
    if (config.showMonthlyGoals) {
      // Excluir showMetaFaturamento e showMetaReceita se as metas mensais estão ativas
      if (key === 'showMetaFaturamento' || key === 'showMetaReceita') {
        return false;
      }
    }
    return true;
  });

  if (filteredGoalsItems.length === 0 && monthlyGoalItems.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Metas e Projeções</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {monthlyGoalItems.map((key, index) => {
          const components = <ItemRenderer itemKey={key} config={config} />;
          if (!components) return null;
          
          return (
            <React.Fragment key={`${key}-${index}`}>
              {components}
            </React.Fragment>
          );
        })}
        {filteredGoalsItems.map((key, index) => {
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

export default GoalsProjectionsSection;
