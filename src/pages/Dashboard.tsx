
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

  // Usar as configurações de controle das abas diretamente
  const hasCommercialTab = config.enableCommercialTab;
  const hasProductTab = config.enableProductTab;
  const hasPreSalesTab = config.enablePreSalesTab;

  console.log('🔍 Debug Dashboard tabs:', {
    hasProductTab,
    hasCommercialTab,
    hasPreSalesTab,
    enableProductTab: config.enableProductTab,
    enableCommercialTab: config.enableCommercialTab,
    enablePreSalesTab: config.enablePreSalesTab
  });

  // Determinar a aba padrão baseada nas abas disponíveis
  const getDefaultTab = () => {
    if (hasProductTab) {
      return "produtos";
    }
    if (hasCommercialTab) {
      return "comercial";
    }
    if (hasPreSalesTab) {
      return "pre-vendas";
    }
    return "produtos"; // fallback
  };

  // Contar quantas abas estão ativas
  const activeTabs = [hasCommercialTab, hasProductTab, hasPreSalesTab].filter(Boolean);
  const activeTabsCount = activeTabs.length;

  // Se nenhuma aba estiver ativa, mostrar uma mensagem
  if (activeTabsCount === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <DashboardHeader />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Nenhuma aba do dashboard está ativa
            </h2>
            <p className="text-gray-600 mb-4">
              Vá para as configurações para ativar pelo menos uma aba do dashboard.
            </p>
            <a 
              href="/dashboard-config" 
              className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Ir para Configurações
            </a>
          </div>
        </main>
      </div>
    );
  }

  // Criar a classe CSS dinâmica baseada no número de abas ativas
  const getTabsListClass = () => {
    return `grid w-full mb-6 ${
      activeTabsCount === 1 ? 'grid-cols-1' :
      activeTabsCount === 2 ? 'grid-cols-2' :
      'grid-cols-3'
    }`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader />
      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue={getDefaultTab()} className="w-full">
          <TabsList className={getTabsListClass()}>
            {hasProductTab && (
              <TabsTrigger value="produtos">Dashboard Produtos</TabsTrigger>
            )}
            {hasCommercialTab && (
              <TabsTrigger value="comercial">Dashboard Comercial</TabsTrigger>
            )}
            {hasPreSalesTab && (
              <TabsTrigger value="pre-vendas">Dashboard Pré-vendas</TabsTrigger>
            )}
          </TabsList>
          
          {hasProductTab && (
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
          )}

          {hasCommercialTab && (
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

          {hasPreSalesTab && (
            <TabsContent value="pre-vendas" className="space-y-6">
              <PreSalesDashboardFilters
                startDate={filters.startDate}
                endDate={filters.endDate}
                selectedSalespeople={filters.selectedSalespeople}
                onDateChange={updateDateRange}
                onSalespeopleChange={updateSalespeople}
                onReset={resetFilters}
              />
              <PreSalesMetrics config={config} />
            </TabsContent>
          )}
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;
