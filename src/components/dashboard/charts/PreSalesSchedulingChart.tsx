
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface PreSalesSchedulingChartProps {
  data: Array<{
    date: string;
    calls: number;
    schedulings: number;
    noShow: number;
  }>;
}

const PreSalesSchedulingChart = ({ data }: PreSalesSchedulingChartProps) => {
  const chartConfig = {
    schedulings: {
      label: "Agendamentos",
      color: "hsl(var(--chart-3))",
    },
    meta: {
      label: "Meta",
      color: "hsl(var(--chart-4))",
    },
  };

  // Transform data to include target line
  const chartData = data.map(item => ({
    date: item.date,
    agendamentos: item.schedulings,
    meta: 25 // Meta fixa, pode ser configurável depois
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos Diários - Últimos 7 dias</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="agendamentos" 
                stroke="var(--color-schedulings)" 
                strokeWidth={2}
                name="Agendamentos"
              />
              <Line 
                type="monotone" 
                dataKey="meta" 
                stroke="var(--color-meta)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Meta"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PreSalesSchedulingChart;
