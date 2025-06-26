
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
      color: "#ef4444",
    },
    taxa: {
      label: "Taxa (%)",
      color: "#8b5cf6",
    },
    averageNoShow: {
      label: "Média No-Show",
      color: "#f59e0b",
    },
    averageTaxa: {
      label: "Média Taxa (%)",
      color: "#06b6d4",
    },
  };

  // Transform data to calculate percentage and averages
  const chartData = data.map(item => ({
    date: item.date,
    noShow: item.noShow || 0,
    taxa: item.schedulings > 0 ? ((item.noShow / item.schedulings) * 100) : 0
  }));

  // Calcular médias
  const totalNoShow = chartData.reduce((sum, item) => sum + item.noShow, 0);
  const averageNoShow = chartData.length > 0 ? Math.round(totalNoShow / chartData.length) : 0;
  
  const totalTaxa = chartData.reduce((sum, item) => sum + item.taxa, 0);
  const averageTaxa = chartData.length > 0 ? Math.round((totalTaxa / chartData.length) * 100) / 100 : 0;

  // Add averages to chart data
  const chartDataWithAverages = chartData.map(item => ({
    ...item,
    averageNoShow,
    averageTaxa
  }));

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>No-Show Diário</span>
          <div className="text-sm font-normal text-gray-600 space-x-4">
            <span>Média No-Show: {averageNoShow}/dia</span>
            <span>Média Taxa: {averageTaxa}%</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartDataWithAverages} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
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
                yAxisId="left" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis 
                yAxisId="right" 
                orientation="right" 
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="noShow" 
                stroke="#ef4444"
                strokeWidth={3}
                dot={{ fill: "#ef4444", strokeWidth: 2, r: 4 }}
                activeDot={{ r: 6 }}
                name="No-Show"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="taxa" 
                stroke="#8b5cf6"
                strokeWidth={2}
                strokeDasharray="5 5"
                dot={{ fill: "#8b5cf6", strokeWidth: 2, r: 3 }}
                name="Taxa (%)"
              />
              <Line 
                yAxisId="left"
                type="monotone" 
                dataKey="averageNoShow" 
                stroke="#f59e0b"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Média No-Show"
              />
              <Line 
                yAxisId="right"
                type="monotone" 
                dataKey="averageTaxa" 
                stroke="#06b6d4"
                strokeWidth={2}
                strokeDasharray="3 3"
                dot={false}
                name="Média Taxa (%)"
              />
            </LineChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};

export default PreSalesNoShowChart;
