
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

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
      color: "hsl(var(--chart-1))",
    },
    conversao: {
      label: "Taxa Conversão (%)",
      color: "hsl(var(--chart-2))",
    },
  };

  // Transform data for chart
  const chartData = data.map((sdr, index) => ({
    sdr: sdr.name,
    agendamentos: sdr.schedulings,
    conversao: sdr.conversionRate,
    index: index
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Performance dos SDRs - Últimos 7 dias</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="sdr" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="agendamentos" 
                stroke="var(--color-agendamentos)" 
                strokeWidth={2}
                name="Agendamentos"
              />
              <Line 
                type="monotone" 
                dataKey="conversao" 
                stroke="var(--color-conversao)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Taxa Conversão (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PreSalesSDRComparisonChart;
