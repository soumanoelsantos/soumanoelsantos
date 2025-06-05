
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { salesData } from '../data/chartData';

export const SalesChart = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Vendas por Mês</CardTitle>
      <CardContent className="text-sm text-gray-600 p-0">Evolução das vendas mensais</CardContent>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="value" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);

export const GrowthChart = () => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>Tendência de Crescimento</CardTitle>
      <CardContent className="text-sm text-gray-600 p-0">Projeção baseada nos dados atuais</CardContent>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={salesData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8b5cf6" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
);
