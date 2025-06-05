
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import MetricsCards from './metrics/MetricsCards';
import ChartsSection from './metrics/ChartsSection';
import AdditionalIndicators from './metrics/AdditionalIndicators';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();

  // Função para ordenar componentes baseado na configuração
  const getOrderedComponents = () => {
    const components = [];

    if (!config.metricsOrder || config.metricsOrder.length === 0) {
      // Ordem padrão se não há configuração
      components.push({ type: 'cards', component: <MetricsCards config={config} /> });
      if (config.showCharts) {
        components.push({ type: 'charts', component: <ChartsSection /> });
      }
      if (config.showMonthlyGoals) {
        components.push({ type: 'indicators', component: <AdditionalIndicators config={config} /> });
      }
      return components;
    }

    // Primeiro, adiciona os cards das métricas básicas na ordem especificada
    const hasBasicMetrics = config.metricsOrder.some(key => 
      ['showSales', 'showLeads', 'showConversion', 'showRevenue', 'showTicketMedio', 'showTeam'].includes(key)
    );
    
    if (hasBasicMetrics) {
      components.push({ type: 'cards', component: <MetricsCards config={config} /> });
    }

    // Depois, adiciona os outros componentes baseado na ordem
    config.metricsOrder.forEach(key => {
      if (key === 'salesChart' && config.showCharts && !components.find(c => c.type === 'charts')) {
        components.push({ type: 'charts', component: <ChartsSection /> });
      }
      if ((key === 'conversionRate' || key === 'revenueGoal' || key === 'salesGoal') && 
          config.showMonthlyGoals && !components.find(c => c.type === 'indicators')) {
        components.push({ type: 'indicators', component: <AdditionalIndicators config={config} /> });
      }
    });

    return components;
  };

  const orderedComponents = getOrderedComponents();

  return (
    <div className="space-y-6">
      {orderedComponents.map((comp, index) => (
        <div key={`${comp.type}-${index}`}>
          {comp.component}
        </div>
      ))}
    </div>
  );
};

export default DashboardMetrics;
