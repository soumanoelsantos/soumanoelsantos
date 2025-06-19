
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useSellerPerformanceCharts } from '@/hooks/useSellerPerformanceCharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Cores para os vendedores
const sellerColors = ['#fbbf24', '#22c55e', '#3b82f6', '#f59e0b', '#8b5cf6', '#ef4444'];

export const SellerRevenueChart = () => {
  const { revenueData, sellerNames, isLoading } = useSellerPerformanceCharts();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">ACUMULADO DIÁRIO DE RECEITA</CardTitle>
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
        <CardTitle className="text-center text-lg font-bold">ACUMULADO DIÁRIO DE RECEITA</CardTitle>
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
            
            {/* Linha da média (meta) */}
            <Line 
              type="monotone" 
              dataKey="media" 
              stroke="#000000" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Média"
              dot={false}
            />
            
            {/* Linhas dos vendedores com nomes reais */}
            {sellerNames.map((sellerName, index) => (
              <Line 
                key={sellerName}
                type="monotone" 
                dataKey={sellerName}
                stroke={sellerColors[index % sellerColors.length]}
                strokeWidth={3}
                name={sellerName}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export const SellerBillingChart = () => {
  const { billingData, sellerNames, isLoading } = useSellerPerformanceCharts();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold">ACUMULADO DIÁRIO DE FATURAMENTO</CardTitle>
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
        <CardTitle className="text-center text-lg font-bold">ACUMULADO DIÁRIO DE FATURAMENTO</CardTitle>
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
            
            {/* Linha da média (meta) */}
            <Line 
              type="monotone" 
              dataKey="media" 
              stroke="#000000" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Média"
              dot={false}
            />
            
            {/* Linhas dos vendedores com nomes reais */}
            {sellerNames.map((sellerName, index) => (
              <Line 
                key={sellerName}
                type="monotone" 
                dataKey={sellerName}
                stroke={sellerColors[index % sellerColors.length]}
                strokeWidth={3}
                name={sellerName}
                dot={false}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
