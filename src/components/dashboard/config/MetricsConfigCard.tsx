
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DashboardConfig } from '@/types/dashboardConfig';

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
    { key: 'showCashCollect', label: 'Cash Collect' },
    { key: 'showCac', label: 'CAC (Custo de Aquisição)' },
    { key: 'showProjecaoReceita', label: 'Projeção de Receita' },
    { key: 'showProjecaoFaturamento', label: 'Projeção de Faturamento' },
    { key: 'showNoShow', label: 'No-Show' },
    { key: 'showClosersPerformanceTable', label: 'Tabela de desempenho dos closers' }
  ];

  console.log('🔍 MetricsConfigCard - Current config:', config);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    console.log('🔍 MetricsConfigCard - Checkbox changed:', key, '=', checked);
    
    try {
      // Verificar se a função de callback existe
      if (typeof onConfigChange !== 'function') {
        console.error('❌ MetricsConfigCard - onConfigChange is not a function');
        return;
      }
      
      // Chama a função de callback de forma segura
      onConfigChange(key, checked);
    } catch (error) {
      console.error('❌ MetricsConfigCard - Error in onConfigChange:', error);
    }
  };

  const getConfigValue = (key: string): boolean => {
    try {
      const value = config[key as keyof DashboardConfig];
      return Boolean(value);
    } catch (error) {
      console.error('❌ MetricsConfigCard - Error getting config value for key:', key, error);
      return false;
    }
  };

  if (!config) {
    console.log('⚠️ MetricsConfigCard - No config provided, rendering with defaults');
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores do Comercial</CardTitle>
        <CardDescription>Selecione quais indicadores do comercial deseja exibir no dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {allMetrics.map((metric) => {
            const isChecked = getConfigValue(metric.key);
            
            return (
              <div key={metric.key} className="flex items-center space-x-2">
                <Checkbox
                  id={metric.key}
                  checked={isChecked}
                  onCheckedChange={(checked) => handleCheckboxChange(metric.key, checked as boolean)}
                />
                <Label htmlFor={metric.key} className="text-sm cursor-pointer">
                  {metric.label}
                </Label>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsConfigCard;
