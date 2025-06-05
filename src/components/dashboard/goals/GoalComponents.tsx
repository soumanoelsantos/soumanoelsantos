
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ConversionRateCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Taxa de Conversão</CardTitle>
      <CardContent className="text-sm text-gray-600">Percentual de conversão no período</CardContent>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-green-600">68%</div>
      <div className="text-sm text-gray-600 mt-2">da Meta</div>
      <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
        <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
      </div>
    </CardContent>
  </Card>
);

export const RevenueGoalCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Meta de Faturamento</CardTitle>
      <CardContent className="text-sm text-gray-600">Progresso da meta mensal</CardContent>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-blue-600">R$ 0,00</div>
      <div className="text-sm text-gray-600 mt-2">Meta do Mês</div>
      <div className="text-sm text-gray-500 mt-1">Progresso: 0,0%</div>
    </CardContent>
  </Card>
);

export const SalesGoalCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Meta de Receita</CardTitle>
      <CardContent className="text-sm text-gray-600">Progresso da meta de receita</CardContent>
    </CardHeader>
    <CardContent>
      <div className="text-3xl font-bold text-purple-600">R$ 0,00</div>
      <div className="text-sm text-gray-600 mt-2">Meta do Mês</div>
      <div className="text-sm text-gray-500 mt-1">Progresso: 0,0%</div>
    </CardContent>
  </Card>
);
