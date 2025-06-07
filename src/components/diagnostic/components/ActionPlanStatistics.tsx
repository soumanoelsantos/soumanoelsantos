
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Target,
  Clock,
  CheckCircle2,
  TrendingUp
} from 'lucide-react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface ActionPlanStatisticsProps {
  actions: ActionItem[];
}

const ActionPlanStatistics = ({ actions }: ActionPlanStatisticsProps) => {
  const totalActions = actions.length;
  const completedActions = actions.filter(a => a.status === 'realizado').length;
  const inProgressActions = actions.filter(a => a.status === 'em_andamento').length;
  const completionPercentage = totalActions > 0 ? Math.round((completedActions / totalActions) * 100) : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Target className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Total de Ações</p>
            <p className="text-2xl font-bold">{totalActions}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-green-100 rounded-lg">
            <CheckCircle2 className="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Concluídas</p>
            <p className="text-2xl font-bold">{completedActions}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-yellow-100 rounded-lg">
            <Clock className="h-5 w-5 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Em Andamento</p>
            <p className="text-2xl font-bold">{inProgressActions}</p>
          </div>
        </div>
      </Card>

      <Card className="p-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-600">Progresso</p>
            <p className="text-2xl font-bold">{completionPercentage}%</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ActionPlanStatistics;
