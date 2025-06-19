
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
const getCurrentDayOfMonth = () => {
  return new Date().getDate();
};

export const RevenueEvolutionChart = () => {
  const { revenueData, isLoading } = useEvolutionData();
  const { config } = useDashboardConfig();
  const currentDay = getCurrentDayOfMonth();

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

  // Criar dados com projeção e limitar realizado até o dia atual
  const chartData = revenueData.map((item, index) => ({
    ...item,
    // Só mostrar receita realizada até o dia atual
    receita: item.day <= currentDay ? item.receita : null,
    // Adicionar dados de projeção (linha pontilhada do dia atual até o final do mês)
    projecaoReceita: item.day >= currentDay ? (item.receita || 0) * 1.15 : null, // Projeção 15% maior
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">EVOLUÇÃO DE RECEITA</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
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
            
            {/* Realizado apenas até o dia atual - linha verde sólida */}
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#22c55e" 
              strokeWidth={2}
              name="Receita Realizada"
              dot={false}
              connectNulls={false}
            />
            
            {/* Linha de projeção pontilhada */}
            {config.showProjecaoReceita && (
              <Line 
                type="monotone" 
                dataKey="projecaoReceita" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Projeção Receita"
                dot={false}
                connectNulls={false}
              />
            )}
            
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
  const currentDay = getCurrentDayOfMonth();

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

  // Criar dados com projeção e limitar realizado até o dia atual
  const chartData = billingData.map((item, index) => ({
    ...item,
    // Só mostrar faturamento realizado até o dia atual
    faturamento: item.day <= currentDay ? item.faturamento : null,
    // Adicionar dados de projeção (linha pontilhada do dia atual até o final do mês)
    projecaoFaturamento: item.day >= currentDay ? (item.faturamento || 0) * 1.18 : null, // Projeção 18% maior
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold">EVOLUÇÃO FATURAMENTO</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
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
            
            {/* Realizado apenas até o dia atual - linha verde sólida */}
            <Line 
              type="monotone" 
              dataKey="faturamento" 
              stroke="#22c55e" 
              strokeWidth={2}
              name="Faturamento Realizado"
              dot={false}
              connectNulls={false}
            />
            
            {/* Linha de projeção pontilhada */}
            {config.showProjecaoFaturamento && (
              <Line 
                type="monotone" 
                dataKey="projecaoFaturamento" 
                stroke="#8b5cf6" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Projeção Faturamento"
                dot={false}
                connectNulls={false}
              />
            )}
            
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
