
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardConfig } from '@/types/dashboardConfig';
import TabControlCard from './TabControlCard';

interface TabControlSectionProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean) => void;
}

const TabControlSection: React.FC<TabControlSectionProps> = ({ config, onConfigChange }) => {
  console.log('🔧 [DEBUG] TabControlSection - Current config:', {
    enableCommercialTab: config.enableCommercialTab,
    enableProductTab: config.enableProductTab,
    enablePreSalesTab: config.enablePreSalesTab
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Controle de Abas do Dashboard</CardTitle>
        <CardDescription>
          Selecione quais abas devem aparecer no dashboard principal
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <TabControlCard
          title="Comercial"
          description="Exibe métricas e gráficos relacionados ao desempenho comercial"
          isEnabled={config.enableCommercialTab}
          onToggle={(enabled) => onConfigChange('enableCommercialTab', enabled)}
        />
        
        <TabControlCard
          title="Produto"
          description="Exibe métricas específicas por produto selecionado"
          isEnabled={config.enableProductTab}
          onToggle={(enabled) => onConfigChange('enableProductTab', enabled)}
        />
        
        <TabControlCard
          title="Pré-vendas"
          description="Exibe métricas de ligações, agendamentos e performance dos SDRs"
          isEnabled={config.enablePreSalesTab}
          onToggle={(enabled) => onConfigChange('enablePreSalesTab', enabled)}
        />
      </CardContent>
    </Card>
  );
};

export default TabControlSection;
