import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { PlanejamentoEstrategicoData, RespostaPlanejamento, PlanoAcao, AcaoComercialSemanal } from "@/types/planejamentoEstrategico";

export const usePlanejamentoEstrategico = () => {
  const { toast } = useToast();
  const [etapa, setEtapa] = useState<'questionario' | 'resultado'>('questionario');
  const [dados, setDados] = useState<PlanejamentoEstrategicoData | null>(null);
  const [gerandoPlano, setGerandoPlano] = useState(false);

  const gerarAcoesImplementacao = (): PlanoAcao[] => {
    const acoesImplementacao: PlanoAcao[] = [
      // Semana 1-2
      { id: 'impl_1', acao: 'Enviar o vídeo de boas-vindas', categoria: 'Onboarding', prazo: '1 semana', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Vídeo institucional, plataforma de envio', metricas: 'Taxa de visualização do vídeo', tipo: 'implementacao' },
      { id: 'impl_2', acao: 'Enviar planilha de integração', categoria: 'Onboarding', prazo: '1 semana', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Planilha estruturada, documentação', metricas: 'Preenchimento completo da planilha', tipo: 'implementacao' },
      { id: 'impl_3', acao: 'Enviar planilha CAC', categoria: 'Financeiro', prazo: '1 semana', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), responsavel: 'Marketing/Vendas', recursos: 'Planilha de cálculo CAC, treinamento', metricas: 'CAC calculado por canal', tipo: 'implementacao' },
      { id: 'impl_4', acao: 'Preencher PDCA', categoria: 'Gestão', prazo: '2 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), responsavel: 'Gestores', recursos: 'Metodologia PDCA, template', metricas: 'PDCA implementado por área', tipo: 'implementacao' },
      { id: 'impl_5', acao: 'Enviar calculadora de metas', categoria: 'Planejamento', prazo: '2 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), responsavel: 'Planejamento', recursos: 'Ferramenta de cálculo, capacitação', metricas: 'Metas definidas e calculadas', tipo: 'implementacao' },
      
      // Semana 3-4
      { id: 'impl_6', acao: 'Alinhamento de salários e comissões', categoria: 'RH', prazo: '3 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), responsavel: 'RH/Diretoria', recursos: 'Pesquisa salarial, estrutura de comissões', metricas: 'Estrutura salarial definida', tipo: 'implementacao' },
      { id: 'impl_7', acao: 'Indicar sistemas', categoria: 'Tecnologia', prazo: '3 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), responsavel: 'TI', recursos: 'Análise de sistemas, orçamentos', metricas: 'Sistemas recomendados e avaliados', tipo: 'implementacao' },
      { id: 'impl_8', acao: 'Agendar reunião com a equipe de vendas', categoria: 'Vendas', prazo: '3 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000), responsavel: 'Gerente de Vendas', recursos: 'Agenda, pauta estruturada', metricas: 'Reunião realizada com participação integral', tipo: 'implementacao' },
      { id: 'impl_9', acao: 'Fazer pesquisa 360º anônima com os vendedores', categoria: 'RH', prazo: '4 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 28 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Ferramenta de pesquisa, questionário', metricas: 'Taxa de participação na pesquisa', tipo: 'implementacao' },
      
      // Semana 5-8
      { id: 'impl_10', acao: 'Solicitar ao Alan (Boi) a criação do Dashboard', categoria: 'Tecnologia', prazo: '5 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000), responsavel: 'TI', recursos: 'Especificações técnicas, dados', metricas: 'Dashboard funcionando com dados reais', tipo: 'implementacao' },
      { id: 'impl_11', acao: 'Cadastrar vendedores no Looker', categoria: 'Tecnologia', prazo: '6 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000), responsavel: 'TI', recursos: 'Acesso ao Looker, treinamento', metricas: 'Vendedores ativos no sistema', tipo: 'implementacao' },
      { id: 'impl_12', acao: 'Mapeamento da jornada do cliente', categoria: 'Marketing', prazo: '6 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 42 * 24 * 60 * 60 * 1000), responsavel: 'Marketing/Vendas', recursos: 'Workshop de mapeamento, ferramentas', metricas: 'Jornada documentada e validada', tipo: 'implementacao' },
      { id: 'impl_13', acao: 'Pedir Manoel agendar reunião de Planejamento estratégico', categoria: 'Estratégia', prazo: '7 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 49 * 24 * 60 * 60 * 1000), responsavel: 'CEO', recursos: 'Agenda executiva, pauta estratégica', metricas: 'Reunião agendada e realizada', tipo: 'implementacao' },
      { id: 'impl_14', acao: 'Criar e enviar contrato de rotina do colaborador - CRC', categoria: 'RH', prazo: '8 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 56 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Template de contrato, jurídico', metricas: 'Contratos assinados por todos', tipo: 'implementacao' },
      
      // Semana 9-12
      { id: 'impl_15', acao: 'Enviar resultado da pesquisa 360º', categoria: 'RH', prazo: '9 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 63 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Relatório de resultados, apresentação', metricas: 'Feedback entregue individualmente', tipo: 'implementacao' },
      { id: 'impl_16', acao: 'Criar e enviar contrato de expectativa', categoria: 'RH', prazo: '10 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 70 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Template de expectativas, alinhamento', metricas: 'Contratos de expectativa assinados', tipo: 'implementacao' },
      { id: 'impl_17', acao: 'Feedback SCI', categoria: 'Gestão', prazo: '11 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 77 * 24 * 60 * 60 * 1000), responsavel: 'Gestores', recursos: 'Metodologia SCI, treinamento', metricas: 'Feedback SCI implementado', tipo: 'implementacao' },
      { id: 'impl_18', acao: 'Mapear Equipe DISC Assessment', categoria: 'RH', prazo: '12 semanas', prioridade: 'baixa', concluida: false, dataVencimento: new Date(Date.now() + 84 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Ferramenta DISC, consultoria', metricas: 'Perfis DISC mapeados para toda equipe', tipo: 'implementacao' },
      
      // Semana 13-16
      { id: 'impl_19', acao: 'Implementação de novos funis', categoria: 'Marketing', prazo: '13 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 91 * 24 * 60 * 60 * 1000), responsavel: 'Marketing', recursos: 'Automação de marketing, CRM', metricas: 'Funis ativos e convertendo', tipo: 'implementacao' },
      { id: 'impl_20', acao: 'Criar e enviar Job description', categoria: 'RH', prazo: '14 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 98 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Template JD, aprovação gestores', metricas: 'Job descriptions criadas para todos os cargos', tipo: 'implementacao' },
      { id: 'impl_21', acao: 'Criar persona do cliente', categoria: 'Marketing', prazo: '15 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 105 * 24 * 60 * 60 * 1000), responsavel: 'Marketing', recursos: 'Pesquisa de mercado, dados de clientes', metricas: 'Personas validadas e documentadas', tipo: 'implementacao' },
      { id: 'impl_22', acao: 'Fazer cliente oculto', categoria: 'Qualidade', prazo: '16 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 112 * 24 * 60 * 60 * 1000), responsavel: 'Qualidade', recursos: 'Empresa especializada, roteiro', metricas: 'Relatório de cliente oculto completo', tipo: 'implementacao' },
      
      // Semana 17-20
      { id: 'impl_23', acao: 'Mapeamento de Processos', categoria: 'Processos', prazo: '17 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 119 * 24 * 60 * 60 * 1000), responsavel: 'Operações', recursos: 'Consultoria em processos, ferramentas', metricas: 'Processos críticos mapeados', tipo: 'implementacao' },
      { id: 'impl_24', acao: 'Desenhar organograma', categoria: 'RH', prazo: '18 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 126 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Software de organograma, aprovação', metricas: 'Organograma atualizado e divulgado', tipo: 'implementacao' },
      { id: 'impl_25', acao: 'Cadastrar no Google Agenda as reuniões do próximo mês', categoria: 'Gestão', prazo: '19 semanas', prioridade: 'baixa', concluida: false, dataVencimento: new Date(Date.now() + 133 * 24 * 60 * 60 * 1000), responsavel: 'Assistente/Secretaria', recursos: 'Google Workspace, agenda compartilhada', metricas: 'Reuniões organizadas e sincronizadas', tipo: 'implementacao' },
      { id: 'impl_26', acao: 'Enviar melhor performance no último dia útil do mês', categoria: 'RH', prazo: '20 semanas', prioridade: 'baixa', concluida: false, dataVencimento: new Date(Date.now() + 140 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Sistema de reconhecimento, comunicação', metricas: 'Reconhecimento mensal implementado', tipo: 'implementacao' },
      
      // Semana 21-24
      { id: 'impl_27', acao: 'Enviar relatório de atividades realizadas no mês', categoria: 'Gestão', prazo: '21 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 147 * 24 * 60 * 60 * 1000), responsavel: 'Gestores', recursos: 'Template de relatório, sistema', metricas: 'Relatórios mensais entregues', tipo: 'implementacao' },
      { id: 'impl_28', acao: 'Propor diversificação de canais de vendas', categoria: 'Vendas', prazo: '22 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 154 * 24 * 60 * 60 * 1000), responsavel: 'Vendas', recursos: 'Análise de canais, investimento', metricas: 'Novos canais implementados', tipo: 'implementacao' },
      { id: 'impl_29', acao: 'Criar plano Endomarketing', categoria: 'Marketing', prazo: '23 semanas', prioridade: 'media', concluida: false, dataVencimento: new Date(Date.now() + 161 * 24 * 60 * 60 * 1000), responsavel: 'Marketing/RH', recursos: 'Estratégia de comunicação interna', metricas: 'Engajamento interno mensurado', tipo: 'implementacao' },
      { id: 'impl_30', acao: 'Criar plano de carreira', categoria: 'RH', prazo: '24 semanas', prioridade: 'alta', concluida: false, dataVencimento: new Date(Date.now() + 168 * 24 * 60 * 60 * 1000), responsavel: 'RH', recursos: 'Estrutura de cargos, competências', metricas: 'Planos de carreira definidos', tipo: 'implementacao' }
    ];

    return acoesImplementacao;
  };

  const gerarAcoesComerciais = (respostas: RespostaPlanejamento[]): AcaoComercialSemanal[] => {
    const setor = respostas.find(r => r.perguntaId === 'empresa_setor')?.resposta as string || '';
    const faturamento = respostas.find(r => r.perguntaId === 'faturamento_atual')?.resposta as string || '';
    const crescimento = respostas.find(r => r.perguntaId === 'crescimento_atual')?.resposta as string || '';
    
    const acoesComerciais: AcaoComercialSemanal[] = [
      // Semana 1-4: Foco em prospecção e organização
      {
        id: 'com_1',
        acao: 'Implementar lista de prospecção diária de 20 novos contatos qualificados',
        meta: 'Prospectar 100 novos leads por semana',
        prazo: 'Diariamente',
        responsavel: 'Equipe de Vendas/SDR',
        metricas: 'Número de leads qualificados adicionados ao funil',
        semana: 1
      },
      {
        id: 'com_2',
        acao: 'Criar sequência de follow-up automatizada para leads não convertidos',
        meta: 'Reativar 15% dos leads dormentes',
        prazo: 'Semanal',
        responsavel: 'Marketing/Vendas',
        metricas: 'Taxa de reativação de leads',
        semana: 2
      },
      {
        id: 'com_3',
        acao: 'Implementar sistema de pontuação de leads (lead scoring)',
        meta: 'Priorizar 30% dos leads mais qualificados',
        prazo: 'Até final da semana',
        responsavel: 'Marketing',
        metricas: 'Aumento na taxa de conversão',
        semana: 3
      },
      {
        id: 'com_4',
        acao: 'Criar campanhas de nutrição específicas por segmento',
        meta: 'Aumentar engajamento em 25%',
        prazo: 'Semanal',
        responsavel: 'Marketing',
        metricas: 'Taxa de abertura e cliques dos emails',
        semana: 4
      },
      
      // Semana 5-8: Foco em conversão e fechamento
      {
        id: 'com_5',
        acao: 'Implementar script de qualificação BANT para todas as chamadas',
        meta: 'Qualificar 80% dos leads antes da demo',
        prazo: 'Diariamente',
        responsavel: 'Vendas',
        metricas: 'Qualidade dos leads passados para vendas',
        semana: 5
      },
      {
        id: 'com_6',
        acao: 'Criar apresentação personalizada por tipo de cliente',
        meta: 'Aumentar taxa de fechamento em 20%',
        prazo: 'Até final da semana',
        responsavel: 'Vendas',
        metricas: 'Taxa de conversão por tipo de apresentação',
        semana: 6
      },
      {
        id: 'com_7',
        acao: 'Implementar técnica de criação de urgência nas propostas',
        meta: 'Reduzir ciclo de vendas em 15%',
        prazo: 'Diariamente',
        responsavel: 'Vendas',
        metricas: 'Tempo médio do ciclo de vendas',
        semana: 7
      },
      {
        id: 'com_8',
        acao: 'Desenvolver programa de indicação de clientes',
        meta: 'Gerar 10% das vendas via indicação',
        prazo: 'Mensal',
        responsavel: 'Vendas/Marketing',
        metricas: 'Número de vendas por indicação',
        semana: 8
      },
      
      // Semana 9-12: Foco em retenção e expansão
      {
        id: 'com_9',
        acao: 'Implementar processo de upsell sistemático',
        meta: 'Aumentar ticket médio em 30%',
        prazo: 'Mensalmente',
        responsavel: 'Vendas/CS',
        metricas: 'Valor médio por cliente',
        semana: 9
      },
      {
        id: 'com_10',
        acao: 'Criar programa de reativação de clientes inativos',
        meta: 'Reativar 20% da base inativa',
        prazo: 'Quinzenal',
        responsavel: 'Customer Success',
        metricas: 'Taxa de reativação de clientes',
        semana: 10
      },
      {
        id: 'com_11',
        acao: 'Implementar pesquisa de satisfação pós-venda',
        meta: 'NPS acima de 8.0',
        prazo: 'Após cada venda',
        responsavel: 'Customer Success',
        metricas: 'Score NPS e taxa de resposta',
        semana: 11
      },
      {
        id: 'com_12',
        acao: 'Desenvolver estratégia de cross-sell baseada em uso',
        meta: 'Aumentar receita por cliente em 25%',
        prazo: 'Mensalmente',
        responsavel: 'Vendas/CS',
        metricas: 'Receita adicional por cliente',
        semana: 12
      },
      
      // Semana 13-16: Foco em otimização e análise
      {
        id: 'com_13',
        acao: 'Implementar análise de concorrência semanal',
        meta: 'Identificar 3 oportunidades competitivas',
        prazo: 'Semanalmente',
        responsavel: 'Marketing/Vendas',
        metricas: 'Oportunidades identificadas e exploradas',
        semana: 13
      },
      {
        id: 'com_14',
        acao: 'Otimizar funil de vendas baseado em dados',
        meta: 'Aumentar conversão geral em 15%',
        prazo: 'Mensalmente',
        responsavel: 'Vendas/Marketing',
        metricas: 'Taxa de conversão por etapa do funil',
        semana: 14
      },
      {
        id: 'com_15',
        acao: 'Implementar sistema de CRM com automações',
        meta: 'Reduzir tarefas manuais em 40%',
        prazo: 'Até final da semana',
        responsavel: 'TI/Vendas',
        metricas: 'Tempo economizado em tarefas administrativas',
        semana: 15
      },
      {
        id: 'com_16',
        acao: 'Criar dashboard de vendas em tempo real',
        meta: 'Visibilidade total do pipeline',
        prazo: 'Até final da semana',
        responsavel: 'TI/Vendas',
        metricas: 'Precisão das previsões de vendas',
        semana: 16
      },
      
      // Semana 17-20: Foco em expansão e novos mercados
      {
        id: 'com_17',
        acao: 'Testar novos canais de aquisição digital',
        meta: 'Encontrar 2 novos canais rentáveis',
        prazo: 'Quinzenal',
        responsavel: 'Marketing',
        metricas: 'CAC e ROI por canal',
        semana: 17
      },
      {
        id: 'com_18',
        acao: 'Implementar estratégia de SEO para vendas',
        meta: 'Aumentar tráfego orgânico em 50%',
        prazo: 'Mensalmente',
        responsavel: 'Marketing',
        metricas: 'Posicionamento e tráfego orgânico',
        semana: 18
      },
      {
        id: 'com_19',
        acao: 'Desenvolver parcerias estratégicas',
        meta: 'Estabelecer 3 parcerias comerciais',
        prazo: 'Mensalmente',
        responsavel: 'Vendas/CEO',
        metricas: 'Número de vendas via parceiros',
        semana: 19
      },
      {
        id: 'com_20',
        acao: 'Implementar programa de afiliados',
        meta: 'Recrutar 10 afiliados ativos',
        prazo: 'Mensalmente',
        responsavel: 'Marketing/Vendas',
        metricas: 'Vendas geradas por afiliados',
        semana: 20
      },
      
      // Semana 21-24: Foco em consolidação e escala
      {
        id: 'com_21',
        acao: 'Criar programa de capacitação contínua em vendas',
        meta: 'Aumentar performance da equipe em 20%',
        prazo: 'Semanalmente',
        responsavel: 'Vendas/RH',
        metricas: 'Performance individual e coletiva',
        semana: 21
      },
      {
        id: 'com_22',
        acao: 'Implementar sistema de gamificação nas vendas',
        meta: 'Aumentar motivação e resultados',
        prazo: 'Mensalmente',
        responsavel: 'Vendas/RH',
        metricas: 'Engajamento da equipe e resultados',
        semana: 22
      },
      {
        id: 'com_23',
        acao: 'Desenvolver estratégia de precificação dinâmica',
        meta: 'Otimizar margem em 15%',
        prazo: 'Quinzenalmente',
        responsavel: 'Vendas/Financeiro',
        metricas: 'Margem média por venda',
        semana: 23
      },
      {
        id: 'com_24',
        acao: 'Implementar sistema de previsão de vendas IA',
        meta: 'Precisão de 90% nas previsões',
        prazo: 'Mensalmente',
        responsavel: 'TI/Vendas',
        metricas: 'Precisão das previsões',
        semana: 24
      }
    ];

    return acoesComerciais;
  };

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

    // Ações obrigatórias para todas as empresas (base estratégica)
    adicionarAcao(
      'Realizar reunião mensal de alinhamento estratégico',
      'Gestão',
      'alta',
      1,
      'CEO/Diretoria',
      'Tempo para reuniões, agenda compartilhada',
      'Frequência das reuniões e decisões tomadas'
    );

    adicionarAcao(
      'Implementar sistema de indicadores chave (KPIs)',
      'Gestão',
      'alta',
      2,
      'Gerente/Analista',
      'Software de BI, tempo para configuração',
      'Número de KPIs implementados e monitorados'
    );

    adicionarAcao(
      'Criar plano de comunicação interna',
      'Comunicação',
      'media',
      1,
      'RH/Comunicação',
      'Ferramentas de comunicação, tempo da equipe',
      'Engajamento da equipe em pesquisas internas'
    );

    adicionarAcao(
      'Desenvolver programa de capacitação contínua',
      'Pessoas',
      'alta',
      2,
      'RH',
      'Budget para treinamentos, plataforma de ensino',
      'Horas de treinamento por colaborador'
    );

    adicionarAcao(
      'Implementar controle financeiro detalhado',
      'Financeiro',
      'alta',
      1,
      'CFO/Contador',
      'Software financeiro, tempo para análise',
      'Precisão das projeções financeiras'
    );

    // Analisar respostas e gerar ações específicas baseadas nas lacunas identificadas
    respostas.forEach(resposta => {
      const { perguntaId, resposta: respostaValor, swotClassificacao } = resposta;

      // Ações baseadas no diagnóstico empresarial (quando resposta é "não")
      if (perguntaId === 'processos_documentados' && respostaValor === 'nao') {
        adicionarAcao(
          'Documentar todos os processos operacionais críticos',
          'Processos',
          'alta',
          2,
          'Gestor de Operações',
          'Software de documentação, tempo da equipe',
          'Percentual de processos documentados'
        );
        adicionarAcao(
          'Criar manual de procedimentos padrão por área',
          'Processos',
          'alta',
          3,
          'Líder de cada área',
          'Ferramenta de edição, revisão técnica',
          'Número de manuais criados e aprovados'
        );
        adicionarAcao(
          'Treinar equipe nos novos processos',
          'Processos',
          'media',
          4,
          'RH e Gestores',
          'Material de treinamento, tempo para capacitação',
          'Taxa de adesão aos novos processos'
        );
        adicionarAcao(
          'Implementar auditoria interna de processos',
          'Processos',
          'media',
          5,
          'Auditor interno',
          'Checklist de auditoria, tempo para revisões',
          'Conformidade dos processos'
        );
      }

      if (perguntaId === 'controle_qualidade' && respostaValor === 'nao') {
        adicionarAcao(
          'Desenvolver sistema de controle de qualidade',
          'Qualidade',
          'alta',
          2,
          'Gerente de Qualidade',
          'Software de gestão da qualidade, certificação',
          'Redução de defeitos e reclamações'
        );
        adicionarAcao(
          'Estabelecer indicadores de qualidade por produto/serviço',
          'Qualidade',
          'media',
          1,
          'Equipe de Qualidade',
          'Sistema de métricas, relatórios',
          'Número de indicadores de qualidade ativos'
        );
        adicionarAcao(
          'Criar programa de melhoria contínua',
          'Qualidade',
          'media',
          3,
          'Toda a equipe',
          'Metodologia de melhoria, treinamento',
          'Número de melhorias implementadas'
        );
        adicionarAcao(
          'Implementar feedback sistemático de clientes',
          'Qualidade',
          'alta',
          1,
          'Atendimento/Vendas',
          'Sistema de pesquisa, follow-up',
          'NPS e satisfação do cliente'
        );
      }

      if (perguntaId === 'metas_definidas' && respostaValor === 'nao') {
        adicionarAcao(
          'Definir metas SMART para cada área da empresa',
          'Planejamento',
          'alta',
          1,
          'Diretoria e Gestores',
          'Workshop de planejamento, consultoria',
          'Número de metas SMART definidas'
        );
        adicionarAcao(
          'Criar plano estratégico anual detalhado',
          'Planejamento',
          'alta',
          2,
          'CEO e Diretores',
          'Consultoria em planejamento estratégico',
          'Percentual de objetivos estratégicos atingidos'
        );
        adicionarAcao(
          'Implementar reuniões de acompanhamento de metas',
          'Planejamento',
          'media',
          1,
          'Gestores de área',
          'Sistema de relatórios, tempo para reuniões',
          'Frequência e qualidade do acompanhamento'
        );
        adicionarAcao(
          'Desenvolver dashboards de acompanhamento',
          'Planejamento',
          'media',
          3,
          'TI/Analista',
          'Ferramenta de BI, configuração',
          'Visualização em tempo real das metas'
        );
      }

      if (perguntaId === 'acompanhamento_resultados' && respostaValor === 'nao') {
        adicionarAcao(
          'Criar sistema de relatórios gerenciais',
          'Gestão',
          'alta',
          2,
          'Analista/Controller',
          'Software de relatórios, integração de dados',
          'Número de relatórios automatizados'
        );
        adicionarAcao(
          'Estabelecer rotina de análise de performance',
          'Gestão',
          'media',
          1,
          'Gerentes',
          'Relatórios, tempo de análise',
          'Frequência de análises realizadas'
        );
        adicionarAcao(
          'Implementar alertas automáticos de desvios',
          'Gestão',
          'media',
          3,
          'TI',
          'Sistema de monitoramento, configuração',
          'Tempo de resposta a desvios'
        );
      }

      if (perguntaId === 'sistema_gestao' && respostaValor === 'nao') {
        adicionarAcao(
          'Pesquisar e selecionar sistema ERP adequado',
          'Tecnologia',
          'alta',
          2,
          'TI e Diretoria',
          'Consultoria, demonstrações de software',
          'Sistema ERP selecionado e aprovado'
        );
        adicionarAcao(
          'Implementar sistema ERP escolhido',
          'Tecnologia',
          'alta',
          4,
          'TI com fornecedor',
          'Investimento em software, consultoria',
          'Sistema ERP funcionando plenamente'
        );
        adicionarAcao(
          'Treinar equipe no novo sistema',
          'Tecnologia',
          'alta',
          2,
          'TI e RH',
          'Treinamento especializado, suporte',
          'Taxa de adoção do sistema'
        );
        adicionarAcao(
          'Migrar dados históricos para novo sistema',
          'Tecnologia',
          'media',
          3,
          'TI',
          'Consultoria em migração, validação',
          'Integridade dos dados migrados'
        );
      }

      if (perguntaId === 'capacitacao_equipe' && respostaValor === 'nao') {
        adicionarAcao(
          'Mapear competências necessárias por cargo',
          'Pessoas',
          'alta',
          1,
          'RH e Gestores',
          'Consultoria em gestão de competências',
          'Matriz de competências completa'
        );
        adicionarAcao(
          'Desenvolver plano de desenvolvimento individual (PDI)',
          'Pessoas',
          'media',
          2,
          'RH',
          'Coaching, mentoring, cursos',
          'Percentual de colaboradores com PDI ativo'
        );
        adicionarAcao(
          'Implementar programa de mentoring interno',
          'Pessoas',
          'media',
          3,
          'RH e Líderes',
          'Tempo dos mentores, estrutura',
          'Número de mentorias ativas'
        );
        adicionarAcao(
          'Criar biblioteca de conhecimento interno',
          'Pessoas',
          'baixa',
          4,
          'RH',
          'Plataforma de conhecimento, conteúdo',
          'Utilização da biblioteca pela equipe'
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
              'Engajamento e crescimento de seguidores'
            );
            adicionarAcao(
              'Implementar funil de vendas estruturado',
              'Marketing',
              'alta',
              3,
              'Marketing e Vendas',
              'CRM, automação de marketing',
              'Taxa de conversão do funil'
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
              'Benefícios, plano de carreira, clima',
              'Taxa de retenção de colaboradores'
            );
            adicionarAcao(
              'Desenvolver liderança interna',
              'Pessoas',
              'media',
              4,
              'RH',
              'Programa de liderança, coaching',
              'Número de líderes desenvolvidos internamente'
            );
            break;

          case 'swot_fluxo_caixa':
            adicionarAcao(
              'Implementar controle rigoroso de fluxo de caixa',
              'Financeiro',
              'alta',
              1,
              'CFO/Controller',
              'Software financeiro, consultoria',
              'Previsibilidade do fluxo de caixa'
            );
            adicionarAcao(
              'Renegociar prazos com fornecedores e clientes',
              'Financeiro',
              'alta',
              1,
              'Compras e Comercial',
              'Negociação, relacionamento',
              'Melhoria do prazo médio de recebimento'
            );
            adicionarAcao(
              'Diversificar fontes de financiamento',
              'Financeiro',
              'media',
              3,
              'CFO',
              'Relacionamento bancário, análise de opções',
              'Número de fontes de crédito disponíveis'
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
            adicionarAcao(
              'Implementar backup e segurança de dados',
              'Tecnologia',
              'alta',
              2,
              'TI',
              'Soluções de backup, segurança',
              'Integridade e segurança dos dados'
            );
            break;

          case 'swot_clientes_fieis':
            adicionarAcao(
              'Criar programa de fidelização de clientes',
              'Vendas',
              'alta',
              2,
              'Gerente Comercial',
              'CRM, programa de pontos/benefícios',
              'Taxa de retenção e lifetime value'
            );
            adicionarAcao(
              'Implementar pesquisa de satisfação regular',
              'Vendas',
              'media',
              1,
              'Atendimento',
              'Ferramenta de pesquisa, follow-up',
              'NPS e índice de satisfação'
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
              'Pesquisa de mercado, testes piloto',
              'Viabilidade e potencial do novo nicho'
            );
            adicionarAcao(
              'Desenvolver produto/serviço para novo nicho',
              'Desenvolvimento',
              'media',
              4,
              'P&D',
              'Investimento em desenvolvimento',
              'Lançamento e aceitação do novo produto'
            );
            adicionarAcao(
              'Criar estratégia de entrada no novo mercado',
              'Estratégia',
              'media',
              3,
              'Marketing e Vendas',
              'Plano de marketing, força de vendas',
              'Participação no novo mercado'
            );
            break;

          case 'swot_parcerias_estrategicas':
            adicionarAcao(
              'Mapear e contatar potenciais parceiros',
              'Estratégia',
              'media',
              1,
              'CEO',
              'Network, pesquisa de mercado',
              'Número de conversas qualificadas'
            );
            adicionarAcao(
              'Estruturar propostas de parceria',
              'Jurídico',
              'media',
              2,
              'Jurídico e Comercial',
              'Advocacia, estruturação de contratos',
              'Propostas apresentadas e aceitas'
            );
            adicionarAcao(
              'Formalizar acordos de parceria estratégica',
              'Jurídico',
              'baixa',
              4,
              'Jurídico',
              'Contratos, due diligence',
              'Parcerias estratégicas ativas'
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
            adicionarAcao(
              'Testar mercado em nova região (piloto)',
              'Comercial',
              'media',
              4,
              'Vendas',
              'Investimento em teste, equipe local',
              'Resultados do teste de mercado'
            );
            break;

          case 'swot_tendencia_digital':
            adicionarAcao(
              'Desenvolver estratégia de transformação digital',
              'Tecnologia',
              'alta',
              2,
              'TI e Estratégia',
              'Consultoria em transformação digital',
              'Plano de digitalização implementado'
            );
            adicionarAcao(
              'Implementar vendas online/e-commerce',
              'Comercial',
              'alta',
              3,
              'TI e Comercial',
              'Plataforma de e-commerce, integração',
              'Percentual de vendas online'
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
              'Melhoria na presença digital vs concorrentes'
            );
            adicionarAcao(
              'Desenvolver conteúdo diferenciado',
              'Marketing',
              'media',
              2,
              'Marketing',
              'Criação de conteúdo, storytelling',
              'Engajamento e diferenciação de conteúdo'
            );
            break;

          case 'swot_regulamentacao_setor':
            adicionarAcao(
              'Adequar-se às novas regulamentações',
              'Compliance',
              'alta',
              2,
              'Jurídico',
              'Consultoria regulatória, adequação',
              'Conformidade total com regulamentações'
            );
            adicionarAcao(
              'Criar sistema de monitoramento regulatório',
              'Compliance',
              'media',
              3,
              'Jurídico',
              'Sistema de alertas, consultoria',
              'Antecipação de mudanças regulatórias'
            );
            break;

          case 'swot_crise_economica':
            adicionarAcao(
              'Criar plano de contingência para crise',
              'Estratégia',
              'alta',
              1,
              'Diretoria',
              'Planejamento estratégico, cenários',
              'Plano de contingência testado'
            );
            adicionarAcao(
              'Diversificar mix de produtos/serviços',
              'Comercial',
              'media',
              3,
              'Comercial e P&D',
              'Desenvolvimento, pesquisa de mercado',
              'Redução da dependência de um produto'
            );
            adicionarAcao(
              'Otimizar custos operacionais',
              'Operações',
              'alta',
              2,
              'COO',
              'Análise de custos, renegociação',
              'Redução percentual de custos'
            );
            break;

          case 'swot_competidores_grandes':
            adicionarAcao(
              'Focar em diferenciação e nicho específico',
              'Estratégia',
              'alta',
              2,
              'CEO',
              'Consultoria estratégica, pesquisa',
              'Posicionamento claro e diferenciado'
            );
            adicionarAcao(
              'Melhorar agilidade e flexibilidade',
              'Operações',
              'media',
              3,
              'Operações',
              'Processos ágeis, metodologia',
              'Tempo de resposta a mudanças'
            );
            break;
        }
      }

      // Ações para fortalecer pontos fortes
      if (swotClassificacao === 'Força') {
        switch (perguntaId) {
          case 'swot_atendimento_qualidade':
            adicionarAcao(
              'Capitalizar excelência no atendimento como vantagem',
              'Marketing',
              'media',
              2,
              'Marketing',
              'Cases de sucesso, depoimentos',
              'Reconhecimento da qualidade no mercado'
            );
            break;
          case 'swot_produto_diferenciado':
            adicionarAcao(
              'Expandir linha de produtos diferenciados',
              'Desenvolvimento',
              'media',
              4,
              'P&D',
              'Investimento em inovação',
              'Número de novos produtos lançados'
            );
            break;
          case 'swot_localizacao_estrategica':
            adicionarAcao(
              'Explorar vantagem da localização estratégica',
              'Comercial',
              'media',
              2,
              'Vendas',
              'Marketing local, parcerias',
              'Aproveitamento da vantagem locacional'
            );
            break;
        }
      }
    });

    // Ações complementares baseadas no perfil da empresa
    const tamanhoEquipe = respostas.find(r => r.perguntaId === 'numero_funcionarios')?.resposta;
    const tempoMercado = respostas.find(r => r.perguntaId === 'tempo_mercado')?.resposta;
    const crescimento = respostas.find(r => r.perguntaId === 'crescimento_atual')?.resposta;

    // Ações específicas por tamanho da empresa
    if (tamanhoEquipe === '1-5') {
      adicionarAcao(
        'Estruturar processos básicos para crescimento',
        'Processos',
        'alta',
        2,
        'Fundador/CEO',
        'Consultoria, tempo de estruturação',
        'Processos básicos implementados'
      );
      adicionarAcao(
        'Planejar expansão gradual da equipe',
        'Pessoas',
        'media',
        3,
        'RH',
        'Planejamento de headcount, descrição de cargos',
        'Plano de contratações estruturado'
      );
    } else if (tamanhoEquipe === '6-15') {
      adicionarAcao(
        'Implementar estrutura de gestão intermediária',
        'Pessoas',
        'media',
        2,
        'RH',
        'Definição de hierarquia, treinamento',
        'Estrutura organizacional otimizada'
      );
      adicionarAcao(
        'Profissionalizar gestão de pessoas',
        'Pessoas',
        'alta',
        3,
        'RH',
        'Políticas de RH, sistemas',
        'Gestão de pessoas profissionalizada'
      );
    } else if (tamanhoEquipe === '16-50') {
      adicionarAcao(
        'Implementar gestão por departamentos',
        'Gestão',
        'alta',
        2,
        'Diretoria',
        'Reestruturação organizacional',
        'Departamentos funcionando autonomamente'
      );
      adicionarAcao(
        'Criar comitê executivo',
        'Gestão',
        'media',
        1,
        'CEO',
        'Estruturação de governança',
        'Comitê executivo ativo'
      );
    }

    // Ações específicas por tempo de mercado
    if (tempoMercado === 'Menos de 1 ano') {
      adicionarAcao(
        'Focar na validação do modelo de negócio',
        'Estratégia',
        'alta',
        2,
        'CEO',
        'Testes de mercado, pivot se necessário',
        'Modelo de negócio validado'
      );
      adicionarAcao(
        'Construir base sólida de clientes iniciais',
        'Vendas',
        'alta',
        3,
        'Vendas',
        'Estratégia de vendas, relacionamento',
        'Base de clientes estabelecida'
      );
    } else if (tempoMercado === '1-3 anos') {
      adicionarAcao(
        'Acelerar crescimento e expansão',
        'Estratégia',
        'alta',
        2,
        'CEO',
        'Investimento em crescimento',
        'Taxa de crescimento sustentável'
      );
      adicionarAcao(
        'Otimizar operações para escala',
        'Operações',
        'media',
        3,
        'COO',
        'Melhoria de processos, automação',
        'Eficiência operacional melhorada'
      );
    } else if (tempoMercado === 'Mais de 10 anos') {
      adicionarAcao(
        'Renovar estratégia e inovar',
        'Estratégia',
        'alta',
        3,
        'CEO',
        'Consultoria estratégica, inovação',
        'Estratégia renovada implementada'
      );
      adicionarAcao(
        'Implementar transformação digital',
        'Tecnologia',
        'alta',
        4,
        'TI',
        'Investimento em digitalização',
        'Nível de digitalização da empresa'
      );
    }

    // Ações específicas por fase de crescimento
    if (crescimento === 'Em declínio') {
      adicionarAcao(
        'Implementar plano de recuperação urgente',
        'Estratégia',
        'alta',
        1,
        'CEO',
        'Consultoria de turnaround, capital',
        'Reversão da tendência de declínio'
      );
      adicionarAcao(
        'Reestruturar operações e custos',
        'Operações',
        'alta',
        2,
        'COO',
        'Reestruturação, otimização',
        'Sustentabilidade operacional restaurada'
      );
    } else if (crescimento === 'Estagnado') {
      adicionarAcao(
        'Identificar e eliminar gargalos de crescimento',
        'Operações',
        'alta',
        2,
        'COO',
        'Análise de processos, consultoria',
        'Gargalos identificados e resolvidos'
      );
      adicionarAcao(
        'Revitalizar estratégia de marketing',
        'Marketing',
        'alta',
        2,
        'Marketing',
        'Nova estratégia, investimento',
        'Aumento na geração de leads'
      );
    } else if (crescimento === 'Crescimento acelerado') {
      adicionarAcao(
        'Preparar infraestrutura para crescimento',
        'Operações',
        'alta',
        2,
        'COO',
        'Investimento em capacidade, sistemas',
        'Capacidade de atender demanda crescente'
      );
      adicionarAcao(
        'Fortalecer controles internos',
        'Gestão',
        'alta',
        1,
        'CFO',
        'Sistemas de controle, auditoria',
        'Controles internos efetivos'
      );
    }

    // Ações universais para fortalecimento empresarial
    const acoesUniversais = [
      {
        acao: 'Implementar pesquisa de clima organizacional',
        categoria: 'Pessoas',
        prioridade: 'media' as const,
        prazo: 2,
        responsavel: 'RH',
        recursos: 'Ferramenta de pesquisa, análise',
        metricas: 'Índice de clima organizacional'
      },
      {
        acao: 'Criar programa de inovação e sugestões',
        categoria: 'Inovação',
        prioridade: 'baixa' as const,
        prazo: 3,
        responsavel: 'P&D/RH',
        recursos: 'Sistema de ideias, incentivos',
        metricas: 'Número de ideias implementadas'
      },
      {
        acao: 'Desenvolver programa de responsabilidade social',
        categoria: 'Sustentabilidade',
        prioridade: 'baixa' as const,
        prazo: 4,
        responsavel: 'Marketing/RH',
        recursos: 'Ações sociais, comunicação',
        metricas: 'Impacto social mensurado'
      },
      {
        acao: 'Implementar programa de sustentabilidade',
        categoria: 'Sustentabilidade',
        prioridade: 'baixa' as const,
        prazo: 5,
        responsavel: 'Operações',
        recursos: 'Práticas sustentáveis, certificação',
        metricas: 'Redução de impacto ambiental'
      },
      {
        acao: 'Criar sistema de gestão do conhecimento',
        categoria: 'Conhecimento',
        prioridade: 'media' as const,
        prazo: 3,
        responsavel: 'TI/RH',
        recursos: 'Plataforma de conhecimento',
        metricas: 'Base de conhecimento utilizada'
      },
      {
        acao: 'Implementar programa de wellness corporativo',
        categoria: 'Pessoas',
        prioridade: 'baixa' as const,
        prazo: 4,
        responsavel: 'RH',
        recursos: 'Ações de bem-estar, parcerias',
        metricas: 'Participação em ações de wellness'
      },
      {
        acao: 'Desenvolver programa de sucessão',
        categoria: 'Pessoas',
        prioridade: 'media' as const,
        prazo: 4,
        responsavel: 'RH/Diretoria',
        recursos: 'Mapeamento de sucessores',
        metricas: 'Planos de sucessão estruturados'
      },
      {
        acao: 'Criar programa de relacionamento com fornecedores',
        categoria: 'Parcerias',
        prioridade: 'media' as const,
        prazo: 2,
        responsavel: 'Compras',
        recursos: 'Gestão de relacionamento',
        metricas: 'Qualidade do relacionamento'
      },
      {
        acao: 'Implementar análise de concorrência regular',
        categoria: 'Inteligência',
        prioridade: 'media' as const,
        prazo: 1,
        responsavel: 'Marketing/Estratégia',
        recursos: 'Pesquisa, ferramentas de análise',
        metricas: 'Frequência de análises competitivas'
      },
      {
        acao: 'Desenvolver programa de customer success',
        categoria: 'Clientes',
        prioridade: 'alta' as const,
        prazo: 2,
        responsavel: 'Vendas/Atendimento',
        recursos: 'Estrutura de CS, ferramentas',
        metricas: 'Taxa de sucesso do cliente'
      }
    ];

    // Adicionar ações universais até completar um plano robusto
    acoesUniversais.forEach(acaoUniv => {
      if (acoes.length < 35) {
        adicionarAcao(
          acaoUniv.acao,
          acaoUniv.categoria,
          acaoUniv.prioridade,
          acaoUniv.prazo,
          acaoUniv.responsavel,
          acaoUniv.recursos,
          acaoUniv.metricas
        );
      }
    });

    // Verificar se temos uma proposta única de valor definida
    const diferencialResposta = respostas.find(r => r.perguntaId === 'diferencial_competitivo');
    if (!diferencialResposta || !diferencialResposta.resposta) {
      adicionarAcao(
        'Definir e comunicar proposta única de valor',
        'Estratégia',
        'alta',
        1,
        'CEO/Marketing',
        'Workshop de estratégia, comunicação',
        'PUV definida e comunicada no mercado'
      );
    }

    // Garantir distribuição equilibrada por prioridade e prazo
    return acoes.sort((a, b) => {
      const prioridadeOrdem = { alta: 1, media: 2, baixa: 3 };
      if (a.prioridade !== b.prioridade) {
        return prioridadeOrdem[a.prioridade] - prioridadeOrdem[b.prioridade];
      }
      // Se mesma prioridade, ordenar por prazo
      return parseInt(a.prazo.split(' ')[0]) - parseInt(b.prazo.split(' ')[0]);
    });
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

  const processarRespostas = async (respostas: RespostaPlanejamento[]) => {
    setGerandoPlano(true);
    
    try {
      // Obter informações básicas
      const empresaNome = respostas.find(r => r.perguntaId === 'empresa_nome')?.resposta as string || 'Empresa';
      
      // Gerar ferramentas baseadas nas respostas
      const ferramentasGeradas = gerarFerramentasCompletas(respostas);
      
      // Gerar plano de ação abrangente
      const planoAcaoEstrategico = gerarPlanoAcaoCompleto(respostas);
      
      // Gerar ações de implementação específicas
      const acoesImplementacao = gerarAcoesImplementacao();
      
      // Gerar ações comerciais semanais
      const acoesComerciais = gerarAcoesComerciais(respostas);
      
      // Combinar todas as ações
      const planoAcaoCompleto = [...planoAcaoEstrategico, ...acoesImplementacao];
      
      const dadosCompletos: PlanejamentoEstrategicoData = {
        empresaNome,
        respostas,
        ferramentasGeradas,
        planoAcao: planoAcaoCompleto,
        acoesComerciais,
        progresso: 0,
        dataInicio: new Date(),
        dataAtualizacao: new Date(),
        status: 'em_andamento'
      };
      
      setDados(dadosCompletos);
      setEtapa('resultado');
      
      toast({
        title: "Plano Estratégico Gerado!",
        description: `Foram criadas ${planoAcaoCompleto.length} ações estratégicas e ${acoesComerciais.length} ações comerciais semanais.`,
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

  const handleUpdateProgresso = (novoProgresso: number) => {
    if (dados) {
      setDados({
        ...dados,
        progresso: novoProgresso,
        dataAtualizacao: new Date()
      });
    }
  };

  return {
    etapa,
    dados,
    gerandoPlano,
    processarRespostas,
    handleUpdateProgresso
  };
};
