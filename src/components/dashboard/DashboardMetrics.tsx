
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import DashboardFilters from './filters/DashboardFilters';
import { ItemRenderer } from './renderers/ItemRenderer';

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

  // Separar itens que devem ocupar toda a largura dos que ficam no grid
  const fullWidthItems = ['revenueEvolutionChart', 'billingEvolutionChart'];
  const gridItems = orderedItems.filter(item => !fullWidthItems.includes(item));
  const fullWidthOrderedItems = orderedItems.filter(item => fullWidthItems.includes(item));

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
      
      {/* Grid para métricas e gráficos menores */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
        {gridItems.map((key, index) => {
          const components = <ItemRenderer itemKey={key} config={config} />;
          if (!components) return null;
          
          return (
            <React.Fragment key={`${key}-${index}`}>
              {components}
            </React.Fragment>
          );
        })}
      </div>

      {/* Seção para gráficos de largura completa */}
      {fullWidthOrderedItems.map((key, index) => {
        const components = <ItemRenderer itemKey={key} config={config} />;
        if (!components) return null;
        
        return (
          <div key={`${key}-${index}`} className="w-full">
            {components}
          </div>
        );
      })}
    </div>
  );
};

export default DashboardMetrics;
