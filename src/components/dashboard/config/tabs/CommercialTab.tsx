
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import MetricsConfigCard from '../MetricsConfigCard';
import MetricsOrderManager from '../MetricsOrderManager';
import DisplayConfigCard from '../DisplayConfigCard';
import SaveButton from '../SaveButton';

interface CommercialTabProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: any) => void;
  onReorderMetrics: (newOrder: string[]) => void;
  onSave: () => void;
  isSaving: boolean;
}

const CommercialTab: React.FC<CommercialTabProps> = ({
  config,
  onConfigChange,
  onReorderMetrics,
  onSave,
  isSaving
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna da esquerda - Comercial */}
        <div className="space-y-6">
          <MetricsConfigCard 
            config={config} 
            onConfigChange={onConfigChange} 
          />
          <MetricsOrderManager
            config={config}
            metricsOrder={config.metricsOrder}
            onReorderMetrics={onReorderMetrics}
          />
        </div>
        
        {/* Coluna da direita - Comercial */}
        <div className="space-y-6">
          <DisplayConfigCard 
            config={config} 
            onConfigChange={onConfigChange} 
          />
        </div>
      </div>
      
      <SaveButton 
        onSave={onSave}
        isLoading={isSaving}
      />
    </div>
  );
};

export default CommercialTab;
