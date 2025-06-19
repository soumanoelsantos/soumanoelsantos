
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
    agendamentos: item.schedulings || 0,
    meta: 8 // Meta diária de agendamentos
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos Diários - {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</CardTitle>
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
                dataKey="agendamentos" 
                stroke="var(--color-schedulings)" 
                strokeWidth={3}
                dot={{ fill: "var(--color-schedulings)", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Agendamentos"
              />
              <Line 
                type="monotone" 
                dataKey="meta" 
                stroke="var(--color-meta)" 
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

export default PreSalesSchedulingChart;
