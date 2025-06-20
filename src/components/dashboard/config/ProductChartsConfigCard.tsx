
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { DashboardConfig } from '@/types/dashboardConfig';
import { TrendingUp } from 'lucide-react';

interface ProductChartsConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean) => void;
}

const ProductChartsConfigCard: React.FC<ProductChartsConfigCardProps> = ({ config, onConfigChange }) => {
  const chartOptions = [
    { key: 'showProductRevenueEvolutionChart', label: 'Gráfico de Evolução de Receita por Produto' },
    { key: 'showProductBillingEvolutionChart', label: 'Gráfico de Evolução de Faturamento por Produto' },
    { key: 'showProductSalesEvolutionChart', label: 'Gráfico de Evolução de Vendas por Produto' },
    { key: 'showProductPerformanceChart', label: 'Gráfico de Performance dos Produtos' },
    { key: 'showProductComparisonChart', label: 'Gráfico de Comparação entre Produtos' },
    { key: 'showProductTemporalChart', label: 'Gráfico de Análise Temporal dos Produtos' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Gráficos e Visualizações do Produto
        </CardTitle>
        <CardDescription>Configure quais gráficos de produtos serão exibidos no dashboard</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {chartOptions.map((option) => (
          <div key={option.key} className="flex items-center space-x-2">
            <Checkbox
              id={option.key}
              checked={config[option.key as keyof DashboardConfig] as boolean}
              onCheckedChange={(checked) => onConfigChange(option.key, checked as boolean)}
            />
            <Label htmlFor={option.key} className="text-sm">{option.label}</Label>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ProductChartsConfigCard;
