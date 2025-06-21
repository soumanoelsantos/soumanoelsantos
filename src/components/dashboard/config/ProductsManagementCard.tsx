
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Package } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { CreateProductData } from '@/types/goals';

const ProductsManagementCard: React.FC = () => {
  const { products, isLoading, createProduct, deleteProduct } = useProducts();
  const [isCreating, setIsCreating] = useState(false);
  const [newProduct, setNewProduct] = useState<CreateProductData>({
    name: '',
    description: '',
  });

  const handleCreateProduct = async () => {
    if (!newProduct.name.trim()) return;

    const success = await createProduct(newProduct);
    if (success) {
      setNewProduct({ name: '', description: '' });
      setIsCreating(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Tem certeza que deseja remover este produto? Ele será removido de todas as funcionalidades do sistema.')) {
      await deleteProduct(productId);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Gerenciar Produtos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-4">
            Carregando produtos...
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
          Gerenciar Produtos
        </CardTitle>
        <CardDescription>
          Gerencie todos os produtos do sistema. Eles serão utilizados em metas, relatórios, formulários de vendas e dashboards
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Button 
          onClick={() => setIsCreating(true)}
          className="w-full"
        >
          <Plus className="h-4 w-4 mr-2" />
          Adicionar Produto
        </Button>

        {products.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhum produto cadastrado</p>
            <p className="text-sm">Adicione produtos para usar em todo o sistema</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h4 className="font-medium text-sm text-gray-700">
              Produtos Cadastrados ({products.length})
            </h4>
            <div className="space-y-2">
              {products.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{product.name}</span>
                    </div>
                    {product.description && (
                      <p className="text-sm text-gray-500 mt-1">{product.description}</p>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteProduct(product.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Formulário para criar produto */}
        {isCreating && (
          <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
            <div>
              <Label htmlFor="product-name">Nome do Produto *</Label>
              <Input
                id="product-name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Ex: Curso Premium, Mentoria VIP, etc."
              />
            </div>
            <div>
              <Label htmlFor="product-description">Descrição (opcional)</Label>
              <Textarea
                id="product-description"
                value={newProduct.description}
                onChange={(e) => setNewProduct(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Descrição do produto"
                rows={2}
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleCreateProduct} disabled={!newProduct.name.trim()}>
                Criar Produto
              </Button>
              <Button variant="outline" onClick={() => setIsCreating(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Info sobre uso */}
        <div className="text-xs text-blue-600 bg-blue-50 p-3 rounded">
          💡 <strong>Dica:</strong> Os produtos cadastrados aqui serão utilizados em metas específicas, 
          relatórios de desempenho, formulários de vendas e dashboards de produtos.
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductsManagementCard;
