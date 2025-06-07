
import { PlanejamentoEstrategicoData } from '@/types/planejamentoEstrategico';
import { useToast } from '@/hooks/use-toast';
import { 
  savePlanejamentoEstrategicoToSupabase, 
  deletePlanejamentoEstrategicoFromSupabase 
} from '@/utils/storage/planejamentoEstrategicoUtils';
import { ACTIONS_STORAGE_KEY } from './types';

export const usePlanManager = (userId: string | null) => {
  const { toast } = useToast();

  const handleUpdateProgresso = async (
    dados: PlanejamentoEstrategicoData | null,
    novoProgresso: number,
    onUpdate: (dados: PlanejamentoEstrategicoData) => void
  ) => {
    if (dados && userId) {
      const dadosAtualizados = {
        ...dados,
        progresso: novoProgresso,
        dataAtualizacao: new Date()
      };
      
      onUpdate(dadosAtualizados);
      
      // Salvar progresso no Supabase
      await savePlanejamentoEstrategicoToSupabase(userId, dadosAtualizados);
    }
  };

  const voltarParaFormulario = async (
    onReset: () => void
  ) => {
    if (userId) {
      await deletePlanejamentoEstrategicoFromSupabase(userId);
    }
    
    // Limpar localStorage também
    localStorage.removeItem('planejamento_estrategico_dados');
    localStorage.removeItem(ACTIONS_STORAGE_KEY);
    
    onReset();
    
    console.log('Dados do plano estratégico removidos - voltando ao formulário');
  };

  const limparPlanoSalvo = async (
    onReset: () => void
  ) => {
    if (userId) {
      await deletePlanejamentoEstrategicoFromSupabase(userId);
    }
    
    // Limpar localStorage também
    localStorage.removeItem('planejamento_estrategico_dados');
    localStorage.removeItem(ACTIONS_STORAGE_KEY);
    
    onReset();
    
    toast({
      title: "Plano removido",
      description: "Dados do planejamento estratégico foram removidos.",
    });
  };

  return {
    handleUpdateProgresso,
    voltarParaFormulario,
    limparPlanoSalvo
  };
};
