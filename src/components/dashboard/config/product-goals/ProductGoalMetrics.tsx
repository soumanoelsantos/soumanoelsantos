
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ProductGoalMetricsProps {
  quantityGoal: number;
  revenueGoal: number;
  billingGoal: number;
  currency: 'BRL' | 'USD';
  onUpdateField: (field: string, value: number | string) => void;
}

export const ProductGoalMetrics: React.FC<ProductGoalMetricsProps> = ({
  quantityGoal,
  revenueGoal,
  billingGoal,
  currency,
  onUpdateField
}) => {
  const currencySymbol = currency === 'BRL' ? 'R$' : '$';

  return (
    <div className="space-y-6">
      {/* Seletor de Moeda */}
      <div className="space-y-2">
        <Label>Moeda</Label>
        <Select value={currency} onValueChange={(value) => onUpdateField('currency', value)}>
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="BRL">Real (R$)</SelectItem>
            <SelectItem value="USD">Dólar ($)</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Meta de Quantidade */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Meta de Quantidade</h4>
          <div className="space-y-2">
            <Label>Meta Total</Label>
            <Input
              type="number"
              min="0"
              value={quantityGoal}
              onChange={(e) => onUpdateField('quantityGoal', parseInt(e.target.value) || 0)}
              placeholder="Ex: 100"
            />
          </div>
        </div>

        {/* Meta de Receita */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Meta de Receita</h4>
          <div className="space-y-2">
            <Label>Meta Total ({currencySymbol})</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={revenueGoal}
              onChange={(e) => onUpdateField('revenueGoal', parseFloat(e.target.value) || 0)}
              placeholder="Ex: 50000.00"
            />
          </div>
        </div>

        {/* Meta de Faturamento */}
        <div className="space-y-4 p-4 border rounded-lg">
          <h4 className="font-medium">Meta de Faturamento</h4>
          <div className="space-y-2">
            <Label>Meta Total ({currencySymbol})</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={billingGoal}
              onChange={(e) => onUpdateField('billingGoal', parseFloat(e.target.value) || 0)}
              placeholder="Ex: 150000.00"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
