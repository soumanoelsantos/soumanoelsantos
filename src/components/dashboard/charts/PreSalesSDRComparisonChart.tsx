
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const PreSalesSDRComparisonChart = () => {
  const data = [
    { sdr: 'João', agendamentos: 28, meta: 25 },
    { sdr: 'Maria', agendamentos: 22, meta: 25 },
    { sdr: 'Pedro', agendamentos: 18, meta: 25 },
    { sdr: 'Ana', agendamentos: 31, meta: 25 }
  ];

  const chartConfig = {
    agendamentos: {
      label: "Agendamentos",
      color: "hsl(var(--chart-1))",
    },
    meta: {
      label: "Meta",
      color: "hsl(var(--chart-2))",
    },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Comparação de Agendamentos por SDR</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sdr" />
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

export default PreSalesSDRComparisonChart;
