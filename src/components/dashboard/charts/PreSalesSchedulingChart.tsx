
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const PreSalesSchedulingChart = () => {
  const data = [
    { date: '01/12', agendamentos: 15, meta: 25 },
    { date: '02/12', agendamentos: 22, meta: 25 },
    { date: '03/12', agendamentos: 18, meta: 25 },
    { date: '04/12', agendamentos: 28, meta: 25 },
    { date: '05/12', agendamentos: 31, meta: 25 },
    { date: '06/12', agendamentos: 19, meta: 25 },
    { date: '07/12', agendamentos: 24, meta: 25 }
  ];

  const chartConfig = {
    agendamentos: {
      label: "Agendamentos",
      color: "hsl(var(--chart-3))",
    },
    meta: {
      label: "Meta",
      color: "hsl(var(--chart-4))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Agendamentos Diários - Últimos 7 dias</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Bar 
                dataKey="agendamentos" 
                fill="var(--color-agendamentos)" 
                name="Agendamentos"
                radius={[4, 4, 0, 0]}
              />
              <Bar 
                dataKey="meta" 
                fill="var(--color-meta)" 
                name="Meta"
                opacity={0.5}
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PreSalesSchedulingChart;
