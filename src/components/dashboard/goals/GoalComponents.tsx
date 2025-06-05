
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ConversionRateCard = () => (
  <Card className="h-48 flex flex-col">
    <CardHeader className="flex-shrink-0">
      <CardTitle className="text-sm font-medium text-gray-600">Taxa de Conversão</CardTitle>
      <CardContent className="text-sm text-gray-600 p-0">Percentual de conversão no período</CardContent>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between">
      <div className="text-2xl font-bold text-green-600">68%</div>
      <div className="mt-auto">
        <div className="text-xs text-gray-600 mt-1">da Meta</div>
        <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
          <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
        </div>
      </div>
    </CardContent>
  </Card>
);

export const RevenueGoalCard = () => (
  <Card className="h-48 flex flex-col">
    <CardHeader className="flex-shrink-0">
      <CardTitle className="text-sm font-medium text-gray-600">Meta de Faturamento</CardTitle>
      <CardContent className="text-sm text-gray-600 p-0">Progresso da meta mensal</CardContent>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between">
      <div className="text-2xl font-bold text-blue-600">R$ 0,00</div>
      <div className="mt-auto">
        <div className="text-xs text-gray-600 mt-1">Meta do Mês</div>
        <div className="text-xs text-gray-500 mt-1">Progresso: 0,0%</div>
      </div>
    </CardContent>
  </Card>
);

export const SalesGoalCard = () => (
  <Card className="h-48 flex flex-col">
    <CardHeader className="flex-shrink-0">
      <CardTitle className="text-sm font-medium text-gray-600">Meta de Receita</CardTitle>
      <CardContent className="text-sm text-gray-600 p-0">Progresso da meta de receita</CardContent>
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between">
      <div className="text-2xl font-bold text-purple-600">R$ 0,00</div>
      <div className="mt-auto">
        <div className="text-xs text-gray-600 mt-1">Meta do Mês</div>
        <div className="text-xs text-gray-500 mt-1">Progresso: 0,0%</div>
      </div>
    </CardContent>
  </Card>
);
