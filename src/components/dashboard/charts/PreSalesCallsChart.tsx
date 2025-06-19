
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface PreSalesCallsChartProps {
  data: Array<{
    date: string;
    calls: number;
    schedulings: number;
    noShow: number;
  }>;
}

const PreSalesCallsChart = ({ data }: PreSalesCallsChartProps) => {
  const chartConfig = {
    calls: {
      label: "Tentativas",
      color: "hsl(var(--chart-1))",
    },
    target: {
      label: "Meta",
      color: "hsl(var(--chart-2))",
    },
  };

  // Transform data to include target line
  const chartData = data.map(item => ({
    ...item,
    target: 150 // Meta fixa, pode ser configurável depois
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tentativas de Ligação - Últimos 7 dias</CardTitle>
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
                dataKey="calls" 
                stroke="var(--color-calls)" 
                strokeWidth={2}
                name="Tentativas"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="var(--color-target)" 
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

export default PreSalesCallsChart;
