
import React from 'react';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import MetricsCards from './metrics/MetricsCards';
import ChartsSection from './metrics/ChartsSection';
import AdditionalIndicators from './metrics/AdditionalIndicators';

const DashboardMetrics = () => {
  const { config } = useDashboardConfig();

  return (
    <div className="space-y-6">
      {/* Cards de Métricas */}
      <MetricsCards config={config} />

      {/* Gráficos - só exibe se showCharts estiver habilitado */}
      {config.showCharts && <ChartsSection />}

      {/* Indicadores Adicionais - só exibe se showMonthlyGoals estiver habilitado */}
      {config.showMonthlyGoals && <AdditionalIndicators config={config} />}
    </div>
  );
};

export default DashboardMetrics;
