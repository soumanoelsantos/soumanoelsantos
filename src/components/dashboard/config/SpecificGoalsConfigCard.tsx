
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { DashboardConfig } from '@/types/dashboardConfig';
import { useMonthlyGoals } from '@/hooks/useMonthlyGoals';

interface SpecificGoalsConfigCardProps {
  config: DashboardConfig;
  onConfigChange: (key: string, value: boolean | string[]) => void;
}

const SpecificGoalsConfigCard: React.FC<SpecificGoalsConfigCardProps> = ({ 
  config, 
  onConfigChange 
}) => {
  const currentDate = new Date();
  const { goals, isLoading } = useMonthlyGoals(currentDate.getMonth() + 1, currentDate.getFullYear());

  const handleGoalToggle = (goalId: string, checked: boolean) => {
    const updatedGoalIds = checked
      ? [...config.selectedGoalIds, goalId]
      : config.selectedGoalIds.filter(id => id !== goalId);
    
    onConfigChange('selectedGoalIds', updatedGoalIds);
  };

  const formatGoalType = (type: string) => {
    return type === 'meta' ? 'Meta' : 'Super Meta';
  };

  const formatTargetType = (type: string) => {
    return type === 'financial' ? 'Financeiro' : 'Quantidade';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Metas Específicas</CardTitle>
        <CardDescription>
          Escolha quais metas específicas aparecerão no dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="showSpecificGoals"
            checked={config.showSpecificGoals}
            onCheckedChange={(checked) => onConfigChange('showSpecificGoals', checked)}
          />
          <Label htmlFor="showSpecificGoals">Exibir Metas Específicas</Label>
        </div>

        {config.showSpecificGoals && (
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-sm text-gray-500">Carregando metas...</p>
            ) : goals.length === 0 ? (
              <p className="text-sm text-gray-500">
                Nenhuma meta encontrada para o mês atual. 
                <a href="/dashboard/metas" className="text-blue-600 hover:underline ml-1">
                  Criar metas
                </a>
              </p>
            ) : (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Selecione as metas:</Label>
                {goals.map((goal) => (
                  <div key={goal.id} className="flex items-start space-x-2 p-2 border rounded-lg">
                    <Checkbox
                      id={goal.id}
                      checked={config.selectedGoalIds.includes(goal.id)}
                      onCheckedChange={(checked) => handleGoalToggle(goal.id, checked as boolean)}
                    />
                    <div className="flex-1">
                      <Label htmlFor={goal.id} className="text-sm cursor-pointer">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{formatGoalType(goal.goal_type)}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600">{formatTargetType(goal.target_type)}</span>
                          {goal.product && (
                            <>
                              <span className="text-gray-500">•</span>
                              <span className="text-blue-600">{goal.product.name}</span>
                            </>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">
                          Valor: {goal.target_type === 'financial' 
                            ? formatCurrency(goal.target_value)
                            : `${goal.target_value} unidades`
                          }
                        </div>
                      </Label>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpecificGoalsConfigCard;
