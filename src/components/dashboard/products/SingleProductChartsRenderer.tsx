
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, BarChart3, LineChart, PieChart } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useSellerPerformanceCharts } from '@/hooks/useSellerPerformanceCharts';
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
  const { revenueData, billingData, isLoading } = useSellerPerformanceCharts();
  
  if (!selectedProductId) {
    return null;
  }

  const selectedProduct = products.find(product => product.id === selectedProductId);
  
  if (!selectedProduct) {
    return null;
  }

  const renderChart = () => {
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

    if (isLoading) {
      return (
        <Card className="h-96">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <IconComponent className="h-5 w-5 text-blue-600" />
              {getChartTitle()} - {selectedProduct.name}
            </CardTitle>
          </CardHeader>
          <CardContent className="h-72 flex flex-col justify-center items-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-600 mt-2">Carregando dados reais...</p>
          </CardContent>
        </Card>
      );
    }

    // Usar dados reais quando disponíveis
    const hasRealData = revenueData.length > 0 || billingData.length > 0;
    const dataToShow = chartKey.includes('Revenue') ? revenueData : billingData;

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
            {hasRealData ? (
              <div className="text-sm text-green-600 bg-white px-4 py-2 rounded-lg border">
                Dados reais disponíveis ({dataToShow.length} registros)
              </div>
            ) : (
              <div className="text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border">
                Aguardando dados de performance
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    );
  };

  return renderChart();
};

export default SingleProductChartsRenderer;
