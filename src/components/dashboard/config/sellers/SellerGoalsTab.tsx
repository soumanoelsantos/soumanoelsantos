
import React, { useState } from 'react';
import { useSellerGoals } from '@/hooks/useSellerGoals';
import { SellerMonthlyGoal } from '@/types/sellers';
import { GoalForm } from './GoalForm';
import { GoalsList } from './GoalsList';
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
  const [editingGoal, setEditingGoal] = useState<SellerMonthlyGoal | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const handleFormSubmit = async (data: GoalFormData) => {
    await addGoal({
      seller_id: sellerId,
      month: data.month,
      year: data.year,
      sales_goal: data.sales_goal,
      revenue_goal: data.revenue_goal,
      billing_goal: data.billing_goal,
    });
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
    await deleteGoal(goalId);
  };

  if (isLoading) {
    return <div>Carregando metas...</div>;
  }

  return (
    <>
      <div className="space-y-6">
        <GoalForm onSubmit={handleFormSubmit} />
        <GoalsList 
          goals={goals}
          onEditGoal={handleEditGoal}
          onDeleteGoal={handleDeleteGoal}
        />
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
