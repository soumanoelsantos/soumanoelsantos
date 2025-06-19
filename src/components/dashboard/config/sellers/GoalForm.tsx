
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus } from 'lucide-react';
import { useForm } from 'react-hook-form';

interface GoalFormData {
  month: number;
  year: number;
  sales_goal: number;
  revenue_goal: number;
  billing_goal: number;
}

interface GoalFormProps {
  onSubmit: (data: GoalFormData) => Promise<void>;
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const GoalForm: React.FC<GoalFormProps> = ({ onSubmit }) => {
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<GoalFormData>({
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      sales_goal: 0,
      revenue_goal: 0,
      billing_goal: 0,
    }
  });

  const handleFormSubmit = async (data: GoalFormData) => {
    await onSubmit(data);
    reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Nova Meta Mensal
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="month">Mês</Label>
              <select
                id="month"
                {...register('month', { required: true, valueAsNumber: true })}
                className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm"
              >
                {monthNames.map((name, index) => (
                  <option key={index + 1} value={index + 1}>
                    {name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year">Ano</Label>
              <Input
                id="year"
                type="number"
                min="2020"
                max="2030"
                {...register('year', { required: true, valueAsNumber: true })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sales_goal">Meta de Vendas</Label>
              <Input
                id="sales_goal"
                type="number"
                min="0"
                {...register('sales_goal', { required: true, valueAsNumber: true })}
                placeholder="Quantidade"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="revenue_goal">Meta de Receita (R$)</Label>
              <Input
                id="revenue_goal"
                type="number"
                step="0.01"
                min="0"
                {...register('revenue_goal', { required: true, valueAsNumber: true })}
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
                {...register('billing_goal', { required: true, valueAsNumber: true })}
                placeholder="0,00"
              />
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Adicionar Meta'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
