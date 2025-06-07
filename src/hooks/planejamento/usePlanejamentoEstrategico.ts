import { useState, useEffect } from 'react';
import { RespostaPlanejamento, PlanejamentoEstrategicoData } from '@/types/planejamentoEstrategico';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { useActionPlanGenerator } from './useActionPlanGenerator';
import { useCommercialActionsGenerator } from './useCommercialActionsGenerator';
import { 
  savePlanejamentoEstrategicoToSupabase,
  loadPlanejamentoEstrategicoFromSupabase,
  deletePlanejamentoEstrategicoFromSupabase 
} from '@/utils/storage/planejamentoEstrategicoUtils';

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

const ACTIONS_STORAGE_KEY = 'planejamento_acoes_estado';

export const usePlanejamentoEstrategico = () => {
  const [etapa, setEtapa] = useState<'formulario' | 'resultado'>('formulario');
  const [dados, setDados] = useState<PlanejamentoEstrategicoData | null>(null);
  const [gerandoPlano, setGerandoPlano] = useState(false);
  const { toast } = useToast();
  const { userId } = useAuth();
  
  const { gerarPlanoAcao } = useActionPlanGenerator();
  const { gerarAcoesComerciais } = useCommercialActionsGenerator();

  // Verificar se existe um plano salvo ao inicializar
  useEffect(() => {
    const loadExistingPlan = async () => {
      if (!userId) return;

      try {
        const dadosSalvos = await loadPlanejamentoEstrategicoFromSupabase(userId);
        
        if (dadosSalvos) {
          setDados(dadosSalvos);
          setEtapa('resultado');
          console.log('Plano estratégico carregado do Supabase:', dadosSalvos.empresaNome);
        }
      } catch (error) {
        console.error('Erro ao carregar dados salvos:', error);
      }
    };

    loadExistingPlan();
  }, [userId]);

  const gerarSwotAPartirRespostas = (respostas: RespostaPlanejamento[]) => {
    const forcas: string[] = [];
    const fraquezas: string[] = [];
    const oportunidades: string[] = [];
    const ameacas: string[] = [];

    respostas.forEach(resposta => {
      if (resposta.swotClassificacao) {
        const texto = typeof resposta.resposta === 'string' ? resposta.resposta : String(resposta.resposta);
        
        switch (resposta.swotClassificacao) {
          case 'Força':
            forcas.push(texto);
            break;
          case 'Fraqueza':
            fraquezas.push(texto);
            break;
          case 'Oportunidade':
            oportunidades.push(texto);
            break;
          case 'Ameaça':
            ameacas.push(texto);
            break;
        }
      }
    });

    return { forcas, fraquezas, oportunidades, ameacas };
  };

  const processarRespostas = async (respostas: RespostaPlanejamento[], resultados: DiagnosticoResultados) => {
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
        setDados(dadosCompletos);
        setEtapa('resultado');
        
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

  const handleUpdateProgresso = async (novoProgresso: number) => {
    if (dados && userId) {
      const dadosAtualizados = {
        ...dados,
        progresso: novoProgresso,
        dataAtualizacao: new Date()
      };
      
      setDados(dadosAtualizados);
      
      // Salvar progresso no Supabase
      await savePlanejamentoEstrategicoToSupabase(userId, dadosAtualizados);
    }
  };

  const voltarParaFormulario = async () => {
    setEtapa('formulario');
    setDados(null);
    
    if (userId) {
      await deletePlanejamentoEstrategicoFromSupabase(userId);
    }
    
    // Limpar localStorage também
    localStorage.removeItem('planejamento_estrategico_dados');
    localStorage.removeItem(ACTIONS_STORAGE_KEY);
    
    console.log('Dados do plano estratégico removidos - voltando ao formulário');
  };

  const limparPlanoSalvo = async () => {
    if (userId) {
      await deletePlanejamentoEstrategicoFromSupabase(userId);
    }
    
    // Limpar localStorage também
    localStorage.removeItem('planejamento_estrategico_dados');
    localStorage.removeItem(ACTIONS_STORAGE_KEY);
    
    setDados(null);
    setEtapa('formulario');
    
    toast({
      title: "Plano removido",
      description: "Dados do planejamento estratégico foram removidos.",
    });
  };

  return {
    etapa,
    dados,
    gerandoPlano,
    processarRespostas,
    handleUpdateProgresso,
    voltarParaFormulario,
    limparPlanoSalvo
  };
};
