
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { ActionCalendar } from '@/types/actionCalendar';
import { isOverdueBrazilian } from '@/utils/brazilianDateUtils';

export const useSharedActionCalendar = (shareToken: string | undefined) => {
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
      console.log('Buscando calendário compartilhado com token:', shareToken);
      
      // Primeiro, verificar se o token é válido e o compartilhamento está ativo
      const { data: configData, error: configError } = await supabase
        .from('dashboard_configs')
        .select('user_id, is_public, company_name')
        .eq('share_token', shareToken)
        .eq('is_public', true)
        .maybeSingle();

      console.log('Config data:', configData, 'Error:', configError);

      if (configError) {
        console.error('Erro ao buscar configuração:', configError);
        setError('Erro ao verificar link de compartilhamento');
        setIsLoading(false);
        return;
      }

      if (!configData) {
        console.log('Configuração não encontrada ou compartilhamento não público');
        setError('Link de compartilhamento inválido ou expirado');
        setIsLoading(false);
        return;
      }

      setOwnerName(configData.company_name || 'Empresa');
      console.log('Usuário encontrado:', configData.user_id);

      // Buscar todas as ações do usuário (independente de serem públicas ou não para debug)
      const { data: allActionsData, error: allActionsError } = await supabase
        .from('action_calendar')
        .select('*')
        .eq('user_id', configData.user_id);

      console.log('Todas as ações do usuário:', allActionsData, 'Error:', allActionsError);

      // Buscar as ações públicas do usuário
      const { data: actionsData, error: actionsError } = await supabase
        .from('action_calendar')
        .select('*')
        .eq('user_id', configData.user_id)
        .eq('is_public', true)
        .order('due_date', { ascending: true });

      console.log('Ações públicas:', actionsData, 'Error:', actionsError);

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

      console.log('Ações transformadas:', transformedActions);
      setActions(transformedActions);
    } catch (error) {
      console.error('Erro ao buscar calendário compartilhado:', error);
      setError('Erro ao carregar calendário');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    actions,
    isLoading,
    error,
    ownerName
  };
};
