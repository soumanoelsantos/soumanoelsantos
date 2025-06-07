
import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { 
  GripVertical, 
  Edit2, 
  Trash2, 
  Calendar,
  User,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  Play
} from 'lucide-react';
import { ActionItem } from './NewDiagnosticTestContent';

interface DraggableActionItemProps {
  action: ActionItem;
  index: number;
  onEdit: (action: ActionItem) => void;
  onDelete: (id: string) => void;
  onStatusChange: (id: string, status: ActionItem['status']) => void;
  onStepComplete: (id: string, stepIndex: number, completed: boolean) => void;
}

const DraggableActionItem = ({ 
  action, 
  index, 
  onEdit, 
  onDelete, 
  onStatusChange, 
  onStepComplete 
}: DraggableActionItemProps) => {
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

  const getCategoryColor = (categoria: string) => {
    const colors = {
      comercial: 'bg-blue-100 text-blue-800',
      marketing: 'bg-green-100 text-green-800',
      gestao: 'bg-purple-100 text-purple-800',
      financeiro: 'bg-yellow-100 text-yellow-800',
      rh: 'bg-pink-100 text-pink-800',
      operacional: 'bg-orange-100 text-orange-800',
      tecnologia: 'bg-cyan-100 text-cyan-800',
      cultura: 'bg-indigo-100 text-indigo-800'
    };
    return colors[categoria] || 'bg-gray-100 text-gray-800';
  };

  const getPriorityColor = (prioridade: string) => {
    const colors = {
      alta: 'bg-red-100 text-red-800',
      media: 'bg-yellow-100 text-yellow-800',
      baixa: 'bg-green-100 text-green-800'
    };
    return colors[prioridade] || 'bg-gray-100 text-gray-800';
  };

  const getStatusIcon = (status: string) => {
    const icons = {
      pendente: <Clock className="h-4 w-4" />,
      em_andamento: <Play className="h-4 w-4" />,
      realizado: <CheckCircle2 className="h-4 w-4" />,
      atrasado: <AlertCircle className="h-4 w-4" />
    };
    return icons[status] || <Clock className="h-4 w-4" />;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      pendente: 'bg-gray-100 text-gray-800',
      em_andamento: 'bg-blue-100 text-blue-800',
      realizado: 'bg-green-100 text-green-800',
      atrasado: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  const completedSteps = action.completedSteps?.filter(Boolean).length || 0;
  const totalSteps = action.comoFazer.length;
  const progressPercentage = totalSteps > 0 ? (completedSteps / totalSteps) * 100 : 0;

  return (
    <Card 
      ref={setNodeRef} 
      style={style} 
      className={`p-4 space-y-4 ${isDragging ? 'shadow-lg' : ''}`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <div 
            {...attributes} 
            {...listeners}
            className="cursor-grab active:cursor-grabbing text-gray-400 hover:text-gray-600 mt-1"
          >
            <GripVertical className="h-5 w-5" />
          </div>
          
          <div className="flex-1 space-y-3">
            <div className="flex items-start justify-between">
              <h3 className="font-semibold text-gray-900 leading-tight">
                {index + 1}. {action.acao}
              </h3>
              <div className="flex space-x-2 ml-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onEdit(action)}
                >
                  <Edit2 className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(action.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge className={getCategoryColor(action.categoria)}>
                {action.categoria}
              </Badge>
              <Badge className={getPriorityColor(action.prioridade)}>
                {action.prioridade}
              </Badge>
              <Badge 
                className={`${getStatusColor(action.status)} cursor-pointer`}
                onClick={() => {
                  const statuses: ActionItem['status'][] = ['pendente', 'em_andamento', 'realizado', 'atrasado'];
                  const currentIndex = statuses.indexOf(action.status);
                  const nextStatus = statuses[(currentIndex + 1) % statuses.length];
                  onStatusChange(action.id, nextStatus);
                }}
              >
                {getStatusIcon(action.status)}
                <span className="ml-1">{action.status.replace('_', ' ')}</span>
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Prazo: {action.prazo}</span>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4" />
                <span>Responsável: {action.responsavel}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Target className="h-4 w-4 text-gray-500" />
                <span className="text-sm font-medium">Métricas:</span>
              </div>
              <p className="text-sm text-gray-600 ml-6">{action.metricas}</p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">Como Fazer na Prática</h4>
                <div className="text-sm text-gray-500">
                  {completedSteps}/{totalSteps} concluídos ({Math.round(progressPercentage)}%)
                </div>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="space-y-2">
                {action.comoFazer.map((step, stepIndex) => (
                  <div key={stepIndex} className="flex items-start space-x-3">
                    <Checkbox
                      checked={action.completedSteps?.[stepIndex] || false}
                      onCheckedChange={(checked) => 
                        onStepComplete(action.id, stepIndex, checked as boolean)
                      }
                      className="mt-0.5"
                    />
                    <span 
                      className={`text-sm ${
                        action.completedSteps?.[stepIndex] 
                          ? 'line-through text-gray-500' 
                          : 'text-gray-700'
                      }`}
                    >
                      {stepIndex + 1}. {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <h5 className="text-sm font-medium text-blue-900 mb-1">💡 Dica da IA</h5>
              <p className="text-sm text-blue-800">{action.dicaIA}</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default DraggableActionItem;
