
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { useDashboardFilters } from '@/hooks/useDashboardFilters';
import { useProductFilter } from '@/hooks/useProductFilter';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardMetrics from '@/components/dashboard/DashboardMetrics';
import PreSalesMetrics from '@/components/dashboard/PreSalesMetrics';
import DashboardFilters from '@/components/dashboard/filters/DashboardFilters';
import PreSalesDashboardFilters from '@/components/dashboard/filters/PreSalesDashboardFilters';
import ProductFilter from '@/components/dashboard/filters/ProductFilter';
import CommercialDashboardFilters from '@/components/dashboard/filters/CommercialDashboardFilters';

const Dashboard = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { config, isLoading: configLoading } = useDashboardConfig();
  const { filters, updateDateRange, updateSalespeople, resetFilters } = useDashboardFilters();
  const { selectedProductId, updateSelectedProduct } = useProductFilter();

  if (isLoading || configLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Criar dados simulados para pré-vendas
  const mockPreSalesData = {
    dailyCalls: 0,
    dailyCallsTarget: 40,
    dailySchedulings: 0,
    dailySchedulingsTarget: 8,
    dailyNoShow: 0,
    dailyNoShowRate: 0,
    totalSDRs: 0,
    averageSchedulingsPerSDR: 0,
    sdrPerformance: [],
    weeklyData: []
  };

  // Verificar se há indicadores comerciais ativos
  const hasCommercialIndicators = 
    config.showConversion || config.showRevenue || config.showTicketFaturamento || 
    config.showTicketReceita || config.showFaltaFaturamento || config.showFaltaReceita ||
    config.showDiariaReceita || config.showDiariaFaturamento || config.showSuperMetaFaturamento ||
    config.showSuperMetaReceita || config.showHiperMetaFaturamento || config.showHiperMetaReceita ||
    config.showFaltaReceitaSuper || config.showFaltaReceitaHiper || config.showFaltaFaturamentoSuper ||
    config.showFaltaFaturamentoHiper || config.showMetaFaturamento || config.showMetaReceita ||
    config.showFaturamento || config.showReceita || config.showQuantidadeVendas ||
    config.showCashCollect || config.showCac || config.showProjecaoReceita ||
    config.showProjecaoFaturamento || config.showNoShow || config.showClosersPerformanceTable ||
    config.showRevenueEvolutionChart || config.showBillingEvolutionChart ||
    config.showSellerRevenueChart || config.showSellerBillingChart ||
    config.showTemporalRevenueChart || config.showTemporalBillingChart;

  // Determinar a aba padrão baseada nos indicadores disponíveis
  const getDefaultTab = () => {
    if (config.showProductMetrics && config.selectedProductIds.length > 0) {
      return "produtos";
    }
    if (hasCommercialIndicators) {
      return "comercial";
    }
    return "pre-vendas";
  };

  // Contar quantas abas estão ativas
  const activeTabsCount = [
    hasCommercialIndicators,
    true, // pré-vendas sempre ativa
    config.showProductMetrics && config.selectedProductIds.length > 0
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue={getDefaultTab()} className="w-full">
          <TabsList className={`grid w-full ${activeTabsCount === 2 ? 'grid-cols-2' : 'grid-cols-3'} mb-6`}>
            {hasCommercialIndicators && (
              <TabsTrigger value="comercial">Dashboard Comercial</TabsTrigger>
            )}
            <TabsTrigger value="produtos">Dashboard Produtos</TabsTrigger>
            <TabsTrigger value="pre-vendas">Dashboard Pré-vendas</TabsTrigger>
          </TabsList>
          
          {hasCommercialIndicators && (
            <TabsContent value="comercial" className="space-y-6">
              <CommercialDashboardFilters
                startDate={filters.startDate}
                endDate={filters.endDate}
                selectedSalespeople={filters.selectedSalespeople}
                onDateChange={updateDateRange}
                onSalespeopleChange={updateSalespeople}
                onReset={resetFilters}
              />
              <DashboardMetrics 
                config={config} 
                selectedProductId={null}
                dashboardType="comercial"
              />
            </TabsContent>
          )}

          <TabsContent value="produtos" className="space-y-6">
            <DashboardFilters
              startDate={filters.startDate}
              endDate={filters.endDate}
              selectedSalespeople={filters.selectedSalespeople}
              onDateChange={updateDateRange}
              onSalespeopleChange={updateSalespeople}
              onReset={resetFilters}
            />
            <ProductFilter
              selectedProductId={selectedProductId}
              onProductChange={updateSelectedProduct}
            />
            <DashboardMetrics 
              config={config} 
              selectedProductId={selectedProductId}
              dashboardType="produtos"
            />
          </TabsContent>

          <TabsContent value="pre-vendas" className="space-y-6">
            <PreSalesDashboardFilters
              startDate={filters.startDate}
              endDate={filters.endDate}
              selectedSalespeople={filters.selectedSalespeople}
              onDateChange={updateDateRange}
              onSalespeopleChange={updateSalespeople}
              onReset={resetFilters}
            />
            <PreSalesMetrics config={config} preSalesData={mockPreSalesData} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
