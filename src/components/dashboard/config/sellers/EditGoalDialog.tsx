
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import { SellerMonthlyGoal } from '@/types/sellers';

interface EditGoalDialogProps {
  goal: SellerMonthlyGoal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Partial<SellerMonthlyGoal>) => Promise<void>;
}

interface GoalFormData {
  sales_goal: number;
  revenue_goal: number;
  billing_goal: number;
}

const EditGoalDialog: React.FC<EditGoalDialogProps> = ({
  goal,
  open,
  onOpenChange,
  onSave
}) => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<GoalFormData>();

  React.useEffect(() => {
    if (goal && open) {
      reset({
        sales_goal: goal.sales_goal,
        revenue_goal: goal.revenue_goal,
        billing_goal: goal.billing_goal,
      });
    }
  }, [goal, open, reset]);

  const onSubmit = async (data: GoalFormData) => {
    if (!goal) return;
    
    await onSave({
      id: goal.id,
      sales_goal: data.sales_goal,
      revenue_goal: data.revenue_goal,
      billing_goal: data.billing_goal,
    });
    
    onOpenChange(false);
  };

  if (!goal) return null;

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Editar Meta - {monthNames[goal.month - 1]} {goal.year}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sales_goal">Meta de Vendas</Label>
            <Input
              id="sales_goal"
              type="number"
              min="0"
              {...register('sales_goal', { 
                required: true,
                valueAsNumber: true,
                min: 0 
              })}
              placeholder="Quantidade de vendas"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="revenue_goal">Meta de Receita (R$)</Label>
            <Input
              id="revenue_goal"
              type="number"
              step="0.01"
              min="0"
              {...register('revenue_goal', { 
                required: true,
                valueAsNumber: true,
                min: 0 
              })}
              placeholder="0,00"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="billing_goal">Meta de Faturamento (R$)</Label>
            <Input
              id="billing_goal"
              type="number"
              step="0.01"
              min="0"
              {...register('billing_goal', { 
                required: true,
                valueAsNumber: true,
                min: 0 
              })}
              placeholder="0,00"
            />
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditGoalDialog;
