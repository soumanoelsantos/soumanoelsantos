
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { TrendingUp } from 'lucide-react';
import { useEvolutionData } from '@/hooks/useEvolutionData';
import { useProducts } from '@/hooks/useProducts';
import { useProductGoals } from '@/hooks/useProductGoals';
import { formatCurrency } from '@/utils/goalCalculations';

interface ProductRevenueEvolutionChartProps {
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

const ProductRevenueEvolutionChart: React.FC<ProductRevenueEvolutionChartProps> = ({ selectedProductId }) => {
  const { revenueData, isLoading } = useEvolutionData();
  const { products } = useProducts();
  const { productGoals } = useProductGoals();
  
  const selectedProduct = products.find(product => product.id === selectedProductId);
  const productGoal = productGoals.find(goal => goal.product_id === selectedProductId && goal.is_active);
  const currency = productGoal?.currency || 'BRL';
  
  const currentDay = getCurrentDay();
  
  // Calcular dados com projeção
  const dataWithProjection = React.useMemo(() => {
    return calculateProjection(revenueData, 'receita', currentDay);
  }, [revenueData, currentDay]);

  const formatCurrencyValue = (value: number) => {
    return formatCurrency(value, currency);
  };

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
          <LineChart data={dataWithProjection}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="day" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              tickFormatter={(value) => {
                if (value >= 1000) {
                  return `${value / 1000}k`;
                }
                return value.toString();
              }}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12 }}
            />
            <Tooltip 
              formatter={(value: number, name: string) => [formatCurrencyValue(value), name]}
              labelFormatter={(label) => `Dia ${label}`}
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
            />
            <Legend />
            
            {/* Meta principal sempre visível */}
            <Line 
              type="monotone" 
              dataKey="metaReceita" 
              stroke="#ef4444" 
              strokeWidth={3}
              name="Meta Receita"
              dot={false}
            />
            
            {/* Receita realizada até a data atual - linha sólida melhorada */}
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="#10b981" 
              strokeWidth={4}
              name="Receita Realizada"
              dot={{
                fill: '#10b981',
                strokeWidth: 2,
                stroke: '#ffffff',
                r: 4
              }}
              connectNulls={false}
            />
            
            {/* Projeção de receita - linha pontilhada verde */}
            <Line 
              type="monotone" 
              dataKey="receitaProjection" 
              stroke="#10b981" 
              strokeWidth={3}
              strokeDasharray="8 4"
              name="Projeção Receita"
              dot={false}
              connectNulls={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default ProductRevenueEvolutionChart;
