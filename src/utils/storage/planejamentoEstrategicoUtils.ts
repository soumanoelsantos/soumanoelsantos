
import { supabase } from '@/integrations/supabase/client';
import { PlanejamentoEstrategicoData } from '@/types/planejamentoEstrategico';

export const savePlanejamentoEstrategicoToSupabase = async (
  userId: string,
  data: PlanejamentoEstrategicoData
): Promise<boolean> => {
  try {
    console.log('Salvando planejamento estratégico no Supabase para usuário:', userId);
    
    // Verificar se já existe um registro para este usuário
    const { data: existingData, error: fetchError } = await supabase
      .from('planejamento_estrategico')
      .select('id')
      .eq('user_id', userId)
      .single();

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Erro ao verificar planejamento existente:', fetchError);
      throw fetchError;
    }

    const planejamentoData = {
      user_id: userId,
      empresa_nome: data.empresaNome,
      respostas: data.respostas as any,
      ferramentas_geradas: data.ferramentasGeradas as any,
      plano_acao: data.planoAcao as any,
      acoes_comerciais: (data.acoesComerciais || []) as any,
      progresso: data.progresso,
      data_inicio: data.dataInicio.toISOString(),
      data_atualizacao: new Date().toISOString(),
      status: data.status
    };

    let result;
    
    if (existingData) {
      // Atualizar registro existente
      result = await supabase
        .from('planejamento_estrategico')
        .update(planejamentoData)
        .eq('id', existingData.id);
    } else {
      // Inserir novo registro
      result = await supabase
        .from('planejamento_estrategico')
        .insert(planejamentoData);
    }

    if (result.error) {
      console.error('Erro ao salvar planejamento estratégico:', result.error);
      throw result.error;
    }

    console.log('Planejamento estratégico salvo com sucesso no Supabase');
    return true;
  } catch (error) {
    console.error('Erro ao salvar planejamento estratégico:', error);
    return false;
  }
};

export const loadPlanejamentoEstrategicoFromSupabase = async (
  userId: string
): Promise<PlanejamentoEstrategicoData | null> => {
  try {
    console.log('Carregando planejamento estratégico do Supabase para usuário:', userId);
    
    const { data, error } = await supabase
      .from('planejamento_estrategico')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        console.log('Nenhum planejamento estratégico encontrado');
        return null;
      }
      throw error;
    }

    if (!data) {
      return null;
    }

    // Converter dados do Supabase para o formato esperado com type assertions
    const planejamentoData: PlanejamentoEstrategicoData = {
      id: data.id,
      empresaNome: data.empresa_nome,
      respostas: data.respostas as any,
      ferramentasGeradas: data.ferramentas_geradas as any,
      planoAcao: (data.plano_acao as any[]).map((acao: any) => ({
        ...acao,
        dataVencimento: new Date(acao.dataVencimento)
      })),
      acoesComerciais: (data.acoes_comerciais as any) || [],
      progresso: data.progresso,
      dataInicio: new Date(data.data_inicio),
      dataAtualizacao: new Date(data.data_atualizacao),
      status: data.status as 'em_andamento' | 'concluido' | 'pausado'
    };

    console.log('Planejamento estratégico carregado do Supabase:', planejamentoData.empresaNome);
    return planejamentoData;
  } catch (error) {
    console.error('Erro ao carregar planejamento estratégico:', error);
    return null;
  }
};

export const deletePlanejamentoEstrategicoFromSupabase = async (
  userId: string
): Promise<boolean> => {
  try {
    console.log('Removendo planejamento estratégico do Supabase para usuário:', userId);
    
    const { error } = await supabase
      .from('planejamento_estrategico')
      .delete()
      .eq('user_id', userId);

    if (error) {
      console.error('Erro ao remover planejamento estratégico:', error);
      throw error;
    }

    console.log('Planejamento estratégico removido do Supabase');
    return true;
  } catch (error) {
    console.error('Erro ao remover planejamento estratégico:', error);
    return false;
  }
};
