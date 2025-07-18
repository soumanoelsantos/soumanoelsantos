
import { supabase } from "@/integrations/supabase/client";
import { PlanejamentoEstrategicoData } from "@/types/planejamentoEstrategico";

export const savePlanejamentoEstrategicoToSupabase = async (
  userId: string, 
  data: PlanejamentoEstrategicoData
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('planejamento_estrategico')
      .upsert({
        user_id: userId,
        empresa_nome: data.empresaNome,
        respostas: data.respostas as any,
        plano_acao: data.planoAcao as any,
        acoes_comerciais: data.acoesComerciais as any,
        ferramentas_geradas: data.ferramentasGeradas as any,
        data_inicio: data.dataCreated.toISOString(),
        data_atualizacao: data.dataAtualizacao.toISOString()
      });

    if (error) {
      console.error('Erro ao salvar planejamento estratégico:', error);
      throw error;
    }
  } catch (error) {
    console.error('Erro ao salvar no Supabase:', error);
    throw error;
  }
};

export const loadPlanejamentoEstrategicoFromSupabase = async (
  userId: string
): Promise<PlanejamentoEstrategicoData | null> => {
  try {
    const { data, error } = await supabase
      .from('planejamento_estrategico')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') {
        return null; // Nenhum registro encontrado
      }
      throw error;
    }

    return {
      empresaNome: data.empresa_nome || '',
      respostas: (data.respostas as any) || [],
      planoAcao: (data.plano_acao as any) || [],
      acoesComerciais: (data.acoes_comerciais as any) || [],
      ferramentasGeradas: (data.ferramentas_geradas as any) || {},
      dataCreated: new Date(data.data_inicio),
      dataAtualizacao: new Date(data.data_atualizacao)
    };
  } catch (error) {
    console.error('Erro ao carregar planejamento estratégico:', error);
    throw error;
  }
};
