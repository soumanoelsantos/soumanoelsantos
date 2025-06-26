
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

// Custom tooltip with solid background
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white border border-gray-300 rounded-lg shadow-lg p-3">
        <p className="font-medium text-gray-900 mb-2">{`Data: ${label}`}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

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
    average: {
      label: "Média",
      color: "#8b5cf6",
    },
  };

  // Calcular média dos agendamentos
  const totalSchedulings = data.reduce((sum, item) => sum + item.schedulings, 0);
  const averageSchedulings = data.length > 0 ? Math.round(totalSchedulings / data.length) : 0;

  // Transform data to include target line and average
  const chartData = data.map(item => ({
    date: item.date,
    agendamentos: item.schedulings || 0,
    meta: 8, // Meta diária de agendamentos
    average: averageSchedulings
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Agendamentos Diários</span>
          <div className="text-sm font-normal text-gray-600 space-x-4">
            <span>Meta: 8/dia</span>
            <span>Média: {averageSchedulings}/dia</span>
          </div>
        </CardTitle>
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
              <ChartTooltip content={<CustomTooltip />} />
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
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Média"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PreSalesSchedulingChart;
