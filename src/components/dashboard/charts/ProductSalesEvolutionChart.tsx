
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { LineChart } from 'lucide-react';
import { useEvolutionData } from '@/hooks/useEvolutionData';
import { useProducts } from '@/hooks/useProducts';

interface ProductSalesEvolutionChartProps {
  selectedProductId: string;
}

const ProductSalesEvolutionChart: React.FC<ProductSalesEvolutionChartProps> = ({ selectedProductId }) => {
  const { revenueData, isLoading } = useEvolutionData();
  const { products } = useProducts();
  
  const selectedProduct = products.find(product => product.id === selectedProductId);

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChart className="h-5 w-5 text-purple-600" />
            Evolução de Vendas - {selectedProduct?.name || 'Produto'}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <LineChart className="h-5 w-5 text-purple-600" />
          Evolução de Vendas - {selectedProduct?.name || 'Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip formatter={(value) => [`${value} vendas`, '']} />
            <Bar 
              dataKey="quantidadeVendas" 
              fill="#8b5cf6"
              name="Vendas do Produto"
            />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProductSalesEvolutionChart;
