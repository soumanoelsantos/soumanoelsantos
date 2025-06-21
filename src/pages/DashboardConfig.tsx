
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Navigate } from 'react-router-dom';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import ConfigHeader from '@/components/dashboard/config/ConfigHeader';
import GeneralConfigCard from '@/components/dashboard/config/GeneralConfigCard';
import MetricsConfigCard from '@/components/dashboard/config/MetricsConfigCard';
import PreSalesConfigCard from '@/components/dashboard/config/PreSalesConfigCard';
import ProductChartsConfigCard from '@/components/dashboard/config/ProductChartsConfigCard';
import ProductMetricsConfigCard from '@/components/dashboard/config/ProductMetricsConfigCard';
import SpecificGoalsConfigCard from '@/components/dashboard/config/SpecificGoalsConfigCard';
import SellersManagementCard from '@/components/dashboard/config/SellersManagementCard';
import ProductsManagementCard from '@/components/dashboard/config/ProductsManagementCard';
import DisplayConfigCard from '@/components/dashboard/config/DisplayConfigCard';

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
    updateConfig({ [key]: value });
  };

  const handleSave = async () => {
    // Config is automatically saved by useDashboardConfig
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigHeader onSave={handleSave} isLoading={false} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Coluna da esquerda */}
          <div className="space-y-6">
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
            <SpecificGoalsConfigCard 
              config={config} 
              onConfigChange={handleConfigChange} 
            />
            <DisplayConfigCard 
              config={config} 
              onConfigChange={handleConfigChange} 
            />
          </div>
          
          {/* Coluna da direita */}
          <div className="space-y-6">
            <ProductChartsConfigCard 
              config={config} 
              onConfigChange={handleConfigChange} 
            />
            <ProductMetricsConfigCard 
              config={config} 
              onConfigChange={handleConfigChange} 
            />
            <SellersManagementCard />
            <ProductsManagementCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardConfig;
