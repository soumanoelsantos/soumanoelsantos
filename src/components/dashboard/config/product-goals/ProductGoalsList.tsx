
import React from 'react';
import { Edit, Trash2, Target, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ProductGoal } from '@/hooks/useProductGoals';

interface ProductGoalsListProps {
  goals: ProductGoal[];
  onEditGoal: (goal: ProductGoal) => void;
  onDeleteGoal: (goalId: string) => void;
  onToggleStatus: (goalId: string, isActive: boolean) => void;
}

export const ProductGoalsList: React.FC<ProductGoalsListProps> = ({
  goals,
  onEditGoal,
  onDeleteGoal,
  onToggleStatus
}) => {
  const formatCurrency = (value: number, currency: 'BRL' | 'USD') => {
    const symbol = currency === 'BRL' ? 'R$' : '$';
    return `${symbol} ${value.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  if (goals.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Target className="mx-auto h-12 w-12 text-gray-300 mb-4" />
        <p>Nenhuma meta criada</p>
        <p className="text-sm">Selecione um produto e configure suas metas</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h4 className="font-medium">Metas Criadas</h4>
      <div className="space-y-3">
        {goals.map((goal) => (
          <div key={goal.id} className="p-4 border rounded-lg bg-gray-50">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h5 className="font-medium">{goal.product?.name || 'Produto não encontrado'}</h5>
                <Badge variant={goal.is_active ? "default" : "secondary"} className="text-xs">
                  {goal.is_active ? "Ativa" : "Inativa"}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onToggleStatus(goal.id, !goal.is_active)}
                  size="sm"
                  variant="outline"
                  title={goal.is_active ? "Desativar meta" : "Ativar meta"}
                >
                  {goal.is_active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button
                  onClick={() => onEditGoal(goal)}
                  size="sm"
                  variant="outline"
                  title="Editar meta"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => onDeleteGoal(goal.id)}
                  size="sm"
                  variant="destructive"
                  title="Excluir meta"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Quantidade:</span>
                <div className="font-medium">{goal.quantity_goal} unidades</div>
              </div>
              <div>
                <span className="text-gray-600">Receita:</span>
                <div className="font-medium">{formatCurrency(goal.revenue_goal, goal.currency)}</div>
              </div>
              <div>
                <span className="text-gray-600">Faturamento:</span>
                <div className="font-medium">{formatCurrency(goal.billing_goal, goal.currency)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
