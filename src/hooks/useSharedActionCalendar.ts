
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
      console.log('=== HOOK: useSharedActionCalendar ===');
      console.log('ShareToken recebido:', shareToken);
      fetchSharedActions();
    } else {
      console.log('ERRO: Nenhum shareToken fornecido');
      setError('Token de compartilhamento não encontrado');
      setIsLoading(false);
    }
  }, [shareToken]);

  const fetchSharedActions = async () => {
    try {
      console.log('=== INICIANDO BUSCA DO CALENDÁRIO COMPARTILHADO ===');
      console.log('Token recebido:', shareToken);
      
      setIsLoading(true);
      setError(null);

      // Primeiro, verificar se o token é válido e o compartilhamento está ativo
      console.log('Passo 1: Buscando configuração do dashboard...');
      const { data: configData, error: configError } = await supabase
        .from('dashboard_configs')
        .select('user_id, is_public, company_name')
        .eq('share_token', shareToken)
        .eq('is_public', true)
        .maybeSingle();

      console.log('Resultado da busca de config:', { configData, configError });

      if (configError) {
        console.error('Erro ao buscar configuração:', configError);
        setError('Erro ao verificar link de compartilhamento');
        return;
      }

      if (!configData) {
        console.log('Nenhuma configuração encontrada para o token:', shareToken);
        setError('Link de compartilhamento inválido ou expirado');
        return;
      }

      console.log('Configuração encontrada:', configData);
      setOwnerName(configData.company_name || 'Empresa');

      // Buscar as ações públicas do usuário
      console.log('Passo 2: Buscando ações públicas do usuário...', configData.user_id);
      const { data: actionsData, error: actionsError } = await supabase
        .from('action_calendar')
        .select('*')
        .eq('user_id', configData.user_id)
        .eq('is_public', true)
        .order('due_date', { ascending: true });

      console.log('Resultado da busca de ações:', { actionsData, actionsError });

      if (actionsError) {
        console.error('Erro ao buscar ações:', actionsError);
        setError('Erro ao carregar ações');
        return;
      }

      // Log detalhado das ações encontradas
      console.log(`Encontradas ${actionsData?.length || 0} ações públicas`);
      if (actionsData && actionsData.length > 0) {
        console.log('Primeira ação encontrada:', JSON.stringify(actionsData[0], null, 2));
        console.log('Todas as ações encontradas:', JSON.stringify(actionsData, null, 2));
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

      console.log('Ações transformadas:', transformedActions.length);
      console.log('Setando ações no estado...');
      setActions(transformedActions);
      
      if (transformedActions.length === 0) {
        console.log('AVISO: Nenhuma ação pública encontrada para este usuário');
        console.log('Verifique se o usuário tem ações marcadas como públicas');
      } else {
        console.log('SUCESSO: Ações carregadas com sucesso');
      }

    } catch (error) {
      console.error('Erro geral ao buscar calendário compartilhado:', error);
      setError('Erro ao carregar calendário');
    } finally {
      setIsLoading(false);
      console.log('=== BUSCA FINALIZADA ===');
    }
  };

  return {
    actions,
    isLoading,
    error,
    ownerName
  };
};
