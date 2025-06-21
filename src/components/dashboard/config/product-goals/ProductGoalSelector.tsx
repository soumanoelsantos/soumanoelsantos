
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/goals';

interface ProductGoalSelectorProps {
  products: Product[];
  selectedProduct: string;
  onProductChange: (productId: string) => void;
  onCreateOrUpdate: () => void;
  hasCurrentGoal: boolean;
}

export const ProductGoalSelector: React.FC<ProductGoalSelectorProps> = ({
  products,
  selectedProduct,
  onProductChange,
  onCreateOrUpdate,
  hasCurrentGoal
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Produto</Label>
        <Select value={selectedProduct} onValueChange={onProductChange}>
          <SelectTrigger>
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            {products.map(product => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="flex items-end">
        <Button onClick={onCreateOrUpdate} className="w-full">
          {hasCurrentGoal ? 'Salvar Alterações' : 'Salvar Meta'}
        </Button>
      </div>
    </div>
  );
};
