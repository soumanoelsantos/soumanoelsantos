
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { BarChart3 } from 'lucide-react';
import { DashboardConfig } from '@/types/dashboardConfig';

interface DisplayConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean) => void;
}

const DisplayConfigCard: React.FC<DisplayConfigCardProps> = ({ config, onConfigChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Exibição e Gráficos
        </CardTitle>
        <CardDescription>
          Configure quais gráficos e visualizações serão mostradas no dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="showRevenueEvolutionChart" className="text-sm font-medium">
            Gráfico de Evolução de Receita
          </Label>
          <Switch
            id="showRevenueEvolutionChart"
            checked={config.showRevenueEvolutionChart}
            onCheckedChange={(checked) => onConfigChange('showRevenueEvolutionChart', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showBillingEvolutionChart" className="text-sm font-medium">
            Gráfico de Evolução de Faturamento
          </Label>
          <Switch
            id="showBillingEvolutionChart"
            checked={config.showBillingEvolutionChart}
            onCheckedChange={(checked) => onConfigChange('showBillingEvolutionChart', checked)}
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="showSpecificGoals" className="text-sm font-medium">
            Mostrar Metas Específicas
          </Label>
          <Switch
            id="showSpecificGoals"
            checked={config.showSpecificGoals}
            onCheckedChange={(checked) => onConfigChange('showSpecificGoals', checked)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplayConfigCard;
