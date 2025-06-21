
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2, User, Package } from 'lucide-react';
import { IndividualSale } from '@/types/individualSales';
import { useProducts } from '@/hooks/useProducts';

interface IndividualSalesListProps {
  sales: IndividualSale[];
  isLoading: boolean;
  onDelete: (saleId: string) => Promise<void>;
}

const IndividualSalesList: React.FC<IndividualSalesListProps> = ({
  sales,
  isLoading,
  onDelete
}) => {
  const { products } = useProducts();

  const getProductName = (sale: any) => {
    if (sale.products?.name) {
      return sale.products.name;
    }
    if (sale.product_id) {
      const product = products.find(p => p.id === sale.product_id);
      return product?.name || 'Produto não encontrado';
    }
    return 'Venda Geral';
  };

  const handleDelete = async (saleId: string) => {
    if (window.confirm('Tem certeza que deseja remover esta venda?')) {
      await onDelete(saleId);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Carregando vendas...</p>;
  }

  if (sales.length === 0) {
    return <p className="text-center text-gray-500">Nenhuma venda individual registrada</p>;
  }

  return (
    <div className="space-y-2">
      {sales.map((sale) => (
        <Card key={sale.id} className="p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <User className="h-4 w-4 text-gray-500" />
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-medium">{sale.client_name}</p>
                  <div className="flex items-center gap-1">
                    <Package className="h-3 w-3 text-gray-400" />
                    <Badge variant="secondary" className="text-xs">
                      {getProductName(sale)}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-4 text-sm text-gray-500">
                  <span>Receita: R$ {Number(sale.revenue_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                  <span>Faturamento: R$ {Number(sale.billing_amount).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</span>
                </div>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleDelete(sale.id)}
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default IndividualSalesList;
