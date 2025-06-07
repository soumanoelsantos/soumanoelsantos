
import { useState } from 'react';
import { RespostaPlanejamento, PlanejamentoEstrategicoData } from '@/types/planejamentoEstrategico';
import { useToast } from '@/hooks/use-toast';
import { useActionPlanGenerator } from './useActionPlanGenerator';
import { useCommercialActionsGenerator } from './useCommercialActionsGenerator';
import { savePlanejamentoEstrategicoToSupabase } from '@/utils/storage/planejamentoEstrategicoUtils';
import { gerarSwotAPartirRespostas } from './utils/swotUtils';
import { DiagnosticoResultados } from './types';

export const usePlanProcessor = (userId: string | null) => {
  const [gerandoPlano, setGerandoPlano] = useState(false);
  const { toast } = useToast();
  const { gerarPlanoAcao } = useActionPlanGenerator();
  const { gerarAcoesComerciais } = useCommercialActionsGenerator();

  const processarRespostas = async (
    respostas: RespostaPlanejamento[], 
    resultados: DiagnosticoResultados,
    onSuccess: (dados: PlanejamentoEstrategicoData) => void
  ) => {
    if (!userId) {
      toast({
        title: "Erro de autenticação",
        description: "Você precisa estar logado para salvar o planejamento.",
        variant: "destructive"
      });
      return;
    }

    console.log('Iniciando processamento das respostas...');
    setGerandoPlano(true);
    
    try {
      // Primeiro, criar os dados básicos antes de processar
      const empresaNome = respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta as string || 'Empresa';
      
      // Gerar SWOT baseado nas respostas
      console.log('Gerando análise SWOT...');
      const swot = gerarSwotAPartirRespostas(respostas);
      
      // Gerar plano de ação estratégico
      console.log('Gerando plano de ação...');
      const planoAcao = gerarPlanoAcao(resultados);
      
      // Criar os dados completos
      const dadosCompletos: PlanejamentoEstrategicoData = {
        empresaNome,
        respostas,
        ferramentasGeradas: {
          diagnostico: resultados,
          swot
        },
        planoAcao,
        acoesComerciais: [], // Array vazio - removido ações comerciais
        progresso: 0,
        dataInicio: new Date(),
        dataAtualizacao: new Date(),
        status: 'em_andamento'
      };
      
      console.log('Dados completos preparados:', dadosCompletos);
      console.log('Salvando no Supabase...');
      
      // Salvar no Supabase ANTES de chamar onSuccess
      const salvou = await savePlanejamentoEstrategicoToSupabase(userId, dadosCompletos);
      
      if (salvou) {
        console.log('Dados salvos com sucesso, chamando onSuccess...');
        
        // Limpar localStorage antigo se existir
        localStorage.removeItem('planejamento_estrategico_dados');
        
        // Chamar onSuccess para atualizar o estado da UI
        onSuccess(dadosCompletos);
        
        toast({
          title: "Plano gerado com sucesso!",
          description: `Foram criadas ${planoAcao.length} ações estratégicas para os próximos 6 meses.`,
        });
        
        console.log('Processamento concluído com sucesso');
      } else {
        throw new Error('Falha ao salvar no Supabase');
      }
    } catch (error) {
      console.error('Erro ao gerar plano:', error);
      toast({
        title: "Erro ao gerar plano",
        description: "Ocorreu um erro. Tente novamente.",
        variant: "destructive"
      });
      
      // Não resetar o estado em caso de erro para evitar voltar ao formulário
    } finally {
      setGerandoPlano(false);
    }
  };

  return {
    gerandoPlano,
    processarRespostas
  };
};
