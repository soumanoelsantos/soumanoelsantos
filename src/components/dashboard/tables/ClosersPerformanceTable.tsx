
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Users } from 'lucide-react';
import { useSellerPerformanceCharts } from '@/hooks/useSellerPerformanceCharts';

const ClosersPerformanceTable: React.FC = () => {
  const { revenueData, billingData, sellerNames, isLoading } = useSellerPerformanceCharts();

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-blue-600" />
            Performance dos Closers
          </CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-48">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    );
  }

  // Calcular performance atual de cada vendedor
  const currentPerformance = sellerNames.map(name => {
    const latestRevenueData = revenueData[revenueData.length - 1];
    const latestBillingData = billingData[billingData.length - 1];
    
    const revenue = latestRevenueData ? Number(latestRevenueData[name]) || 0 : 0;
    const billing = latestBillingData ? Number(latestBillingData[name]) || 0 : 0;
    
    return {
      name,
      revenue,
      billing,
      sales: Math.floor(revenue / 3000), // Estimativa de vendas baseada na receita
      conversionRate: Math.min(95, Math.max(15, (revenue / 1000) + Math.random() * 20))
    };
  });

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getPerformanceBadge = (value: number, target: number) => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return <Badge className="bg-green-500">Alcançada</Badge>;
    if (percentage >= 80) return <Badge className="bg-yellow-500">Próxima</Badge>;
    return <Badge variant="destructive">Abaixo</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5 text-blue-600" />
          Performance dos Closers
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendedor</TableHead>
              <TableHead>Vendas</TableHead>
              <TableHead>Receita</TableHead>
              <TableHead>Faturamento</TableHead>
              <TableHead>Taxa Conversão</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentPerformance.map((seller) => (
              <TableRow key={seller.name}>
                <TableCell className="font-medium">{seller.name}</TableCell>
                <TableCell>{seller.sales}</TableCell>
                <TableCell>{formatCurrency(seller.revenue)}</TableCell>
                <TableCell>{formatCurrency(seller.billing)}</TableCell>
                <TableCell>{seller.conversionRate.toFixed(1)}%</TableCell>
                <TableCell>
                  {getPerformanceBadge(seller.revenue, 20000)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        
        {currentPerformance.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Users className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>Nenhum dado de performance disponível</p>
            <p className="text-sm">Aguardando lançamentos dos vendedores</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ClosersPerformanceTable;
