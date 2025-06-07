
import { PlanoAcao } from '@/types/planejamentoEstrategico';

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

export const useActionPlanGenerator = () => {
  const gerarPlanoAcao = (resultados: DiagnosticoResultados): PlanoAcao[] => {
    const acoes: PlanoAcao[] = [];
    let contadorId = 1;

    // Função auxiliar para criar ID único
    const criarId = () => `acao_${Date.now()}_${contadorId++}`;

    // Ações baseadas em áreas com baixa performance (menos de 70%)
    Object.entries(resultados).forEach(([area, dados]) => {
      const acoesArea = gerarAcoesPorArea(area, dados, criarId);
      acoes.push(...acoesArea);
    });

    // Ações estratégicas gerais sempre incluídas
    const acoesEstrategicas = gerarAcoesEstrategicasGerais(criarId);
    acoes.push(...acoesEstrategicas);

    // Ações de implementação e acompanhamento
    const acoesImplementacao = gerarAcoesImplementacao(criarId);
    acoes.push(...acoesImplementacao);

    // Ações de desenvolvimento organizacional
    const acoesDesenvolvimento = gerarAcoesDesenvolvimento(criarId);
    acoes.push(...acoesDesenvolvimento);

    return acoes;
  };

  const gerarAcoesPorArea = (area: string, dados: any, criarId: () => string): PlanoAcao[] => {
    const acoes: PlanoAcao[] = [];
    
    switch (area) {
      case 'comercial':
        if (dados.percentage < 70) {
          acoes.push(
            {
              id: criarId(),
              acao: 'Estruturar processo de vendas com etapas definidas e critérios claros',
              categoria: 'Comercial',
              prazo: '60 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              responsavel: 'Diretor Comercial',
              recursos: 'Sistema CRM, treinamento equipe de vendas',
              metricas: 'Taxa de conversão por etapa, tempo de ciclo de vendas',
              tipo: 'estrategica'
            },
            {
              id: criarId(),
              acao: 'Implementar CRM para gestão de leads e oportunidades',
              categoria: 'Comercial',
              prazo: '45 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
              responsavel: 'Coordenador de Vendas',
              recursos: 'Software CRM, integração com sistemas existentes',
              metricas: 'Número de leads qualificados, taxa de conversão',
              tipo: 'implementacao'
            },
            {
              id: criarId(),
              acao: 'Criar script de vendas e materiais de apoio comercial',
              categoria: 'Comercial',
              prazo: '30 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              responsavel: 'Gerente de Vendas',
              recursos: 'Designer, copywriter, aprovação direção',
              metricas: 'Uso dos materiais pela equipe, feedback dos clientes',
              tipo: 'implementacao'
            },
            {
              id: criarId(),
              acao: 'Estabelecer metas individuais e coletivas de vendas',
              categoria: 'Comercial',
              prazo: '15 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
              responsavel: 'Diretor Comercial',
              recursos: 'Histórico de vendas, projeções de mercado',
              metricas: 'Alcance das metas mensais, evolução individual',
              tipo: 'estrategica'
            }
          );
        }
        
        // Ações de melhoria contínua sempre incluídas
        acoes.push(
          {
            id: criarId(),
            acao: 'Implementar reuniões semanais de follow-up comercial',
            categoria: 'Comercial',
            prazo: '7 dias',
            prioridade: 'media',
            concluida: false,
            dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            responsavel: 'Gerente de Vendas',
            recursos: 'Agenda estruturada, relatórios de vendas',
            metricas: 'Frequência das reuniões, ações geradas',
            tipo: 'implementacao'
          }
        );
        break;

      case 'gestao':
        if (dados.percentage < 70) {
          acoes.push(
            {
              id: criarId(),
              acao: 'Implementar reuniões semanais de acompanhamento com indicadores',
              categoria: 'Gestão',
              prazo: '30 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              responsavel: 'Diretor Geral',
              recursos: 'Dashboard de indicadores, agenda estruturada',
              metricas: 'Número de reuniões realizadas, ações acompanhadas',
              tipo: 'estrategica'
            },
            {
              id: criarId(),
              acao: 'Definir e documentar organograma da empresa',
              categoria: 'Gestão',
              prazo: '21 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
              responsavel: 'RH',
              recursos: 'Software de desenho, validação com líderes',
              metricas: 'Clareza de responsabilidades, redução de conflitos',
              tipo: 'implementacao'
            },
            {
              id: criarId(),
              acao: 'Criar sistema de delegação e acompanhamento de tarefas',
              categoria: 'Gestão',
              prazo: '45 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
              responsavel: 'Coordenador de Processos',
              recursos: 'Ferramenta de gestão de projetos, treinamento',
              metricas: 'Taxa de conclusão de tarefas, tempo médio de execução',
              tipo: 'implementacao'
            }
          );
        }
        
        acoes.push(
          {
            id: criarId(),
            acao: 'Estabelecer rotina de feedback 360° trimestral',
            categoria: 'Gestão',
            prazo: '60 dias',
            prioridade: 'media',
            concluida: false,
            dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            responsavel: 'RH',
            recursos: 'Formulários de avaliação, sistema digital',
            metricas: 'Participação nas avaliações, planos de desenvolvimento',
            tipo: 'estrategica'
          }
        );
        break;

      case 'rh':
        if (dados.percentage < 70) {
          acoes.push(
            {
              id: criarId(),
              acao: 'Criar programa de desenvolvimento e capacitação da equipe',
              categoria: 'Recursos Humanos',
              prazo: '90 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              responsavel: 'Gestor de RH',
              recursos: 'Plataforma de treinamento, avaliação de competências',
              metricas: 'Horas de treinamento, satisfação dos funcionários',
              tipo: 'estrategica'
            },
            {
              id: criarId(),
              acao: 'Implementar processo estruturado de recrutamento e seleção',
              categoria: 'Recursos Humanos',
              prazo: '60 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              responsavel: 'RH',
              recursos: 'Testes técnicos, entrevistas estruturadas',
              metricas: 'Tempo de contratação, qualidade dos contratados',
              tipo: 'implementacao'
            },
            {
              id: criarId(),
              acao: 'Criar manual do colaborador e programa de integração',
              categoria: 'Recursos Humanos',
              prazo: '45 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
              responsavel: 'RH',
              recursos: 'Designer, validação jurídica, impressão',
              metricas: 'Tempo de adaptação, satisfação dos novos colaboradores',
              tipo: 'implementacao'
            }
          );
        }
        
        acoes.push(
          {
            id: criarId(),
            acao: 'Implementar pesquisa de clima organizacional semestral',
            categoria: 'Recursos Humanos',
            prazo: '30 dias',
            prioridade: 'baixa',
            concluida: false,
            dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            responsavel: 'RH',
            recursos: 'Plataforma de pesquisa, análise estatística',
            metricas: 'Índice de satisfação, taxa de participação',
            tipo: 'estrategica'
          }
        );
        break;

      case 'marketing':
        if (dados.percentage < 70) {
          acoes.push(
            {
              id: criarId(),
              acao: 'Desenvolver estratégia de marketing digital e geração de leads',
              categoria: 'Marketing',
              prazo: '45 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
              responsavel: 'Gerente de Marketing',
              recursos: 'Ferramentas de automação, criação de conteúdo',
              metricas: 'Leads qualificados, taxa de conversão de leads',
              tipo: 'estrategica'
            },
            {
              id: criarId(),
              acao: 'Criar identidade visual e manual de marca',
              categoria: 'Marketing',
              prazo: '60 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              responsavel: 'Designer',
              recursos: 'Software de design, consultoria de branding',
              metricas: 'Consistência da marca, reconhecimento no mercado',
              tipo: 'implementacao'
            },
            {
              id: criarId(),
              acao: 'Implementar presença nas redes sociais relevantes',
              categoria: 'Marketing',
              prazo: '30 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              responsavel: 'Social Media',
              recursos: 'Cronograma de conteúdo, ferramentas de gestão',
              metricas: 'Seguidores, engajamento, alcance',
              tipo: 'implementacao'
            }
          );
        }
        
        acoes.push(
          {
            id: criarId(),
            acao: 'Desenvolver programa de fidelização de clientes',
            categoria: 'Marketing',
            prazo: '75 dias',
            prioridade: 'media',
            concluida: false,
            dataVencimento: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
            responsavel: 'Gerente de Marketing',
            recursos: 'Sistema de pontuação, benefícios exclusivos',
            metricas: 'Taxa de retenção, valor vitalício do cliente',
            tipo: 'estrategica'
          }
        );
        break;

      case 'financeiro':
        if (dados.percentage < 70) {
          acoes.push(
            {
              id: criarId(),
              acao: 'Implementar controle financeiro com fluxo de caixa e DRE mensal',
              categoria: 'Financeiro',
              prazo: '30 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              responsavel: 'Controller/CFO',
              recursos: 'Sistema ERP, consultoria contábil',
              metricas: 'Margem de lucro, fluxo de caixa projetado vs real',
              tipo: 'estrategica'
            },
            {
              id: criarId(),
              acao: 'Estabelecer política de cobrança e controle de inadimplência',
              categoria: 'Financeiro',
              prazo: '21 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
              responsavel: 'Financeiro',
              recursos: 'Software de cobrança, procedimentos documentados',
              metricas: 'Taxa de inadimplência, prazo médio de recebimento',
              tipo: 'implementacao'
            },
            {
              id: criarId(),
              acao: 'Criar orçamento anual com acompanhamento mensal',
              categoria: 'Financeiro',
              prazo: '45 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
              responsavel: 'Controller',
              recursos: 'Planilhas avançadas, dados históricos',
              metricas: 'Desvio do orçamento, precisão das projeções',
              tipo: 'estrategica'
            }
          );
        }
        
        acoes.push(
          {
            id: criarId(),
            acao: 'Implementar análise de custos por produto/serviço',
            categoria: 'Financeiro',
            prazo: '60 dias',
            prioridade: 'media',
            concluida: false,
            dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
            responsavel: 'Analista Financeiro',
            recursos: 'Sistema de custeio, consultoria especializada',
            metricas: 'Margem por produto, rentabilidade por linha',
            tipo: 'estrategica'
          }
        );
        break;

      case 'cliente':
        if (dados.percentage < 70) {
          acoes.push(
            {
              id: criarId(),
              acao: 'Criar programa de relacionamento e fidelização de clientes',
              categoria: 'Relacionamento com Cliente',
              prazo: '60 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
              responsavel: 'Gerente de Relacionamento',
              recursos: 'CRM, pesquisa de satisfação, programa de benefícios',
              metricas: 'NPS, taxa de retenção, lifetime value',
              tipo: 'estrategica'
            },
            {
              id: criarId(),
              acao: 'Implementar pesquisa de satisfação pós-venda',
              categoria: 'Relacionamento com Cliente',
              prazo: '30 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
              responsavel: 'Atendimento ao Cliente',
              recursos: 'Plataforma de pesquisa, automação de envio',
              metricas: 'Taxa de resposta, índice de satisfação',
              tipo: 'implementacao'
            },
            {
              id: criarId(),
              acao: 'Criar base de conhecimento para atendimento ao cliente',
              categoria: 'Relacionamento com Cliente',
              prazo: '45 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
              responsavel: 'Coordenador de Atendimento',
              recursos: 'Plataforma wiki, documentação de processos',
              metricas: 'Tempo de resolução, satisfação do cliente',
              tipo: 'implementacao'
            }
          );
        }
        
        acoes.push(
          {
            id: criarId(),
            acao: 'Estabelecer canal de comunicação direta com clientes VIP',
            categoria: 'Relacionamento com Cliente',
            prazo: '21 dias',
            prioridade: 'baixa',
            concluida: false,
            dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
            responsavel: 'Gerente de Contas',
            recursos: 'WhatsApp Business, telefone direto',
            metricas: 'Tempo de resposta, satisfação dos VIPs',
            tipo: 'implementacao'
          }
        );
        break;

      case 'sistema':
        if (dados.percentage < 70) {
          acoes.push(
            {
              id: criarId(),
              acao: 'Mapear e documentar processos principais da empresa',
              categoria: 'Sistemas e Processos',
              prazo: '90 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
              responsavel: 'Coordenador de Processos',
              recursos: 'Software de mapeamento, consultoria em processos',
              metricas: 'Processos documentados, redução de retrabalho',
              tipo: 'implementacao'
            },
            {
              id: criarId(),
              acao: 'Implementar sistema de gestão integrado (ERP)',
              categoria: 'Sistemas e Processos',
              prazo: '120 dias',
              prioridade: 'alta',
              concluida: false,
              dataVencimento: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
              responsavel: 'TI',
              recursos: 'Software ERP, consultoria de implementação',
              metricas: 'Integração de dados, eficiência operacional',
              tipo: 'estrategica'
            },
            {
              id: criarId(),
              acao: 'Criar procedimentos operacionais padrão (POPs)',
              categoria: 'Sistemas e Processos',
              prazo: '75 dias',
              prioridade: 'media',
              concluida: false,
              dataVencimento: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
              responsavel: 'Coordenador de Qualidade',
              recursos: 'Documentação técnica, validação com equipes',
              metricas: 'Padronização de atividades, redução de erros',
              tipo: 'implementacao'
            }
          );
        }
        
        acoes.push(
          {
            id: criarId(),
            acao: 'Implementar backup automático e segurança de dados',
            categoria: 'Sistemas e Processos',
            prazo: '30 dias',
            prioridade: 'alta',
            concluida: false,
            dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
            responsavel: 'TI',
            recursos: 'Serviço de backup em nuvem, antivírus empresarial',
            metricas: 'Frequência de backup, zero perda de dados',
            tipo: 'implementacao'
          }
        );
        break;
    }
    
    return acoes;
  };

  const gerarAcoesEstrategicasGerais = (criarId: () => string): PlanoAcao[] => {
    return [
      {
        id: criarId(),
        acao: 'Elaborar planejamento estratégico anual com metas SMART',
        categoria: 'Estratégia',
        prazo: '45 dias',
        prioridade: 'alta',
        concluida: false,
        dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        responsavel: 'Diretor Geral',
        recursos: 'Consultoria estratégica, análise de mercado',
        metricas: 'Metas definidas, plano de ação detalhado',
        tipo: 'estrategica'
      },
      {
        id: criarId(),
        acao: 'Implementar dashboard de indicadores estratégicos (KPIs)',
        categoria: 'Gestão',
        prazo: '60 dias',
        prioridade: 'alta',
        concluida: false,
        dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        responsavel: 'Analista de BI',
        recursos: 'Ferramentas de BI, integração de sistemas',
        metricas: 'Indicadores monitorados, frequência de atualizações',
        tipo: 'implementacao'
      },
      {
        id: criarId(),
        acao: 'Definir missão, visão e valores da empresa',
        categoria: 'Estratégia',
        prazo: '30 dias',
        prioridade: 'media',
        concluida: false,
        dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        responsavel: 'Diretoria',
        recursos: 'Workshop estratégico, facilitador externo',
        metricas: 'Alinhamento da equipe, comunicação interna',
        tipo: 'estrategica'
      }
    ];
  };

  const gerarAcoesImplementacao = (criarId: () => string): PlanoAcao[] => {
    return [
      {
        id: criarId(),
        acao: 'Criar comitê de melhoria contínua',
        categoria: 'Implementação',
        prazo: '21 dias',
        prioridade: 'media',
        concluida: false,
        dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        responsavel: 'Diretor de Operações',
        recursos: 'Representantes de cada área, metodologia de melhoria',
        metricas: 'Projetos de melhoria iniciados, resultados obtidos',
        tipo: 'implementacao'
      },
      {
        id: criarId(),
        acao: 'Implementar sistema de sugestões dos colaboradores',
        categoria: 'Implementação',
        prazo: '30 dias',
        prioridade: 'baixa',
        concluida: false,
        dataVencimento: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        responsavel: 'RH',
        recursos: 'Plataforma digital, programa de reconhecimento',
        metricas: 'Número de sugestões, implementações realizadas',
        tipo: 'implementacao'
      },
      {
        id: criarId(),
        acao: 'Estabelecer rotina de análise de concorrência',
        categoria: 'Implementação',
        prazo: '45 dias',
        prioridade: 'media',
        concluida: false,
        dataVencimento: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        responsavel: 'Analista de Mercado',
        recursos: 'Ferramentas de monitoramento, pesquisa de mercado',
        metricas: 'Relatórios mensais, insights implementados',
        tipo: 'implementacao'
      }
    ];
  };

  const gerarAcoesDesenvolvimento = (criarId: () => string): PlanoAcao[] => {
    return [
      {
        id: criarId(),
        acao: 'Criar programa de mentoria interna',
        categoria: 'Desenvolvimento',
        prazo: '60 dias',
        prioridade: 'baixa',
        concluida: false,
        dataVencimento: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        responsavel: 'RH',
        recursos: 'Mapeamento de competências, cronograma de mentoria',
        metricas: 'Pares mentor-mentorado, evolução de competências',
        tipo: 'estrategica'
      },
      {
        id: criarId(),
        acao: 'Implementar programa de inovação e ideias',
        categoria: 'Desenvolvimento',
        prazo: '75 dias',
        prioridade: 'baixa',
        concluida: false,
        dataVencimento: new Date(Date.now() + 75 * 24 * 60 * 60 * 1000),
        responsavel: 'Diretor de Inovação',
        recursos: 'Budget para projetos, tempo dedicado à inovação',
        metricas: 'Projetos iniciados, receita de novos produtos/serviços',
        tipo: 'estrategica'
      },
      {
        id: criarId(),
        acao: 'Estabelecer parcerias estratégicas com fornecedores',
        categoria: 'Desenvolvimento',
        prazo: '90 dias',
        prioridade: 'media',
        concluida: false,
        dataVencimento: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
        responsavel: 'Diretor Comercial',
        recursos: 'Análise de fornecedores, negociação de contratos',
        metricas: 'Redução de custos, melhoria de qualidade',
        tipo: 'estrategica'
      },
      {
        id: criarId(),
        acao: 'Criar programa de responsabilidade social empresarial',
        categoria: 'Desenvolvimento',
        prazo: '120 dias',
        prioridade: 'baixa',
        concluida: false,
        dataVencimento: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000),
        responsavel: 'Diretor de Marketing',
        recursos: 'Orçamento para ações sociais, parcerias com ONGs',
        metricas: 'Impacto social, reconhecimento da marca',
        tipo: 'estrategica'
      }
    ];
  };

  return { gerarPlanoAcao };
};
