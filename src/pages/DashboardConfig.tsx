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
import DisplayConfigCard from '@/components/dashboard/config/DisplayConfigCard';
import MetricsOrderManager from '@/components/dashboard/config/MetricsOrderManager';
import PreSalesOrderManager from '@/components/dashboard/config/PreSalesOrderManager';
import ProductOrderManager from '@/components/dashboard/config/product-order/ProductOrderManager';
import TabControlCard from '@/components/dashboard/config/TabControlCard';
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
    console.log('🔧 [DEBUG] handleConfigChange chamado:', { key, value });
    
    // Atualizar config local
    updateConfig({ [key]: value });
    
    // Para mudanças críticas como controle de abas, salvar imediatamente
    if (key === 'enableCommercialTab' || key === 'enableProductTab' || key === 'enablePreSalesTab') {
      if (!userId) {
        console.error('❌ [DEBUG] Usuário não autenticado');
        toast.error("Erro", {
          description: "Usuário não autenticado"
        });
        return;
      }

      try {
        setIsSaving(true);
        const updatedConfig = { ...config, [key]: value };
        console.log('💾 [DEBUG] Salvando automaticamente configuração de aba...', { key, value });
        
        await saveDashboardConfig(updatedConfig, userId);
        
        console.log('✅ [DEBUG] Configuração de aba salva automaticamente!');
        toast.success("Configuração salva!", {
          description: "As configurações de abas foram atualizadas."
        });
      } catch (error) {
        console.error('❌ [DEBUG] Erro ao salvar configuração de aba:', error);
        toast.error("Erro", {
          description: "Não foi possível salvar a configuração"
        });
      } finally {
        setIsSaving(false);
      }
    }
  };

  const handleSave = async () => {
    if (!userId) {
      console.error('❌ [DEBUG] Usuário não autenticado');
      toast.error("Erro", {
        description: "Usuário não autenticado"
      });
      return;
    }

    try {
      setIsSaving(true);
      console.log('💾 [DEBUG] Salvando configuração final...', config);
      
      await saveDashboardConfig(config, userId);
      
      console.log('✅ [DEBUG] Configuração salva com sucesso!');
      toast.success("Sucesso!", {
        description: "Configuração salva com sucesso!"
      });
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao salvar configuração:', error);
      toast.error("Erro", {
        description: "Não foi possível salvar a configuração"
      });
    } finally {
      setIsSaving(false);
    }
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
                <TabControlCard
                  title="Comercial"
                  description="Controla se a aba Dashboard Comercial aparece no dashboard principal"
                  isEnabled={config.enableCommercialTab}
                  onToggle={(enabled) => handleConfigChange('enableCommercialTab', enabled)}
                />
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
                <TabControlCard
                  title="Pré-vendas"
                  description="Controla se a aba Dashboard Pré-vendas aparece no dashboard principal"
                  isEnabled={config.enablePreSalesTab}
                  onToggle={(enabled) => handleConfigChange('enablePreSalesTab', enabled)}
                />
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
                <TabControlCard
                  title="Produtos"
                  description="Controla se a aba Dashboard Produtos aparece no dashboard principal"
                  isEnabled={config.enableProductTab}
                  onToggle={(enabled) => handleConfigChange('enableProductTab', enabled)}
                />
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
