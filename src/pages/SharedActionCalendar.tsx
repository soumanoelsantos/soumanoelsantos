
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { ActionCalendar } from '@/types/actionCalendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Calendar, Eye, AlertCircle } from 'lucide-react';
import { formatDateToBrazilian, isOverdueBrazilian } from '@/utils/brazilianDateUtils';

const SharedActionCalendar = () => {
  const { shareToken } = useParams();
  const [actions, setActions] = useState<ActionCalendar[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ownerName, setOwnerName] = useState<string>('');

  useEffect(() => {
    if (shareToken) {
      fetchSharedActions();
    }
  }, [shareToken]);

  const fetchSharedActions = async () => {
    try {
      // Primeiro, verificar se o token é válido e o compartilhamento está ativo
      const { data: configData, error: configError } = await supabase
        .from('dashboard_configs')
        .select('user_id, is_public, company_name')
        .eq('share_token', shareToken)
        .eq('is_public', true)
        .single();

      if (configError || !configData) {
        setError('Link de compartilhamento inválido ou expirado');
        setIsLoading(false);
        return;
      }

      setOwnerName(configData.company_name || 'Empresa');

      // Buscar as ações públicas do usuário
      const { data: actionsData, error: actionsError } = await supabase
        .from('action_calendar')
        .select('*')
        .eq('user_id', configData.user_id)
        .eq('is_public', true)
        .order('due_date', { ascending: true });

      if (actionsError) {
        console.error('Erro ao buscar ações:', actionsError);
        setError('Erro ao carregar ações');
        setIsLoading(false);
        return;
      }

      // Transformar os dados para incluir status atualizado
      const transformedActions: ActionCalendar[] = (actionsData || []).map(action => {
        let status = action.status as ActionCalendar['status'];
        
        if (status !== 'concluida' && isOverdueBrazilian(action.due_date)) {
          status = 'atrasada';
        }
        
        return {
          ...action,
          status
        } as ActionCalendar;
      });

      setActions(transformedActions);
    } catch (error) {
      console.error('Erro ao buscar calendário compartilhado:', error);
      setError('Erro ao carregar calendário');
    } finally {
      setIsLoading(false);
    }
  };

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

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-500">Carregando calendário...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="max-w-md">
          <CardContent className="p-6 text-center">
            <AlertCircle className="h-12 w-12 mx-auto mb-4 text-red-500" />
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Erro</h2>
            <p className="text-gray-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Calendar className="h-8 w-8 text-blue-600" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Calendário de Ações - {ownerName}
              </h1>
              <p className="text-gray-600 flex items-center gap-2 mt-1">
                <Eye className="h-4 w-4" />
                Visualização pública
              </p>
            </div>
          </div>
        </div>

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

        <div className="mt-8 text-center text-sm text-gray-500">
          <p>Este calendário é compartilhado publicamente pela {ownerName}</p>
        </div>
      </div>
    </div>
  );
};

export default SharedActionCalendar;
