
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

    setGerandoPlano(true);
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const empresaNome = respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta as string || 'Empresa';
      
      // Gerar SWOT baseado nas respostas
      const swot = gerarSwotAPartirRespostas(respostas);
      
      // Gerar apenas plano de ação estratégico (sem ações comerciais)
      const planoAcao = gerarPlanoAcao(resultados);
      
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
      
      // Salvar no Supabase
      const salvou = await savePlanejamentoEstrategicoToSupabase(userId, dadosCompletos);
      
      if (salvou) {
        onSuccess(dadosCompletos);
        
        // Limpar localStorage antigo se existir
        localStorage.removeItem('planejamento_estrategico_dados');
        
        toast({
          title: "Plano gerado com sucesso!",
          description: `Foram criadas ${planoAcao.length} ações estratégicas para os próximos 6 meses.`,
        });
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
    } finally {
      setGerandoPlano(false);
    }
  };

  return {
    gerandoPlano,
    processarRespostas
  };
};
