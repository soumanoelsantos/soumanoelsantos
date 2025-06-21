
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
  canCreateGoal: boolean;
  existingGoal?: any;
}

export const ProductGoalSelector: React.FC<ProductGoalSelectorProps> = ({
  products,
  selectedProduct,
  onProductChange,
  onCreateOrUpdate,
  hasCurrentGoal,
  canCreateGoal,
  existingGoal
}) => {
  const getButtonText = () => {
    if (hasCurrentGoal) return 'Salvar Alterações';
    if (existingGoal && !hasCurrentGoal) return 'Editar Meta Existente';
    return 'Salvar Meta';
  };

  const isButtonDisabled = !selectedProduct || (!hasCurrentGoal && !canCreateGoal && !existingGoal);

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
        {existingGoal && !hasCurrentGoal && (
          <p className="text-sm text-amber-600">
            Este produto já possui uma meta. Clique em "Editar Meta Existente" para modificá-la.
          </p>
        )}
      </div>
      
      <div className="flex items-end">
        <Button 
          onClick={onCreateOrUpdate} 
          className="w-full"
          disabled={isButtonDisabled}
        >
          {getButtonText()}
        </Button>
      </div>
    </div>
  );
};
