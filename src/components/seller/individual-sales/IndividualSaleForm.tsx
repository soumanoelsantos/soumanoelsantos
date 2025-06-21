
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProductsForSeller } from '@/hooks/useProductsForSeller';
import { useSellers } from '@/hooks/useSellers';
import { IndividualSaleFormData } from '@/types/individualSales';

interface IndividualSaleFormProps {
  onSubmit: (data: IndividualSaleFormData) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting: boolean;
  sellerId: string;
}

const IndividualSaleForm: React.FC<IndividualSaleFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting,
  sellerId
}) => {
  console.log('🔍 [DEBUG] IndividualSaleForm renderizado');
  
  // Buscar o vendedor para obter o user_id do admin
  const { sellers } = useSellers();
  const seller = sellers.find(s => s.id === sellerId);
  const adminUserId = seller?.user_id;
  
  console.log('🔍 [DEBUG] Seller encontrado:', seller);
  console.log('🔍 [DEBUG] Admin User ID extraído:', adminUserId);
  
  // Usar o hook específico para vendedores
  const { products, isLoading: productsLoading } = useProductsForSeller(adminUserId);
  
  const [formData, setFormData] = useState<IndividualSaleFormData>({
    client_name: '',
    revenue_amount: 0,
    billing_amount: 0,
    product_id: null,
  });

  console.log('📋 [DEBUG] Produtos carregados:', products);
  console.log('📋 [DEBUG] Products loading:', productsLoading);
  console.log('📝 [DEBUG] FormData atual:', formData);
  console.log('👤 [DEBUG] Admin User ID:', adminUserId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    console.log('📤 [DEBUG] Submetendo formulário com dados:', formData);
    
    if (!formData.client_name.trim()) {
      console.warn('⚠️ [DEBUG] Nome do cliente é obrigatório');
      return;
    }

    try {
      const success = await onSubmit(formData);
      console.log('✅ [DEBUG] Resultado do submit:', success);
      
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
      console.error('❌ [DEBUG] Erro no submit:', error);
    }
  };

  const handleInputChange = (field: keyof IndividualSaleFormData, value: any) => {
    console.log(`📝 [DEBUG] Alterando ${field}:`, value);
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
                  <SelectItem value="no-products" disabled>Nenhum produto disponível</SelectItem>
                )}
              </SelectContent>
            </Select>
            
            {/* Debug info expandido */}
            <div className="text-xs text-gray-500 space-y-1 p-2 bg-gray-50 rounded">
              <div><strong>Debug Info:</strong></div>
              <div>Produtos encontrados: {products?.length || 0}</div>
              <div>Admin ID: {adminUserId || 'não encontrado'}</div>
              <div>Seller ID: {sellerId}</div>
              <div>Loading: {productsLoading ? 'sim' : 'não'}</div>
              <div>Seller completo: {JSON.stringify(seller)}</div>
              {products?.length > 0 && (
                <div>Produtos: {products.map(p => `${p.name} (${p.id})`).join(', ')}</div>
              )}
              {products?.length === 0 && !productsLoading && (
                <div className="text-red-600">⚠️ Nenhum produto encontrado para este admin</div>
              )}
            </div>
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
