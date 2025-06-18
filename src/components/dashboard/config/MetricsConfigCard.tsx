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
  const allMetrics = [
    { key: 'showConversion', label: 'Taxa de Conversão' },
    { key: 'showTicketFaturamento', label: 'Ticket Faturamento' },
    { key: 'showTicketReceita', label: 'Ticket Receita' },
    { key: 'showFaturamento', label: 'Faturamento' },
    { key: 'showReceita', label: 'Receita (Detalhada)' },
    { key: 'showQuantidadeVendas', label: 'Quantidade de Vendas' },
    { key: 'showMetaFaturamento', label: 'Meta Faturamento' },
    { key: 'showMetaReceita', label: 'Meta Receita' },
    { key: 'showSuperMetaFaturamento', label: 'Super Meta Faturamento' },
    { key: 'showSuperMetaReceita', label: 'Super Meta Receita' },
    { key: 'showHiperMetaFaturamento', label: 'Hiper Meta Faturamento' },
    { key: 'showHiperMetaReceita', label: 'Hiper Meta Receita' },
    { key: 'showFaltaFaturamento', label: 'Falta de Faturamento' },
    { key: 'showFaltaReceita', label: 'Falta de Receita' },
    { key: 'showFaltaFaturamentoSuper', label: 'Falta Faturamento (Super)' },
    { key: 'showFaltaFaturamentoHiper', label: 'Falta Faturamento (Hiper)' },
    { key: 'showFaltaReceitaSuper', label: 'Falta Receita (Super)' },
    { key: 'showFaltaReceitaHiper', label: 'Falta Receita (Hiper)' },
    { key: 'showDiariaReceita', label: 'Diária de Receita' },
    { key: 'showDiariaFaturamento', label: 'Diária de Faturamento' },
    { key: 'showCashCollect', label: 'Cash Collect' }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores</CardTitle>
        <CardDescription>Selecione quais indicadores deseja exibir no dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {allMetrics.map((metric) => (
            <div key={metric.key} className="flex items-center space-x-2">
              <Checkbox
                id={metric.key}
                checked={config[metric.key as keyof DashboardConfig] as boolean}
                onCheckedChange={(checked) => onConfigChange(metric.key, checked as boolean)}
              />
              <Label htmlFor={metric.key} className="text-sm">{metric.label}</Label>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsConfigCard;
