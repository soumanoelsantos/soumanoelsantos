
import React from 'react';
import { Edit, Trash2, Target } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface ProductGoal {
  id: string;
  productId: string;
  productName: string;
  quantityGoal: number;
  revenueGoal: number;
  billingGoal: number;
  currency: 'BRL' | 'USD';
  isActive: boolean;
}

interface ProductGoalsListProps {
  goals: ProductGoal[];
  onEditGoal: (goal: ProductGoal) => void;
  onDeleteGoal: (goalId: string) => void;
}

export const ProductGoalsList: React.FC<ProductGoalsListProps> = ({
  goals,
  onEditGoal,
  onDeleteGoal
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
                <h5 className="font-medium">{goal.productName}</h5>
                <Badge variant={goal.isActive ? "default" : "secondary"} className="text-xs">
                  {goal.isActive ? "Ativa" : "Inativa"}
                </Badge>
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => onEditGoal(goal)}
                  size="sm"
                  variant="outline"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => onDeleteGoal(goal.id)}
                  size="sm"
                  variant="destructive"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Quantidade:</span>
                <div className="font-medium">{goal.quantityGoal} unidades</div>
              </div>
              <div>
                <span className="text-gray-600">Receita:</span>
                <div className="font-medium">{formatCurrency(goal.revenueGoal, goal.currency)}</div>
              </div>
              <div>
                <span className="text-gray-600">Faturamento:</span>
                <div className="font-medium">{formatCurrency(goal.billingGoal, goal.currency)}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
