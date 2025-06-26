
import { useState } from 'react';

export const useProductFilter = () => {
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const updateSelectedProduct = (productId: string | null) => {
    setSelectedProductId(productId);
  };

  return {
    selectedProductId,
    updateSelectedProduct,
  };
};
