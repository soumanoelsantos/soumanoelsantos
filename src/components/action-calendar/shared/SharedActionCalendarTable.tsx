
import React from 'react';
import { ActionCalendar } from '@/types/actionCalendar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from 'lucide-react';
import { formatDateToBrazilian, isOverdueBrazilian } from '@/utils/brazilianDateUtils';

interface SharedActionCalendarTableProps {
  actions: ActionCalendar[];
}

const SharedActionCalendarTable = ({ actions }: SharedActionCalendarTableProps) => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Calendar className="h-5 w-5" />
          Ações Públicas
        </CardTitle>
        <CardDescription>
          Acompanhe o progresso das ações da equipe
        </CardDescription>
      </CardHeader>

      <CardContent>
        {actions.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Nenhuma ação pública disponível</p>
            <p className="text-sm mt-2">
              Parece que não há ações marcadas como públicas para este calendário
            </p>
          </div>
        ) : (
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Ação</TableHead>
                  <TableHead>Responsável</TableHead>
                  <TableHead>Setor</TableHead>
                  <TableHead>Data Limite</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {actions.map((action) => (
                  <TableRow key={action.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{action.title}</div>
                        {action.description && (
                          <div className="text-sm text-gray-500 mt-1">
                            {action.description}
                          </div>
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
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SharedActionCalendarTable;
