
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';
import { useEvolutionData } from '@/hooks/useEvolutionData';

const TemporalBillingChart: React.FC = () => {
  const { billingData, isLoading } = useEvolutionData();

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-orange-600" />
            Análise Temporal de Faturamento
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-orange-600" />
          Análise Temporal de Faturamento
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={billingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
            <Area 
              type="monotone" 
              dataKey="faturamento" 
              stroke="#f59e0b" 
              fill="#f59e0b"
              fillOpacity={0.3}
              name="Faturamento Atual"
            />
            <Area 
              type="monotone" 
              dataKey="metaFaturamento" 
              stroke="#3b82f6" 
              fill="#3b82f6"
              fillOpacity={0.1}
              name="Meta de Faturamento"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TemporalBillingChart;
