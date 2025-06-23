
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { LineChart as LineChartIcon } from 'lucide-react';
import { useEvolutionData } from '@/hooks/useEvolutionData';
import { useProducts } from '@/hooks/useProducts';

interface ProductSalesEvolutionChartProps {
  selectedProductId: string;
}

// Função para obter o dia atual do mês
const getCurrentDay = () => {
  return new Date().getDate();
};

// Função para calcular projeção baseada na tendência atual
const calculateProjection = (data: any[], valueKey: string, currentDay: number) => {
  if (!data || data.length === 0 || currentDay <= 0) return data;
  
  // Pegar apenas os dados até o dia atual
  const actualData = data.slice(0, currentDay);
  if (actualData.length < 2) return data;
  
  // Calcular tendência baseada nos últimos dados válidos
  const lastValidData = actualData.filter(item => item[valueKey] !== null);
  if (lastValidData.length < 2) return data;
  
  const lastValue = lastValidData[lastValidData.length - 1][valueKey];
  const previousValue = lastValidData[lastValidData.length - 2][valueKey];
  const trend = (lastValue - previousValue) * 0.8; // Suavizar tendência
  
  // Aplicar projeção para os dias restantes
  return data.map((item, index) => {
    if (index < currentDay) {
      return item;
    } else {
      const daysAhead = index - currentDay + 1;
      const projectedValue = lastValue + (trend * daysAhead);
      return {
        ...item,
        [`${valueKey}Projection`]: Math.max(0, projectedValue)
      };
    }
  });
};

const ProductSalesEvolutionChart: React.FC<ProductSalesEvolutionChartProps> = ({ selectedProductId }) => {
  const { revenueData, isLoading } = useEvolutionData();
  const { products } = useProducts();
  
  const selectedProduct = products.find(product => product.id === selectedProductId);
  const currentDay = getCurrentDay();
  
  // Calcular dados com projeção para vendas
  const dataWithProjection = React.useMemo(() => {
    return calculateProjection(revenueData, 'quantidadeVendas', currentDay);
  }, [revenueData, currentDay]);

  if (isLoading) {
    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <LineChartIcon className="h-5 w-5 text-purple-600" />
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
          <LineChartIcon className="h-5 w-5 text-purple-600" />
          Evolução de Vendas - {selectedProduct?.name || 'Produto'}
        </CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataWithProjection}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [`${value} vendas`, name]}
              labelFormatter={(label) => `Dia ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            
            {/* Meta de vendas */}
            <Line 
              type="monotone" 
              dataKey="metaQuantidadeVendas" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Meta Vendas"
              dot={false}
            />
            
            {/* Vendas realizadas até a data atual */}
            <Line 
              type="monotone" 
              dataKey="quantidadeVendas" 
              stroke="#8b5cf6" 
              strokeWidth={4}
              name="Vendas Realizadas"
              dot={{
                fill: '#8b5cf6',
                strokeWidth: 2,
                stroke: '#ffffff',
                r: 4
              }}
              connectNulls={false}
            />
            
            {/* Projeção de vendas - linha pontilhada roxa */}
            <Line 
              type="monotone" 
              dataKey="quantidadeVendasProjection" 
              stroke="#8b5cf6" 
              strokeWidth={3}
              strokeDasharray="8 4"
              name="Projeção Vendas"
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProductSalesEvolutionChart;
