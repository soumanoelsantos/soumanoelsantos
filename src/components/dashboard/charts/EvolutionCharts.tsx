
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useEvolutionData } from '@/hooks/useEvolutionData';
import { useDashboardConfig } from '@/hooks/useDashboardConfig';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Função para obter o dia atual do mês
const getCurrentDay = () => {
  return new Date().getDate();
};

// Função para calcular projeção baseada na tendência atual
const calculateProjection = (data: any[], valueKey: string, currentDay: number) => {
  if (!data || data.length === 0 || currentDay <= 0) return data;
  
  // Pegar apenas os dados até o dia atual
  const actualData = data.slice(0, currentDay);
  if (actualData.length < 2) return data;
  
  // Calcular tendência baseada nos últimos dados válidos
  const lastValidData = actualData.filter(item => item[valueKey] !== null);
  if (lastValidData.length < 2) return data;
  
  const lastValue = lastValidData[lastValidData.length - 1][valueKey];
  const previousValue = lastValidData[lastValidData.length - 2][valueKey];
  const trend = (lastValue - previousValue) * 0.8; // Suavizar tendência
  
  // Aplicar projeção para os dias restantes
  return data.map((item, index) => {
    if (index < currentDay) {
      return item;
    } else {
      const daysAhead = index - currentDay + 1;
      const projectedValue = lastValue + (trend * daysAhead);
      return {
        ...item,
        [`${valueKey}Projection`]: Math.max(0, projectedValue)
      };
    }
  });
};

export const RevenueEvolutionChart = () => {
  const { revenueData, isLoading } = useEvolutionData();
  const { config } = useDashboardConfig();
  
  const currentDay = getCurrentDay();
  
  // Calcular dados com projeção
  const dataWithProjection = React.useMemo(() => {
    return calculateProjection(revenueData, 'receita', currentDay);
  }, [revenueData, currentDay]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">EVOLUÇÃO DE RECEITA</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-gray-500">Carregando dados...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">EVOLUÇÃO DE RECEITA</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dataWithProjection}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${value / 1000}k`;
                }
                return value.toString();
              }}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [formatCurrency(value), name]}
              labelFormatter={(label) => `Dia ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            
            {/* Meta principal sempre visível */}
            <Line 
              type="monotone" 
              dataKey="metaReceita" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Meta Receita"
              dot={false}
            />
            
            {/* Receita realizada até a data atual - linha sólida melhorada */}
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#10b981" 
              strokeWidth={4}
              name="Receita Realizada"
              dot={{
                fill: '#10b981',
                strokeWidth: 2,
                stroke: '#ffffff',
                r: 4
              }}
              connectNulls={false}
            />
            
            {/* Projeção de receita - linha pontilhada verde */}
            <Line 
              type="monotone" 
              dataKey="receitaProjection" 
              stroke="#10b981" 
              strokeWidth={3}
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
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const BillingEvolutionChart = () => {
  const { billingData, isLoading } = useEvolutionData();
  const { config } = useDashboardConfig();
  
  const currentDay = getCurrentDay();
  
  // Calcular dados com projeção
  const dataWithProjection = React.useMemo(() => {
    return calculateProjection(billingData, 'faturamento', currentDay);
  }, [billingData, currentDay]);

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">EVOLUÇÃO FATURAMENTO</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-96">
          <div className="text-gray-500">Carregando dados...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">EVOLUÇÃO FATURAMENTO</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={dataWithProjection}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `${value / 1000000}M`;
                }
                if (value >= 1000) {
                  return `${value / 1000}k`;
                }
                return value.toString();
              }}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [formatCurrency(value), name]}
              labelFormatter={(label) => `Dia ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            
            {/* Meta principal sempre visível */}
            <Line 
              type="monotone" 
              dataKey="metaFaturamento" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Meta Faturamento"
              dot={false}
            />
            
            {/* Faturamento realizado até a data atual - linha sólida melhorada */}
            <Line 
              type="monotone" 
              dataKey="faturamento" 
              stroke="#3b82f6" 
              strokeWidth={4}
              name="Faturamento Realizado"
              dot={{
                fill: '#3b82f6',
                strokeWidth: 2,
                stroke: '#ffffff',
                r: 4
              }}
              connectNulls={false}
            />
            
            {/* Projeção de faturamento - linha pontilhada azul */}
            <Line 
              type="monotone" 
              dataKey="faturamentoProjection" 
              stroke="#3b82f6" 
              strokeWidth={3}
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
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
