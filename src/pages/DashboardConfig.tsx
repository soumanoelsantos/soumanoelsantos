
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConfigHeader from '@/components/dashboard/config/ConfigHeader';
import GeneralTab from '@/components/dashboard/config/tabs/GeneralTab';
import CommercialTab from '@/components/dashboard/config/tabs/CommercialTab';
import PreSalesTab from '@/components/dashboard/config/tabs/PreSalesTab';
import ProductTab from '@/components/dashboard/config/tabs/ProductTab';
import { useDashboardConfigHandlers } from '@/hooks/useDashboardConfigHandlers';

const DashboardConfig = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { isLoading: configLoading } = useDashboardConfig();
  const {
    config,
    isSaving,
    handleConfigChange,
    handleSaveConfig,
    handleReorderMetrics,
    handleReorderPreSales,
    handleReorderProducts
  } = useDashboardConfigHandlers();

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

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigHeader />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="geral" className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="geral">Geral</TabsTrigger>
            <TabsTrigger value="comercial">Comercial</TabsTrigger>
            <TabsTrigger value="pre-vendas">Pré-vendas</TabsTrigger>
            <TabsTrigger value="produto">Produto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="geral">
            <GeneralTab
              config={config}
              onConfigChange={handleConfigChange}
              onSave={handleSaveConfig}
              isSaving={isSaving}
            />
          </TabsContent>
          
          <TabsContent value="comercial">
            <CommercialTab
              config={config}
              onConfigChange={handleConfigChange}
              onReorderMetrics={handleReorderMetrics}
              onSave={handleSaveConfig}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="pre-vendas">
            <PreSalesTab
              config={config}
              onConfigChange={handleConfigChange}
              onReorderPreSales={handleReorderPreSales}
              onSave={handleSaveConfig}
              isSaving={isSaving}
            />
          </TabsContent>

          <TabsContent value="produto">
            <ProductTab
              config={config}
              onConfigChange={handleConfigChange}
              onReorderProducts={handleReorderProducts}
              onSave={handleSaveConfig}
              isSaving={isSaving}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardConfig;
