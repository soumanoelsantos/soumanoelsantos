
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { revenueEvolutionData, billingEvolutionData } from '../data/evolutionData';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

export const RevenueEvolutionChart = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-center text-lg font-bold">EVOLUÇÃO DE RECEITA</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={revenueEvolutionData}>
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
          <Line 
            type="monotone" 
            dataKey="metaReceita" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Meta Receita"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="receita" 
            stroke="#22c55e" 
            strokeWidth={2}
            name="Receita"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="superMetaReceita" 
            stroke="#f97316" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Super Meta Receita"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="hiperMetaReceita" 
            stroke="#3b82f6" 
            strokeWidth={2}
            strokeDasharray="10 5"
            name="Hiper Meta Receita"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const BillingEvolutionChart = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle className="text-center text-lg font-bold">EVOLUÇÃO FATURAMENTO</CardTitle>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={billingEvolutionData}>
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
          <Line 
            type="monotone" 
            dataKey="metaFaturamento" 
            stroke="#ef4444" 
            strokeWidth={2}
            name="Meta Faturamento"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="faturamento" 
            stroke="#22c55e" 
            strokeWidth={2}
            name="Faturamento"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="superMetaFaturamento" 
            stroke="#f97316" 
            strokeWidth={2}
            strokeDasharray="5 5"
            name="Super Meta Faturamento"
            dot={false}
          />
          <Line 
            type="monotone" 
            dataKey="hiperMetaFaturamento" 
            stroke="#3b82f6" 
            strokeWidth={2}
            strokeDasharray="10 5"
            name="Hiper Meta Faturamento"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
