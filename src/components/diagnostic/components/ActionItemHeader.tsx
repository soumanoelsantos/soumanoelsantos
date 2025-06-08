
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import { ActionItem } from '../NewDiagnosticTestContent';
import { getPriorityColor, getStatusColor, getCategoryColor, getCategoryIcon, getCategoryLabel } from '../utils/actionItemUtils';

interface ActionItemHeaderProps {
  action: ActionItem;
  isCompleted: boolean;
  onEdit: (action: ActionItem) => void;
  onDelete: (actionId: string) => void;
}

const ActionItemHeader = ({ action, isCompleted, onEdit, onDelete }: ActionItemHeaderProps) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Tem certeza que deseja excluir esta ação?')) {
      onDelete(action.id);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit(action);
  };

  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <h4 className={`font-medium text-gray-900 ${isCompleted ? 'line-through text-gray-500' : ''}`}>
          {action.acao}
        </h4>
        <div className="flex items-center gap-2 mt-2 flex-wrap">
          <Badge variant="custom" className={getCategoryColor(action.categoria)}>
            <div className="flex items-center gap-1">
              {getCategoryIcon(action.categoria)}
              <span>{getCategoryLabel(action.categoria)}</span>
            </div>
          </Badge>
          <Badge variant="custom" className={getPriorityColor(action.prioridade)}>
            {action.prioridade.charAt(0).toUpperCase() + action.prioridade.slice(1)}
          </Badge>
          <Badge variant="custom" className={getStatusColor(action.status)}>
            {action.status.replace('_', ' ')}
          </Badge>
        </div>
      </div>
      
      <div className="flex items-center gap-2 ml-4">
        <Button variant="ghost" size="sm" onClick={handleEdit}>
          <Edit className="h-4 w-4" />
        </Button>
        <Button variant="ghost" size="sm" onClick={handleDelete} className="text-red-600 hover:text-red-700">
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ActionItemHeader;
