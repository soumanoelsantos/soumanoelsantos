
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEvolutionData } from '@/hooks/useEvolutionData';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';
import { ChartContainer } from './ChartContainer';
import { RevenueChartLines } from './ChartLines';
import { formatCurrency, getCurrentDay, calculateProjection, formatYAxisValue } from '../utils/chartUtils';

export const RevenueEvolutionChart = () => {
  const { revenueData, isLoading } = useEvolutionData();
  const { config } = useDashboardConfig();
  
  const currentDay = getCurrentDay();
  
  // Calcular dados com projeção
  const dataWithProjection = React.useMemo(() => {
    return calculateProjection(revenueData, 'receita', currentDay);
  }, [revenueData, currentDay]);

  return (
    <ChartContainer title="EVOLUÇÃO DE RECEITA" isLoading={isLoading}>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={dataWithProjection}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="day" 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            tickFormatter={(value) => formatYAxisValue(value, 'revenue')}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            formatter={(value: number, name: string) => [formatCurrency(value), name]}
            labelFormatter={(label) => `Dia ${label}`}
          />
          <Legend />
          <RevenueChartLines config={config} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};
