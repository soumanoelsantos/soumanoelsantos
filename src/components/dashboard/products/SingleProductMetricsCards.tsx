
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Target, TrendingUp, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';
import { supabase } from '@/integrations/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { DashboardConfig } from '@/types/dashboardConfig';
import { formatCurrency } from '@/utils/goalCalculations';

interface SingleProductMetricsCardsProps {
  config: DashboardConfig;
  selectedProductId: string | null;
  indicatorKey?: string;
}

const SingleProductMetricsCards: React.FC<SingleProductMetricsCardsProps> = ({ 
  config, 
  selectedProductId,
  indicatorKey 
}) => {
  const { products } = useProducts();
  const currentDate = new Date();
  const { goals } = useMonthlyGoals(currentDate.getMonth() + 1, currentDate.getFullYear());

  // Buscar dados reais de performance do produto
  const { data: performanceData, isLoading } = useQuery({
    queryKey: ['product-performance', selectedProductId],
    queryFn: async () => {
      if (!selectedProductId) return null;
      
      const { data, error } = await supabase
        .from('seller_individual_sales')
        .select('*')
        .eq('product_id', selectedProductId);
      
      if (error) {
        console.error('Error fetching product performance:', error);
        return null;
      }
      
      return data;
    },
    enabled: !!selectedProductId
  });

  if (!selectedProductId) {
    return null;
  }

  const selectedProduct = products.find(product => product.id === selectedProductId);
  
  if (!selectedProduct) {
    return null;
  }

  const getProductGoals = (productId: string) => {
    return goals.filter(goal => goal.product_id === productId);
  };

  const calculateProductMetrics = (productId: string) => {
    const productGoals = getProductGoals(productId);
    
    // Calcular dados reais baseados na performance
    const currentReceita = performanceData?.reduce((sum, sale) => sum + (sale.revenue_amount || 0), 0) || 0;
    const currentFaturamento = performanceData?.reduce((sum, sale) => sum + (sale.billing_amount || 0), 0) || 0;
    const currentVendas = performanceData?.length || 0;
    
    const receitaGoal = productGoals.find(g => 
      g.target_type === 'financial' && g.financial_category === 'receita'
    );
    const faturamentoGoal = productGoals.find(g => 
      g.target_type === 'financial' && g.financial_category === 'faturamento'
    );
    const quantidadeGoal = productGoals.find(g => g.target_type === 'quantity');

    // Calcular Cash Collect como percentual da diferença entre faturamento e receita
    const cashCollectPercent = currentFaturamento > 0 ? ((currentFaturamento - currentReceita) / currentFaturamento) * 100 : 0;
    
    return {
      receita: currentReceita,
      faturamento: currentFaturamento,
      vendas: currentVendas,
      metaReceita: receitaGoal?.target_value || 0,
      metaFaturamento: faturamentoGoal?.target_value || 0,
      metaQuantidade: quantidadeGoal?.target_value || 0,
      faltaReceita: Math.max((receitaGoal?.target_value || 0) - currentReceita, 0),
      faltaFaturamento: Math.max((faturamentoGoal?.target_value || 0) - currentFaturamento, 0),
      ticketReceita: currentVendas > 0 ? currentReceita / currentVendas : 0,
      ticketFaturamento: currentVendas > 0 ? currentFaturamento / currentVendas : 0,
      cashCollect: cashCollectPercent,
      projecaoReceita: currentReceita * (30 / new Date().getDate()),
      projecaoFaturamento: currentFaturamento * (30 / new Date().getDate()),
      currency: receitaGoal?.currency || faturamentoGoal?.currency || 'BRL'
    };
  };

  const renderMetricCard = (title: string, value: string, icon: any, productName: string) => (
    <Card className="h-40 flex flex-col border-r border-b border-gray-200 rounded-none">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
        <CardTitle className="text-xs font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className="flex items-center gap-1">
          <Package className="h-3 w-3 text-purple-600" />
          {React.createElement(icon, { className: "h-3 w-3 text-blue-600" })}
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-between p-3">
        <div className="text-lg font-bold">{value}</div>
        <div className="mt-auto">
          <p className="text-xs text-purple-600 font-medium mt-1">
            {productName}
          </p>
          <div className="text-xs text-green-600 mt-1">
            {isLoading ? 'Carregando...' : 'Dados reais'}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const metrics = calculateProductMetrics(selectedProduct.id);

  // Se um indicador específico foi fornecido, renderizar apenas esse
  if (indicatorKey) {
    const key = `${selectedProduct.id}-${indicatorKey}`;

    switch (indicatorKey) {
      case 'showProductReceita':
        return (
          <div key={key}>
            {renderMetricCard(
              'Receita do Produto',
              formatCurrency(metrics.receita, metrics.currency),
              DollarSign,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductFaturamento':
        return (
          <div key={key}>
            {renderMetricCard(
              'Faturamento do Produto',
              formatCurrency(metrics.faturamento, metrics.currency),
              DollarSign,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductQuantidadeVendas':
        return (
          <div key={key}>
            {renderMetricCard(
              'Quantidade de Vendas',
              `${metrics.vendas} vendas`,
              Target,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductTicketReceita':
        return (
          <div key={key}>
            {renderMetricCard(
              'Ticket Receita',
              formatCurrency(metrics.ticketReceita, metrics.currency),
              TrendingUp,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductTicketFaturamento':
        return (
          <div key={key}>
            {renderMetricCard(
              'Ticket Faturamento',
              formatCurrency(metrics.ticketFaturamento, metrics.currency),
              TrendingUp,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductMetaReceita':
        return (
          <div key={key}>
            {renderMetricCard(
              'Meta Receita',
              formatCurrency(metrics.metaReceita, metrics.currency),
              Target,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductMetaFaturamento':
        return (
          <div key={key}>
            {renderMetricCard(
              'Meta Faturamento',
              formatCurrency(metrics.metaFaturamento, metrics.currency),
              Target,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductMetaQuantidadeVendas':
        return (
          <div key={key}>
            {renderMetricCard(
              'Meta Quantidade Vendas',
              `${metrics.metaQuantidade} vendas`,
              Target,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductFaltaReceita':
        return (
          <div key={key}>
            {renderMetricCard(
              'Falta Receita',
              formatCurrency(metrics.faltaReceita, metrics.currency),
              Target,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductFaltaFaturamento':
        return (
          <div key={key}>
            {renderMetricCard(
              'Falta Faturamento',
              formatCurrency(metrics.faltaFaturamento, metrics.currency),
              Target,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductCashCollect':
        return (
          <div key={key}>
            {renderMetricCard(
              'Cash Collect',
              `${metrics.cashCollect.toFixed(1)}%`,
              DollarSign,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductProjecaoReceita':
        return (
          <div key={key}>
            {renderMetricCard(
              'Projeção Receita',
              formatCurrency(metrics.projecaoReceita, metrics.currency),
              TrendingUp,
              selectedProduct.name
            )}
          </div>
        );
      case 'showProductProjecaoFaturamento':
        return (
          <div key={key}>
            {renderMetricCard(
              'Projeção Faturamento',
              formatCurrency(metrics.projecaoFaturamento, metrics.currency),
              TrendingUp,
              selectedProduct.name
            )}
          </div>
        );
      default:
        return null;
    }
  }

  return null;
};

export default SingleProductMetricsCards;
