
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, Calendar, Edit } from 'lucide-react';
import { useProducts } from '@/hooks/useProducts';
import { CreateProductData, Product } from '@/types/goals';
import EditProductDialog from '@/components/products/EditProductDialog';

const ProductsManager = () => {
  const { products, isLoading, createProduct, deleteProduct } = useProducts();
  const [isCreating, setIsCreating] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProduct, setNewProduct] = useState<CreateProductData>({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
  });

  const handleCreateProduct = async () => {
    if (!newProduct.name.trim()) return;

    const success = await createProduct(newProduct);
    if (success) {
      setNewProduct({ name: '', description: '', start_date: '', end_date: '' });
      setIsCreating(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (confirm('Tem certeza que deseja remover este produto? Todas as metas relacionadas também serão removidas.')) {
      await deleteProduct(productId);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <>
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
                  <div className="flex-1">
                    <h4 className="font-medium">{product.name}</h4>
                    {product.description && (
                      <p className="text-sm text-gray-600">{product.description}</p>
                    )}
                    {(product.start_date || product.end_date) && (
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <Calendar className="h-3 w-3" />
                        <span>
                          {product.start_date && formatDate(product.start_date)}
                          {product.start_date && product.end_date && ' - '}
                          {product.end_date && formatDate(product.end_date)}
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingProduct(product)}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="start-date">Data de Início das Vendas</Label>
                  <Input
                    id="start-date"
                    type="date"
                    value={newProduct.start_date}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, start_date: e.target.value }))}
                  />
                </div>
                <div>
                  <Label htmlFor="end-date">Data de Fim das Vendas</Label>
                  <Input
                    id="end-date"
                    type="date"
                    value={newProduct.end_date}
                    onChange={(e) => setNewProduct(prev => ({ ...prev, end_date: e.target.value }))}
                  />
                </div>
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

      {/* Diálogo de edição */}
      {editingProduct && (
        <EditProductDialog
          product={editingProduct}
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
        />
      )}
    </>
  );
};

export default ProductsManager;
