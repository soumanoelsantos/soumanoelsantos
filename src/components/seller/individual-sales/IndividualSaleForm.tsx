
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useProducts } from '@/hooks/useProducts';
import { IndividualSaleFormData } from '@/types/individualSales';

interface IndividualSaleFormProps {
  onSubmit: (data: IndividualSaleFormData) => Promise<boolean>;
  onCancel: () => void;
  isSubmitting: boolean;
}

const IndividualSaleForm: React.FC<IndividualSaleFormProps> = ({
  onSubmit,
  onCancel,
  isSubmitting
}) => {
  const { products } = useProducts();
  const [formData, setFormData] = useState<IndividualSaleFormData>({
    client_name: '',
    revenue_amount: 0,
    billing_amount: 0,
    product_id: null,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.client_name.trim()) {
      return;
    }

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
              onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
              placeholder="Digite o nome do cliente"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product_id">Produto</Label>
            <Select
              value={formData.product_id || ""}
              onValueChange={(value) => setFormData(prev => ({ ...prev, product_id: value || null }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione um produto ou deixe em branco para venda geral" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Venda Geral (sem produto específico)</SelectItem>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                onChange={(e) => setFormData(prev => ({ ...prev, revenue_amount: Number(e.target.value) }))}
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
                onChange={(e) => setFormData(prev => ({ ...prev, billing_amount: Number(e.target.value) }))}
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
