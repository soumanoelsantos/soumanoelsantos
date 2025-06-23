
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Clock } from 'lucide-react';
import { useEvolutionData } from '@/hooks/useEvolutionData';

const TemporalRevenueChart: React.FC = () => {
  const { revenueData, isLoading } = useEvolutionData();

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-purple-600" />
            Análise Temporal de Receita
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5 text-purple-600" />
          Análise Temporal de Receita
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
            <Area 
              type="monotone" 
              dataKey="receita" 
              stroke="#8b5cf6" 
              fill="#8b5cf6"
              fillOpacity={0.3}
              name="Receita Atual"
            />
            <Area 
              type="monotone" 
              dataKey="metaReceita" 
              stroke="#22c55e" 
              fill="#22c55e"
              fillOpacity={0.1}
              name="Meta de Receita"
            />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default TemporalRevenueChart;
