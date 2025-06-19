
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
  
  console.log('🔍 DashboardMetrics - Rendering with config:', config);
  console.log('🔍 DashboardMetrics - Ordered items:', orderedItems);
  console.log('🔍 DashboardMetrics - Evolution charts config:', {
    showRevenueEvolutionChart: config.showRevenueEvolutionChart,
    showBillingEvolutionChart: config.showBillingEvolutionChart
  });

  // Separar itens que devem ocupar toda a largura dos que ficam no grid
  const fullWidthItems = ['revenueEvolutionChart', 'billingEvolutionChart'];
  const gridItems = orderedItems.filter(item => !fullWidthItems.includes(item));
  const evolutionCharts = orderedItems.filter(item => fullWidthItems.includes(item));

  console.log('🔍 DashboardMetrics - Grid items:', gridItems);
  console.log('🔍 DashboardMetrics - Evolution charts found:', evolutionCharts);

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
          console.log(`🔍 DashboardMetrics - Rendering grid item: ${key}`);
          const component = <ItemRenderer itemKey={key} config={config} />;
          if (!component) return null;
          
          return (
            <div key={`${key}-${index}`}>
              {component}
            </div>
          );
        })}
      </div>

      {/* Seção dedicada para gráficos de evolução */}
      {evolutionCharts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Gráficos de Evolução</h2>
          {evolutionCharts.map((key, index) => {
            console.log(`🔍 DashboardMetrics - Rendering evolution chart: ${key}`);
            const component = <ItemRenderer itemKey={key} config={config} />;
            if (!component) {
              console.log(`❌ DashboardMetrics - No component returned for evolution chart: ${key}`);
              return null;
            }
            
            return (
              <div key={`evolution-${key}-${index}`} className="w-full">
                {component}
              </div>
            );
          })}
        </div>
      )}

      {/* Fallback direto para gráficos de evolução se não estiverem na lista */}
      {!evolutionCharts.includes('revenueEvolutionChart') && config.showRevenueEvolutionChart && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Gráfico de Evolução de Receita</h2>
          <ItemRenderer itemKey="revenueEvolutionChart" config={config} />
        </div>
      )}

      {!evolutionCharts.includes('billingEvolutionChart') && config.showBillingEvolutionChart && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Gráfico de Evolução de Faturamento</h2>
          <ItemRenderer itemKey="billingEvolutionChart" config={config} />
        </div>
      )}
    </div>
  );
};

export default DashboardMetrics;
