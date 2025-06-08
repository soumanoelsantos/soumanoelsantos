
import React, { useState } from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  GripVertical, 
  Edit, 
  Trash2, 
  Calendar, 
  User, 
  Target, 
  TrendingUp, 
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  ListChecks
} from 'lucide-react';
import { ActionItem } from './NewDiagnosticTestContent';

interface DraggableActionItemProps {
  action: ActionItem;
  index: number;
  onEdit: (action: ActionItem) => void;
  onDelete: (actionId: string) => void;
  onStatusChange: (actionId: string, status: ActionItem['status']) => void;
  onStepComplete: (actionId: string, stepIndex: number, completed: boolean) => void;
}

const DraggableActionItem = ({
  action,
  index,
  onEdit,
  onDelete,
  onStatusChange,
  onStepComplete
}: DraggableActionItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: action.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-red-100 text-red-800 border-red-200';
      case 'media': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'baixa': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pendente': return 'bg-gray-100 text-gray-800';
      case 'em_andamento': return 'bg-blue-100 text-blue-800';
      case 'realizado': return 'bg-green-100 text-green-800';
      case 'atrasado': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'comercial': return <TrendingUp className="h-4 w-4" />;
      case 'marketing': return <Target className="h-4 w-4" />;
      default: return <Target className="h-4 w-4" />;
    }
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(date));
  };

  const handleStatusChange = (newStatus: ActionItem['status']) => {
    onStatusChange(action.id, newStatus);
  };

  const handleStepToggle = (stepIndex: number, completed: boolean) => {
    onStepComplete(action.id, stepIndex, completed);
  };

  const completedSteps = action.completedSteps?.filter(Boolean).length || 0;
  const totalSteps = action.comoFazer?.length || 0;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`transition-all ${action.concluida ? 'bg-green-50 border-green-200' : 'bg-white'} hover:shadow-md`}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div 
            className="mt-1 cursor-grab active:cursor-grabbing"
            {...attributes}
            {...listeners}
          >
            <GripVertical className="h-5 w-5 text-gray-400" />
          </div>
          
          <Checkbox
            checked={action.concluida}
            onCheckedChange={(checked) => handleStatusChange(checked ? 'realizado' : 'pendente')}
            className="mt-1"
          />
          
          <div className="flex-1 space-y-3">
            {/* Header */}
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className={`font-medium text-gray-900 ${action.concluida ? 'line-through text-gray-500' : ''}`}>
                  {action.acao}
                </h4>
                <div className="flex items-center gap-2 mt-2">
                  {getCategoryIcon(action.categoria)}
                  <Badge className={getPriorityColor(action.prioridade)}>
                    {action.prioridade.charAt(0).toUpperCase() + action.prioridade.slice(1)}
                  </Badge>
                  <Badge className={getStatusColor(action.status)}>
                    {action.status.replace('_', ' ')}
                  </Badge>
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                <Button variant="ghost" size="sm" onClick={() => onEdit(action)}>
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => onDelete(action.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

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

            {/* Expand/Collapse Button */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center gap-2 text-blue-600 hover:text-blue-700 p-0 h-auto"
            >
              {isExpanded ? (
                <>
                  <ChevronUp className="h-4 w-4" />
                  Ver menos
                </>
              ) : (
                <>
                  <ChevronDown className="h-4 w-4" />
                  Ver mais
                </>
              )}
            </Button>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="space-y-4 pt-4 border-t border-gray-200">
                {/* Metrics and Benefits */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Métricas Esperadas</h5>
                    <p className="text-sm text-gray-600">{action.metricas}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-gray-900 mb-2">Benefícios</h5>
                    <p className="text-sm text-gray-600">{action.beneficios}</p>
                  </div>
                </div>

                {/* AI Tip */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
                    <div>
                      <h5 className="font-medium text-blue-900 mb-1">Dica da IA</h5>
                      <p className="text-sm text-blue-800">{action.dicaIA}</p>
                    </div>
                  </div>
                </div>

                {/* How to Do Steps */}
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <ListChecks className="h-4 w-4 text-gray-700" />
                    <h5 className="font-medium text-gray-900">Como Fazer na Prática</h5>
                  </div>
                  <div className="space-y-2">
                    {action.comoFazer?.map((step, stepIndex) => (
                      <div key={stepIndex} className="flex items-start gap-2">
                        <Checkbox
                          checked={action.completedSteps?.[stepIndex] || false}
                          onCheckedChange={(checked) => handleStepToggle(stepIndex, !!checked)}
                          className="mt-0.5"
                        />
                        <span className={`text-sm ${action.completedSteps?.[stepIndex] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                          {step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Resources */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Recursos Necessários</h5>
                  <p className="text-sm text-gray-600">{action.recursos}</p>
                </div>

                {/* Implementation Details */}
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Detalhes da Implementação</h5>
                  <p className="text-sm text-gray-600">{action.detalhesImplementacao}</p>
                </div>
              </div>
            )}
          </div>
          
          {action.concluida && (
            <CheckCircle2 className="h-5 w-5 text-green-600 mt-1" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DraggableActionItem;
