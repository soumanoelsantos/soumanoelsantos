
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
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
  const [formData, setFormData] = useState<IndividualSaleFormData>({
    revenue_amount: 0,
    billing_amount: 0,
  });

  console.log('🔍 [DEBUG] IndividualSaleForm - sellerId:', sellerId);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const success = await onSubmit(formData);
      
      if (success) {
        setFormData({
          revenue_amount: 0,
          billing_amount: 0,
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
