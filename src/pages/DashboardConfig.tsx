
import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import ConfigHeader from '@/components/dashboard/config/ConfigHeader';
import GeneralConfigCard from '@/components/dashboard/config/GeneralConfigCard';
import MetricsConfigCard from '@/components/dashboard/config/MetricsConfigCard';
import DisplayConfigCard from '@/components/dashboard/config/DisplayConfigCard';
import DraggablePreview from '@/components/dashboard/DraggablePreview';

const DashboardConfig = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { config, setConfig, saveConfig, isLoading } = useDashboardConfig();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  const handleConfigChange = (key: string, value: boolean | string) => {
    setConfig(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleReorderMetrics = (newOrder: string[]) => {
    setConfig(prev => ({
      ...prev,
      metricsOrder: newOrder
    }));
  };

  const handleSave = async () => {
    const success = await saveConfig(config);
    if (success) {
      navigate('/dashboard');
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <ConfigHeader onSave={handleSave} isLoading={isLoading} />

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

          <DisplayConfigCard 
            config={config} 
            onConfigChange={handleConfigChange} 
          />

          <DraggablePreview 
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
