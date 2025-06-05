
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
  const metricsGroups = [
    {
      title: 'Métricas Básicas',
      metrics: [
        { key: 'showSales', label: 'Total de Vendas' },
        { key: 'showLeads', label: 'Leads Gerados' },
        { key: 'showConversion', label: 'Taxa de Conversão' },
        { key: 'showRevenue', label: 'Receita' },
        { key: 'showTicketMedio', label: 'Ticket Médio' },
        { key: 'showTeam', label: 'Performance da Equipe' }
      ]
    },
    {
      title: 'Tickets e Valores',
      metrics: [
        { key: 'showTicketFaturamento', label: 'Ticket Faturamento' },
        { key: 'showTicketReceita', label: 'Ticket Receita' },
        { key: 'showFaturamento', label: 'Faturamento' },
        { key: 'showReceita', label: 'Receita' },
        { key: 'showQuantidadeVendas', label: 'Quantidade de Vendas' }
      ]
    },
    {
      title: 'Metas e Projeções',
      metrics: [
        { key: 'showMetaFaturamento', label: 'Meta Faturamento' },
        { key: 'showMetaReceita', label: 'Meta Receita' },
        { key: 'showSuperMetaFaturamento', label: 'Super Meta Faturamento' },
        { key: 'showSuperMetaReceita', label: 'Super Meta Receita' },
        { key: 'showHiperMetaFaturamento', label: 'Hiper Meta Faturamento' },
        { key: 'showHiperMetaReceita', label: 'Hiper Meta Receita' }
      ]
    },
    {
      title: 'Faltas e Gaps',
      metrics: [
        { key: 'showFaltaFaturamento', label: 'Falta de Faturamento' },
        { key: 'showFaltaReceita', label: 'Falta de Receita' },
        { key: 'showFaltaReceitaSuper', label: 'Falta Receita (Super)' },
        { key: 'showFaltaReceitaHiper', label: 'Falta Receita (Hiper)' }
      ]
    },
    {
      title: 'Atividades e Performance',
      metrics: [
        { key: 'showConversao', label: 'Conversão' },
        { key: 'showDiariaReceita', label: 'Diária de Receita' },
        { key: 'showCallsDiarias', label: 'Calls Diárias' },
        { key: 'showCashCollect', label: 'Cash Collect' }
      ]
    }
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores</CardTitle>
        <CardDescription>Selecione quais indicadores deseja exibir no dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {metricsGroups.map((group) => (
          <div key={group.title} className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700 border-b pb-1">{group.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {group.metrics.map((metric) => (
                <div key={metric.key} className="flex items-center space-x-2">
                  <Checkbox
                    id={metric.key}
                    checked={config[metric.key as keyof DashboardConfig] as boolean}
                    onCheckedChange={(checked) => onConfigChange(metric.key, checked as boolean)}
                  />
                  <Label htmlFor={metric.key} className="text-xs">{metric.label}</Label>
                </div>
              ))}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default MetricsConfigCard;
