
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
import ProductGoalsConfigCard from '@/components/dashboard/config/ProductGoalsConfigCard';
import ProductsManagementCard from '@/components/dashboard/config/ProductsManagementCard';
import SellersManagementCard from '@/components/dashboard/config/SellersManagementCard';
import SDRTeamManagementCard from '@/components/dashboard/config/SDRTeamManagementCard';
import DisplayConfigCard from '@/components/dashboard/config/DisplayConfigCard';
import MetricsOrderManager from '@/components/dashboard/config/MetricsOrderManager';
import PreSalesOrderManager from '@/components/dashboard/config/PreSalesOrderManager';
import ProductOrderManager from '@/components/dashboard/config/product-order/ProductOrderManager';
import { saveDashboardConfig } from '@/services/dashboardConfigService';
import { toast } from 'sonner';

const DashboardConfig = () => {
  const { isAuthenticated, isLoading, userId } = useAuth();
  const { config, updateConfig, isLoading: configLoading } = useDashboardConfig();
  const [isSaving, setIsSaving] = useState(false);

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

  const handleConfigChange = async (key: string, value: any) => {
    console.log('🔧 [DEBUG] handleConfigChange called:', { key, value });
    
    try {
      // Atualizar config local imediatamente
      updateConfig({ [key]: value });
      
      // Para mudanças críticas como nome da empresa, salvar imediatamente
      const criticalKeys = ['companyName'];
      
      if (criticalKeys.includes(key)) {
        if (!userId) {
          console.error('❌ [DEBUG] Usuário não autenticado');
          toast.error("Erro: Usuário não autenticado");
          return;
        }

        try {
          setIsSaving(true);
          const updatedConfig = { ...config, [key]: value };
          console.log('💾 [DEBUG] Salvando automaticamente configuração crítica...', { key, value });
          
          await saveDashboardConfig(updatedConfig, userId);
          
          console.log('✅ [DEBUG] Configuração crítica salva automaticamente!');
          toast.success("Configuração salva automaticamente!");
        } catch (error) {
          console.error('❌ [DEBUG] Erro ao salvar configuração crítica:', error);
          toast.error("Erro: Não foi possível salvar a configuração");
        } finally {
          setIsSaving(false);
        }
      }
    } catch (error) {
      console.error('❌ [DEBUG] Erro em handleConfigChange:', error);
      toast.error("Erro: Falha ao processar mudança de configuração");
    }
  };

  const handleSave = async () => {
    if (!userId) {
      console.error('❌ [DEBUG] Usuário não autenticado');
      toast.error("Erro: Usuário não autenticado");
      return;
    }

    try {
      setIsSaving(true);
      console.log('💾 [DEBUG] Salvando configuração final...', config);
      
      await saveDashboardConfig(config, userId);
      
      console.log('✅ [DEBUG] Configuração salva com sucesso!');
      toast.success("Sucesso! Configuração salva com sucesso!");
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao salvar configuração:', error);
      toast.error("Erro: Não foi possível salvar a configuração");
    } finally {
      setIsSaving(false);
    }
  };

  const handleReorderMetrics = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderMetrics:', newOrder);
    try {
      updateConfig({ metricsOrder: newOrder });
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao reordenar métricas:', error);
      toast.error("Erro ao reordenar métricas");
    }
  };

  const handleReorderPreSales = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderPreSales:', newOrder);
    try {
      updateConfig({ preSalesOrder: newOrder });
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao reordenar pré-vendas:', error);
      toast.error("Erro ao reordenar pré-vendas");
    }
  };

  const handleReorderProducts = (newOrder: string[]) => {
    console.log('🔄 [DEBUG] handleReorderProducts:', newOrder);
    try {
      updateConfig({ productOrder: newOrder });
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao reordenar produtos:', error);
      toast.error("Erro ao reordenar produtos");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigHeader onSave={handleSave} isLoading={isSaving} />
      
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
                <SDRTeamManagementCard />
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
                <ProductsManagementCard />
                <ProductMetricsConfigCard 
                  config={config} 
                  onConfigChange={handleConfigChange} 
                />
                <ProductGoalsConfigCard />
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
