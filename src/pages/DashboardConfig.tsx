
import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ConfigHeader from '@/components/dashboard/config/ConfigHeader';
import GeneralConfigCard from '@/components/dashboard/config/GeneralConfigCard';
import MetricsConfigCard from '@/components/dashboard/config/MetricsConfigCard';
import PreSalesConfigCard from '@/components/dashboard/config/PreSalesConfigCard';
import ProductChartsConfigCard from '@/components/dashboard/config/ProductChartsConfigCard';
import ProductMetricsConfigCard from '@/components/dashboard/config/ProductMetricsConfigCard';
import SellersManagementCard from '@/components/dashboard/config/SellersManagementCard';
import DisplayConfigCard from '@/components/dashboard/config/DisplayConfigCard';
import MetricsOrderManager from '@/components/dashboard/config/MetricsOrderManager';
import PreSalesOrderManager from '@/components/dashboard/config/PreSalesOrderManager';
import ProductOrderManager from '@/components/dashboard/config/product-order/ProductOrderManager';

const DashboardConfig = () => {
  const { isAuthenticated, isLoading } = useAuth();
  const { config, updateConfig, isLoading: configLoading } = useDashboardConfig();

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

  const handleConfigChange = (key: string, value: any) => {
    console.log('🔧 [DEBUG] handleConfigChange chamado:', { key, value });
    updateConfig({ [key]: value });
  };

  const handleSave = async () => {
    console.log('💾 [DEBUG] handleSave chamado - configuração salva automaticamente');
    // Config is automatically saved by useDashboardConfig
  };

  const handleReorderMetrics = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderMetrics:', newOrder);
    updateConfig({ metricsOrder: newOrder });
  };

  const handleReorderPreSales = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderPreSales:', newOrder);
    updateConfig({ preSalesOrder: newOrder });
  };

  const handleReorderProducts = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderProducts:', newOrder);
    updateConfig({ productOrder: newOrder });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigHeader onSave={handleSave} isLoading={false} />
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="comercial" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="comercial">Comercial</TabsTrigger>
            <TabsTrigger value="pre-vendas">Pré-vendas</TabsTrigger>
            <TabsTrigger value="produto">Produto</TabsTrigger>
          </TabsList>
          
          <TabsContent value="comercial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna da esquerda - Comercial */}
              <div className="space-y-6">
                <GeneralConfigCard 
                  config={config} 
                  onConfigChange={handleConfigChange} 
                />
                <MetricsConfigCard 
                  config={config} 
                  onConfigChange={handleConfigChange} 
                />
                <MetricsOrderManager
                  config={config}
                  metricsOrder={config.metricsOrder}
                  onReorderMetrics={handleReorderMetrics}
                />
              </div>
              
              {/* Coluna da direita - Comercial */}
              <div className="space-y-6">
                <DisplayConfigCard 
                  config={config} 
                  onConfigChange={handleConfigChange} 
                />
                <SellersManagementCard />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pre-vendas" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna da esquerda - Pré-vendas */}
              <div className="space-y-6">
                <PreSalesConfigCard 
                  config={config} 
                  onConfigChange={handleConfigChange} 
                />
              </div>
              
              {/* Coluna da direita - Pré-vendas */}
              <div className="space-y-6">
                <PreSalesOrderManager
                  config={config}
                  preSalesOrder={config.preSalesOrder}
                  onReorderPreSales={handleReorderPreSales}
                />
              </div>
            </div>
          </TabsContent>

          <TabsContent value="produto" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Coluna da esquerda - Produto */}
              <div className="space-y-6">
                <ProductMetricsConfigCard 
                  config={config} 
                  onConfigChange={handleConfigChange} 
                />
              </div>
              
              {/* Coluna da direita - Produto */}
              <div className="space-y-6">
                <ProductChartsConfigCard 
                  config={config} 
                  onConfigChange={handleConfigChange} 
                />
                <ProductOrderManager
                  config={config}
                  productOrder={config.productOrder}
                  onReorderProducts={handleReorderProducts}
                />
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardConfig;
