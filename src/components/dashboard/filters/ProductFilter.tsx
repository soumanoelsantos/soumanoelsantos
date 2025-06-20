
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

interface ProductFilterProps {
  selectedProductId: string | null;
  onProductChange: (productId: string | null) => void;
}

const ProductFilter: React.FC<ProductFilterProps> = ({ 
  selectedProductId, 
  onProductChange 
}) => {
  const { products, isLoading } = useProducts();

  if (isLoading || products.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-sm font-medium">
          <Package className="h-4 w-4" />
          Filtro de Produto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Select 
          value={selectedProductId || 'all'} 
          onValueChange={(value) => onProductChange(value === 'all' ? null : value)}
        >
          <SelectTrigger className="w-full max-w-xs">
            <SelectValue placeholder="Selecione um produto" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os produtos</SelectItem>
            {products.map((product) => (
              <SelectItem key={product.id} value={product.id}>
                {product.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </CardContent>
    </Card>
  );
};

export default ProductFilter;
