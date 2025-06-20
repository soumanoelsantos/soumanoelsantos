
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Target, TrendingUp, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';
import { DashboardConfig } from '@/types/dashboardConfig';
import { formatCurrency, calculateRemainingDaysInMonth, calculateDailyTarget } from '@/utils/goalCalculations';

interface SingleProductMetricsCardsProps {
  config: DashboardConfig;
  selectedProductId: string | null;
}

const SingleProductMetricsCards: React.FC<SingleProductMetricsCardsProps> = ({ 
  config, 
  selectedProductId 
}) => {
  const { products } = useProducts();
  const { goals } = useMonthlyGoals();
  
  if (!config.showProductMetrics || !selectedProductId) {
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
    
    // Simular dados de performance do produto
    // Em uma implementação real, esses dados viriam de uma API
    const currentReceita = Math.random() * 50000;
    const currentFaturamento = Math.random() * 150000;
    const currentVendas = Math.floor(Math.random() * 50);
    
    const receitaGoal = productGoals.find(g => 
      g.target_type === 'financial' && g.financial_category === 'receita'
    );
    const faturamentoGoal = productGoals.find(g => 
      g.target_type === 'financial' && g.financial_category === 'faturamento'
    );
    const quantidadeGoal = productGoals.find(g => g.target_type === 'quantity');

    const remainingDays = calculateRemainingDaysInMonth();
    
    return {
      receita: currentReceita,
      faturamento: currentFaturamento,
      vendas: currentVendas,
      metaReceita: receitaGoal?.target_value || 0,
      metaFaturamento: faturamentoGoal?.target_value || 0,
      metaQuantidade: quantidadeGoal?.target_value || 0,
      faltaReceita: Math.max((receitaGoal?.target_value || 0) - currentReceita, 0),
      faltaFaturamento: Math.max((faturamentoGoal?.target_value || 0) - currentFaturamento, 0),
      diariaReceita: calculateDailyTarget(receitaGoal?.target_value || 0, currentReceita, remainingDays),
      diariaFaturamento: calculateDailyTarget(faturamentoGoal?.target_value || 0, currentFaturamento, remainingDays),
      ticketReceita: currentVendas > 0 ? currentReceita / currentVendas : 0,
      cashCollect: currentReceita * 0.85, // 85% do que foi vendido
      projecaoReceita: currentReceita * (30 / new Date().getDate()),
      projecaoFaturamento: currentFaturamento * (30 / new Date().getDate()),
      currency: receitaGoal?.currency || faturamentoGoal?.currency || 'BRL'
    };
  };

  const renderMetricCard = (title: string, value: string, icon: any) => (
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
            {selectedProduct.name}
          </p>
          <div className="text-xs text-green-600 mt-1">
            Atemporal
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const metrics = calculateProductMetrics(selectedProductId);

  // Usar a ordem configurada dos produtos
  const productOrder = config.productOrder || [];
  const orderedIndicators = productOrder.length > 0 ? productOrder : [
    'showProductReceita',
    'showProductFaturamento',
    'showProductQuantidadeVendas',
    'showProductTicketReceita',
    'showProductMetaReceita',
    'showProductMetaFaturamento',
    'showProductFaltaReceita',
    'showProductFaltaFaturamento',
    'showProductDiariaReceita',
    'showProductDiariaFaturamento',
    'showProductCashCollect',
    'showProductProjecaoReceita',
    'showProductProjecaoFaturamento'
  ];

  const cards: JSX.Element[] = [];

  orderedIndicators.forEach(indicator => {
    if (!config[indicator as keyof DashboardConfig]) return;

    switch (indicator) {
      case 'showProductReceita':
        cards.push(renderMetricCard(
          'Receita do Produto',
          formatCurrency(metrics.receita, metrics.currency),
          DollarSign
        ));
        break;
      case 'showProductFaturamento':
        cards.push(renderMetricCard(
          'Faturamento do Produto',
          formatCurrency(metrics.faturamento, metrics.currency),
          DollarSign
        ));
        break;
      case 'showProductQuantidadeVendas':
        cards.push(renderMetricCard(
          'Quantidade de Vendas',
          `${metrics.vendas} vendas`,
          Target
        ));
        break;
      case 'showProductTicketReceita':
        cards.push(renderMetricCard(
          'Ticket Receita',
          formatCurrency(metrics.ticketReceita, metrics.currency),
          TrendingUp
        ));
        break;
      case 'showProductMetaReceita':
        cards.push(renderMetricCard(
          'Meta Receita',
          formatCurrency(metrics.metaReceita, metrics.currency),
          Target
        ));
        break;
      case 'showProductMetaFaturamento':
        cards.push(renderMetricCard(
          'Meta Faturamento',
          formatCurrency(metrics.metaFaturamento, metrics.currency),
          Target
        ));
        break;
      case 'showProductFaltaReceita':
        cards.push(renderMetricCard(
          'Falta Receita',
          formatCurrency(metrics.faltaReceita, metrics.currency),
          Target
        ));
        break;
      case 'showProductFaltaFaturamento':
        cards.push(renderMetricCard(
          'Falta Faturamento',
          formatCurrency(metrics.faltaFaturamento, metrics.currency),
          Target
        ));
        break;
      case 'showProductDiariaReceita':
        cards.push(renderMetricCard(
          'Diária Receita',
          formatCurrency(metrics.diariaReceita, metrics.currency),
          DollarSign
        ));
        break;
      case 'showProductDiariaFaturamento':
        cards.push(renderMetricCard(
          'Diária Faturamento',
          formatCurrency(metrics.diariaFaturamento, metrics.currency),
          DollarSign
        ));
        break;
      case 'showProductCashCollect':
        cards.push(renderMetricCard(
          'Cash Collect',
          formatCurrency(metrics.cashCollect, metrics.currency),
          DollarSign
        ));
        break;
      case 'showProductProjecaoReceita':
        cards.push(renderMetricCard(
          'Projeção Receita',
          formatCurrency(metrics.projecaoReceita, metrics.currency),
          TrendingUp
        ));
        break;
      case 'showProductProjecaoFaturamento':
        cards.push(renderMetricCard(
          'Projeção Faturamento',
          formatCurrency(metrics.projecaoFaturamento, metrics.currency),
          TrendingUp
        ));
        break;
    }
  });

  return <>{cards}</>;
};

export default SingleProductMetricsCards;
