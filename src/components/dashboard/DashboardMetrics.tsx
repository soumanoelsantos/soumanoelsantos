
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardOrder } from '@/hooks/useDashboardOrder';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { useProductFilter } from '@/hooks/useProductFilter';
import CommercialDashboardFilters from './filters/CommercialDashboardFilters';
import ProductFilter from './filters/ProductFilter';
import SingleProductMetricsCards from './products/SingleProductMetricsCards';
import { ItemRenderer } from './renderers/ItemRenderer';

interface DashboardMetricsProps {
  isPublicView?: boolean;
  sharedUserId?: string;
}

const DashboardMetrics = ({ isPublicView = false, sharedUserId }: DashboardMetricsProps) => {
  const { config } = useDashboardConfig(sharedUserId);
  const { getOrderedItems } = useDashboardOrder(config);
  const { 
    filters, 
    updateDateRange, 
    updateSalespeople, 
    resetFilters 
  } = useDashboardFilters();
  const { selectedProductId, updateSelectedProduct } = useProductFilter();

  const orderedItems = getOrderedItems();
  
  console.log('🔍 DashboardMetrics - Rendering with config:', config);
  console.log('🔍 DashboardMetrics - Ordered items:', orderedItems);
  console.log('🔍 DashboardMetrics - Public view:', isPublicView, 'Shared user:', sharedUserId);

  // Separar itens que devem ocupar toda a largura dos que ficam no grid
  const fullWidthItems = [
    'revenueEvolutionChart', 
    'billingEvolutionChart', 
    'sellerRevenueChart', 
    'sellerBillingChart',
    'temporalRevenueChart',
    'temporalBillingChart',
    'showClosersPerformanceTable'
  ];
  const gridItems = orderedItems.filter(item => !fullWidthItems.includes(item));
  const evolutionCharts = orderedItems.filter(item => fullWidthItems.includes(item));

  console.log('🔍 DashboardMetrics - Grid items:', gridItems);
  console.log('🔍 DashboardMetrics - Evolution charts and tables found:', evolutionCharts);

  return (
    <div className="space-y-8">
      {!isPublicView && (
        <CommercialDashboardFilters
          startDate={filters.startDate}
          endDate={filters.endDate}
          selectedSalespeople={filters.selectedSalespeople}
          onDateChange={updateDateRange}
          onSalespeopleChange={updateSalespeople}
          onReset={resetFilters}
        />
      )}

      {/* Filtro de Produto */}
      {config.showProductMetrics && config.selectedProductIds.length > 0 && !isPublicView && (
        <ProductFilter
          selectedProductId={selectedProductId}
          onProductChange={updateSelectedProduct}
        />
      )}
      
      {/* Grid para métricas comerciais sem espaçamento */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {gridItems.map((key, index) => {
            console.log(`🔍 DashboardMetrics - Rendering grid item: ${key} (enabled: ${config[key as keyof typeof config]})`);
            
            return (
              <div key={`${key}-${index}`}>
                <ItemRenderer itemKey={key} config={config} isPublicView={isPublicView} sharedUserId={sharedUserId} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Seção dedicada para indicadores de produtos */}
      {config.showProductMetrics && config.selectedProductIds.length > 0 && selectedProductId && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-gray-800">Indicadores de Produtos (Atemporais)</h2>
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              <SingleProductMetricsCards config={config} selectedProductId={selectedProductId} />
            </div>
          </div>
        </div>
      )}

      {/* Seção dedicada para gráficos de evolução, análise temporal e tabelas */}
      {evolutionCharts.length > 0 && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold text-gray-800">Gráficos de Evolução, Análise Temporal e Tabelas de Performance</h2>
          {evolutionCharts.map((key, index) => {
            console.log(`🔍 DashboardMetrics - Rendering evolution chart/table: ${key}`);
            const component = <ItemRenderer itemKey={key} config={config} isPublicView={isPublicView} sharedUserId={sharedUserId} />;
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
