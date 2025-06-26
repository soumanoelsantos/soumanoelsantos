
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { usePreSalesGoals } from '@/hooks/usePreSalesGoals';

interface PreSalesCallsChartProps {
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

const PreSalesCallsChart = ({ data }: PreSalesCallsChartProps) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  const { preSalesGoals } = usePreSalesGoals(currentMonth, currentYear);
  
  // Buscar meta de tentativas de ligação
  const dailyCallsGoal = preSalesGoals.find(goal => 
    goal.goal_type?.category === 'pre_vendas' && 
    goal.goal_type?.unit === 'tentativas' &&
    goal.goal_type?.name.toLowerCase().includes('tentativas')
  );

  const dailyTarget = dailyCallsGoal ? Math.ceil((dailyCallsGoal.target_value || 0) / 30) : 40;

  // Calcular média das tentativas
  const totalCalls = data.reduce((sum, item) => sum + item.calls, 0);
  const averageCalls = data.length > 0 ? Math.round(totalCalls / data.length) : 0;

  const chartConfig = {
    calls: {
      label: "Ligações",
      color: "#3b82f6",
    },
    target: {
      label: "Meta Diária",
      color: "#ef4444",
    },
    average: {
      label: "Média",
      color: "#10b981",
    },
  };

  // Transform data to include target line and average
  const chartData = data.map(item => ({
    date: item.date,
    calls: item.calls || 0,
    target: dailyTarget,
    average: averageCalls
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Tentativas de Ligação Diárias</span>
          <div className="text-sm font-normal text-gray-600 space-x-4">
            {dailyCallsGoal && (
              <span>Meta: {dailyTarget}/dia ({dailyCallsGoal.target_value}/mês)</span>
            )}
            <span>Média: {averageCalls}/dia</span>
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
                dataKey="calls" 
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: "#3b82f6", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="Tentativas"
              />
              <Line 
                type="monotone" 
                dataKey="target" 
                stroke="#ef4444"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={false}
                name="Meta Diária"
              />
              <Line 
                type="monotone" 
                dataKey="average" 
                stroke="#10b981"
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

export default PreSalesCallsChart;
