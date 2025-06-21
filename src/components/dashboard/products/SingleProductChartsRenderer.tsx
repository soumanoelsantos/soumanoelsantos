
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, LineChart, PieChart } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { DashboardConfig } from '@/types/dashboardConfig';

interface SingleProductChartsRendererProps {
  config: DashboardConfig;
  selectedProductId: string | null;
  chartKey: string;
}

const SingleProductChartsRenderer: React.FC<SingleProductChartsRendererProps> = ({ 
  config, 
  selectedProductId,
  chartKey 
}) => {
  const { products } = useProducts();
  
  if (!selectedProductId) {
    return null;
  }

  const selectedProduct = products.find(product => product.id === selectedProductId);
  
  if (!selectedProduct) {
    return null;
  }

  const renderChart = () => {
    // Dados simulados para demonstração
    const mockData = [
      { name: 'Jan', value: Math.random() * 10000 },
      { name: 'Fev', value: Math.random() * 10000 },
      { name: 'Mar', value: Math.random() * 10000 },
      { name: 'Abr', value: Math.random() * 10000 },
      { name: 'Mai', value: Math.random() * 10000 },
      { name: 'Jun', value: Math.random() * 10000 },
    ];

    const getChartTitle = () => {
      switch (chartKey) {
        case 'showProductRevenueEvolutionChart':
          return 'Evolução de Receita';
        case 'showProductBillingEvolutionChart':
          return 'Evolução de Faturamento';
        case 'showProductSalesEvolutionChart':
          return 'Evolução de Vendas';
        case 'showProductPerformanceChart':
          return 'Performance do Produto';
        case 'showProductComparisonChart':
          return 'Comparação de Produtos';
        case 'showProductTemporalChart':
          return 'Análise Temporal';
        default:
          return 'Gráfico do Produto';
      }
    };

    const getChartIcon = () => {
      switch (chartKey) {
        case 'showProductRevenueEvolutionChart':
        case 'showProductBillingEvolutionChart':
          return TrendingUp;
        case 'showProductSalesEvolutionChart':
          return LineChart;
        case 'showProductPerformanceChart':
          return BarChart3;
        case 'showProductComparisonChart':
        case 'showProductTemporalChart':
          return PieChart;
        default:
          return BarChart3;
      }
    };

    const IconComponent = getChartIcon();

    return (
      <Card className="h-96">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <IconComponent className="h-5 w-5 text-blue-600" />
            {getChartTitle()} - {selectedProduct.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex flex-col justify-center items-center">
          <div className="w-full h-full bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg flex flex-col items-center justify-center">
            <IconComponent className="h-16 w-16 text-blue-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              {getChartTitle()}
            </h3>
            <p className="text-gray-600 text-center mb-4">
              Produto: <span className="font-medium text-purple-600">{selectedProduct.name}</span>
            </p>
            <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border">
              Gráfico em desenvolvimento
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  return renderChart();
};

export default SingleProductChartsRenderer;
