
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const PreSalesCallsChart = () => {
  const data = [
    { date: '01/12', calls: 120, target: 150 },
    { date: '02/12', calls: 135, target: 150 },
    { date: '03/12', calls: 110, target: 150 },
    { date: '04/12', calls: 145, target: 150 },
    { date: '05/12', calls: 155, target: 150 },
    { date: '06/12', calls: 125, target: 150 },
    { date: '07/12', calls: 140, target: 150 }
  ];

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tentativas de Ligação - Últimos 7 dias</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
