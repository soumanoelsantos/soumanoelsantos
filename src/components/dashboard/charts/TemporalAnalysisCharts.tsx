
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useTemporalAnalysisData } from '@/hooks/useTemporalAnalysisData';

const formatCurrency = (value: number) => {
  if (value >= 1000000) {
    return `R$ ${(value / 1000000).toFixed(0)}M`;
  }
  if (value >= 1000) {
    return `R$ ${(value / 1000).toFixed(0)}k`;
  }
  return `R$ ${value.toLocaleString('pt-BR')}`;
};

const formatTooltipCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const TemporalRevenueChart = () => {
  const { revenueData, isLoading } = useTemporalAnalysisData();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">RECEITA - ANÁLISE TEMPORAL</CardTitle>
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
        <CardTitle className="text-center text-lg font-bold">RECEITA - ANÁLISE TEMPORAL</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [formatTooltipCurrency(value), name]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <Legend />
            
            {/* Linha MAT - Laranja */}
            <Line 
              type="linear" 
              dataKey="mat" 
              stroke="#f59e0b" 
              strokeWidth={3}
              name="MAT"
              dot={{ r: 4 }}
            />
            
            {/* Linha YTD - Azul */}
            <Line 
              type="linear" 
              dataKey="ytd" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="YTD"
              dot={{ r: 4 }}
            />
            
            {/* Linha QTR - Roxo */}
            <Line 
              type="linear" 
              dataKey="qtr" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="QTR"
              dot={{ r: 4 }}
            />
            
            {/* Linha Mês Atual - Verde pontilhada */}
            <Line 
              type="linear" 
              dataKey="current" 
              stroke="#22c55e" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Mês Atual"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const TemporalBillingChart = () => {
  const { billingData, isLoading } = useTemporalAnalysisData();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">FATURAMENTO - ANÁLISE TEMPORAL</CardTitle>
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
        <CardTitle className="text-center text-lg font-bold">FATURAMENTO - ANÁLISE TEMPORAL</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={billingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={formatCurrency}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [formatTooltipCurrency(value), name]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '4px'
              }}
            />
            <Legend />
            
            {/* Linha MAT - Laranja */}
            <Line 
              type="linear" 
              dataKey="mat" 
              stroke="#f59e0b" 
              strokeWidth={3}
              name="MAT"
              dot={{ r: 4 }}
            />
            
            {/* Linha YTD - Azul */}
            <Line 
              type="linear" 
              dataKey="ytd" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="YTD"
              dot={{ r: 4 }}
            />
            
            {/* Linha QTR - Roxo */}
            <Line 
              type="linear" 
              dataKey="qtr" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="QTR"
              dot={{ r: 4 }}
            />
            
            {/* Linha Mês Atual - Verde pontilhada */}
            <Line 
              type="linear" 
              dataKey="current" 
              stroke="#22c55e" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Mês Atual"
              dot={{ r: 3 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
