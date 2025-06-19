
import React from 'react';
import { Line } from 'recharts';
import { DashboardConfig } from '@/hooks/useDashboardConfig';

interface RevenueChartLinesProps {
  config: DashboardConfig;
}

export const RevenueChartLines: React.FC<RevenueChartLinesProps> = ({ config }) => {
  return (
    <>
      {/* Meta principal sempre visível */}
      <Line 
        type="monotone" 
        dataKey="metaReceita" 
        stroke="#ef4444" 
        strokeWidth={2}
        name="Meta Receita"
        dot={false}
      />
      
      {/* Realizado até a data atual */}
      <Line 
        type="monotone" 
        dataKey="receita" 
        stroke="#22c55e" 
        strokeWidth={2}
        name="Receita"
        dot={false}
        connectNulls={false}
      />
      
      {/* Projeção de receita - linha pontilhada */}
      <Line 
        type="monotone" 
        dataKey="receitaProjection" 
        stroke="#22c55e" 
        strokeWidth={2}
        strokeDasharray="8 4"
        name="Projeção Receita"
        dot={false}
        connectNulls={false}
      />
      
      {/* Super Meta - só aparece se habilitada */}
      {config.showSuperMetaReceita && (
        <Line 
          type="monotone" 
          dataKey="superMetaReceita" 
          stroke="#f97316" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Super Meta Receita"
          dot={false}
        />
      )}
      
      {/* Hiper Meta - só aparece se habilitada */}
      {config.showHiperMetaReceita && (
        <Line 
          type="monotone" 
          dataKey="hiperMetaReceita" 
          stroke="#3b82f6" 
          strokeWidth={2}
          strokeDasharray="10 5"
          name="Hiper Meta Receita"
          dot={false}
        />
      )}
    </>
  );
};

interface BillingChartLinesProps {
  config: DashboardConfig;
}

export const BillingChartLines: React.FC<BillingChartLinesProps> = ({ config }) => {
  return (
    <>
      {/* Meta principal sempre visível */}
      <Line 
        type="monotone" 
        dataKey="metaFaturamento" 
        stroke="#ef4444" 
        strokeWidth={2}
        name="Meta Faturamento"
        dot={false}
      />
      
      {/* Realizado até a data atual */}
      <Line 
        type="monotone" 
        dataKey="faturamento" 
        stroke="#22c55e" 
        strokeWidth={2}
        name="Faturamento"
        dot={false}
        connectNulls={false}
      />
      
      {/* Projeção de faturamento - linha pontilhada */}
      <Line 
        type="monotone" 
        dataKey="faturamentoProjection" 
        stroke="#22c55e" 
        strokeWidth={2}
        strokeDasharray="8 4"
        name="Projeção Faturamento"
        dot={false}
        connectNulls={false}
      />
      
      {/* Super Meta - só aparece se habilitada */}
      {config.showSuperMetaFaturamento && (
        <Line 
          type="monotone" 
          dataKey="superMetaFaturamento" 
          stroke="#f97316" 
          strokeWidth={2}
          strokeDasharray="5 5"
          name="Super Meta Faturamento"
          dot={false}
        />
      )}
      
      {/* Hiper Meta - só aparece se habilitada */}
      {config.showHiperMetaFaturamento && (
        <Line 
          type="monotone" 
          dataKey="hiperMetaFaturamento" 
          stroke="#3b82f6" 
          strokeWidth={2}
          strokeDasharray="10 5"
          name="Hiper Meta Faturamento"
          dot={false}
        />
      )}
    </>
  );
};
