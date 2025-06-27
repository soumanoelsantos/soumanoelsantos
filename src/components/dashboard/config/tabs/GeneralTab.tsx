
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import GeneralConfigCard from '../GeneralConfigCard';
import TabControlSection from '../TabControlSection';
import SellersManagementCard from '../SellersManagementCard';
import SaveButton from '../SaveButton';

interface GeneralTabProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: any) => void;
  onSave: () => void;
  isSaving: boolean;
}

const GeneralTab: React.FC<GeneralTabProps> = ({
  config,
  onConfigChange,
  onSave,
  isSaving
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna da esquerda - Configurações Gerais */}
        <div className="space-y-6">
          <GeneralConfigCard 
            config={config} 
            onConfigChange={onConfigChange} 
          />
          <TabControlSection 
            config={config} 
            onConfigChange={onConfigChange} 
          />
        </div>
        
        {/* Coluna da direita - Gerenciamento do Time */}
        <div className="space-y-6">
          <SellersManagementCard />
        </div>
      </div>
      
      <SaveButton 
        onSave={onSave}
        isLoading={isSaving}
      />
    </div>
  );
};

export default GeneralTab;
