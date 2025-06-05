
import React, { useState, useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Target, 
  Play, 
  RotateCcw, 
  Download,
  Brain,
  CheckCircle
} from "lucide-react";
import PlanejamentoEstrategicoForm from "./PlanejamentoEstrategicoForm";
import PlanoAcaoGerado from "./PlanoAcaoGerado";
import { 
  PlanejamentoEstrategicoData, 
  RespostaPlanejamento, 
  PlanoAcao 
} from "@/types/planejamentoEstrategico";

const PlanejamentoEstrategico: React.FC = () => {
  const { userId } = useAuth();
  const { toast } = useToast();
  const [etapa, setEtapa] = useState<'intro' | 'questionario' | 'processando' | 'plano'>('intro');
  const [dadosPlanejamento, setDadosPlanejamento] = useState<PlanejamentoEstrategicoData | null>(null);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    carregarDadosExistentes();
  }, [userId]);

  const carregarDadosExistentes = async () => {
    // Aqui você carregaria dados existentes do Supabase
    try {
      // const { data } = await supabase.from('planejamento_estrategico').select('*').eq('user_id', userId).single();
      // if (data) {
      //   setDadosPlanejamento(data);
      //   setEtapa('plano');
      // }
    } catch (error) {
      console.log("Nenhum planejamento existente encontrado");
    }
  };

  const iniciarQuestionario = () => {
    setEtapa('questionario');
  };

  const processarRespostas = async (respostas: RespostaPlanejamento[]) => {
    setEtapa('processando');
    setCarregando(true);

    try {
      // Aqui você processaria as respostas e geraria as ferramentas
      await new Promise(resolve => setTimeout(resolve, 3000)); // Simular processamento

      const planoAcaoGerado = gerarPlanoAcao(respostas);
      const ferramentasGeradas = gerarFerramentas(respostas);

      const novosPlanejamento: PlanejamentoEstrategicoData = {
        empresaNome: respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta as string || '',
        respostas,
        ferramentasGeradas,
        planoAcao: planoAcaoGerado,
        progresso: 0,
        dataInicio: new Date(),
        dataAtualizacao: new Date(),
        status: 'em_andamento'
      };

      setDadosPlanejamento(novosPlanejamento);
      
      // Salvar no Supabase
      // await supabase.from('planejamento_estrategico').insert({
      //   user_id: userId,
      //   dados: novosPlanejamento
      // });

      setEtapa('plano');
      
      toast({
        title: "Planejamento Concluído!",
        description: "Seu plano de ação estratégico foi gerado com sucesso.",
      });
    } catch (error) {
      toast({
        title: "Erro",
        description: "Erro ao processar planejamento. Tente novamente.",
        variant: "destructive"
      });
    } finally {
      setCarregando(false);
    }
  };

  const gerarPlanoAcao = (respostas: RespostaPlanejamento[]): PlanoAcao[] => {
    const acoes: PlanoAcao[] = [];
    const hoje = new Date();

    // Gerar ações baseadas nas respostas
    respostas.forEach(resposta => {
      switch (resposta.perguntaId) {
        case 'processos_documentados':
          if (resposta.resposta === 'nao') {
            acoes.push({
              id: 'doc_processos',
              acao: 'Documentar e padronizar todos os processos principais da empresa',
              categoria: 'Processos',
              prazo: '30 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(hoje.getTime() + 30 * 24 * 60 * 60 * 1000),
              recursos: 'Tempo da equipe, ferramentas de documentação',
              metricas: 'Número de processos documentados'
            });
          }
          break;
        case 'metas_definidas':
          if (resposta.resposta === 'nao') {
            acoes.push({
              id: 'definir_metas',
              acao: 'Estabelecer metas SMART para todos os departamentos',
              categoria: 'Gestão',
              prazo: '15 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(hoje.getTime() + 15 * 24 * 60 * 60 * 1000),
              recursos: 'Reuniões de planejamento, análise de dados históricos',
              metricas: 'Metas definidas por departamento'
            });
          }
          break;
        case 'sistema_gestao':
          if (resposta.resposta === 'nao') {
            acoes.push({
              id: 'implementar_sistema',
              acao: 'Pesquisar e implementar sistema de gestão (ERP/CRM)',
              categoria: 'Tecnologia',
              prazo: '90 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(hoje.getTime() + 90 * 24 * 60 * 60 * 1000),
              recursos: 'Orçamento para software, tempo para implementação',
              metricas: 'Sistema implementado e funcionando'
            });
          }
          break;
      }
    });

    // Adicionar ações estratégicas padrão
    acoes.push(
      {
        id: 'analise_mercado',
        acao: 'Realizar análise competitiva completa do mercado',
        categoria: 'Estratégia',
        prazo: '45 dias',
        prioridade: 'media',
        concluida: false,
        dataVencimento: new Date(hoje.getTime() + 45 * 24 * 60 * 60 * 1000),
        recursos: 'Pesquisa de mercado, análise de concorrentes',
        metricas: 'Relatório de análise competitiva completo'
      },
      {
        id: 'plan_marketing',
        acao: 'Desenvolver plano de marketing digital',
        categoria: 'Marketing',
        prazo: '60 dias',
        prioridade: 'media',
        concluida: false,
        dataVencimento: new Date(hoje.getTime() + 60 * 24 * 60 * 60 * 1000),
        recursos: 'Equipe de marketing, orçamento para campanhas',
        metricas: 'Plano de marketing documentado e aprovado'
      }
    );

    return acoes;
  };

  const gerarFerramentas = (respostas: RespostaPlanejamento[]) => {
    // Processar respostas SWOT
    const swotRespostas = respostas.filter(r => r.swotClassificacao);
    const forcas = swotRespostas.filter(r => r.swotClassificacao === 'Força').map(r => r.resposta as string);
    const fraquezas = swotRespostas.filter(r => r.swotClassificacao === 'Fraqueza').map(r => r.resposta as string);
    const oportunidades = swotRespostas.filter(r => r.swotClassificacao === 'Oportunidade').map(r => r.resposta as string);
    const ameacas = swotRespostas.filter(r => r.swotClassificacao === 'Ameaça').map(r => r.resposta as string);

    // Gerar diagnóstico
    const diagnostico = {
      processosDocumentados: respostas.find(r => r.perguntaId === 'processos_documentados')?.resposta === 'sim',
      controleQualidade: respostas.find(r => r.perguntaId === 'controle_qualidade')?.resposta === 'sim',
      metasDefinidas: respostas.find(r => r.perguntaId === 'metas_definidas')?.resposta === 'sim',
      acompanhamentoResultados: respostas.find(r => r.perguntaId === 'acompanhamento_resultados')?.resposta === 'sim',
      sistemaGestao: respostas.find(r => r.perguntaId === 'sistema_gestao')?.resposta === 'sim',
      capacitacaoEquipe: respostas.find(r => r.perguntaId === 'capacitacao_equipe')?.resposta === 'sim',
    };

    // Gerar PUV
    const puv = {
      diferencial: respostas.find(r => r.perguntaId === 'diferencial_competitivo')?.resposta || '',
      problema: respostas.find(r => r.perguntaId === 'problema_cliente')?.resposta || '',
      beneficio: respostas.find(r => r.perguntaId === 'beneficio_principal')?.resposta || '',
    };

    // Gerar mapa da equipe
    const mapaEquipe = {
      numeroFuncionarios: respostas.find(r => r.perguntaId === 'numero_funcionarios')?.resposta || '',
      estruturaHierarquica: respostas.find(r => r.perguntaId === 'estrutura_hierarquica')?.resposta || '',
      principaisCargos: respostas.find(r => r.perguntaId === 'principais_cargos')?.resposta || '',
    };

    // Gerar fase da empresa
    const faseEmpresa = {
      tempoMercado: respostas.find(r => r.perguntaId === 'tempo_mercado')?.resposta || '',
      faturamento: respostas.find(r => r.perguntaId === 'faturamento_atual')?.resposta || '',
      crescimento: respostas.find(r => r.perguntaId === 'crescimento_atual')?.resposta || '',
    };

    // Gerar mapa de negócio
    const mapaNegocios = {
      empresa: respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta || '',
      setor: respostas.find(r => r.perguntaId === 'empresa_setor')?.resposta || '',
      produtos: respostas.find(r => r.perguntaId === 'empresa_produtos')?.resposta || '',
      publicoAlvo: respostas.find(r => r.perguntaId === 'empresa_publico')?.resposta || '',
    };

    return {
      diagnostico,
      swot: {
        forcas,
        fraquezas,
        oportunidades,
        ameacas
      },
      mapaNegocios,
      puv,
      mapaEquipe,
      faseEmpresa
    };
  };

  const atualizarProgresso = (novoProgresso: number) => {
    if (dadosPlanejamento) {
      const dadosAtualizados = {
        ...dadosPlanejamento,
        progresso: novoProgresso,
        dataAtualizacao: new Date()
      };
      setDadosPlanejamento(dadosAtualizados);
      
      // Salvar no Supabase
      // await supabase.from('planejamento_estrategico').update({
      //   dados: dadosAtualizados
      // }).eq('user_id', userId);
    }
  };

  const reiniciarPlanejamento = () => {
    setDadosPlanejamento(null);
    setEtapa('intro');
  };

  const exportarPlano = () => {
    // Implementar exportação para PDF
    toast({
      title: "Exportando...",
      description: "Seu plano será baixado em instantes.",
    });
  };

  if (etapa === 'questionario') {
    return <PlanejamentoEstrategicoForm onComplete={processarRespostas} />;
  }

  if (etapa === 'processando') {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Brain className="h-6 w-6 animate-pulse" />
              Processando Planejamento Estratégico
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="animate-spin h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-lg font-medium">Gerando seu plano personalizado...</p>
              <p className="text-gray-600 mt-2">
                Estamos analisando suas respostas e criando um plano de ação detalhado
              </p>
            </div>
            <Progress value={75} className="mt-4" />
            <div className="space-y-2 text-sm text-gray-600">
              <p>✅ Analisando respostas do questionário</p>
              <p>✅ Gerando diagnóstico empresarial</p>
              <p>✅ Criando análise SWOT</p>
              <p className="animate-pulse">🔄 Desenvolvendo plano de ação...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (etapa === 'plano' && dadosPlanejamento) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Planejamento Estratégico</h1>
            <p className="text-gray-600">Acompanhe o progresso do seu plano de ação</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={exportarPlano}>
              <Download className="mr-2 h-4 w-4" />
              Exportar PDF
            </Button>
            <Button variant="outline" onClick={reiniciarPlanejamento}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Novo Planejamento
            </Button>
          </div>
        </div>
        
        <PlanoAcaoGerado 
          dados={dadosPlanejamento} 
          onUpdateProgresso={atualizarProgresso}
        />
      </div>
    );
  }

  // Tela inicial
  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-3xl mb-4">Planejamento Estratégico Inteligente</CardTitle>
          <p className="text-xl text-gray-600">
            Um questionário completo que gera automaticamente todas as ferramentas de gestão e um plano de ação personalizado
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Brain className="h-5 w-5" />
                O que você receberá:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Diagnóstico empresarial completo
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Análise SWOT personalizada
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Mapa do negócio estruturado
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Proposta única de valor definida
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Mapa da equipe organizacional
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  Identificação da fase da empresa
                </li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Target className="h-5 w-5" />
                Plano de Ação SMART:
              </h3>
              <ul className="space-y-2">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Cronograma de 6 meses
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Ações específicas e mensuráveis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Priorização inteligente
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Acompanhamento de progresso
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Recursos necessários definidos
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Métricas de sucesso claras
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Como funciona:</h3>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="bg-blue-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-blue-600">1</span>
                </div>
                <p>Responda o questionário inteligente com suporte de IA</p>
              </div>
              <div className="text-center">
                <div className="bg-purple-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-purple-600">2</span>
                </div>
                <p>Receba todas as ferramentas preenchidas automaticamente</p>
              </div>
              <div className="text-center">
                <div className="bg-green-100 rounded-full p-3 w-12 h-12 mx-auto mb-2 flex items-center justify-center">
                  <span className="font-bold text-green-600">3</span>
                </div>
                <p>Execute seu plano de ação e acompanhe o progresso</p>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Button 
              onClick={iniciarQuestionario}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3"
            >
              <Play className="mr-2 h-5 w-5" />
              Iniciar Planejamento Estratégico
            </Button>
            <p className="text-sm text-gray-500 mt-2">
              Tempo estimado: 15-20 minutos
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanejamentoEstrategico;
