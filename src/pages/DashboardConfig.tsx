
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import ConfigHeader from '@/components/dashboard/config/ConfigHeader';
import GeneralConfigCard from '@/components/dashboard/config/GeneralConfigCard';
import MetricsConfigCard from '@/components/dashboard/config/MetricsConfigCard';
import DisplayConfigCard from '@/components/dashboard/config/DisplayConfigCard';
import SpecificGoalsConfigCard from '@/components/dashboard/config/SpecificGoalsConfigCard';
import ProductMetricsConfigCard from '@/components/dashboard/config/ProductMetricsConfigCard';
import PreSalesConfigCard from '@/components/dashboard/config/PreSalesConfigCard';
import MetricsOrderManager from '@/components/dashboard/config/MetricsOrderManager';
import PreSalesOrderManager from '@/components/dashboard/config/PreSalesOrderManager';
import ProductOrderManager from '@/components/dashboard/config/product-order/ProductOrderManager';
import SellersManagementCard from '@/components/dashboard/config/SellersManagementCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

const DashboardConfig = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { config, updateConfig, isLoading } = useDashboardConfig();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleConfigChange = (key: string, value: boolean | string | string[]) => {
    console.log('🔵 DashboardConfig - Changing config:', key, '=', value);
    updateConfig({ [key]: value });
  };

  const handleReorderMetrics = (newOrder: string[]) => {
    console.log('🔵 DashboardConfig - Reordering metrics to:', newOrder);
    updateConfig({ metricsOrder: newOrder });
  };

  const handleReorderPreSales = (newOrder: string[]) => {
    console.log('🔵 DashboardConfig - Reordering pre-sales to:', newOrder);
    updateConfig({ preSalesOrder: newOrder });
  };

  const handleReorderProducts = (newOrder: string[]) => {
    console.log('🔵 DashboardConfig - Reordering products to:', newOrder);
    updateConfig({ productOrder: newOrder });
  };

  const handleManualSave = async () => {
    console.log('🔵 DashboardConfig - Manual save requested, navigating to dashboard');
    navigate('/dashboard');
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigHeader 
        onSave={handleManualSave} 
        isLoading={isLoading}
        hasUnsavedChanges={false}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <GeneralConfigCard 
            config={config} 
            onConfigChange={handleConfigChange} 
          />

          <MetricsConfigCard 
            config={config} 
            onConfigChange={handleConfigChange} 
          />

          <PreSalesConfigCard 
            config={config} 
            onConfigChange={handleConfigChange} 
          />

          <DisplayConfigCard 
            config={config} 
            onConfigChange={handleConfigChange} 
          />

          <SpecificGoalsConfigCard 
            config={config} 
            onConfigChange={handleConfigChange} 
          />

          <ProductMetricsConfigCard 
            config={config} 
            onConfigChange={handleConfigChange} 
          />

          {/* Card para gerenciamento de metas */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Metas Empresariais
              </CardTitle>
              <CardDescription>
                Configure produtos e defina metas mensais para acompanhar o desempenho
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => navigate('/dashboard/metas')} 
                className="w-full"
              >
                Gerenciar Metas e Produtos
              </Button>
            </CardContent>
          </Card>

          <SellersManagementCard />

          <MetricsOrderManager 
            config={config}
            metricsOrder={config.metricsOrder}
            onReorderMetrics={handleReorderMetrics}
          />

          <PreSalesOrderManager 
            config={config}
            preSalesOrder={config.preSalesOrder}
            onReorderPreSales={handleReorderPreSales}
          />

          <ProductOrderManager 
            config={config}
            productOrder={config.productOrder || []}
            onReorderProducts={handleReorderProducts}
          />
        </div>
      </main>
    </div>
  );
};

export default DashboardConfig;
