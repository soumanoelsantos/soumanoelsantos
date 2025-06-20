
import { useState, useEffect } from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import { PRODUCT_METRICS_LABELS } from './constants';

export interface ProductOrderItem {
  key: string;
  label: string;
  enabled: boolean;
}

export const useProductOrder = (
  config: DashboardConfig,
  productOrder: string[],
  onReorderProducts: (newOrder: string[]) => void
) => {
  const [items, setItems] = useState<ProductOrderItem[]>([]);

  // Gerar lista de itens baseada na configuração atual
  const generateItems = () => {
    const enabledItems: ProductOrderItem[] = [];
    
    // Usar a ordem personalizada se existir, senão usar ordem alfabética
    const orderedKeys = productOrder.length > 0 ? productOrder : Object.keys(PRODUCT_METRICS_LABELS).sort();
    
    orderedKeys.forEach(key => {
      if (config[key as keyof DashboardConfig] === true && PRODUCT_METRICS_LABELS[key]) {
        enabledItems.push({
          key,
          label: PRODUCT_METRICS_LABELS[key],
          enabled: true
        });
      }
    });

    // Adicionar novos itens habilitados que não estão na ordem atual
    Object.keys(PRODUCT_METRICS_LABELS).forEach(key => {
      if (config[key as keyof DashboardConfig] === true && !orderedKeys.includes(key)) {
        enabledItems.push({
          key,
          label: PRODUCT_METRICS_LABELS[key],
          enabled: true
        });
      }
    });

    return enabledItems;
  };

  useEffect(() => {
    setItems(generateItems());
  }, [config, productOrder]);

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);

    setItems(newItems);
    onReorderProducts(newItems.map(item => item.key));
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= items.length) return;

    const newItems = Array.from(items);
    const [movedItem] = newItems.splice(fromIndex, 1);
    newItems.splice(toIndex, 0, movedItem);

    setItems(newItems);
    onReorderProducts(newItems.map(item => item.key));
  };

  const resetToDefault = () => {
    const defaultOrder = Object.keys(PRODUCT_METRICS_LABELS)
      .filter(key => config[key as keyof DashboardConfig] === true)
      .sort();
    
    onReorderProducts(defaultOrder);
  };

  return {
    items,
    handleDragEnd,
    moveItem,
    resetToDefault
  };
};
