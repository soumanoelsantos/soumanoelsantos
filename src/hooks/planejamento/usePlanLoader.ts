
import { useState, useEffect } from 'react';
import { PlanejamentoEstrategicoData } from '@/types/planejamentoEstrategico';
import { useToast } from '@/hooks/use-toast';
import { loadPlanejamentoEstrategicoFromSupabase } from '@/utils/storage/planejamentoEstrategicoUtils';

export const usePlanLoader = (userId: string | null) => {
  const [dados, setDados] = useState<PlanejamentoEstrategicoData | null>(null);
  const [etapa, setEtapa] = useState<'formulario' | 'resultado'>('formulario');
  const [isLoading, setIsLoading] = useState(true);
  const [loadComplete, setLoadComplete] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const loadExistingPlan = async () => {
      if (!userId || loadComplete) {
        setIsLoading(false);
        return;
      }

      try {
        console.log('usePlanLoader: Verificando se existe plano estratégico salvo para usuário:', userId);
        const dadosSalvos = await loadPlanejamentoEstrategicoFromSupabase(userId);
        
        if (dadosSalvos) {
          console.log('usePlanLoader: Plano estratégico encontrado - redirecionando para resultados:', dadosSalvos.empresaNome);
          setDados(dadosSalvos);
          setEtapa('resultado');
          
          toast({
            title: "Plano carregado",
            description: `Planejamento estratégico de ${dadosSalvos.empresaNome} foi carregado com sucesso.`,
          });
        } else {
          console.log('usePlanLoader: Nenhum plano estratégico encontrado - mantendo no formulário');
          setEtapa('formulario');
        }
      } catch (error) {
        console.error('usePlanLoader: Erro ao carregar dados salvos:', error);
        setEtapa('formulario');
      } finally {
        setIsLoading(false);
        setLoadComplete(true);
      }
    };

    loadExistingPlan();
  }, [userId, toast, loadComplete]);

  // Função para atualizar dados sem recarregar
  const updateDados = (novosDados: PlanejamentoEstrategicoData) => {
    console.log('usePlanLoader: Atualizando dados localmente:', novosDados.empresaNome);
    setDados(novosDados);
  };

  return {
    dados,
    setDados: updateDados,
    etapa,
    setEtapa,
    isLoading
  };
};
