
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ActionCalendar } from '@/types/actionCalendar';
import { formatDateToBrazilian, isOverdueBrazilian } from '@/utils/brazilianDateUtils';

interface ActionDetailsDialogProps {
  action: ActionCalendar;
  isOpen: boolean;
  onClose: () => void;
}

const ActionDetailsDialog = ({ action, isOpen, onClose }: ActionDetailsDialogProps) => {
  const getStatusBadge = (status: string, dueDate: string) => {
    const isOverdue = isOverdueBrazilian(dueDate);
    
    let badgeClass = '';
    let displayStatus = status;
    
    switch (status) {
      case 'pendente':
        badgeClass = isOverdue ? 'bg-red-500 text-white' : 'bg-gray-500 text-white';
        displayStatus = isOverdue ? 'Atrasada' : 'Pendente';
        break;
      case 'em_andamento':
        badgeClass = isOverdue ? 'bg-red-500 text-white' : 'bg-blue-500 text-white';
        displayStatus = isOverdue ? 'Atrasada' : 'Em Andamento';
        break;
      case 'concluida':
        badgeClass = 'bg-green-500 text-white';
        displayStatus = 'Concluída';
        break;
      case 'atrasada':
        badgeClass = 'bg-red-500 text-white';
        displayStatus = 'Atrasada';
        break;
    }

    return (
      <Badge variant="custom" className={badgeClass}>
        {displayStatus}
      </Badge>
    );
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{action.title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Status</label>
              <div className="mt-1">
                {getStatusBadge(action.status, action.due_date)}
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Data Limite</label>
              <p className="text-sm text-gray-900 mt-1">
                {formatDateToBrazilian(action.due_date)}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700">Responsável</label>
              <p className="text-sm text-gray-900 mt-1">{action.responsible_person}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700">Setor</label>
              <p className="text-sm text-gray-900 mt-1">
                <Badge variant="secondary">{action.department}</Badge>
              </p>
            </div>
          </div>

          {action.description && (
            <div>
              <label className="text-sm font-medium text-gray-700">Descrição</label>
              <p className="text-sm text-gray-900 mt-1">{action.description}</p>
            </div>
          )}

          {action.details && (
            <div>
              <label className="text-sm font-medium text-gray-700">Detalhes de Execução</label>
              <div className="mt-1 p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-900 whitespace-pre-wrap">{action.details}</p>
              </div>
            </div>
          )}

          {action.is_public && (
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-green-600 border-green-600">
                Ação Pública
              </Badge>
              <span className="text-xs text-gray-500">Esta ação pode ser compartilhada externamente</span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDetailsDialog;
