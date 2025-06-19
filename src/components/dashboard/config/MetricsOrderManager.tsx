
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronUp, ChevronDown, ArrowUpDown } from 'lucide-react';
import { DashboardConfig } from '@/types/dashboardConfig';

interface MetricItem {
  key: string;
  title: string;
  enabled: boolean;
}

interface MetricsOrderManagerProps {
  config: DashboardConfig;
  metricsOrder: string[];
  onReorderMetrics: (newOrder: string[]) => void;
}

const MetricsOrderManager: React.FC<MetricsOrderManagerProps> = ({
  config,
  metricsOrder,
  onReorderMetrics
}) => {
  // Mapeamento de chaves para títulos amigáveis
  const metricTitles: { [key: string]: string } = {
    'showTicketFaturamento': 'Ticket Faturamento',
    'showTicketReceita': 'Ticket Receita',
    'showFaltaFaturamento': 'Falta de Faturamento',
    'showFaltaReceita': 'Falta de Receita',
    'showDiariaReceita': 'Diária de Receita',
    'showDiariaFaturamento': 'Diária de Faturamento',
    'showSuperMetaFaturamento': 'Super Meta Faturamento',
    'showSuperMetaReceita': 'Super Meta Receita',
    'showHiperMetaFaturamento': 'Hiper Meta Faturamento',
    'showHiperMetaReceita': 'Hiper Meta Receita',
    'showFaltaReceitaSuper': 'Falta Receita (Super)',
    'showFaltaReceitaHiper': 'Falta Receita (Hiper)',
    'showFaltaFaturamentoSuper': 'Falta Faturamento (Super)',
    'showFaltaFaturamentoHiper': 'Falta Faturamento (Hiper)',
    'showMetaFaturamento': 'Meta Faturamento',
    'showMetaReceita': 'Meta Receita',
    'showFaturamento': 'Faturamento',
    'showReceita': 'Receita',
    'showQuantidadeVendas': 'Quantidade de Vendas',
    'showCashCollect': 'Cash Collect',
    'showCac': 'CAC (Custo de Aquisição)',
    'showConversion': 'Taxa de Conversão',
    'showRevenue': 'Receita',
    // Novos indicadores de projeção
    'showProjecaoReceita': 'Projeção de Receita',
    'showProjecaoFaturamento': 'Projeção de Faturamento',
    'showNoShow': 'No-Show',
    'specificGoals': 'Metas Específicas',
    'revenueEvolutionChart': 'Gráfico de Evolução de Receita',
    'billingEvolutionChart': 'Gráfico de Evolução de Faturamento',
    // Novos gráficos de vendedores
    'sellerRevenueChart': 'Gráfico de Receita por Vendedor',
    'sellerBillingChart': 'Gráfico de Faturamento por Vendedor',
    // Novos gráficos de análise temporal
    'temporalRevenueChart': 'Gráfico de Análise Temporal de Receita',
    'temporalBillingChart': 'Gráfico de Análise Temporal de Faturamento',
    // Nova tabela de performance dos closers
    'closersPerformanceTable': 'Tabela de Performance dos Closers'
  };

  // Lista de todas as chaves de métricas possíveis
  const allMetricKeys = [
    'showConversion', 'showRevenue',
    'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
    'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
    'showHiperMetaReceita', 'showFaltaReceitaSuper',
    'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita', 
    'showQuantidadeVendas', 'showCashCollect', 'showCac',
    // Incluir os novos indicadores de projeção
    'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow',
    // Incluir a nova tabela de closers
    'showClosersPerformanceTable'
  ];

  // Obter métricas habilitadas
  const enabledMetrics: MetricItem[] = [];

  // Adicionar métricas de cards habilitadas
  allMetricKeys.forEach(key => {
    if (config[key as keyof DashboardConfig]) {
      enabledMetrics.push({
        key,
        title: metricTitles[key] || key,
        enabled: true
      });
    }
  });

  // Adicionar metas específicas se habilitadas
  if (config.showSpecificGoals && config.selectedGoalIds.length > 0) {
    enabledMetrics.push({ key: 'specificGoals', title: metricTitles['specificGoals'], enabled: true });
  }

  // Adicionar gráficos de evolução se habilitados
  if (config.showRevenueEvolutionChart) {
    enabledMetrics.push({ key: 'revenueEvolutionChart', title: metricTitles['revenueEvolutionChart'], enabled: true });
  }
  
  if (config.showBillingEvolutionChart) {
    enabledMetrics.push({ key: 'billingEvolutionChart', title: metricTitles['billingEvolutionChart'], enabled: true });
  }
  
  // Adicionar novos gráficos de vendedores se habilitados
  if (config.showSellerRevenueChart) {
    enabledMetrics.push({ key: 'sellerRevenueChart', title: metricTitles['sellerRevenueChart'], enabled: true });
  }
  
  if (config.showSellerBillingChart) {
    enabledMetrics.push({ key: 'sellerBillingChart', title: metricTitles['sellerBillingChart'], enabled: true });
  }

  // Adicionar novos gráficos de análise temporal se habilitados
  if (config.showTemporalRevenueChart) {
    enabledMetrics.push({ key: 'temporalRevenueChart', title: metricTitles['temporalRevenueChart'], enabled: true });
  }
  
  if (config.showTemporalBillingChart) {
    enabledMetrics.push({ key: 'temporalBillingChart', title: metricTitles['temporalBillingChart'], enabled: true });
  }

  // Ordenar métricas com base na ordem salva
  const orderedMetrics = metricsOrder
    .map(key => enabledMetrics.find(metric => metric.key === key))
    .filter((metric): metric is MetricItem => metric !== undefined)
    .concat(
      enabledMetrics.filter(metric => !metricsOrder.includes(metric.key))
    );

  const moveUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...orderedMetrics];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      const newOrderKeys = newOrder.map(item => item.key);
      console.log('Moving up - new order:', newOrderKeys);
      onReorderMetrics(newOrderKeys);
    }
  };

  const moveDown = (index: number) => {
    if (index < orderedMetrics.length - 1) {
      const newOrder = [...orderedMetrics];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      const newOrderKeys = newOrder.map(item => item.key);
      console.log('Moving down - new order:', newOrderKeys);
      onReorderMetrics(newOrderKeys);
    }
  };

  if (orderedMetrics.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowUpDown className="h-5 w-5" />
            Ordem dos Indicadores
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500">
            Nenhum indicador habilitado. Ative alguns indicadores para poder organizá-los.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          Ordem dos Indicadores
        </CardTitle>
        <p className="text-sm text-gray-600">
          Use os botões para reordenar como os indicadores aparecerão no dashboard
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {orderedMetrics.map((metric, index) => (
            <div
              key={metric.key}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border"
            >
              <span className="text-sm font-medium text-gray-700">
                {index + 1}. {metric.title}
              </span>
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveUp(index)}
                  disabled={index === 0}
                  className="h-8 w-8 p-0"
                >
                  <ChevronUp className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => moveDown(index)}
                  disabled={index === orderedMetrics.length - 1}
                  className="h-8 w-8 p-0"
                >
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MetricsOrderManager;
