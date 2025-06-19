
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SellerMonthlyGoal } from '@/types/sellers';
import { GoalItem } from './GoalItem';

interface GoalsListProps {
  goals: SellerMonthlyGoal[];
  onEditGoal: (goal: SellerMonthlyGoal) => void;
  onDeleteGoal: (goalId: string) => void;
}

export const GoalsList: React.FC<GoalsListProps> = ({ goals, onEditGoal, onDeleteGoal }) => {
  return (
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
              <GoalItem
                key={goal.id}
                goal={goal}
                onEdit={onEditGoal}
                onDelete={onDeleteGoal}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
