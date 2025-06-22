
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Package, User, DollarSign } from 'lucide-react';
import { useSellerIndividualSales } from '@/hooks/useSellerIndividualSales';

interface IndividualSalesDetailsProps {
  performanceId: string;
}

const IndividualSalesDetails: React.FC<IndividualSalesDetailsProps> = ({
  performanceId
}) => {
  const { sales, isLoading, error } = useSellerIndividualSales(performanceId);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(value);
  };

  if (isLoading) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Carregando detalhes das vendas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-4 p-4 bg-red-50 rounded-lg border border-red-200">
        <p className="text-sm text-red-600">Erro ao carregar vendas: {error}</p>
      </div>
    );
  }

  if (sales.length === 0) {
    return (
      <div className="mt-4 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm text-gray-600">Nenhuma venda individual registrada.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-3">
      <div className="flex items-center gap-2">
        <Package className="h-4 w-4 text-blue-600" />
        <span className="text-sm font-medium text-gray-700">
          Vendas Individuais ({sales.length})
        </span>
      </div>
      
      <div className="space-y-2">
        {sales.map((sale, index) => (
          <Card key={sale.id} className="border border-gray-200">
            <CardContent className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {sale.client_name}
                    </p>
                    <p className="text-xs text-gray-500">Cliente</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-900">
                      {sale.product_name}
                    </p>
                    <p className="text-xs text-gray-500">Produto</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <div className="space-y-1">
                    <div className="flex flex-col sm:flex-row sm:gap-2">
                      <Badge variant="outline" className="text-xs">
                        Receita: {formatCurrency(sale.revenue_amount)}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        Faturamento: {formatCurrency(sale.billing_amount)}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-medium text-blue-800">Total Receita:</span>
            <span className="ml-2 text-blue-700">
              {formatCurrency(sales.reduce((sum, sale) => sum + sale.revenue_amount, 0))}
            </span>
          </div>
          <div>
            <span className="font-medium text-blue-800">Total Faturamento:</span>
            <span className="ml-2 text-blue-700">
              {formatCurrency(sales.reduce((sum, sale) => sum + sale.billing_amount, 0))}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualSalesDetails;
