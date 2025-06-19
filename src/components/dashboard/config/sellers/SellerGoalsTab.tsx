
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Target, Trash2 } from 'lucide-react';
import { useSellerGoals } from '@/hooks/useSellerGoals';
import { useForm } from 'react-hook-form';

interface SellerGoalsTabProps {
  sellerId: string;
}

interface GoalFormData {
  month: number;
  year: number;
  sales_goal: number;
  revenue_goal: number;
  billing_goal: number;
}

export const SellerGoalsTab: React.FC<SellerGoalsTabProps> = ({ sellerId }) => {
  const { goals, isLoading, createOrUpdateGoal, deleteGoal } = useSellerGoals(sellerId);
  const [showForm, setShowForm] = useState(false);
  const { register, handleSubmit, setValue, watch, reset, formState: { isSubmitting } } = useForm<GoalFormData>({
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      sales_goal: 0,
      revenue_goal: 0,
      billing_goal: 0,
    }
  });

  const month = watch('month');
  const year = watch('year');

  const onSubmit = async (data: GoalFormData) => {
    const success = await createOrUpdateGoal(data);
    if (success) {
      reset();
      setShowForm(false);
    }
  };

  const months = [
    { value: 1, label: 'Janeiro' },
    { value: 2, label: 'Fevereiro' },
    { value: 3, label: 'Março' },
    { value: 4, label: 'Abril' },
    { value: 5, label: 'Maio' },
    { value: 6, label: 'Junho' },
    { value: 7, label: 'Julho' },
    { value: 8, label: 'Agosto' },
    { value: 9, label: 'Setembro' },
    { value: 10, label: 'Outubro' },
    { value: 11, label: 'Novembro' },
    { value: 12, label: 'Dezembro' },
  ];

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  if (isLoading) {
    return <div className="text-center py-4">Carregando metas...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h4 className="font-medium text-sm text-gray-700">Metas Mensais</h4>
        <Button size="sm" onClick={() => setShowForm(!showForm)}>
          <Plus className="h-4 w-4 mr-1" />
          Nova Meta
        </Button>
      </div>

      {showForm && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-base">
              <Target className="h-4 w-4" />
              Definir Meta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mês</Label>
                  <Select
                    value={month?.toString()}
                    onValueChange={(value) => setValue('month', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {months.map((m) => (
                        <SelectItem key={m.value} value={m.value.toString()}>
                          {m.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Ano</Label>
                  <Input
                    type="number"
                    {...register('year', { valueAsNumber: true })}
                    min="2020"
                    max="2030"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>Meta de Vendas</Label>
                  <Input
                    type="number"
                    {...register('sales_goal', { valueAsNumber: true })}
                    min="0"
                    placeholder="Quantidade"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meta de Receita (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register('revenue_goal', { valueAsNumber: true })}
                    min="0"
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Meta de Faturamento (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    {...register('billing_goal', { valueAsNumber: true })}
                    min="0"
                    placeholder="0,00"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowForm(false)}
                  disabled={isSubmitting}
                >
                  Cancelar
                </Button>
                <Button type="submit" disabled={isSubmitting}>
                  {isSubmitting ? 'Salvando...' : 'Salvar Meta'}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {goals.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Target className="h-12 w-12 mx-auto mb-4 text-gray-300" />
          <p>Nenhuma meta definida</p>
          <p className="text-sm">Clique em "Nova Meta" para começar</p>
        </div>
      ) : (
        <div className="space-y-3">
          {goals.map((goal) => (
            <Card key={goal.id}>
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h5 className="font-medium mb-2">
                      {months.find(m => m.value === goal.month)?.label} {goal.year}
                    </h5>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Vendas:</span>
                        <p className="font-medium">{goal.sales_goal}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Receita:</span>
                        <p className="font-medium">{formatCurrency(goal.revenue_goal)}</p>
                      </div>
                      <div>
                        <span className="text-gray-500">Faturamento:</span>
                        <p className="font-medium">{formatCurrency(goal.billing_goal)}</p>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteGoal(goal.id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
