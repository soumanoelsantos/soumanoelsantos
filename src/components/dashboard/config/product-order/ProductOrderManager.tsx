
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { useProductOrder } from './useProductOrder';
import { EmptyProductOrderState } from './EmptyProductOrderState';
import { ProductOrderItem } from './ProductOrderItem';

interface ProductOrderManagerProps {
  config: DashboardConfig;
  productOrder: string[];
  onReorderProducts: (newOrder: string[]) => void;
}

const ProductOrderManager: React.FC<ProductOrderManagerProps> = ({
  config,
  productOrder,
  onReorderProducts
}) => {
  const {
    items,
    handleDragEnd,
    moveItem,
    resetToDefault
  } = useProductOrder(config, productOrder, onReorderProducts);

  if (!config.showProductMetrics || config.selectedProductIds.length === 0) {
    return <EmptyProductOrderState />;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Ordem dos Indicadores de Produtos
        </CardTitle>
        <CardDescription>
          Configure a ordem de exibição dos indicadores de produtos no dashboard.
          Apenas os indicadores habilitados são mostrados aqui.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {items.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="mx-auto h-12 w-12 text-gray-300 mb-4" />
            <p>Nenhum indicador de produto está habilitado</p>
            <p className="text-sm">Habilite alguns indicadores para configurar a ordem</p>
          </div>
        ) : (
          <div className="space-y-2">
            {items.map((item, index) => (
              <ProductOrderItem
                key={item.key}
                item={item}
                index={index}
                onMoveUp={() => moveItem(index, index - 1)}
                onMoveDown={() => moveItem(index, index + 1)}
                isFirst={index === 0}
                isLast={index === items.length - 1}
              />
            ))}
            
            <div className="flex justify-end pt-4">
              <button
                onClick={resetToDefault}
                className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
              >
                Restaurar ordem padrão
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductOrderManager;
