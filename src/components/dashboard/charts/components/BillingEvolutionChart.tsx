
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEvolutionData } from '@/hooks/useEvolutionData';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { ChartContainer } from './ChartContainer';
import { BillingChartLines } from './ChartLines';
import { formatCurrency, formatYAxisValue } from '../utils/chartUtils';

export const BillingEvolutionChart = () => {
  const { billingData, isLoading } = useEvolutionData();
  const { config } = useDashboardConfig();

  return (
    <ChartContainer title="EVOLUÇÃO FATURAMENTO" isLoading={isLoading}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={billingData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => formatYAxisValue(value, 'billing')}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [formatCurrency(value), name]}
            labelFormatter={(label) => `Dia ${label}`}
          />
          <Legend />
          <BillingChartLines config={config} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
