
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
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

  const formatCurrency = (value: number, currency: string = 'BRL') => {
    if (currency === 'USD') {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(value);
    }
    
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
          Configure e escolha quais metas específicas aparecerão no dashboard
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          <Switch
            id="showSpecificGoals"
            checked={config.showSpecificGoals}
            onCheckedChange={(checked) => onConfigChange('showSpecificGoals', checked)}
          />
          <Label htmlFor="showSpecificGoals">Exibir Metas Específicas no Dashboard</Label>
        </div>

        {/* Botão para gerenciar metas */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="font-medium">Gerenciar Metas</h4>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => window.open('/dashboard/metas', '_blank')}
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Criar/Editar Metas
            </Button>
          </div>
          <p className="text-sm text-gray-600 mb-4">
            Clique no botão acima para criar novas metas ou editar as existentes
          </p>
        </div>

        {config.showSpecificGoals && (
          <div className="space-y-3">
            {isLoading ? (
              <p className="text-sm text-gray-500">Carregando metas...</p>
            ) : goals.length === 0 ? (
              <div className="text-center py-6 border-2 border-dashed border-gray-300 rounded-lg">
                <p className="text-sm text-gray-500 mb-2">
                  Nenhuma meta encontrada para o mês atual
                </p>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => window.open('/dashboard/metas', '_blank')}
                >
                  Criar Primeira Meta
                </Button>
              </div>
            ) : (
              <div className="space-y-2">
                <Label className="text-sm font-medium">Selecione as metas para exibir:</Label>
                <div className="max-h-60 overflow-y-auto space-y-2">
                  {goals.map((goal) => (
                    <div key={goal.id} className="flex items-start space-x-2 p-3 border rounded-lg bg-gray-50">
                      <Checkbox
                        id={goal.id}
                        checked={config.selectedGoalIds.includes(goal.id)}
                        onCheckedChange={(checked) => handleGoalToggle(goal.id, checked as boolean)}
                      />
                      <div className="flex-1 min-w-0">
                        <Label htmlFor={goal.id} className="text-sm cursor-pointer">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="font-medium">{formatGoalType(goal.goal_type)}</span>
                            <span className="text-gray-500">•</span>
                            <span className="text-gray-600">{formatTargetType(goal.target_type)}</span>
                            {goal.product && (
                              <>
                                <span className="text-gray-500">•</span>
                                <span className="text-blue-600 font-medium">{goal.product.name}</span>
                              </>
                            )}
                            {goal.currency && goal.target_type === 'financial' && (
                              <>
                                <span className="text-gray-500">•</span>
                                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                                  {goal.currency}
                                </span>
                              </>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 mt-1">
                            Valor: {goal.target_type === 'financial' 
                              ? formatCurrency(goal.target_value, goal.currency)
                              : `${goal.target_value} unidades`
                            }
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Progresso: {goal.target_type === 'financial' 
                              ? formatCurrency(goal.current_value, goal.currency)
                              : `${goal.current_value} unidades`
                            } / {goal.target_type === 'financial' 
                              ? formatCurrency(goal.target_value, goal.currency)
                              : `${goal.target_value} unidades`
                            }
                          </div>
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SpecificGoalsConfigCard;
