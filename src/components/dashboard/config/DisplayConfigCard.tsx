
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DashboardConfig } from '@/types/dashboardConfig';

interface DisplayConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean) => void;
}

const DisplayConfigCard: React.FC<DisplayConfigCardProps> = ({ config, onConfigChange }) => {
  const chartOptions = [
    { key: 'showRevenueEvolutionChart', label: 'Gráfico de Evolução de Receita' },
    { key: 'showBillingEvolutionChart', label: 'Gráfico de Evolução de Faturamento' },
    { key: 'showSellerRevenueChart', label: 'Gráfico de Receita por Vendedor' },
    { key: 'showSellerBillingChart', label: 'Gráfico de Faturamento por Vendedor' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gráficos e Visualizações</CardTitle>
        <CardDescription>Configure quais gráficos serão exibidos no dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {chartOptions.map((option) => (
          <div key={option.key} className="flex items-center space-x-2">
            <Checkbox
              id={option.key}
              checked={config[option.key as keyof DashboardConfig] as boolean}
              onCheckedChange={(checked) => onConfigChange(option.key, checked as boolean)}
            />
            <Label htmlFor={option.key} className="text-sm">{option.label}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default DisplayConfigCard;
