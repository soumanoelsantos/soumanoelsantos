import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Trash2, Plus, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';

export interface ProductSale {
  id: string;
  product_id: string;
  client_name: string;
  revenue_amount: number;
  billing_amount: number;
}

interface ProductSalesSectionProps {
  productSales: ProductSale[];
  onProductSalesChange: (sales: ProductSale[]) => void;
}

const ProductSalesSection: React.FC<ProductSalesSectionProps> = ({
  productSales,
  onProductSalesChange
}) => {
  const { products, isLoading, error } = useProducts();
  const [debugInfo, setDebugInfo] = useState<string>('');

  console.log('🔍 [DEBUG] ProductSalesSection render:', {
    productSales: productSales?.length || 0,
    products: products?.length || 0,
    isLoading,
    error,
    hasError: Boolean(error && error.trim() !== '')
  });

  const addProductSale = () => {
    console.log('➕ [DEBUG] Adicionando nova venda - INÍCIO');
    
    try {
      // Verificar se a função de callback existe
      if (!onProductSalesChange) {
        console.error('❌ [DEBUG] onProductSalesChange não está definido!');
        setDebugInfo('Erro: Função de callback não definida');
        return;
      }

      // Verificar se productSales é um array válido
      if (!Array.isArray(productSales)) {
        console.error('❌ [DEBUG] productSales não é um array válido:', productSales);
        setDebugInfo('Erro: Lista de vendas inválida');
        return;
      }

      console.log('✅ [DEBUG] Criando nova venda...');
      const newSale: ProductSale = {
        id: `sale-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        product_id: '',
        client_name: '',
        revenue_amount: 0,
        billing_amount: 0
      };

      console.log('✅ [DEBUG] Nova venda criada:', newSale);
      console.log('✅ [DEBUG] ProductSales atuais:', productSales);
      
      const updatedSales = [...productSales, newSale];
      console.log('✅ [DEBUG] Lista atualizada:', updatedSales);
      
      // Executar callback
      onProductSalesChange(updatedSales);
      console.log('✅ [DEBUG] Callback executado com sucesso');
      
      setDebugInfo(`Venda adicionada: ${newSale.id}`);
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao adicionar venda:', error);
      setDebugInfo(`Erro: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const removeProductSale = (id: string) => {
    console.log('🗑️ [DEBUG] Removendo venda:', id);
    try {
      const updatedSales = productSales.filter(sale => sale.id !== id);
      onProductSalesChange(updatedSales);
      console.log('✅ [DEBUG] Venda removida');
      setDebugInfo(`Venda removida: ${id}`);
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao remover venda:', error);
      setDebugInfo(`Erro ao remover: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const updateProductSale = (id: string, field: keyof ProductSale, value: string | number) => {
    console.log('✏️ [DEBUG] Atualizando venda:', { id, field, value });
    try {
      const updatedSales = productSales.map(sale =>
        sale.id === id ? { ...sale, [field]: value } : sale
      );
      onProductSalesChange(updatedSales);
      console.log('✅ [DEBUG] Venda atualizada');
      setDebugInfo(`Venda atualizada: ${id} - ${field}`);
    } catch (error) {
      console.error('❌ [DEBUG] Erro ao atualizar venda:', error);
      setDebugInfo(`Erro ao atualizar: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const getProductName = (productId: string) => {
    if (!products || !productId) return '';
    const product = products.find(p => p.id === productId);
    return product ? product.name : 'Produto não encontrado';
  };

  // Se houver erro no carregamento dos produtos, mostrar mensagem (só se for um erro real)
  if (error && error.trim() !== '') {
    console.error('❌ [DEBUG] Erro ao carregar produtos:', error);
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Vendas por Produto
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-6 text-red-500">
            <p>Erro ao carregar produtos</p>
            <p className="text-sm text-gray-500">Tente recarregar a página</p>
            <p className="text-xs text-gray-400">Erro: {error}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5" />
          Vendas por Produto
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Debug info para desenvolvimento */}
        {debugInfo && (
          <div className="text-xs bg-blue-50 p-2 rounded border">
            <strong>Debug:</strong> {debugInfo}
          </div>
        )}

        {productSales.length === 0 ? (
          <div className="text-center py-6 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-2 text-gray-300" />
            <p>Nenhuma venda registrada ainda</p>
            <p className="text-sm">Clique em "Adicionar Venda" para começar</p>
          </div>
        ) : (
          <div className="space-y-4">
            {productSales.map((sale, index) => (
              <Card key={sale.id} className="p-4 border border-gray-200">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700">Venda #{index + 1}</h4>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeProductSale(sale.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Produto *</Label>
                    <Select
                      value={sale.product_id}
                      onValueChange={(value) => updateProductSale(sale.id, 'product_id', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione um produto" />
                      </SelectTrigger>
                      <SelectContent>
                        {isLoading ? (
                          <SelectItem value="" disabled>Carregando produtos...</SelectItem>
                        ) : !products || products.length === 0 ? (
                          <SelectItem value="" disabled>Nenhum produto encontrado</SelectItem>
                        ) : (
                          products.map((product) => (
                            <SelectItem key={product.id} value={product.id}>
                              {product.name}
                            </SelectItem>
                          ))
                        )}
                      </SelectContent>
                    </Select>
                    {sale.product_id && (
                      <p className="text-xs text-blue-600">
                        Produto: {getProductName(sale.product_id)}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label>Nome do Cliente *</Label>
                    <Input
                      type="text"
                      value={sale.client_name}
                      onChange={(e) => updateProductSale(sale.id, 'client_name', e.target.value)}
                      placeholder="Nome do cliente"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Receita (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={sale.revenue_amount}
                      onChange={(e) => updateProductSale(sale.id, 'revenue_amount', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Faturamento (R$)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      min="0"
                      value={sale.billing_amount}
                      onChange={(e) => updateProductSale(sale.id, 'billing_amount', parseFloat(e.target.value) || 0)}
                      placeholder="0.00"
                    />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Button
          type="button"
          variant="outline"
          onClick={addProductSale}
          className="w-full"
          disabled={isLoading}
        >
          <Plus className="h-4 w-4 mr-2" />
          {isLoading ? 'Carregando...' : 'Adicionar Venda'}
        </Button>

        {productSales.length > 0 && (
          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Total de vendas:</strong> {productSales.length}
            </p>
            <p className="text-xs text-blue-600 mt-1">
              Receita total: R$ {productSales.reduce((sum, sale) => sum + sale.revenue_amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
            <p className="text-xs text-blue-600">
              Faturamento total: R$ {productSales.reduce((sum, sale) => sum + sale.billing_amount, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductSalesSection;
