
import { AcaoComercialSemanal } from '@/types/planejamentoEstrategico';

export const useCommercialActionsGenerator = () => {
  const gerarAcoesComerciais = (): AcaoComercialSemanal[] => {
    // Retorna array vazio - removendo ações comerciais práticas
    return [];
  };

  return { gerarAcoesComerciais };
};
