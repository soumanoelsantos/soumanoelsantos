
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpDown } from 'lucide-react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { usePreSalesOrder } from './pre-sales-order/usePreSalesOrder';
import { PreSalesOrderItem } from './pre-sales-order/PreSalesOrderItem';
import { EmptyPreSalesState } from './pre-sales-order/EmptyPreSalesState';

interface PreSalesOrderManagerProps {
  config: DashboardConfig;
  preSalesOrder: string[];
  onReorderPreSales: (newOrder: string[]) => void;
}

const PreSalesOrderManager: React.FC<PreSalesOrderManagerProps> = ({
  config,
  preSalesOrder,
  onReorderPreSales
}) => {
  const { getOrderedPreSalesItems } = usePreSalesOrder(config);
  const orderedItems = getOrderedPreSalesItems(preSalesOrder);

  const moveUp = (index: number) => {
    if (index > 0) {
      const newOrder = [...orderedItems];
      [newOrder[index - 1], newOrder[index]] = [newOrder[index], newOrder[index - 1]];
      const newOrderKeys = newOrder.map(item => item.key);
      console.log('Moving up pre-sales - new order:', newOrderKeys);
      onReorderPreSales(newOrderKeys);
    }
  };

  const moveDown = (index: number) => {
    if (index < orderedItems.length - 1) {
      const newOrder = [...orderedItems];
      [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
      const newOrderKeys = newOrder.map(item => item.key);
      console.log('Moving down pre-sales - new order:', newOrderKeys);
      onReorderPreSales(newOrderKeys);
    }
  };

  if (orderedItems.length === 0) {
    return <EmptyPreSalesState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ArrowUpDown className="h-5 w-5" />
          Ordem dos Indicadores de Pré-vendas
        </CardTitle>
        <p className="text-sm text-gray-600">
          Use os botões para reordenar como os indicadores de pré-vendas aparecerão no dashboard
        </p>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {orderedItems.map((item, index) => (
            <PreSalesOrderItem
              key={item.key}
              item={item}
              index={index}
              isFirst={index === 0}
              isLast={index === orderedItems.length - 1}
              onMoveUp={() => moveUp(index)}
              onMoveDown={() => moveDown(index)}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default PreSalesOrderManager;
