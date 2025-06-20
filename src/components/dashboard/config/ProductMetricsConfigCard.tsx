
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DashboardConfig } from '@/types/dashboardConfig';
import { useProducts } from '@/hooks/useProducts';

interface ProductMetricsConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean | string[]) => void;
}

const ProductMetricsConfigCard: React.FC<ProductMetricsConfigCardProps> = ({ 
  config, 
  onConfigChange 
}) => {
  const { products, isLoading } = useProducts();

  const handleProductToggle = (productId: string, checked: boolean) => {
    const updatedProductIds = checked
      ? [...config.selectedProductIds, productId]
      : config.selectedProductIds.filter(id => id !== productId);
    
    onConfigChange('selectedProductIds', updatedProductIds);
  };

  const productMetricsOptions = [
    { key: 'showProductTicketReceita', label: 'Ticket Receita do Produto' },
    { key: 'showProductFaturamento', label: 'Faturamento do Produto' },
    { key: 'showProductReceita', label: 'Receita do Produto' },
    { key: 'showProductQuantidadeVendas', label: 'Quantidade de Vendas do Produto' },
    { key: 'showProductMetaFaturamento', label: 'Meta Faturamento do Produto' },
    { key: 'showProductMetaReceita', label: 'Meta Receita do Produto' },
    { key: 'showProductFaltaFaturamento', label: 'Falta de Faturamento do Produto' },
    { key: 'showProductFaltaReceita', label: 'Falta de Receita do Produto' },
    { key: 'showProductDiariaReceita', label: 'Diária de Receita do Produto' },
    { key: 'showProductDiariaFaturamento', label: 'Diária de Faturamento do Produto' },
    { key: 'showProductCashCollect', label: 'Cash Collect do Produto' },
    { key: 'showProductProjecaoReceita', label: 'Projeção de Receita do Produto' },
    { key: 'showProductProjecaoFaturamento', label: 'Projeção de Faturamento do Produto' },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Indicadores de Produtos</CardTitle>
        <CardDescription>
          Configure quais indicadores de produtos aparecerão no dashboard (atemporais)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="showProductMetrics"
            checked={config.showProductMetrics}
            onCheckedChange={(checked) => onConfigChange('showProductMetrics', checked)}
          />
          <Label htmlFor="showProductMetrics">Exibir Indicadores de Produtos</Label>
        </div>

        {config.showProductMetrics && (
          <div className="space-y-4">
            {/* Seleção de produtos */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Selecione os produtos:</Label>
              {isLoading ? (
                <p className="text-sm text-gray-500">Carregando produtos...</p>
              ) : products.length === 0 ? (
                <p className="text-sm text-gray-500">
                  Nenhum produto encontrado. 
                  <a href="/dashboard/metas" className="text-blue-600 hover:underline ml-1">
                    Criar produtos
                  </a>
                </p>
              ) : (
                <div className="space-y-2">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-start space-x-2 p-2 border rounded-lg">
                      <Checkbox
                        id={product.id}
                        checked={config.selectedProductIds.includes(product.id)}
                        onCheckedChange={(checked) => handleProductToggle(product.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={product.id} className="text-sm cursor-pointer">
                          <div className="font-medium">{product.name}</div>
                          {product.description && (
                            <div className="text-sm text-gray-600 mt-1">
                              {product.description}
                            </div>
                          )}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Seleção de indicadores específicos */}
            {config.selectedProductIds.length > 0 && (
              <div className="space-y-3">
                <Label className="text-sm font-medium">Indicadores a exibir:</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {productMetricsOptions.map((option) => (
                    <div key={option.key} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.key}
                        checked={config[option.key as keyof DashboardConfig] as boolean}
                        onCheckedChange={(checked) => onConfigChange(option.key, checked as boolean)}
                      />
                      <Label htmlFor={option.key} className="text-sm">{option.label}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductMetricsConfigCard;
