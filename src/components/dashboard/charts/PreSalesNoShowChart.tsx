
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

const PreSalesNoShowChart = () => {
  const data = [
    { date: '01/12', noShow: 2, taxa: 13.3 },
    { date: '02/12', noShow: 4, taxa: 18.2 },
    { date: '03/12', noShow: 3, taxa: 16.7 },
    { date: '04/12', noShow: 5, taxa: 17.9 },
    { date: '05/12', noShow: 6, taxa: 19.4 },
    { date: '06/12', noShow: 2, taxa: 10.5 },
    { date: '07/12', noShow: 3, taxa: 12.5 }
  ];

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>No-Show Diário - Últimos 7 dias</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
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
