
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useEvolutionData } from '@/hooks/useEvolutionData';

const RevenueEvolutionChart: React.FC = () => {
  const { revenueData, isLoading } = useEvolutionData();

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Evolução de Receita
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Evolução de Receita
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#3b82f6" 
              strokeWidth={3}
              name="Receita Atual"
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="metaReceita" 
              stroke="#22c55e" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Meta de Receita"
            />
            <Line 
              type="monotone" 
              dataKey="superMetaReceita" 
              stroke="#f59e0b" 
              strokeWidth={2}
              strokeDasharray="3 3"
              name="Super Meta"
            />
            <Line 
              type="monotone" 
              dataKey="hiperMetaReceita" 
              stroke="#ef4444" 
              strokeWidth={2}
              strokeDasharray="2 2"
              name="Hiper Meta"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default RevenueEvolutionChart;
