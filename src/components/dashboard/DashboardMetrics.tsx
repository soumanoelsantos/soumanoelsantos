
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';
import TicketsValuesSection from './sections/TicketsValuesSection';
import GoalsProjectionsSection from './sections/GoalsProjectionsSection';
import GapsSection from './sections/GapsSection';
import ActivitiesPerformanceSection from './sections/ActivitiesPerformanceSection';
import SpecificGoalsSection from './sections/SpecificGoalsSection';
import ChartsSection from './sections/ChartsSection';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();
  const { getOrderedItems } = useDashboardOrder(config);

  const orderedItems = getOrderedItems();
  
  console.log('DashboardMetrics - Config:', config);
  console.log('DashboardMetrics - Ordered items:', orderedItems);

  return (
    <div className="space-y-8">
      <TicketsValuesSection config={config} orderedItems={orderedItems} />
      
      <GoalsProjectionsSection config={config} orderedItems={orderedItems} />
      
      <GapsSection config={config} orderedItems={orderedItems} />
      
      <ActivitiesPerformanceSection config={config} orderedItems={orderedItems} />
      
      <SpecificGoalsSection config={config} orderedItems={orderedItems} />
      
      <ChartsSection config={config} orderedItems={orderedItems} />
    </div>
  );
};

export default DashboardMetrics;
