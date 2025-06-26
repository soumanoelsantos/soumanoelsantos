
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { usePreSalesGoals } from '@/hooks/usePreSalesGoals';
import { usePreSalesData } from '@/hooks/usePreSalesData';

interface PreSalesGoalsIndicatorsProps {
  sharedUserId?: string;
}

const PreSalesGoalsIndicators: React.FC<PreSalesGoalsIndicatorsProps> = ({ sharedUserId }) => {
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  
  const { preSalesGoals, isLoading: goalsLoading } = usePreSalesGoals(currentMonth, currentYear);
  const { data: preSalesData, isLoading: dataLoading } = usePreSalesData(sharedUserId);

  if (goalsLoading || dataLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-16 bg-gray-200 rounded"></div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!preSalesData || preSalesGoals.length === 0) {
    return null;
  }

  // Calcular valores atuais baseados nos dados atualizados
  const currentValues = {
    tentativas: preSalesData.monthlyCallsAverage, // Média diária do mês
    agendamentos: preSalesData.monthlySchedulingsAverage, // Média diária do mês
    noShow: preSalesData.monthlyNoShowRate, // Taxa mensal em %
    reagendamentos: 0 // Precisaria ser calculado dos dados reais
  };

  // Filtrar metas individuais (excluir metas da empresa)
  const individualGoals = preSalesGoals.filter(goal => goal.seller_id);
  
  // Agrupar metas por tipo
  const goalsByType = individualGoals.reduce((acc, goal) => {
    const key = goal.goal_type?.name || '';
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(goal);
    return acc;
  }, {} as Record<string, typeof individualGoals>);

  const getStatusIcon = (current: number, target: number, isPercentage: boolean, isMaxGoal: boolean = false) => {
    if (isMaxGoal) {
      // Para metas máximas (como no-show), menor é melhor
      if (current <= target * 0.8) return <TrendingUp className="h-4 w-4 text-green-600" />;
      if (current <= target) return <Minus className="h-4 w-4 text-yellow-600" />;
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    } else {
      // Para metas normais, maior é melhor
      if (current >= target) return <TrendingUp className="h-4 w-4 text-green-600" />;
      if (current >= target * 0.8) return <Minus className="h-4 w-4 text-yellow-600" />;
      return <TrendingDown className="h-4 w-4 text-red-600" />;
    }
  };

  const formatValue = (value: number, isPercentage: boolean) => {
    return isPercentage ? `${value.toFixed(1)}%` : value.toFixed(1);
  };

  const indicators = [
    {
      name: 'Média Diária de Tentativas',
      description: 'Média de tentativas por dia útil no mês',
      goals: goalsByType['Tentativas de Ligação Diárias'] || [],
      current: currentValues.tentativas,
      isPercentage: false,
      isMaxGoal: false
    },
    {
      name: 'Média Diária de Agendamentos',
      description: 'Média de agendamentos por dia útil no mês',
      goals: goalsByType['Agendamentos Diários'] || [],
      current: currentValues.agendamentos,
      isPercentage: false,
      isMaxGoal: false
    },
    {
      name: 'No Show Mensal',
      description: 'Taxa de no-show do mês atual',
      goals: goalsByType['No Show Máximo'] || [],
      current: currentValues.noShow,
      isPercentage: true,
      isMaxGoal: true
    },
    {
      name: 'Reagendamentos',
      description: 'Taxa de reagendamento',
      goals: goalsByType['Taxa de Reagendamento'] || [],
      current: currentValues.reagendamentos,
      isPercentage: true,
      isMaxGoal: false
    }
  ].filter(indicator => indicator.goals.length > 0);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Indicadores de Metas</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {indicators.map((indicator) => {
          const totalTarget = indicator.goals.reduce((sum, goal) => sum + goal.target_value, 0);
          const averageTarget = indicator.goals.length > 0 ? totalTarget / indicator.goals.length : 0;
          const metGoals = indicator.goals.filter(goal => 
            indicator.isMaxGoal 
              ? indicator.current <= goal.target_value
              : indicator.current >= goal.target_value
          ).length;

          return (
            <Card key={indicator.name}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {indicator.name}
                </CardTitle>
                <div className="flex items-center gap-2">
                  {getStatusIcon(indicator.current, averageTarget, indicator.isPercentage, indicator.isMaxGoal)}
                  <Target className="h-4 w-4 text-gray-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900">
                    {formatValue(indicator.current, indicator.isPercentage)}
                  </div>
                  <div className="text-xs text-gray-600">
                    Meta média: {formatValue(averageTarget, indicator.isPercentage)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {indicator.description}
                  </div>
                  <div className="text-xs">
                    <span className="text-green-600">{metGoals}</span>
                    <span className="text-gray-500"> de </span>
                    <span className="text-gray-600">{indicator.goals.length}</span>
                    <span className="text-gray-500"> SDRs atingiram a meta</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default PreSalesGoalsIndicators;
