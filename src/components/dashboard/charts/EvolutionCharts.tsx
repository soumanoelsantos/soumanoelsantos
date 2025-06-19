
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

export const RevenueEvolutionChart = () => {
  const { revenueData, isLoading } = useEvolutionData();
  const { config } = useDashboardConfig();

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
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
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
            />
            <Tooltip 
              formatter={(value: number, name: string) => [formatCurrency(value), name]}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Legend />
            
            {/* Meta principal sempre visível */}
            <Line 
              type="monotone" 
              dataKey="metaReceita" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Meta Receita"
              dot={false}
            />
            
            {/* Realizado sempre visível */}
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#22c55e" 
              strokeWidth={2}
              name="Receita"
              dot={false}
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
          <LineChart data={billingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
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
            />
            <Tooltip 
              formatter={(value: number, name: string) => [formatCurrency(value), name]}
              labelFormatter={(label) => `Dia ${label}`}
            />
            <Legend />
            
            {/* Meta principal sempre visível */}
            <Line 
              type="monotone" 
              dataKey="metaFaturamento" 
              stroke="#ef4444" 
              strokeWidth={2}
              name="Meta Faturamento"
              dot={false}
            />
            
            {/* Realizado sempre visível */}
            <Line 
              type="monotone" 
              dataKey="faturamento" 
              stroke="#22c55e" 
              strokeWidth={2}
              name="Faturamento"
              dot={false}
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
