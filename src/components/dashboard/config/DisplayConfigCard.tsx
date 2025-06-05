
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DashboardConfig } from '@/hooks/useDashboardConfig';

interface DisplayConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean) => void;
}

const DisplayConfigCard: React.FC<DisplayConfigCardProps> = ({ config, onConfigChange }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualização</CardTitle>
        <CardDescription>Configure como o dashboard será exibido</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="showCharts"
            checked={config.showCharts}
            onCheckedChange={(checked) => onConfigChange('showCharts', checked as boolean)}
          />
          <Label htmlFor="showCharts">Exibir Gráficos</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="showMonthlyGoals"
            checked={config.showMonthlyGoals}
            onCheckedChange={(checked) => onConfigChange('showMonthlyGoals', checked as boolean)}
          />
          <Label htmlFor="showMonthlyGoals">Metas Mensais</Label>
        </div>
      </CardContent>
    </Card>
  );
};

export default DisplayConfigCard;
