
import { useState } from 'react';
import { RespostaPlanejamento, PlanejamentoEstrategicoData } from '@/types/planejamentoEstrategico';
import { useToast } from '@/hooks/use-toast';
import { useActionPlanGenerator } from './useActionPlanGenerator';
import { useCommercialActionsGenerator } from './useCommercialActionsGenerator';

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

export const usePlanejamentoEstrategico = () => {
  const [etapa, setEtapa] = useState<'formulario' | 'resultado'>('formulario');
  const [dados, setDados] = useState<PlanejamentoEstrategicoData | null>(null);
  const [gerandoPlano, setGerandoPlano] = useState(false);
  const { toast } = useToast();
  
  const { gerarPlanoAcao } = useActionPlanGenerator();
  const { gerarAcoesComerciais } = useCommercialActionsGenerator();

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
    setGerandoPlano(true);
    
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      const empresaNome = respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta as string || 'Empresa';
      
      // Gerar SWOT baseado nas respostas
      const swot = gerarSwotAPartirRespostas(respostas);
      
      // Gerar plano de ação muito mais robusto
      const planoAcao = gerarPlanoAcao(resultados);
      const acoesComerciais = gerarAcoesComerciais();
      
      const dadosCompletos: PlanejamentoEstrategicoData = {
        empresaNome,
        respostas,
        ferramentasGeradas: {
          diagnostico: resultados,
          swot
        },
        planoAcao,
        acoesComerciais,
        progresso: 0,
        dataInicio: new Date(),
        dataAtualizacao: new Date(),
        status: 'em_andamento'
      };
      
      setDados(dadosCompletos);
      setEtapa('resultado');
      
      toast({
        title: "Plano gerado com sucesso!",
        description: `Foram criadas ${planoAcao.length} ações estratégicas para os próximos 6 meses.`,
      });
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

  const handleUpdateProgresso = (novoProgresso: number) => {
    if (dados) {
      setDados({
        ...dados,
        progresso: novoProgresso,
        dataAtualizacao: new Date()
      });
    }
  };

  const voltarParaFormulario = () => {
    setEtapa('formulario');
    setDados(null);
  };

  return {
    etapa,
    dados,
    gerandoPlano,
    processarRespostas,
    handleUpdateProgresso,
    voltarParaFormulario
  };
};
