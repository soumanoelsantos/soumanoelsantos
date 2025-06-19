
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardConfig } from '@/types/dashboardConfig';
import { allMetricsCards } from '../data/metrics';
import { RevenueEvolutionChart, BillingEvolutionChart } from '../charts/EvolutionCharts';
import { SellerRevenueChart, SellerBillingChart } from '../charts/SellerPerformanceCharts';
import { TemporalRevenueChart, TemporalBillingChart } from '../charts/TemporalAnalysisCharts';
import ClosersPerformanceTable from '../tables/ClosersPerformanceTable';
import SpecificGoalsCards from '../goals/SpecificGoalsCards';

interface ItemRendererProps {
  itemKey: string;
  config: DashboardConfig;
}

export const ItemRenderer: React.FC<ItemRendererProps> = ({ itemKey, config }) => {
  console.log('🔍 ItemRenderer - Processing key:', itemKey);
  console.log('🔍 ItemRenderer - Config value for key:', config[itemKey as keyof DashboardConfig]);
  
  // Lista completa de todas as chaves de métricas que devem ser renderizadas como cards
  const metricKeys = [
    'showConversion', 'showRevenue',
    'showTicketFaturamento', 'showTicketReceita', 'showFaltaFaturamento', 
    'showFaltaReceita', 'showDiariaReceita', 'showDiariaFaturamento',
    'showSuperMetaFaturamento', 'showSuperMetaReceita', 'showHiperMetaFaturamento',
    'showHiperMetaReceita', 'showFaltaReceitaSuper',
    'showFaltaReceitaHiper', 'showFaltaFaturamentoSuper', 'showFaltaFaturamentoHiper',
    'showMetaFaturamento', 'showMetaReceita', 'showFaturamento', 'showReceita', 
    'showQuantidadeVendas', 'showCashCollect', 'showCac',
    'showProjecaoReceita', 'showProjecaoFaturamento', 'showNoShow'
  ];

  // Verificar se a chave é uma métrica e se está habilitada
  if (metricKeys.includes(itemKey)) {
    const isEnabled = config[itemKey as keyof DashboardConfig] as boolean;
    console.log(`🔍 Metric ${itemKey} is enabled:`, isEnabled);
    
    if (!isEnabled) {
      console.log(`❌ Metric ${itemKey} is disabled, not rendering`);
      return null;
    }
    
    const metric = allMetricsCards.find(m => m.key === itemKey);
    console.log(`🔍 Found metric for key ${itemKey}:`, metric);
    
    if (metric) {
      console.log(`✅ Rendering metric card for ${itemKey}`);
      return (
        <div className="h-40 flex flex-col border-r border-b border-gray-200 last:border-r-0">
          <div className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0 p-3">
            <div className="text-xs font-medium text-gray-600">
              {metric.title}
            </div>
            <metric.icon className={`h-3 w-3 ${metric.color} flex-shrink-0`} />
          </div>
          <div className="flex-1 flex flex-col justify-between p-3 pt-0">
            <div className="text-lg font-bold">{metric.value}</div>
            <div className="mt-auto">
              <p className="text-xs text-gray-600 mt-1">
                {metric.description}
              </p>
              <div className="text-xs text-green-600 mt-2">
                {metric.trend} vs mês anterior
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      console.log(`❌ No metric data found for key: ${itemKey}`);
    }
    
    return null;
  }

  // Metas específicas
  if (itemKey === 'specificGoals') {
    if (!config.showSpecificGoals) {
      console.log('❌ Specific goals is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering specific goals cards');
    return <SpecificGoalsCards config={config} />;
  }

  // Gráfico de evolução de receita
  if (itemKey === 'revenueEvolutionChart') {
    console.log('🔍 Revenue evolution chart - Config value:', config.showRevenueEvolutionChart);
    if (!config.showRevenueEvolutionChart) {
      console.log('❌ Revenue evolution chart is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering revenue evolution chart');
    return <RevenueEvolutionChart />;
  }

  // Gráfico de evolução de faturamento
  if (itemKey === 'billingEvolutionChart') {
    console.log('🔍 Billing evolution chart - Config value:', config.showBillingEvolutionChart);
    if (!config.showBillingEvolutionChart) {
      console.log('❌ Billing evolution chart is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering billing evolution chart');
    return <BillingEvolutionChart />;
  }

  // Gráfico de receita dos vendedores
  if (itemKey === 'sellerRevenueChart') {
    console.log('🔍 Seller revenue chart - Config value:', config.showSellerRevenueChart);
    if (!config.showSellerRevenueChart) {
      console.log('❌ Seller revenue chart is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering seller revenue chart');
    return <SellerRevenueChart />;
  }

  // Gráfico de faturamento dos vendedores
  if (itemKey === 'sellerBillingChart') {
    console.log('🔍 Seller billing chart - Config value:', config.showSellerBillingChart);
    if (!config.showSellerBillingChart) {
      console.log('❌ Seller billing chart is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering seller billing chart');
    return <SellerBillingChart />;
  }

  // Novo gráfico de análise temporal de receita
  if (itemKey === 'temporalRevenueChart') {
    console.log('🔍 Temporal revenue chart - Config value:', config.showTemporalRevenueChart);
    if (!config.showTemporalRevenueChart) {
      console.log('❌ Temporal revenue chart is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering temporal revenue chart');
    return <TemporalRevenueChart />;
  }

  // Novo gráfico de análise temporal de faturamento
  if (itemKey === 'temporalBillingChart') {
    console.log('🔍 Temporal billing chart - Config value:', config.showTemporalBillingChart);
    if (!config.showTemporalBillingChart) {
      console.log('❌ Temporal billing chart is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering temporal billing chart');
    return <TemporalBillingChart />;
  }

  // Tabela de performance dos closers - usando a chave consistente
  if (itemKey === 'showClosersPerformanceTable') {
    console.log('🔍 Closers performance table - Config value:', config.showClosersPerformanceTable);
    if (!config.showClosersPerformanceTable) {
      console.log('❌ Closers performance table is disabled, not rendering');
      return null;
    }
    console.log('✅ Rendering closers performance table');
    return <ClosersPerformanceTable />;
  }

  console.log(`❓ No render logic found for key: ${itemKey}`);
  return null;
};
