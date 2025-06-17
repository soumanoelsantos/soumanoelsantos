
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Target } from 'lucide-react';

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

          {/* Novo card para gerenciamento de metas */}
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
