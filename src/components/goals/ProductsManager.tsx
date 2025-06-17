
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { CreateProductData } from '@/types/goals';

const ProductsManager = () => {
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
    if (confirm('Tem certeza que deseja remover este produto? Todas as metas relacionadas também serão removidas.')) {
      await deleteProduct(productId);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gerenciar Produtos</CardTitle>
        <CardDescription>
          Crie e gerencie os produtos para definir metas específicas
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Lista de produtos */}
        <div className="space-y-2">
          {isLoading ? (
            <p className="text-gray-500">Carregando produtos...</p>
          ) : products.length === 0 ? (
            <p className="text-gray-500">Nenhum produto cadastrado</p>
          ) : (
            products.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">{product.name}</h4>
                  {product.description && (
                    <p className="text-sm text-gray-600">{product.description}</p>
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
            ))
          )}
        </div>

        {/* Formulário para criar produto */}
        {isCreating ? (
          <div className="space-y-3 p-4 border rounded-lg bg-gray-50">
            <div>
              <Label htmlFor="product-name">Nome do Produto</Label>
              <Input
                id="product-name"
                value={newProduct.name}
                onChange={(e) => setNewProduct(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Digite o nome do produto"
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
        ) : (
          <Button onClick={() => setIsCreating(true)} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Produto
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductsManager;
