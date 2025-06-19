
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
      label: "Ligações",
      color: "hsl(var(--chart-1))",
    },
    target: {
      label: "Meta",
      color: "hsl(var(--chart-2))",
    },
  };

  // Transform data to include target line and ensure proper data structure
  const chartData = data.map(item => ({
    date: item.date,
    calls: item.calls || 0,
    target: 40 // Meta diária
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ligações Diárias - {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
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
              <Line 
                type="monotone" 
                dataKey="calls" 
                stroke="var(--color-calls)" 
                strokeWidth={3}
                dot={{ fill: "var(--color-calls)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Ligações"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="var(--color-target)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
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
