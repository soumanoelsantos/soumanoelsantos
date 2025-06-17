
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, DollarSign, TrendingUp } from 'lucide-react';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';
import { DashboardConfig } from '@/types/dashboardConfig';

interface SpecificGoalsCardsProps {
  config: DashboardConfig;
}

const SpecificGoalsCards: React.FC<SpecificGoalsCardsProps> = ({ config }) => {
  const currentDate = new Date();
  const { goals, isLoading } = useMonthlyGoals(currentDate.getMonth() + 1, currentDate.getFullYear());

  if (!config.showSpecificGoals || config.selectedGoalIds.length === 0) {
    return null;
  }

  const selectedGoals = goals.filter(goal => config.selectedGoalIds.includes(goal.id));

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const formatGoalType = (type: string) => {
    return type === 'meta' ? 'Meta' : 'Super Meta';
  };

  const getProgressPercentage = (current: number, target: number) => {
    return target > 0 ? Math.round((current / target) * 100) : 0;
  };

  const getIcon = (goalType: string) => {
    return goalType === 'supermeta' ? TrendingUp : Target;
  };

  const getColor = (goalType: string) => {
    return goalType === 'supermeta' ? 'text-purple-600' : 'text-blue-600';
  };

  if (isLoading || selectedGoals.length === 0) {
    return null;
  }

  return (
    <>
      {selectedGoals.map((goal) => {
        const Icon = getIcon(goal.goal_type);
        const iconColor = getColor(goal.goal_type);
        const progress = getProgressPercentage(goal.current_value, goal.target_value);

        return (
          <Card key={goal.id} className="h-40 flex flex-col">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 flex-shrink-0">
              <CardTitle className="text-xs font-medium text-gray-600">
                {formatGoalType(goal.goal_type)}
                {goal.product && ` - ${goal.product.name}`}
              </CardTitle>
              <Icon className={`h-3 w-3 ${iconColor} flex-shrink-0`} />
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-between p-3">
              <div className="text-lg font-bold">
                {goal.target_type === 'financial' 
                  ? formatCurrency(goal.current_value)
                  : `${goal.current_value} unidades`
                }
              </div>
              <div className="mt-auto">
                <p className="text-xs text-gray-600 mt-1">
                  Meta: {goal.target_type === 'financial' 
                    ? formatCurrency(goal.target_value)
                    : `${goal.target_value} unidades`
                  }
                </p>
                <div className="text-xs text-gray-500 mt-2">
                  Progresso: {progress}%
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                  <div 
                    className={`h-1 rounded-full ${goal.goal_type === 'supermeta' ? 'bg-purple-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min(progress, 100)}%` }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </>
  );
};

export default SpecificGoalsCards;
