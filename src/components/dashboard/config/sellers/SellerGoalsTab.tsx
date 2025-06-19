
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useSellerGoals } from '@/hooks/useSellerGoals';
import { useToast } from '@/components/ui/use-toast';
import { SellerMonthlyGoal } from '@/types/sellers';
import EditGoalDialog from './EditGoalDialog';

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
  const { goals, addGoal, updateGoal, deleteGoal, isLoading } = useSellerGoals(sellerId);
  const { toast } = useToast();
  const [editingGoal, setEditingGoal] = useState<SellerMonthlyGoal | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm<GoalFormData>({
    defaultValues: {
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      sales_goal: 0,
      revenue_goal: 0,
      billing_goal: 0,
    }
  });

  const onSubmit = async (data: GoalFormData) => {
    const success = await addGoal({
      seller_id: sellerId,
      month: data.month,
      year: data.year,
      sales_goal: data.sales_goal,
      revenue_goal: data.revenue_goal,
      billing_goal: data.billing_goal,
    });

    if (success) {
      reset();
    }
  };

  const handleEditGoal = (goal: SellerMonthlyGoal) => {
    setEditingGoal(goal);
    setIsEditDialogOpen(true);
  };

  const handleSaveEdit = async (data: Partial<SellerMonthlyGoal>) => {
    if (!editingGoal) return;
    
    const success = await updateGoal(editingGoal.id, data);
    if (success) {
      setEditingGoal(null);
    }
  };

  const handleDeleteGoal = async (goalId: string) => {
    if (confirm('Tem certeza que deseja excluir esta meta?')) {
      await deleteGoal(goalId);
    }
  };

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  if (isLoading) {
    return <div>Carregando metas...</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Nova Meta Mensal
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
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

        <Card>
          <CardHeader>
            <CardTitle>Metas Cadastradas</CardTitle>
          </CardHeader>
          <CardContent>
            {goals.length === 0 ? (
              <p className="text-gray-500 text-center py-4">
                Nenhuma meta cadastrada ainda.
              </p>
            ) : (
              <div className="space-y-4">
                {goals.map((goal) => (
                  <div
                    key={goal.id}
                    className="border rounded-lg p-4 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {monthNames[goal.month - 1]} {goal.year}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Vendas:</span> {goal.sales_goal}
                        </div>
                        <div>
                          <span className="font-medium">Receita:</span> R$ {goal.revenue_goal?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div>
                          <span className="font-medium">Faturamento:</span> R$ {goal.billing_goal?.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEditGoal(goal)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDeleteGoal(goal.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <EditGoalDialog
        goal={editingGoal}
        open={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        onSave={handleSaveEdit}
      />
    </>
  );
};
