
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MonthlyGoal } from '@/types/goals';
import { useProducts } from '@/hooks/useProducts';

interface EditMonthlyGoalDialogProps {
  goal: MonthlyGoal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (goalId: string, updates: Partial<MonthlyGoal>) => Promise<void>;
}

const EditMonthlyGoalDialog: React.FC<EditMonthlyGoalDialogProps> = ({
  goal,
  open,
  onOpenChange,
  onSave
}) => {
  const { products } = useProducts();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    goal_type: 'meta' as 'meta' | 'supermeta',
    target_type: 'financial' as 'financial' | 'quantity',
    financial_category: 'faturamento' as 'faturamento' | 'receita',
    currency: 'BRL' as 'BRL' | 'USD',
    target_value: 0,
    product_id: ''
  });

  useEffect(() => {
    if (goal && open) {
      setFormData({
        goal_type: goal.goal_type,
        target_type: goal.target_type,
        financial_category: goal.financial_category || 'faturamento',
        currency: goal.currency || 'BRL',
        target_value: goal.target_value,
        product_id: goal.product_id || ''
      });
    }
  }, [goal, open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!goal) return;

    setIsSubmitting(true);
    try {
      await onSave(goal.id, {
        goal_type: formData.goal_type,
        target_type: formData.target_type,
        financial_category: formData.target_type === 'financial' ? formData.financial_category : undefined,
        currency: formData.target_type === 'financial' ? formData.currency : undefined,
        target_value: formData.target_value,
        product_id: formData.product_id || undefined
      });
      onOpenChange(false);
    } catch (error) {
      console.error('Erro ao salvar meta:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatGoalType = (type: string) => {
    return type === 'meta' ? 'Meta' : 'Super Meta';
  };

  const formatTargetType = (type: string, financialCategory?: string) => {
    if (type === 'financial' && financialCategory) {
      return financialCategory === 'faturamento' ? 'Faturamento' : 'Receita';
    }
    return type === 'financial' ? 'Financeiro' : 'Quantidade';
  };

  const getCurrencyIcon = (currency: string = 'BRL') => {
    return currency === 'USD' ? '$' : 'R$';
  };

  if (!goal) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Editar Meta - {formatGoalType(goal.goal_type)}
            {goal.product && ` (${goal.product.name})`}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Tipo de Meta</Label>
              <Select 
                value={formData.goal_type} 
                onValueChange={(value: 'meta' | 'supermeta') => {
                  setFormData(prev => ({ ...prev, goal_type: value }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="meta">Meta</SelectItem>
                  <SelectItem value="supermeta">Super Meta</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Tipo de Alvo</Label>
              <Select 
                value={formData.target_type} 
                onValueChange={(value: 'financial' | 'quantity') => {
                  setFormData(prev => ({ ...prev, target_type: value }));
                }}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="financial">Financeiro</SelectItem>
                  <SelectItem value="quantity">Quantidade</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {formData.target_type === 'financial' && (
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>Categoria Financeira</Label>
                <Select 
                  value={formData.financial_category} 
                  onValueChange={(value: 'faturamento' | 'receita') => {
                    setFormData(prev => ({ ...prev, financial_category: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="faturamento">Faturamento</SelectItem>
                    <SelectItem value="receita">Receita</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Moeda</Label>
                <Select 
                  value={formData.currency} 
                  onValueChange={(value: 'BRL' | 'USD') => {
                    setFormData(prev => ({ ...prev, currency: value }));
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="BRL">Real Brasileiro (R$)</SelectItem>
                    <SelectItem value="USD">Dólar Americano ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div>
            <Label>Produto (opcional)</Label>
            <Select 
              value={formData.product_id || 'general'} 
              onValueChange={(value) => {
                setFormData(prev => ({ 
                  ...prev, 
                  product_id: value === 'general' ? '' : value 
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">Meta Geral</SelectItem>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>
              Valor da Meta {formData.target_type === 'financial' 
                ? `(${getCurrencyIcon(formData.currency)})` 
                : '(Quantidade)'
              }
            </Label>
            <Input
              type="number"
              value={formData.target_value}
              onChange={(e) => {
                const value = parseFloat(e.target.value) || 0;
                setFormData(prev => ({ 
                  ...prev, 
                  target_value: value
                }));
              }}
              placeholder={formData.target_type === 'financial' ? '0,00' : '0'}
              min="0"
              step={formData.target_type === 'financial' ? '0.01' : '1'}
              required
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting || formData.target_value <= 0}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Alterações'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditMonthlyGoalDialog;
