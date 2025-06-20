
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { ProductOrderItem as ProductOrderItemType } from './useProductOrder';

interface ProductOrderItemProps {
  item: ProductOrderItemType;
  index: number;
  onMoveUp: () => void;
  onMoveDown: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export const ProductOrderItem: React.FC<ProductOrderItemProps> = ({
  item,
  index,
  onMoveUp,
  onMoveDown,
  isFirst,
  isLast
}) => {
  return (
    <Card className="border border-gray-200">
      <CardContent className="flex items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <GripVertical className="h-5 w-5 text-gray-400" />
          <div>
            <p className="font-medium text-gray-900">{item.label}</p>
            <p className="text-sm text-gray-500">Posição {index + 1}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveUp}
            disabled={isFirst}
            className="h-8 w-8 p-0"
          >
            <ArrowUp className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={onMoveDown}
            disabled={isLast}
            className="h-8 w-8 p-0"
          >
            <ArrowDown className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
