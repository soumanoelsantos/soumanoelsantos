import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Bot, Sparkles, CheckCircle2 } from "lucide-react";
import PlanejamentoEstrategicoForm from "./PlanejamentoEstrategicoForm";
import PlanoAcaoGerado from "./PlanoAcaoGerado";
import { PlanejamentoEstrategicoData, RespostaPlanejamento, PlanoAcao } from "@/types/planejamentoEstrategico";

const PlanejamentoEstrategico: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [etapa, setEtapa<'questionario' | 'resultado'>('questionario');
  const [dados, setDados] = useState<PlanejamentoEstrategicoData | null>(null);
  const [gerandoPlano, setGerandoPlano] = useState(false);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const gerarPlanoAcaoCompleto = (respostas: RespostaPlanejamento[]): PlanoAcao[] => {
    const acoes: PlanoAcao[] = [];
    let contadorId = 1;

    // Função para adicionar ação
    const adicionarAcao = (
      acao: string, 
      categoria: string, 
      prioridade: 'alta' | 'media' | 'baixa',
      prazoMeses: number,
      responsavel?: string,
      recursos?: string,
      metricas?: string
    ) => {
      const dataVencimento = new Date();
      dataVencimento.setMonth(dataVencimento.getMonth() + prazoMeses);
      
      acoes.push({
        id: contadorId.toString(),
        acao,
        categoria,
        prazo: `${prazoMeses} ${prazoMeses === 1 ? 'mês' : 'meses'}`,
        prioridade,
        concluida: false,
        dataVencimento,
        responsavel,
        recursos,
        metricas
      });
      contadorId++;
    };

    // Analisar respostas e gerar ações específicas
    respostas.forEach(resposta => {
      const { perguntaId, resposta: respostaValor, swotClassificacao } = resposta;

      // Ações baseadas no diagnóstico empresarial
      if (perguntaId === 'processos_documentados' && respostaValor === 'nao') {
        adicionarAcao(
          'Documentar todos os processos operacionais da empresa',
          'Processos',
          'alta',
          2,
          'Gestor de Operações',
          'Software de documentação, tempo da equipe',
          'Número de processos documentados'
        );
        adicionarAcao(
          'Criar manual de procedimentos padrão',
          'Processos',
          'alta',
          3,
          'Líder de cada área',
          'Ferramenta de edição, revisão técnica',
          'Percentual de processos padronizados'
        );
        adicionarAcao(
          'Treinar equipe nos novos processos documentados',
          'Processos',
          'media',
          4,
          'RH e Gestores',
          'Material de treinamento, tempo para capacitação',
          'Taxa de adesão aos novos processos'
        );
      }

      if (perguntaId === 'controle_qualidade' && respostaValor === 'nao') {
        adicionarAcao(
          'Implementar sistema de controle de qualidade',
          'Qualidade',
          'alta',
          2,
          'Gerente de Qualidade',
          'Software de gestão da qualidade, certificação',
          'Índice de qualidade, reclamações de clientes'
        );
        adicionarAcao(
          'Criar indicadores de qualidade por produto/serviço',
          'Qualidade',
          'media',
          1,
          'Equipe de Qualidade',
          'Sistema de métricas, relatórios',
          'Número de indicadores implementados'
        );
        adicionarAcao(
          'Estabelecer rotina de auditoria interna',
          'Qualidade',
          'media',
          3,
          'Auditor interno',
          'Checklist de auditoria, tempo para revisões',
          'Frequência de auditorias realizadas'
        );
      }

      if (perguntaId === 'metas_definidas' && respostaValor === 'nao') {
        adicionarAcao(
          'Definir metas SMART para cada área da empresa',
          'Planejamento',
          'alta',
          1,
          'Diretoria',
          'Reuniões de planejamento, consultoria estratégica',
          'Número de metas definidas e alcançadas'
        );
        adicionarAcao(
          'Criar plano estratégico anual com objetivos claros',
          'Planejamento',
          'alta',
          2,
          'CEO e Diretores',
          'Consultoria em planejamento estratégico',
          'Percentual de objetivos atingidos'
        );
        adicionarAcao(
          'Implementar reuniões mensais de acompanhamento de metas',
          'Planejamento',
          'media',
          1,
          'Gestores de área',
          'Sistema de relatórios, tempo para reuniões',
          'Aderência às reuniões de acompanhamento'
        );
      }

      if (perguntaId === 'acompanhamento_resultados' && respostaValor === 'nao') {
        adicionarAcao(
          'Criar dashboard de indicadores chave (KPIs)',
          'Gestão',
          'alta',
          2,
          'Analista de BI',
          'Software de BI, integração de dados',
          'Número de KPIs monitorados'
        );
        adicionarAcao(
          'Estabelecer rotina de análise de resultados',
          'Gestão',
          'media',
          1,
          'Gerentes',
          'Relatórios gerenciais, tempo de análise',
          'Frequência de análises realizadas'
        );
        adicionarAcao(
          'Implementar relatórios automatizados',
          'Gestão',
          'media',
          3,
          'TI',
          'Automação, integração de sistemas',
          'Percentual de relatórios automatizados'
        );
      }

      if (perguntaId === 'sistema_gestao' && respostaValor === 'nao') {
        adicionarAcao(
          'Pesquisar e implementar sistema ERP adequado',
          'Tecnologia',
          'alta',
          4,
          'TI e Diretoria',
          'Investimento em software, consultoria',
          'Sistema ERP funcionando plenamente'
        );
        adicionarAcao(
          'Treinar equipe no novo sistema de gestão',
          'Tecnologia',
          'alta',
          2,
          'TI e RH',
          'Treinamento especializado, suporte técnico',
          'Taxa de adoção do sistema pela equipe'
        );
        adicionarAcao(
          'Migrar dados para o novo sistema',
          'Tecnologia',
          'media',
          3,
          'TI',
          'Consultoria em migração de dados',
          'Percentual de dados migrados corretamente'
        );
      }

      if (perguntaId === 'capacitacao_equipe' && respostaValor === 'nao') {
        adicionarAcao(
          'Criar programa de capacitação contínua',
          'Pessoas',
          'alta',
          2,
          'RH',
          'Budget para treinamentos, plataforma de ensino',
          'Horas de treinamento por colaborador'
        );
        adicionarAcao(
          'Mapear competências necessárias por cargo',
          'Pessoas',
          'media',
          1,
          'RH e Gestores',
          'Consultoria em gestão de competências',
          'Matriz de competências completa'
        );
        adicionarAcao(
          'Implementar plano de desenvolvimento individual',
          'Pessoas',
          'media',
          3,
          'RH',
          'Coaching, mentoring, cursos',
          'Percentual de colaboradores com PDI'
        );
      }

      // Ações baseadas na análise SWOT
      if (swotClassificacao === 'Fraqueza') {
        switch (perguntaId) {
          case 'swot_marketing_plano':
            adicionarAcao(
              'Desenvolver estratégia de marketing digital completa',
              'Marketing',
              'alta',
              2,
              'Gerente de Marketing',
              'Agência de marketing, budget publicitário',
              'ROI das campanhas, leads gerados'
            );
            adicionarAcao(
              'Criar presença consistente nas redes sociais',
              'Marketing',
              'media',
              1,
              'Social Media',
              'Ferramentas de gestão, criação de conteúdo',
              'Engajamento e alcance nas redes'
            );
            break;

          case 'swot_equipe_qualificada':
            adicionarAcao(
              'Recrutar talentos especializados para áreas críticas',
              'Pessoas',
              'alta',
              3,
              'RH',
              'Processo seletivo, headhunter',
              'Qualidade dos profissionais contratados'
            );
            adicionarAcao(
              'Criar programa de retenção de talentos',
              'Pessoas',
              'media',
              2,
              'RH',
              'Benefícios, plano de carreira',
              'Taxa de retenção de colaboradores'
            );
            break;

          case 'swot_fluxo_caixa':
            adicionarAcao(
              'Implementar controle rigoroso de fluxo de caixa',
              'Financeiro',
              'alta',
              1,
              'CFO',
              'Software financeiro, consultoria',
              'Previsibilidade do fluxo de caixa'
            );
            adicionarAcao(
              'Renegociar prazos de pagamento com fornecedores',
              'Financeiro',
              'alta',
              1,
              'Compras',
              'Negociação, relacionamento',
              'Prazo médio de pagamento'
            );
            break;

          case 'swot_tecnologia_atual':
            adicionarAcao(
              'Modernizar infraestrutura tecnológica',
              'Tecnologia',
              'alta',
              4,
              'TI',
              'Investimento em hardware/software',
              'Atualização tecnológica completa'
            );
            break;

          case 'swot_clientes_fieis':
            adicionarAcao(
              'Criar programa de fidelização de clientes',
              'Vendas',
              'alta',
              2,
              'Gerente Comercial',
              'CRM, programa de pontos',
              'Taxa de retenção de clientes'
            );
            break;
        }
      }

      // Ações para aproveitar oportunidades
      if (swotClassificacao === 'Oportunidade') {
        switch (perguntaId) {
          case 'swot_novo_nicho_mercado':
            adicionarAcao(
              'Pesquisar e validar novo nicho de mercado',
              'Estratégia',
              'media',
              2,
              'Diretor Comercial',
              'Pesquisa de mercado, testes',
              'Viabilidade do novo nicho'
            );
            adicionarAcao(
              'Desenvolver produto/serviço para novo nicho',
              'Desenvolvimento',
              'media',
              4,
              'P&D',
              'Investimento em desenvolvimento',
              'Lançamento do novo produto'
            );
            break;

          case 'swot_parcerias_estrategicas':
            adicionarAcao(
              'Mapear potenciais parceiros estratégicos',
              'Estratégia',
              'media',
              1,
              'CEO',
              'Network, pesquisa de mercado',
              'Número de parcerias estabelecidas'
            );
            adicionarAcao(
              'Estruturar acordos de parceria',
              'Jurídico',
              'media',
              2,
              'Jurídico',
              'Advocacia, contratos',
              'Contratos de parceria assinados'
            );
            break;

          case 'swot_expansao_geografica':
            adicionarAcao(
              'Estudar viabilidade de expansão geográfica',
              'Estratégia',
              'media',
              3,
              'Planejamento',
              'Consultoria, estudo de mercado',
              'Plano de expansão aprovado'
            );
            break;
        }
      }

      // Ações para neutralizar ameaças
      if (swotClassificacao === 'Ameaça') {
        switch (perguntaId) {
          case 'swot_concorrentes_redes_sociais':
            adicionarAcao(
              'Acelerar investimento em marketing digital',
              'Marketing',
              'alta',
              1,
              'Marketing',
              'Budget adicional, agência especializada',
              'Presença digital competitiva'
            );
            break;

          case 'swot_regulamentacao_setor':
            adicionarAcao(
              'Adequar-se às novas regulamentações',
              'Compliance',
              'alta',
              2,
              'Jurídico',
              'Consultoria regulatória',
              'Conformidade total com regulamentações'
            );
            break;

          case 'swot_crise_economica':
            adicionarAcao(
              'Criar plano de contingência para crise',
              'Estratégia',
              'alta',
              1,
              'Diretoria',
              'Planejamento estratégico',
              'Plano de contingência aprovado'
            );
            adicionarAcao(
              'Diversificar fontes de receita',
              'Comercial',
              'media',
              3,
              'Comercial',
              'Desenvolvimento de novos produtos',
              'Número de fontes de receita'
            );
            break;

          case 'swot_competidores_grandes':
            adicionarAcao(
              'Focar em diferenciação e nicho específico',
              'Estratégia',
              'alta',
              2,
              'CEO',
              'Consultoria estratégica',
              'Posicionamento diferenciado no mercado'
            );
            break;
        }
      }
    });

    // Ações adicionais baseadas na proposta única de valor
    const diferencialResposta = respostas.find(r => r.perguntaId === 'diferencial_competitivo');
    if (!diferencialResposta || !diferencialResposta.resposta) {
      adicionarAcao(
        'Definir claramente proposta única de valor',
        'Estratégia',
        'alta',
        1,
        'CEO',
        'Workshop de estratégia',
        'PUV definida e comunicada'
      );
    }

    // Ações para desenvolvimento da equipe baseadas no tamanho
    const tamanhoEquipe = respostas.find(r => r.perguntaId === 'numero_funcionarios')?.resposta;
    if (tamanhoEquipe === '1-5') {
      adicionarAcao(
        'Planejar expansão da equipe conforme crescimento',
        'Pessoas',
        'media',
        3,
        'RH',
        'Planejamento de headcount',
        'Plano de contratações'
      );
    } else if (tamanhoEquipe === '6-15') {
      adicionarAcao(
        'Implementar estrutura de gestão intermediária',
        'Pessoas',
        'media',
        2,
        'RH',
        'Definição de hierarquia',
        'Estrutura organizacional clara'
      );
    }

    // Ações baseadas na fase da empresa
    const crescimento = respostas.find(r => r.perguntaId === 'crescimento_atual')?.resposta;
    if (crescimento === 'Em declínio') {
      adicionarAcao(
        'Implementar plano de recuperação urgente',
        'Estratégia',
        'alta',
        1,
        'CEO',
        'Consultoria de turnaround',
        'Reversão da tendência de declínio'
      );
    } else if (crescimento === 'Estagnado') {
      adicionarAcao(
        'Identificar e remover gargalos operacionais',
        'Operações',
        'alta',
        2,
        'COO',
        'Análise de processos',
        'Eliminação de gargalos identificados'
      );
    }

    // Garantir que temos pelo menos 15-20 ações
    if (acoes.length < 15) {
      // Adicionar ações complementares essenciais
      const acoesComplementares = [
        {
          acao: 'Implementar reuniões semanais de alinhamento',
          categoria: 'Gestão',
          prioridade: 'media' as const,
          prazo: 1,
          responsavel: 'Todos os gestores',
          recursos: 'Tempo para reuniões',
          metricas: 'Frequência e qualidade das reuniões'
        },
        {
          acao: 'Criar sistema de feedback contínuo',
          categoria: 'Pessoas',
          prioridade: 'media' as const,
          prazo: 2,
          responsavel: 'RH',
          recursos: 'Ferramenta de feedback',
          metricas: 'Frequência de feedbacks'
        },
        {
          acao: 'Desenvolver programa de inovação',
          categoria: 'Inovação',
          prioridade: 'baixa' as const,
          prazo: 4,
          responsavel: 'P&D',
          recursos: 'Budget para inovação',
          metricas: 'Número de ideias implementadas'
        },
        {
          acao: 'Implementar programa de sustentabilidade',
          categoria: 'Sustentabilidade',
          prioridade: 'baixa' as const,
          prazo: 6,
          responsavel: 'Comitê de Sustentabilidade',
          recursos: 'Investimento em práticas sustentáveis',
          metricas: 'Redução de impacto ambiental'
        },
        {
          acao: 'Criar programa de mentoring interno',
          categoria: 'Pessoas',
          prioridade: 'media' as const,
          prazo: 3,
          responsavel: 'RH',
          recursos: 'Tempo dos mentores',
          metricas: 'Número de mentorias ativas'
        }
      ];

      acoesComplementares.forEach(acaoComp => {
        if (acoes.length < 20) {
          adicionarAcao(
            acaoComp.acao,
            acaoComp.categoria,
            acaoComp.prioridade,
            acaoComp.prazo,
            acaoComp.responsavel,
            acaoComp.recursos,
            acaoComp.metricas
          );
        }
      });
    }

    return acoes.sort((a, b) => {
      const prioridadeOrdem = { alta: 1, media: 2, baixa: 3 };
      return prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade];
    });
  };

  const processarRespostas = async (respostas: RespostaPlanejamento[]) => {
    setGerandoPlano(true);
    
    try {
      // Obter informações básicas
      const empresaNome = respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta as string || 'Empresa';
      
      // Gerar ferramentas baseadas nas respostas
      const ferramentasGeradas = gerarFerramentasCompletas(respostas);
      
      // Gerar plano de ação abrangente
      const planoAcao = gerarPlanoAcaoCompleto(respostas);
      
      const dadosCompletos: PlanejamentoEstrategicoData = {
        empresaNome,
        respostas,
        ferramentasGeradas,
        planoAcao,
        progresso: 0,
        dataInicio: new Date(),
        dataAtualizacao: new Date(),
        status: 'em_andamento'
      };
      
      setDados(dadosCompletos);
      setEtapa('resultado');
      
      toast({
        title: "Plano Estratégico Gerado!",
        description: `Foram criadas ${planoAcao.length} ações estratégicas para os próximos 6 meses.`,
      });
      
    } catch (error) {
      console.error("Erro ao gerar plano:", error);
      toast({
        title: "Erro",
        description: "Não foi possível gerar o plano estratégico. Tente novamente.",
        variant: "destructive"
      });
    }
    
    setGerandoPlano(false);
  };

  const gerarFerramentasCompletas = (respostas: RespostaPlanejamento[]) => {
    const diagnostico = {
      processosDocumentados: respostas.find(r => r.perguntaId === 'processos_documentados')?.resposta === 'sim',
      controleQualidade: respostas.find(r => r.perguntaId === 'controle_qualidade')?.resposta === 'sim',
      metasDefinidas: respostas.find(r => r.perguntaId === 'metas_definidas')?.resposta === 'sim',
      acompanhamentoResultados: respostas.find(r => r.perguntaId === 'acompanhamento_resultados')?.resposta === 'sim',
      sistemaGestao: respostas.find(r => r.perguntaId === 'sistema_gestao')?.resposta === 'sim',
      capacitacaoEquipe: respostas.find(r => r.perguntaId === 'capacitacao_equipe')?.resposta === 'sim'
    };

    const swot = {
      forcas: respostas.filter(r => r.swotClassificacao === 'Força').map(r => r.perguntaId),
      fraquezas: respostas.filter(r => r.swotClassificacao === 'Fraqueza').map(r => r.perguntaId),
      oportunidades: respostas.filter(r => r.swotClassificacao === 'Oportunidade').map(r => r.perguntaId),
      ameacas: respostas.filter(r => r.swotClassificacao === 'Ameaça').map(r => r.perguntaId)
    };

    const mapaNegocios = {
      empresa: respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta as string || '',
      setor: respostas.find(r => r.perguntaId === 'empresa_setor')?.resposta as string || '',
      produtos: respostas.find(r => r.perguntaId === 'empresa_produtos')?.resposta as string || '',
      publicoAlvo: respostas.find(r => r.perguntaId === 'empresa_publico')?.resposta as string || ''
    };

    const puv = {
      diferencial: respostas.find(r => r.perguntaId === 'diferencial_competitivo')?.resposta as string || '',
      problema: respostas.find(r => r.perguntaId === 'problema_cliente')?.resposta as string || '',
      beneficio: respostas.find(r => r.perguntaId === 'beneficio_principal')?.resposta as string || ''
    };

    const mapaEquipe = {
      numeroFuncionarios: respostas.find(r => r.perguntaId === 'numero_funcionarios')?.resposta as string || '',
      estruturaHierarquica: respostas.find(r => r.perguntaId === 'estrutura_hierarquica')?.resposta as string || '',
      principaisCargos: respostas.find(r => r.perguntaId === 'principais_cargos')?.resposta as string || ''
    };

    const faseEmpresa = {
      tempoMercado: respostas.find(r => r.perguntaId === 'tempo_mercado')?.resposta as string || '',
      faturamento: respostas.find(r => r.perguntaId === 'faturamento_atual')?.resposta as string || '',
      crescimento: respostas.find(r => r.perguntaId === 'crescimento_atual')?.resposta as string || ''
    };

    return {
      diagnostico,
      swot,
      mapaNegocios,
      puv,
      mapaEquipe,
      faseEmpresa
    };
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

  if (gerandoPlano) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card>
          <CardContent className="p-8 text-center">
            <Bot className="h-16 w-16 mx-auto mb-4 animate-pulse text-blue-600" />
            <h2 className="text-2xl font-bold mb-2">Gerando Plano Estratégico</h2>
            <p className="text-gray-600 mb-4">
              Analisando suas respostas e criando um plano de ação personalizado...
            </p>
            <div className="flex items-center justify-center gap-2 text-blue-600">
              <Sparkles className="h-5 w-5 animate-spin" />
              <span>Processando dados estratégicos</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (etapa === 'resultado' && dados) {
    return <PlanoAcaoGerado dados={dados} onUpdateProgresso={handleUpdateProgresso} />;
  }

  return <PlanejamentoEstrategicoForm onComplete={processarRespostas} />;
};

export default PlanejamentoEstrategico;
