
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
      color: "#10b981",
    },
    meta: {
      label: "Meta",
      color: "#f59e0b",
    },
  };

  // Transform data to include target line
  const chartData = data.map(item => ({
    date: item.date,
    agendamentos: item.schedulings || 0,
    meta: 8 // Meta diária de agendamentos
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Agendamentos Diários - {new Date().toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' })}</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="date" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
                interval={0}
                angle={-45}
                textAnchor="end"
                height={60}
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
                stroke="#10b981"
                strokeWidth={3}
                dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Agendamentos"
              />
              <Line 
                type="monotone" 
                dataKey="meta" 
                stroke="#f59e0b"
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
