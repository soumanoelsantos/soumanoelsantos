
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import DashboardFilters from './filters/DashboardFilters';
import TicketsValuesSection from './sections/TicketsValuesSection';
import GoalsProjectionsSection from './sections/GoalsProjectionsSection';
import GapsSection from './sections/GapsSection';
import ActivitiesPerformanceSection from './sections/ActivitiesPerformanceSection';
import SpecificGoalsSection from './sections/SpecificGoalsSection';
import ChartsSection from './sections/ChartsSection';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();
  const { getOrderedItems } = useDashboardOrder(config);
  const { 
    filters, 
    updateDateRange, 
    updateSalespeople, 
    resetFilters 
  } = useDashboardFilters();

  const orderedItems = getOrderedItems();
  
  console.log('DashboardMetrics - Rendering with config:', config);
  console.log('DashboardMetrics - Ordered items:', orderedItems);
  console.log('DashboardMetrics - Current filters:', filters);

  return (
    <div className="space-y-8">
      <DashboardFilters
        startDate={filters.startDate}
        endDate={filters.endDate}
        selectedSalespeople={filters.selectedSalespeople}
        onDateChange={updateDateRange}
        onSalespeopleChange={updateSalespeople}
        onReset={resetFilters}
      />
      
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
