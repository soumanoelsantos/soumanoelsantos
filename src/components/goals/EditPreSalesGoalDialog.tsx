
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { PreSalesGoal } from '@/types/preSalesGoals';
import { useSellers } from '@/hooks/useSellers';

interface EditPreSalesGoalDialogProps {
  goal: PreSalesGoal | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (data: Partial<PreSalesGoal>) => Promise<void>;
}

interface GoalFormData {
  target_value: number;
  seller_id?: string;
}

const EditPreSalesGoalDialog: React.FC<EditPreSalesGoalDialogProps> = ({
  goal,
  open,
  onOpenChange,
  onSave
}) => {
  const { sellers } = useSellers();
  const { register, handleSubmit, reset, setValue, watch, formState: { isSubmitting } } = useForm<GoalFormData>();

  const selectedSellerId = watch('seller_id');

  React.useEffect(() => {
    if (goal && open) {
      reset({
        target_value: goal.target_value,
        seller_id: goal.seller_id || '',
      });
    }
  }, [goal, open, reset]);

  const onSubmit = async (data: GoalFormData) => {
    if (!goal) return;
    
    await onSave({
      id: goal.id,
      target_value: data.target_value,
      seller_id: data.seller_id === '' ? undefined : data.seller_id,
    });
    
    onOpenChange(false);
  };

  if (!goal) return null;

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  const formatValue = (value: number, unit: string) => {
    if (unit === 'percentage' || unit === '%') {
      return `${value}%`;
    }
    return `${value} ${unit}`;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            Editar Meta - {goal.goal_type?.name}
          </DialogTitle>
          <p className="text-sm text-gray-600">
            {monthNames[goal.month - 1]} {goal.year}
          </p>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {goal.goal_type?.target_scope === 'individual' && (
            <div className="space-y-2">
              <Label htmlFor="seller_id">SDR</Label>
              <Select 
                value={selectedSellerId || ''} 
                onValueChange={(value) => setValue('seller_id', value === '' ? undefined : value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o SDR" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Meta da Empresa</SelectItem>
                  {sellers
                    .filter(s => s.seller_type === 'sdr')
                    .map((seller) => (
                      <SelectItem key={seller.id} value={seller.id}>
                        {seller.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="target_value">
              Valor da Meta ({goal.goal_type?.unit})
            </Label>
            <Input
              id="target_value"
              type="number"
              min="0"
              step="1"
              {...register('target_value', { 
                required: true,
                valueAsNumber: true,
                min: 0 
              })}
              placeholder="0"
            />
            <p className="text-xs text-gray-500">
              Valor atual: {formatValue(goal.current_value, goal.goal_type?.unit || '')}
            </p>
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

export default EditPreSalesGoalDialog;
