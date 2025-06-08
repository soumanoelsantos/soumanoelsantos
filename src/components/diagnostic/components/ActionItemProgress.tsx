
import React from 'react';
import { Calendar, User } from 'lucide-react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface ActionItemProgressProps {
  action: ActionItem;
  completedSteps: number;
  totalSteps: number;
  progressPercentage: number;
}

const ActionItemProgress = ({ action, completedSteps, totalSteps, progressPercentage }: ActionItemProgressProps) => {
  return (
    <>
      {/* Compact Info */}
      <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-1">
          <Calendar className="h-4 w-4" />
          <span>{action.prazo}</span>
        </div>
        <div className="flex items-center gap-1">
          <User className="h-4 w-4" />
          <span>{action.responsavel}</span>
        </div>
      </div>

      {/* Progress Bar */}
      {totalSteps > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progresso</span>
            <span className="text-gray-900">{completedSteps}/{totalSteps} concluídos ({Math.round(progressPercentage)}%)</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all" 
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ActionItemProgress;
