
import React from 'react';
import { ActionCalendar } from '@/types/actionCalendar';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, Users, AlertCircle } from 'lucide-react';
import { formatDateToBrazilian, isOverdueBrazilian } from '@/utils/brazilianDateUtils';

interface SharedActionCalendarTableProps {
  actions: ActionCalendar[];
}

const SharedActionCalendarTable = ({ actions }: SharedActionCalendarTableProps) => {
  const getStatusBadge = (status: string, dueDate: string) => {
    const isOverdue = isOverdueBrazilian(dueDate);
    
    let badgeColor = 'default';
    let displayStatus = status;
    let icon = null;
    
    switch (status) {
      case 'pendente':
        badgeColor = isOverdue ? 'destructive' : 'secondary';
        displayStatus = isOverdue ? 'Atrasada' : 'Pendente';
        icon = isOverdue ? <AlertCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />;
        break;
      case 'em_andamento':
        badgeColor = isOverdue ? 'destructive' : 'default';
        displayStatus = isOverdue ? 'Atrasada' : 'Em Andamento';
        icon = isOverdue ? <AlertCircle className="h-3 w-3" /> : <Clock className="h-3 w-3" />;
        break;
      case 'concluida':
        badgeColor = 'success';
        displayStatus = 'Concluída';
        break;
      case 'atrasada':
        badgeColor = 'destructive';
        displayStatus = 'Atrasada';
        icon = <AlertCircle className="h-3 w-3" />;
        break;
    }

    return (
      <Badge variant={badgeColor as any} className="flex items-center gap-1">
        {icon}
        {displayStatus}
      </Badge>
    );
  };

  const getStatusStats = () => {
    const stats = {
      total: actions.length,
      concluidas: actions.filter(a => a.status === 'concluida').length,
      pendentes: actions.filter(a => a.status === 'pendente').length,
      atrasadas: actions.filter(a => isOverdueBrazilian(a.due_date) && a.status !== 'concluida').length,
    };
    
    return stats;
  };

  const stats = getStatusStats();

  return (
    <div className="space-y-6">
      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 bg-green-100 rounded flex items-center justify-center">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Concluídas</p>
                <p className="text-2xl font-bold text-green-600">{stats.concluidas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-sm text-gray-600">Pendentes</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pendentes}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm text-gray-600">Atrasadas</p>
                <p className="text-2xl font-bold text-red-600">{stats.atrasadas}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Actions Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Ações da Equipe
          </CardTitle>
          <CardDescription>
            Acompanhe o progresso das ações e responsabilidades da equipe
          </CardDescription>
        </CardHeader>

        <CardContent>
          {actions.length === 0 ? (
            <div className="text-center py-12">
              <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Nenhuma ação disponível</h3>
              <p className="text-gray-600 max-w-sm mx-auto">
                Parece que não há ações marcadas como públicas para este calendário no momento
              </p>
            </div>
          ) : (
            <div className="rounded-lg border overflow-hidden">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50">
                    <TableHead className="font-semibold">Ação</TableHead>
                    <TableHead className="font-semibold">Responsável</TableHead>
                    <TableHead className="font-semibold">Setor</TableHead>
                    <TableHead className="font-semibold">Data Limite</TableHead>
                    <TableHead className="font-semibold">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {actions.map((action, index) => (
                    <TableRow key={action.id} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}>
                      <TableCell className="py-4">
                        <div>
                          <div className="font-medium text-gray-900">{action.title}</div>
                          {action.description && (
                            <div className="text-sm text-gray-500 mt-1 line-clamp-2">
                              {action.description}
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-700">
                              {action.responsible_person.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <span className="font-medium text-gray-900">{action.responsible_person}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          {action.department}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-900">{formatDateToBrazilian(action.due_date)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-4">
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
    </div>
  );
};

export default SharedActionCalendarTable;
