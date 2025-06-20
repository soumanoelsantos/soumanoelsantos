
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DollarSign, Target, TrendingUp, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';
import { DashboardConfig } from '@/types/dashboardConfig';
import { formatCurrency, calculateRemainingDaysInMonth, calculateDailyTarget } from '@/utils/goalCalculations';

interface ProductMetricsCardsProps {
  config: DashboardConfig;
}

const ProductMetricsCards: React.FC<ProductMetricsCardsProps> = ({ config }) => {
  const { products } = useProducts();
  const { goals } = useMonthlyGoals();
  
  if (!config.showProductMetrics || config.selectedProductIds.length === 0) {
    return null;
  }

  const selectedProducts = products.filter(product => 
    config.selectedProductIds.includes(product.id)
  );

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
            Atemporal
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const cards: JSX.Element[] = [];

  selectedProducts.forEach(product => {
    const metrics = calculateProductMetrics(product.id);
    
    if (config.showProductReceita) {
      cards.push(renderMetricCard(
        'Receita do Produto',
        formatCurrency(metrics.receita, metrics.currency),
        DollarSign,
        product.name
      ));
    }

    if (config.showProductFaturamento) {
      cards.push(renderMetricCard(
        'Faturamento do Produto',
        formatCurrency(metrics.faturamento, metrics.currency),
        DollarSign,
        product.name
      ));
    }

    if (config.showProductQuantidadeVendas) {
      cards.push(renderMetricCard(
        'Quantidade de Vendas',
        `${metrics.vendas} vendas`,
        Target,
        product.name
      ));
    }

    if (config.showProductTicketReceita) {
      cards.push(renderMetricCard(
        'Ticket Receita',
        formatCurrency(metrics.ticketReceita, metrics.currency),
        TrendingUp,
        product.name
      ));
    }

    if (config.showProductTicketFaturamento) {
      cards.push(renderMetricCard(
        'Ticket Faturamento',
        formatCurrency(metrics.ticketFaturamento, metrics.currency),
        TrendingUp,
        product.name
      ));
    }

    if (config.showProductMetaReceita) {
      cards.push(renderMetricCard(
        'Meta Receita',
        formatCurrency(metrics.metaReceita, metrics.currency),
        Target,
        product.name
      ));
    }

    if (config.showProductMetaFaturamento) {
      cards.push(renderMetricCard(
        'Meta Faturamento',
        formatCurrency(metrics.metaFaturamento, metrics.currency),
        Target,
        product.name
      ));
    }

    if (config.showProductMetaQuantidadeVendas) {
      cards.push(renderMetricCard(
        'Meta Quantidade Vendas',
        `${metrics.metaQuantidade} vendas`,
        Target,
        product.name
      ));
    }

    if (config.showProductFaltaReceita) {
      cards.push(renderMetricCard(
        'Falta Receita',
        formatCurrency(metrics.faltaReceita, metrics.currency),
        Target,
        product.name
      ));
    }

    if (config.showProductFaltaFaturamento) {
      cards.push(renderMetricCard(
        'Falta Faturamento',
        formatCurrency(metrics.faltaFaturamento, metrics.currency),
        Target,
        product.name
      ));
    }

    if (config.showProductCashCollect) {
      cards.push(renderMetricCard(
        'Cash Collect',
        `${metrics.cashCollect.toFixed(1)}%`,
        DollarSign,
        product.name
      ));
    }

    if (config.showProductProjecaoReceita) {
      cards.push(renderMetricCard(
        'Projeção Receita',
        formatCurrency(metrics.projecaoReceita, metrics.currency),
        TrendingUp,
        product.name
      ));
    }

    if (config.showProductProjecaoFaturamento) {
      cards.push(renderMetricCard(
        'Projeção Faturamento',
        formatCurrency(metrics.projecaoFaturamento, metrics.currency),
        TrendingUp,
        product.name
      ));
    }
  });

  return <>{cards}</>;
};

export default ProductMetricsCards;
