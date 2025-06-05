
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DashboardConfig } from '@/hooks/useDashboardConfig';

interface AdditionalIndicatorsProps {
  config: DashboardConfig;
}

const AdditionalIndicators: React.FC<AdditionalIndicatorsProps> = ({ config }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {config.showConversion && (
        <Card>
          <CardHeader>
            <CardTitle>Taxa de Conversão</CardTitle>
            <CardDescription>Percentual de conversão no período</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">68%</div>
            <div className="text-sm text-gray-600 mt-2">da Meta</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
              <div className="bg-green-500 h-2 rounded-full" style={{ width: '68%' }}></div>
            </div>
          </CardContent>
        </Card>
      )}

      {config.showRevenue && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Meta de Faturamento</CardTitle>
              <CardDescription>Progresso da meta mensal</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">R$ 0,00</div>
              <div className="text-sm text-gray-600 mt-2">Meta do Mês</div>
              <div className="text-sm text-gray-500 mt-1">Progresso: 0,0%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Meta de Receita</CardTitle>
              <CardDescription>Progresso da meta de receita</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">R$ 0,00</div>
              <div className="text-sm text-gray-600 mt-2">Meta do Mês</div>
              <div className="text-sm text-gray-500 mt-1">Progresso: 0,0%</div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
};

export default AdditionalIndicators;
