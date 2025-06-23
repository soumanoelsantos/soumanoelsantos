
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useEvolutionData } from '@/hooks/useEvolutionData';
import { useProducts } from '@/hooks/useProducts';

interface ProductRevenueEvolutionChartProps {
  selectedProductId: string;
}

const ProductRevenueEvolutionChart: React.FC<ProductRevenueEvolutionChartProps> = ({ selectedProductId }) => {
  const { revenueData, isLoading } = useEvolutionData();
  const { products } = useProducts();
  
  const selectedProduct = products.find(product => product.id === selectedProductId);

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Evolução de Receita - {selectedProduct?.name || 'Produto'}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Evolução de Receita - {selectedProduct?.name || 'Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => [`$${Number(value).toLocaleString()}`, '']} />
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              name="Receita do Produto"
              connectNulls={false}
            />
            <Line 
              type="monotone" 
              dataKey="metaReceita" 
              stroke="#22c55e" 
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Meta de Receita"
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProductRevenueEvolutionChart;
