
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ProductGoalMetricsProps {
  quantityGoal: number;
  quantitySold: number;
  revenueGoal: number;
  revenueAchieved: number;
  billingGoal: number;
  billingAchieved: number;
  onUpdateField: (field: string, value: number) => void;
}

export const ProductGoalMetrics: React.FC<ProductGoalMetricsProps> = ({
  quantityGoal,
  quantitySold,
  revenueGoal,
  revenueAchieved,
  billingGoal,
  billingAchieved,
  onUpdateField
}) => {
  const getProgressPercentage = (achieved: number, goal: number) => {
    if (goal === 0) return 0;
    return Math.min((achieved / goal) * 100, 100);
  };

  const isGoalCompleted = (achieved: number, goal: number) => {
    return achieved >= goal && goal > 0;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Meta de Quantidade */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h4 className="font-medium">Meta de Quantidade</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Meta Total</Label>
            <Input
              type="number"
              min="0"
              value={quantityGoal}
              onChange={(e) => onUpdateField('quantityGoal', parseInt(e.target.value) || 0)}
              placeholder="Ex: 100"
            />
          </div>
          <div className="space-y-2">
            <Label>Vendido</Label>
            <Input
              type="number"
              min="0"
              max={quantityGoal}
              value={quantitySold}
              onChange={(e) => onUpdateField('quantitySold', parseInt(e.target.value) || 0)}
              placeholder="Ex: 25"
            />
          </div>
        </div>
        {quantityGoal > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso:</span>
              <span>{getProgressPercentage(quantitySold, quantityGoal).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${isGoalCompleted(quantitySold, quantityGoal) ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${getProgressPercentage(quantitySold, quantityGoal)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Meta de Receita */}
      <div className="space-y-4 p-4 border rounded-lg">
        <h4 className="font-medium">Meta de Receita</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Meta Total (R$)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={revenueGoal}
              onChange={(e) => onUpdateField('revenueGoal', parseFloat(e.target.value) || 0)}
              placeholder="Ex: 50000.00"
            />
          </div>
          <div className="space-y-2">
            <Label>Conquistado (R$)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              max={revenueGoal}
              value={revenueAchieved}
              onChange={(e) => onUpdateField('revenueAchieved', parseFloat(e.target.value) || 0)}
              placeholder="Ex: 12500.00"
            />
          </div>
        </div>
        {revenueGoal > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso:</span>
              <span>{getProgressPercentage(revenueAchieved, revenueGoal).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${isGoalCompleted(revenueAchieved, revenueGoal) ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${getProgressPercentage(revenueAchieved, revenueGoal)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Meta de Faturamento */}
      <div className="space-y-4 p-4 border rounded-lg md:col-span-2">
        <h4 className="font-medium">Meta de Faturamento</h4>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Meta Total (R$)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              value={billingGoal}
              onChange={(e) => onUpdateField('billingGoal', parseFloat(e.target.value) || 0)}
              placeholder="Ex: 150000.00"
            />
          </div>
          <div className="space-y-2">
            <Label>Faturado (R$)</Label>
            <Input
              type="number"
              min="0"
              step="0.01"
              max={billingGoal}
              value={billingAchieved}
              onChange={(e) => onUpdateField('billingAchieved', parseFloat(e.target.value) || 0)}
              placeholder="Ex: 37500.00"
            />
          </div>
        </div>
        {billingGoal > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Progresso:</span>
              <span>{getProgressPercentage(billingAchieved, billingGoal).toFixed(1)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className={`h-2 rounded-full ${isGoalCompleted(billingAchieved, billingGoal) ? 'bg-green-500' : 'bg-blue-500'}`}
                style={{ width: `${getProgressPercentage(billingAchieved, billingGoal)}%` }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
