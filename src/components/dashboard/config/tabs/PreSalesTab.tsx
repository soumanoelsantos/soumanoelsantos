
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import PreSalesConfigCard from '../PreSalesConfigCard';
import SDRTeamManagementCard from '../SDRTeamManagementCard';
import PreSalesOrderManager from '../PreSalesOrderManager';
import SaveButton from '../SaveButton';

interface PreSalesTabProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: any) => void;
  onReorderPreSales: (newOrder: string[]) => void;
  onSave: () => void;
  isSaving: boolean;
}

const PreSalesTab: React.FC<PreSalesTabProps> = ({
  config,
  onConfigChange,
  onReorderPreSales,
  onSave,
  isSaving
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna da esquerda - Pré-vendas */}
        <div className="space-y-6">
          <PreSalesConfigCard 
            config={config} 
            onConfigChange={onConfigChange} 
          />
          <SDRTeamManagementCard />
        </div>
        
        {/* Coluna da direita - Pré-vendas */}
        <div className="space-y-6">
          <PreSalesOrderManager
            config={config}
            preSalesOrder={config.preSalesOrder}
            onReorderPreSales={onReorderPreSales}
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

export default PreSalesTab;
