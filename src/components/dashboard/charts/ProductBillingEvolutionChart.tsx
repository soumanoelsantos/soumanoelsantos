
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useEvolutionData } from '@/hooks/useEvolutionData';
import { useProducts } from '@/hooks/useProducts';

interface ProductBillingEvolutionChartProps {
  selectedProductId: string;
}

const ProductBillingEvolutionChart: React.FC<ProductBillingEvolutionChartProps> = ({ selectedProductId }) => {
  const { billingData, isLoading } = useEvolutionData();
  const { products } = useProducts();
  
  const selectedProduct = products.find(product => product.id === selectedProductId);

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Evolução de Faturamento - {selectedProduct?.name || 'Produto'}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-600" />
          Evolução de Faturamento - {selectedProduct?.name || 'Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={billingData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
            <Line 
              type="monotone" 
              dataKey="faturamento" 
              stroke="#f59e0b" 
              strokeWidth={3}
              name="Faturamento do Produto"
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="metaFaturamento" 
              stroke="#3b82f6" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Meta de Faturamento"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProductBillingEvolutionChart;
