
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import SpecificGoalsCards from '@/components/dashboard/goals/SpecificGoalsCards';

interface SpecificGoalsSectionProps {
  config: DashboardConfig;
  orderedItems: string[];
}

const SpecificGoalsSection: React.FC<SpecificGoalsSectionProps> = ({ config, orderedItems }) => {
  console.log('🎯 [DEBUG] SpecificGoalsSection - Config:', {
    showSpecificGoals: config.showSpecificGoals,
    selectedGoalIds: config.selectedGoalIds,
    orderedItems
  });

  // Verificar se metas específicas estão habilitadas
  if (!config.showSpecificGoals) {
    console.log('🎯 [DEBUG] SpecificGoalsSection - Metas específicas desabilitadas');
    return null;
  }

  const specificGoalsItems = orderedItems.filter(key => key === 'specificGoals');
  
  console.log('🎯 [DEBUG] SpecificGoalsSection - Items filtrados:', specificGoalsItems);

  if (specificGoalsItems.length === 0) {
    console.log('🎯 [DEBUG] SpecificGoalsSection - Nenhum item de metas específicas encontrado');
    return null;
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Metas Específicas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        <SpecificGoalsCards config={config} />
      </div>
    </div>
  );
};

export default SpecificGoalsSection;
