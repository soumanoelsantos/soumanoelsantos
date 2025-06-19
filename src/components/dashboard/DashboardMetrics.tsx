
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

  // Separar itens que devem ocupar toda a largura dos que ficam no grid
  const fullWidthItems = [
    'revenueEvolutionChart', 
    'billingEvolutionChart', 
    'sellerRevenueChart', 
    'sellerBillingChart',
    'temporalRevenueChart',
    'temporalBillingChart',
    'showClosersPerformanceTable'  // Usar a chave consistente
  ];
  const gridItems = orderedItems.filter(item => !fullWidthItems.includes(item));
  const evolutionCharts = orderedItems.filter(item => fullWidthItems.includes(item));

  console.log('🔍 DashboardMetrics - Grid items:', gridItems);
  console.log('🔍 DashboardMetrics - Evolution charts and tables found:', evolutionCharts);

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
      
      {/* Grid para métricas sem espaçamento */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {gridItems.map((key, index) => {
            console.log(`🔍 DashboardMetrics - Rendering grid item: ${key} (enabled: ${config[key as keyof typeof config]})`);
            
            return (
              <div key={`${key}-${index}`}>
                <ItemRenderer itemKey={key} config={config} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Seção dedicada para gráficos de evolução, análise temporal e tabelas */}
      {evolutionCharts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Gráficos de Evolução, Análise Temporal e Tabelas de Performance</h2>
          {evolutionCharts.map((key, index) => {
            console.log(`🔍 DashboardMetrics - Rendering evolution chart/table: ${key}`);
            const component = <ItemRenderer itemKey={key} config={config} />;
            if (!component) {
              console.log(`❌ DashboardMetrics - No component returned for evolution chart/table: ${key}`);
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
    </div>
  );
};

export default DashboardMetrics;
