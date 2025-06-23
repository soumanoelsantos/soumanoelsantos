
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useSellerPerformanceCharts } from '@/hooks/useSellerPerformanceCharts';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};

// Configuração de cores para os vendedores com cores mais vivas
const chartConfig = {
  'Renata': {
    label: 'Renata',
    color: '#22c55e', // Verde vibrante
  },
  'Will': {
    label: 'Will', 
    color: '#3b82f6', // Azul vibrante
  },
  'Ana Carcalho': { // Corrigido para corresponder ao nome no banco
    label: 'Ana Carcalho',
    color: '#f59e0b', // Amarelo/laranja vibrante
  }
};

// Componente de tooltip customizado
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length > 0) {
    // Filtrar apenas os itens visíveis (não incluir itens com opacity 0)
    const visibleItems = payload.filter((item: any) => item.color && item.color !== 'transparent');
    
    if (visibleItems.length === 0) return null;
    
    // Pegar o primeiro item visível (que é o que está sendo destacado)
    const activeItem = visibleItems[0];
    
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
        <p className="font-medium text-gray-900">{`Dia ${label}`}</p>
        {activeItem && (
          <p className="text-sm" style={{ color: activeItem.color }}>
            {`${activeItem.dataKey}: ${formatCurrency(activeItem.value)}`}
          </p>
        )}
      </div>
    );
  }
  return null;
};

export const SellerRevenueChart = () => {
  const { revenueData, sellerNames, isLoading } = useSellerPerformanceCharts();

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-center text-lg font-bold text-blue-600">
            ACUMULADO DIÁRIO DE RECEITA
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold text-blue-600">
          ACUMULADO DIÁRIO DE RECEITA
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[400px] w-full"
        >
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis 
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `$${(value / 1000000).toFixed(1)}M`;
                }
                if (value >= 1000) {
                  return `$${(value / 1000).toFixed(0)}k`;
                }
                return `$${value}`;
              }}
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <ChartTooltip 
              content={<CustomTooltip />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            
            {/* Linhas dos vendedores */}
            {sellerNames.map((sellerName) => (
              <Line 
                key={sellerName}
                type="monotone" 
                dataKey={sellerName}
                stroke={`var(--color-${sellerName})`}
                strokeWidth={3}
                dot={{ fill: `var(--color-${sellerName})`, strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
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
          <CardTitle className="text-center text-lg font-bold text-green-600">
            ACUMULADO DIÁRIO DE FATURAMENTO
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center text-lg font-bold text-green-600">
          ACUMULADO DIÁRIO DE FATURAMENTO
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="min-h-[400px] w-full"
        >
          <LineChart data={billingData}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <YAxis 
              tickFormatter={(value) => {
                if (value >= 1000000) {
                  return `$${(value / 1000000).toFixed(1)}M`;
                }
                if (value >= 1000) {
                  return `$${(value / 1000).toFixed(0)}k`;
                }
                return `$${value}`;
              }}
              axisLine={false}
              tickLine={false}
              className="text-xs"
            />
            <ChartTooltip 
              content={<CustomTooltip />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            
            {/* Linhas dos vendedores */}
            {sellerNames.map((sellerName) => (
              <Line 
                key={sellerName}
                type="monotone" 
                dataKey={sellerName}
                stroke={`var(--color-${sellerName})`}
                strokeWidth={3}
                dot={{ fill: `var(--color-${sellerName})`, strokeWidth: 2, r: 5 }}
                activeDot={{ r: 7, strokeWidth: 2 }}
              />
            ))}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
