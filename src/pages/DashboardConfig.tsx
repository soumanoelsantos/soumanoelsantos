
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
import PreSalesConfigCard from '@/components/dashboard/config/PreSalesConfigCard';
import MetricsOrderManager from '@/components/dashboard/config/MetricsOrderManager';
import SellersManagementCard from '@/components/dashboard/config/SellersManagementCard';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

const DashboardConfig = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { config, setConfig, saveConfig, isLoading, hasUnsavedChanges } = useDashboardConfig();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleConfigChange = (key: string, value: boolean | string | string[]) => {
    console.log('🔵 DashboardConfig - Changing config:', key, '=', value);
    
    // Create new config with the updated value
    const newConfig = {
      ...config,
      [key]: value
    };
    
    console.log('🔵 DashboardConfig - New config after change:', newConfig);
    
    // This will trigger auto-save
    setConfig(newConfig);
  };

  const handleReorderMetrics = (newOrder: string[]) => {
    console.log('🔵 DashboardConfig - Reordering metrics to:', newOrder);
    const newConfig = {
      ...config,
      metricsOrder: newOrder
    };
    console.log('🔵 DashboardConfig - Updated config with new metricsOrder:', newConfig.metricsOrder);
    setConfig(newConfig);
  };

  const handleManualSave = async () => {
    console.log('🔵 DashboardConfig - Manual save requested');
    console.log('🔵 DashboardConfig - Current config:', config);
    console.log('🔵 DashboardConfig - Has unsaved changes:', hasUnsavedChanges);
    
    try {
      const success = await saveConfig();
      console.log('🔵 DashboardConfig - Save result:', success);
      
      if (success) {
        console.log('🟢 DashboardConfig - Save successful, navigating to dashboard');
        navigate('/dashboard');
      } else {
        console.log('🔴 DashboardConfig - Save failed, staying on page');
      }
    } catch (error) {
      console.error('🔴 DashboardConfig - Error during save:', error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigHeader 
        onSave={handleManualSave} 
        isLoading={isLoading}
        hasUnsavedChanges={hasUnsavedChanges}
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
        </div>
      </main>
    </div>
  );
};

export default DashboardConfig;
