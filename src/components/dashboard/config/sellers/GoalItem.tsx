
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { SellerMonthlyGoal } from '@/types/sellers';

interface GoalItemProps {
  goal: SellerMonthlyGoal;
  onEdit: (goal: SellerMonthlyGoal) => void;
  onDelete: (goalId: string) => void;
}

const monthNames = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

export const GoalItem: React.FC<GoalItemProps> = ({ goal, onEdit, onDelete }) => {
  const handleDelete = () => {
    if (confirm('Tem certeza que deseja excluir esta meta?')) {
      onDelete(goal.id);
    }
  };

  return (
    <div className="border rounded-lg p-4 flex items-center justify-between">
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
          onClick={() => onEdit(goal)}
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="destructive"
          size="sm"
          onClick={handleDelete}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
