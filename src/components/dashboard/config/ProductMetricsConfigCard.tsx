
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DashboardConfig } from '@/types/dashboardConfig';
import { useProducts } from '@/hooks/useProducts';
import { Package } from 'lucide-react';

interface ProductMetricsConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean | string[]) => void;
}

const ProductMetricsConfigCard: React.FC<ProductMetricsConfigCardProps> = ({ 
  config, 
  onConfigChange 
}) => {
  const { products, isLoading, refetch } = useProducts();

  // Log para debug
  console.log('🔍 [DEBUG] ProductMetricsConfigCard - produtos carregados:', products);
  console.log('🔍 [DEBUG] ProductMetricsConfigCard - isLoading:', isLoading);
  console.log('🔍 [DEBUG] ProductMetricsConfigCard - selectedProductIds:', config.selectedProductIds);

  // Forçar refresh dos produtos a cada 5 segundos para garantir sincronização
  React.useEffect(() => {
    const interval = setInterval(() => {
      console.log('🔄 [DEBUG] ProductMetricsConfigCard - Atualizando produtos...');
      refetch();
    }, 5000);

    return () => clearInterval(interval);
  }, [refetch]);

  const handleProductToggle = (productId: string, checked: boolean) => {
    const updatedProductIds = checked
      ? [...config.selectedProductIds, productId]
      : config.selectedProductIds.filter(id => id !== productId);
    
    onConfigChange('selectedProductIds', updatedProductIds);
  };

  const productMetricsOptions = [
    { key: 'showProductReceita', label: 'Receita do Produto' },
    { key: 'showProductFaturamento', label: 'Faturamento do Produto' },
    { key: 'showProductQuantidadeVendas', label: 'Quantidade de Vendas do Produto' },
    { key: 'showProductTicketReceita', label: 'Ticket Receita do Produto' },
    { key: 'showProductTicketFaturamento', label: 'Ticket Faturamento do Produto' },
    { key: 'showProductMetaReceita', label: 'Meta Receita do Produto' },
    { key: 'showProductMetaFaturamento', label: 'Meta Faturamento do Produto' },
    { key: 'showProductMetaQuantidadeVendas', label: 'Meta Quantidade de Vendas do Produto' },
    { key: 'showProductFaltaReceita', label: 'Falta de Receita do Produto' },
    { key: 'showProductFaltaFaturamento', label: 'Falta de Faturamento do Produto' },
    { key: 'showProductCashCollect', label: 'Cash Collect do Produto' },
    { key: 'showProductProjecaoReceita', label: 'Projeção de Receita do Produto' },
    { key: 'showProductProjecaoFaturamento', label: 'Projeção de Faturamento do Produto' },
  ];

  // Filtrar apenas os IDs que existem nos produtos carregados para garantir contagem correta
  const validSelectedProductIds = config.selectedProductIds.filter(id => 
    products.some(product => product.id === id)
  );

  // Se há diferença entre os IDs selecionados e os válidos, atualizar a configuração
  React.useEffect(() => {
    if (validSelectedProductIds.length !== config.selectedProductIds.length) {
      console.log('🔧 [DEBUG] Corrigindo IDs de produtos selecionados:', {
        original: config.selectedProductIds,
        valid: validSelectedProductIds
      });
      onConfigChange('selectedProductIds', validSelectedProductIds);
    }
  }, [validSelectedProductIds.length, config.selectedProductIds.length, onConfigChange]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Indicadores de Produtos (Atemporais)
        </CardTitle>
        <CardDescription>
          Configure quais indicadores de produtos aparecerão no dashboard. Estes indicadores são atemporais e mostram dados consolidados dos produtos.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="showProductMetrics"
            checked={config.showProductMetrics}
            onCheckedChange={(checked) => onConfigChange('showProductMetrics', checked)}
          />
          <Label htmlFor="showProductMetrics" className="font-medium">
            Exibir Indicadores de Produtos
          </Label>
        </div>

        {config.showProductMetrics && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-200">
            {/* Seleção de produtos */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium text-gray-700">
                  Selecione os produtos para acompanhar:
                </Label>
                <button
                  onClick={() => {
                    console.log('🔄 [DEBUG] Refresh manual dos produtos');
                    refetch();
                  }}
                  className="text-xs text-blue-600 hover:text-blue-800 hover:underline"
                >
                  Atualizar lista
                </button>
              </div>
              {isLoading ? (
                <div className="flex items-center justify-center p-4">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  <span className="ml-2 text-sm text-gray-500">Carregando produtos...</span>
                </div>
              ) : products.length === 0 ? (
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    Nenhum produto encontrado. 
                    <a 
                      href="/dashboard/metas" 
                      className="text-blue-600 hover:underline ml-1 font-medium"
                    >
                      Criar produtos primeiro
                    </a>
                  </p>
                </div>
              ) : (
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {products.map((product) => (
                    <div key={product.id} className="flex items-start space-x-2 p-3 border rounded-lg hover:bg-gray-50">
                      <Checkbox
                        id={product.id}
                        checked={validSelectedProductIds.includes(product.id)}
                        onCheckedChange={(checked) => handleProductToggle(product.id, checked as boolean)}
                      />
                      <div className="flex-1">
                        <Label htmlFor={product.id} className="text-sm cursor-pointer">
                          <div className="font-medium text-gray-900">{product.name}</div>
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

            {/* Seleção de indicadores específicos - SEMPRE mostrar */}
            <div className="space-y-3">
              <Label className="text-sm font-medium text-gray-700">
                Indicadores a exibir para os produtos:
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {productMetricsOptions.map((option) => (
                  <div key={option.key} className="flex items-center space-x-2 p-2 border rounded hover:bg-gray-50">
                    <Checkbox
                      id={option.key}
                      checked={config[option.key as keyof DashboardConfig] as boolean}
                      onCheckedChange={(checked) => onConfigChange(option.key, checked as boolean)}
                    />
                    <Label htmlFor={option.key} className="text-sm cursor-pointer flex-1">
                      {option.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Informação sobre produtos selecionados */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Produtos selecionados:</strong> {validSelectedProductIds.length}
              </p>
              <p className="text-xs text-blue-600 mt-1">
                {validSelectedProductIds.length > 0 ? 
                  'Os indicadores serão exibidos para cada produto selecionado no dashboard principal.' :
                  'Selecione pelo menos um produto para ver os indicadores no dashboard.'
                }
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductMetricsConfigCard;
