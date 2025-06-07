
import { RespostaPlanejamento } from '@/types/planejamentoEstrategico';
import { useAuth } from '@/hooks/useAuth';
import { usePlanLoader } from './usePlanLoader';
import { usePlanProcessor } from './usePlanProcessor';
import { usePlanManager } from './usePlanManager';
import { DiagnosticoResultados } from './types';

export const usePlanejamentoEstrategico = () => {
  const { userId } = useAuth();
  
  const {
    dados,
    setDados,
    etapa,
    setEtapa,
    isLoading
  } = usePlanLoader(userId);

  const {
    gerandoPlano,
    processarRespostas: processarRespostasInterno
  } = usePlanProcessor(userId);

  const {
    handleUpdateProgresso: updateProgressoInterno,
    voltarParaFormulario: voltarFormularioInterno,
    limparPlanoSalvo: limparPlanoInterno
  } = usePlanManager(userId);

  const processarRespostas = async (respostas: RespostaPlanejamento[], resultados: DiagnosticoResultados) => {
    console.log('usePlanejamentoEstrategico: Iniciando processamento...');
    
    await processarRespostasInterno(respostas, resultados, (dadosCompletos) => {
      console.log('usePlanejamentoEstrategico: Dados recebidos do processor:', dadosCompletos.empresaNome);
      
      // Atualizar estado local PRIMEIRO
      setDados(dadosCompletos);
      
      // Depois mudar para etapa de resultado
      console.log('usePlanejamentoEstrategico: Mudando para etapa resultado');
      setEtapa('resultado');
    });
  };

  const handleUpdateProgresso = async (novoProgresso: number) => {
    if (dados) {
      await updateProgressoInterno(dados, novoProgresso, setDados);
    }
  };

  const voltarParaFormulario = async () => {
    await voltarFormularioInterno(() => {
      setEtapa('formulario');
      setDados(null);
    });
  };

  const limparPlanoSalvo = async () => {
    await limparPlanoInterno(() => {
      setDados(null);
      setEtapa('formulario');
    });
  };

  return {
    etapa,
    dados,
    gerandoPlano,
    isLoading,
    processarRespostas,
    handleUpdateProgresso,
    voltarParaFormulario,
    limparPlanoSalvo
  };
};
