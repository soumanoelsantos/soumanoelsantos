
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

interface PreSalesNoShowChartProps {
  data: Array<{
    date: string;
    calls: number;
    schedulings: number;
    noShow: number;
  }>;
}

const PreSalesNoShowChart = ({ data }: PreSalesNoShowChartProps) => {
  const chartConfig = {
    noShow: {
      label: "No-Show",
      color: "hsl(var(--chart-5))",
    },
    taxa: {
      label: "Taxa (%)",
      color: "hsl(var(--chart-6))",
    },
  };

  // Transform data to calculate percentage
  const chartData = data.map(item => ({
    date: item.date,
    noShow: item.noShow,
    taxa: item.schedulings > 0 ? ((item.noShow / item.schedulings) * 100) : 0
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>No-Show Diário - Últimos 7 dias</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="noShow" 
                stroke="var(--color-noShow)" 
                strokeWidth={2}
                name="No-Show"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="taxa" 
                stroke="var(--color-taxa)" 
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Taxa (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PreSalesNoShowChart;
