
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, DollarSign, TrendingUp } from 'lucide-react';

export const ConversionRateCard = () => (
  <Card className="h-40 flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
      <CardTitle className="text-xs font-medium text-gray-600">Taxa de Conversão</CardTitle>
      <Target className="h-3 w-3 text-green-600 flex-shrink-0" />
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between p-3">
      <div className="text-lg font-bold">68%</div>
      <div className="mt-auto">
        <p className="text-xs text-gray-600 mt-1">
          Percentual de conversão no período
        </p>
        <div className="text-xs text-green-600 mt-2">
          da Meta
        </div>
      </div>
    </CardContent>
  </Card>
);

export const RevenueGoalCard = () => (
  <Card className="h-40 flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
      <CardTitle className="text-xs font-medium text-gray-600">Meta de Faturamento</CardTitle>
      <DollarSign className="h-3 w-3 text-blue-600 flex-shrink-0" />
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between p-3">
      <div className="text-lg font-bold">R$ 0,00</div>
      <div className="mt-auto">
        <p className="text-xs text-gray-600 mt-1">
          Progresso da meta mensal
        </p>
        <div className="text-xs text-gray-500 mt-2">
          Progresso: 0,0%
        </div>
      </div>
    </CardContent>
  </Card>
);

export const SalesGoalCard = () => (
  <Card className="h-40 flex flex-col">
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
      <CardTitle className="text-xs font-medium text-gray-600">Meta de Receita</CardTitle>
      <TrendingUp className="h-3 w-3 text-purple-600 flex-shrink-0" />
    </CardHeader>
    <CardContent className="flex-1 flex flex-col justify-between p-3">
      <div className="text-lg font-bold">R$ 0,00</div>
      <div className="mt-auto">
        <p className="text-xs text-gray-600 mt-1">
          Progresso da meta de receita
        </p>
        <div className="text-xs text-gray-500 mt-2">
          Progresso: 0,0%
        </div>
      </div>
    </CardContent>
  </Card>
);
