
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface PreSalesSDRComparisonChartProps {
  data: Array<{
    name: string;
    calls: number;
    schedulings: number;
    noShow: number;
    conversionRate: number;
  }>;
}

const PreSalesSDRComparisonChart = ({ data }: PreSalesSDRComparisonChartProps) => {
  const chartConfig = {
    agendamentos: {
      label: "Agendamentos",
      color: "#10b981",
    },
    conversao: {
      label: "Taxa Conversão (%)",
      color: "#3b82f6",
    },
  };

  // Transform data for chart
  const chartData = data.map((sdr) => ({
    sdr: sdr.name,
    agendamentos: sdr.schedulings || 0,
    conversao: Math.round(sdr.conversionRate || 0),
  }));

  console.log('🔍 PreSalesSDRComparisonChart - Chart data:', chartData);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Performance da SDR - {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="sdr" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="agendamentos" 
                fill="#10b981"
                name="Agendamentos"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PreSalesSDRComparisonChart;
