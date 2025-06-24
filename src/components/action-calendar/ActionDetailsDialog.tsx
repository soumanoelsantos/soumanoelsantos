
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { ActionCalendar } from '@/types/actionCalendar';
import { formatDateToBrazilian } from '@/utils/dateUtils';

interface ActionDetailsDialogProps {
  action: ActionCalendar;
  isOpen: boolean;
  onClose: () => void;
}

const ActionDetailsDialog = ({ action, isOpen, onClose }: ActionDetailsDialogProps) => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pendente':
        return <Badge variant="secondary">Pendente</Badge>;
      case 'em_andamento':
        return <Badge variant="default">Em Andamento</Badge>;
      case 'concluida':
        return <Badge variant="success">Concluída</Badge>;
      case 'atrasada':
        return <Badge variant="destructive">Atrasada</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {action.title}
            {getStatusBadge(action.status)}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {action.description && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Descrição</h3>
              <p className="text-gray-600">{action.description}</p>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Responsável</h3>
              <p className="text-gray-600">{action.responsible_person}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Setor</h3>
              <Badge variant="secondary">{action.department}</Badge>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Data Limite</h3>
              <p className="text-gray-600">{formatDateToBrazilian(action.due_date)}</p>
            </div>

            <div>
              <h3 className="font-medium text-gray-700 mb-2">Status</h3>
              {getStatusBadge(action.status)}
            </div>
          </div>

          {action.details && (
            <div>
              <h3 className="font-medium text-gray-700 mb-2">Detalhes de Execução</h3>
              <div className="bg-gray-50 p-4 rounded-md">
                <p className="text-gray-600 whitespace-pre-wrap">{action.details}</p>
              </div>
            </div>
          )}

          {action.is_public && (
            <div>
              <Badge variant="outline" className="text-green-600 border-green-600">
                Ação Pública - Pode ser compartilhada
              </Badge>
            </div>
          )}

          <div className="text-sm text-gray-500 pt-4 border-t">
            <p>Criado em: {formatDateToBrazilian(action.created_at)}</p>
            {action.updated_at !== action.created_at && (
              <p>Atualizado em: {formatDateToBrazilian(action.updated_at)}</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ActionDetailsDialog;
