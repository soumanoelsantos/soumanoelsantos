
import React, { useState } from 'react';
import { ActionCalendar, CreateActionData } from '@/types/actionCalendar';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Share2, Calendar } from 'lucide-react';
import { formatDateToBrazilian, isOverdueBrazilian } from '@/utils/brazilianDateUtils';
import ActionDetailsDialog from './ActionDetailsDialog';
import EditActionDialog from './EditActionDialog';
import ActionShareDialog from './ActionShareDialog';

interface ActionCalendarTableProps {
  actions: ActionCalendar[];
  onUpdateAction: (id: string, data: Partial<CreateActionData>) => Promise<ActionCalendar>;
  onDeleteAction: (id: string) => Promise<void>;
  onTogglePublic: (id: string, isPublic: boolean) => Promise<ActionCalendar>;
}

const ActionCalendarTable = ({ 
  actions, 
  onUpdateAction, 
  onDeleteAction, 
  onTogglePublic 
}: ActionCalendarTableProps) => {
  const [viewingAction, setViewingAction] = useState<ActionCalendar | null>(null);
  const [editingAction, setEditingAction] = useState<ActionCalendar | null>(null);
  const [sharingAction, setSharingAction] = useState<ActionCalendar | null>(null);

  const getStatusBadge = (status: string, dueDate: string) => {
    const isOverdue = isOverdueBrazilian(dueDate);
    
    let badgeColor = 'default';
    let displayStatus = status;
    
    switch (status) {
      case 'pendente':
        badgeColor = isOverdue ? 'destructive' : 'secondary';
        displayStatus = isOverdue ? 'Atrasada' : 'Pendente';
        break;
      case 'em_andamento':
        badgeColor = isOverdue ? 'destructive' : 'default';
        displayStatus = isOverdue ? 'Atrasada' : 'Em Andamento';
        break;
      case 'concluida':
        badgeColor = 'success';
        displayStatus = 'Concluída';
        break;
      case 'atrasada':
        badgeColor = 'destructive';
        displayStatus = 'Atrasada';
        break;
    }

    return (
      <Badge variant={badgeColor as any}>
        {displayStatus}
      </Badge>
    );
  };

  const handleDelete = async (action: ActionCalendar) => {
    if (confirm(`Tem certeza que deseja excluir a ação "${action.title}"?`)) {
      await onDeleteAction(action.id);
    }
  };

  if (actions.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p>Nenhuma ação cadastrada</p>
        <p className="text-sm">Crie a primeira ação para começar a gerenciar seu calendário</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ação</TableHead>
              <TableHead>Responsável</TableHead>
              <TableHead>Setor</TableHead>
              <TableHead>Data Limite</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {actions.map((action) => (
              <TableRow key={action.id}>
                <TableCell>
                  <div>
                    <button
                      onClick={() => setViewingAction(action)}
                      className="font-medium text-blue-600 hover:text-blue-800 text-left cursor-pointer hover:underline"
                    >
                      {action.title}
                    </button>
                    {action.is_public && (
                      <Badge variant="outline" className="text-green-600 border-green-600 mt-1 ml-2">
                        Público
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>{action.responsible_person}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{action.department}</Badge>
                </TableCell>
                <TableCell>
                  {formatDateToBrazilian(action.due_date)}
                </TableCell>
                <TableCell>
                  {getStatusBadge(action.status, action.due_date)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setEditingAction(action)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSharingAction(action)}
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(action)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Dialogs */}
      {viewingAction && (
        <ActionDetailsDialog
          action={viewingAction}
          isOpen={!!viewingAction}
          onClose={() => setViewingAction(null)}
        />
      )}

      {editingAction && (
        <EditActionDialog
          action={editingAction}
          isOpen={!!editingAction}
          onClose={() => setEditingAction(null)}
          onUpdateAction={onUpdateAction}
        />
      )}

      {sharingAction && (
        <ActionShareDialog
          action={sharingAction}
          isOpen={!!sharingAction}
          onClose={() => setSharingAction(null)}
          onTogglePublic={onTogglePublic}
        />
      )}
    </>
  );
};

export default ActionCalendarTable;
