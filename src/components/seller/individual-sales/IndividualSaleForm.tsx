
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { supabase } from '@/integrations/supabase/client';
import { IndividualSaleFormData } from '@/types/individualSales';
import { useAuth } from '@/hooks/useAuth';

interface IndividualSaleFormProps {
  onSubmit: (data: IndividualSaleFormData) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting: boolean;
  sellerId: string;
}

interface Product {
  id: string;
  name: string;
  description?: string;
  user_id: string;
}

const IndividualSaleForm: React.FC<IndividualSaleFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting,
  sellerId
}) => {
  const { userId } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [productsLoading, setProductsLoading] = useState(false);
  
  const [formData, setFormData] = useState<IndividualSaleFormData>({
    client_name: '',
    revenue_amount: 0,
    billing_amount: 0,
    product_id: null,
  });

  console.log('🔍 [DEBUG] IndividualSaleForm - sellerId:', sellerId);

  // Buscar produtos do usuário atual
  React.useEffect(() => {
    const fetchProducts = async () => {
      if (!userId) {
        console.log('⚠️ [DEBUG] Usuário não logado, não buscando produtos');
        setProducts([]);
        return;
      }

      console.log('📋 [DEBUG] Iniciando busca de produtos para userId:', userId);
      setProductsLoading(true);
      
      try {
        const { data, error } = await supabase
          .from('products')
          .select('id, name, description, user_id')
          .eq('user_id', userId)
          .order('name', { ascending: true });

        console.log('📝 [DEBUG] Resultado da busca de produtos:', { data, error, userId });

        if (error) {
          console.error('❌ [DEBUG] Erro ao buscar produtos:', error);
          setProducts([]);
        } else {
          console.log('✅ [DEBUG] Produtos carregados:', data?.length || 0);
          setProducts(data || []);
        }
      } catch (error) {
        console.error('💥 [DEBUG] Erro na busca de produtos:', error);
        setProducts([]);
      } finally {
        setProductsLoading(false);
      }
    };

    fetchProducts();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name.trim()) {
      return;
    }

    try {
      const success = await onSubmit(formData);
      
      if (success) {
        setFormData({
          client_name: '',
          revenue_amount: 0,
          billing_amount: 0,
          product_id: null,
        });
        onCancel();
      }
    } catch (error) {
      console.error('Erro no submit:', error);
    }
  };

  const handleInputChange = (field: keyof IndividualSaleFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Nova Venda</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="client_name">Nome do Cliente *</Label>
            <Input
              id="client_name"
              value={formData.client_name}
              onChange={(e) => handleInputChange('client_name', e.target.value)}
              placeholder="Digite o nome do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product_id">Produto</Label>
            <Select
              value={formData.product_id || "none"}
              onValueChange={(value) => handleInputChange('product_id', value === "none" ? null : value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto ou deixe em branco para venda geral" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Venda Geral (sem produto específico)</SelectItem>
                {productsLoading ? (
                  <SelectItem value="loading" disabled>Carregando produtos...</SelectItem>
                ) : products && products.length > 0 ? (
                  products.map((product) => (
                    <SelectItem key={product.id} value={product.id}>
                      {product.name}
                    </SelectItem>
                  ))
                ) : (
                  <SelectItem value="no-products" disabled>
                    Nenhum produto encontrado
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
            
            {(!products || products.length === 0) && !productsLoading && (
              <div className="text-xs text-orange-600 bg-orange-50 p-2 rounded">
                ℹ️ <strong>Produtos não encontrados.</strong> Para adicionar produtos, vá em:
                <br />Dashboard → Metas → Produtos
              </div>
            )}

            {products && products.length > 0 && (
              <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
                ✅ <strong>{products.length} produto(s) disponível(eis)</strong> para seleção
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="revenue_amount">Receita (R$) *</Label>
              <Input
                id="revenue_amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.revenue_amount}
                onChange={(e) => handleInputChange('revenue_amount', Number(e.target.value))}
                placeholder="0,00"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="billing_amount">Faturamento (R$) *</Label>
              <Input
                id="billing_amount"
                type="number"
                step="0.01"
                min="0"
                value={formData.billing_amount}
                onChange={(e) => handleInputChange('billing_amount', Number(e.target.value))}
                placeholder="0,00"
                required
              />
            </div>
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar Venda'}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default IndividualSaleForm;
