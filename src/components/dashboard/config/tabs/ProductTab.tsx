
import React from 'react';
import { DashboardConfig } from '@/types/dashboardConfig';
import ProductsManagementCard from '../ProductsManagementCard';
import ProductMetricsConfigCard from '../ProductMetricsConfigCard';
import ProductGoalsConfigCard from '../ProductGoalsConfigCard';
import ProductChartsConfigCard from '../ProductChartsConfigCard';
import ProductOrderManager from '../product-order/ProductOrderManager';
import SaveButton from '../SaveButton';

interface ProductTabProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: any) => void;
  onReorderProducts: (newOrder: string[]) => void;
  onSave: () => void;
  isSaving: boolean;
}

const ProductTab: React.FC<ProductTabProps> = ({
  config,
  onConfigChange,
  onReorderProducts,
  onSave,
  isSaving
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Coluna da esquerda - Produto */}
        <div className="space-y-6">
          <ProductsManagementCard />
          <ProductMetricsConfigCard 
            config={config} 
            onConfigChange={onConfigChange} 
          />
          <ProductGoalsConfigCard />
        </div>
        
        {/* Coluna da direita - Produto */}
        <div className="space-y-6">
          <ProductChartsConfigCard 
            config={config} 
            onConfigChange={onConfigChange} 
          />
          <ProductOrderManager
            config={config}
            productOrder={config.productOrder}
            onReorderProducts={onReorderProducts}
          />
        </div>
      </div>
      
      <SaveButton 
        onSave={onSave}
        isLoading={isSaving}
      />
    </div>
  );
};

export default ProductTab;
