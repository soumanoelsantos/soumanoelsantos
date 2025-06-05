
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DashboardConfig } from '@/hooks/useDashboardConfig';

interface MetricsConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean) => void;
}

const MetricsConfigCard: React.FC<MetricsConfigCardProps> = ({ config, onConfigChange }) => {
  const metricsOptions = [
    { key: 'showSales', label: 'Total de Vendas' },
    { key: 'showLeads', label: 'Leads Gerados' },
    { key: 'showConversion', label: 'Taxa de Conversão' },
    { key: 'showRevenue', label: 'Receita' },
    { key: 'showTicketMedio', label: 'Ticket Médio' },
    { key: 'showTeam', label: 'Performance da Equipe' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores</CardTitle>
        <CardDescription>Selecione quais indicadores deseja exibir no dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {metricsOptions.map((metric) => (
          <div key={metric.key} className="flex items-center space-x-2">
            <Checkbox
              id={metric.key}
              checked={config[metric.key as keyof DashboardConfig] as boolean}
              onCheckedChange={(checked) => onConfigChange(metric.key, checked as boolean)}
            />
            <Label htmlFor={metric.key}>{metric.label}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MetricsConfigCard;
