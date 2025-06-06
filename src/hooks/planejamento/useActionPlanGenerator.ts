
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
    const hoje = new Date();
    let contadorId = 1;

    // Função helper para criar ação
    const criarAcao = (
      acao: string,
      categoria: string,
      prazo: string,
      prioridade: 'alta' | 'media' | 'baixa',
      semana: number,
      responsavel?: string,
      recursos?: string,
      metricas?: string,
      tipo?: 'estrategica' | 'comercial_semanal' | 'implementacao'
    ): PlanoAcao => {
      const dataVencimento = new Date(hoje);
      dataVencimento.setDate(hoje.getDate() + (semana * 7));
      
      return {
        id: `acao_${contadorId++}`,
        acao,
        categoria,
        prazo,
        prioridade,
        concluida: false,
        dataVencimento,
        responsavel,
        recursos,
        metricas,
        tipo: tipo || 'estrategica'
      };
    };

    // AÇÕES COMERCIAIS SEMANAIS (52 ações - 26 semanas)
    for (let semana = 1; semana <= 26; semana++) {
      if (semana % 2 === 1) {
        // Semanas ímpares - Prospecção
        acoes.push(criarAcao(
          `Semana ${semana}: Realizar 25 ligações de prospecção para novos clientes`,
          'comercial',
          '1 semana',
          'alta',
          semana,
          'Equipe Comercial',
          'Lista de prospects, telefone, CRM',
          '25 ligações realizadas, 5 leads qualificados',
          'comercial_semanal'
        ));
      } else {
        // Semanas pares - Follow-up e propostas
        acoes.push(criarAcao(
          `Semana ${semana}: Follow-up com leads qualificados e envio de propostas`,
          'comercial',
          '1 semana',
          'alta',
          semana,
          'Gerente Comercial',
          'Template de proposta, apresentação',
          '10 follow-ups, 3 propostas enviadas',
          'comercial_semanal'
        ));
      }
    }

    // AÇÕES DE IMPLEMENTAÇÃO BASEADAS NO DIAGNÓSTICO

    // === ÁREA COMERCIAL ===
    if (resultados.comercial.percentage < 60) {
      acoes.push(
        criarAcao('Implementar CRM completo para gestão de vendas', 'comercial', '2 semanas', 'alta', 1, 'Gerente Comercial', 'R$ 500/mês, treinamento equipe', 'CRM implementado, 100% equipe treinada', 'implementacao'),
        criarAcao('Criar script de vendas padronizado', 'comercial', '1 semana', 'alta', 2, 'Vendedor Sênior', '20h trabalho, validação com clientes', 'Script criado e aprovado', 'implementacao'),
        criarAcao('Estruturar funil de vendas com etapas claras', 'comercial', '2 semanas', 'alta', 3, 'Gerente Comercial', 'Mapeamento processos, software', 'Funil estruturado com 5 etapas', 'implementacao'),
        criarAcao('Implementar sistema de comissionamento', 'comercial', '3 semanas', 'media', 4, 'RH + Comercial', 'Consultoria, sistema de cálculo', 'Sistema implementado, vendedores motivados', 'implementacao'),
        criarAcao('Criar programa de treinamento de vendas', 'comercial', '4 semanas', 'media', 5, 'Gerente Comercial', 'R$ 2.000 treinamento externo', 'Equipe treinada, melhoria 20% performance', 'implementacao'),
        criarAcao('Implementar reuniões semanais de vendas', 'comercial', '1 semana', 'alta', 6, 'Gerente Comercial', '2h/semana, sala reunião', 'Reuniões acontecendo, metas claras', 'implementacao'),
        criarAcao('Criar dashboard de vendas em tempo real', 'comercial', '3 semanas', 'media', 7, 'TI + Comercial', 'Software BI, integração CRM', 'Dashboard funcionando, dados atualizados', 'implementacao'),
        criarAcao('Estruturar processo de pós-venda', 'comercial', '2 semanas', 'media', 8, 'Atendimento', 'Check-list, cronograma contatos', 'Processo implementado, satisfação medida', 'implementacao'),
        criarAcao('Implementar programa de indicação de clientes', 'comercial', '2 semanas', 'media', 9, 'Marketing + Comercial', 'Material promocional, sistema desconto', 'Programa lançado, primeiras indicações', 'implementacao'),
        criarAcao('Criar kit de vendas digital', 'comercial', '3 semanas', 'baixa', 10, 'Marketing', 'Designer, conteúdo, plataforma', 'Kit criado, vendedores usando', 'implementacao')
      );
    }

    // === ÁREA DE GESTÃO ===
    if (resultados.gestao.percentage < 60) {
      acoes.push(
        criarAcao('Implementar ERP para gestão integrada', 'gestao', '4 semanas', 'alta', 2, 'Diretor + TI', 'R$ 800/mês, consultoria implantação', 'ERP funcionando, processos integrados', 'implementacao'),
        criarAcao('Mapear e documentar todos os processos', 'gestao', '6 semanas', 'alta', 3, 'Analista Processos', '60h trabalho, software mapeamento', '80% processos documentados', 'implementacao'),
        criarAcao('Criar manual de procedimentos operacionais', 'gestao', '4 semanas', 'media', 4, 'Coordenador Operações', '40h trabalho, design manual', 'Manual criado e distribuído', 'implementacao'),
        criarAcao('Implementar reuniões gerenciais semanais', 'gestao', '1 semana', 'alta', 5, 'Diretor', 'Sala reunião, agenda fixa', 'Reuniões acontecendo, decisões ágeis', 'implementacao'),
        criarAcao('Estruturar planejamento estratégico anual', 'gestao', '3 semanas', 'alta', 6, 'Alta Direção', 'Facilitador externo, workshop', 'Planejamento concluído, metas definidas', 'implementacao'),
        criarAcao('Implementar gestão por indicadores (KPIs)', 'gestao', '4 semanas', 'media', 7, 'Analista Qualidade', 'Software dashboard, treinamento', '20 KPIs implementados e monitorados', 'implementacao'),
        criarAcao('Criar sistema de gestão da qualidade', 'gestao', '8 semanas', 'media', 8, 'Coordenador Qualidade', 'Consultoria ISO, documentação', 'SGQ implementado, processos padronizados', 'implementacao'),
        criarAcao('Implementar controle de projetos', 'gestao', '2 semanas', 'media', 9, 'Gerente Projetos', 'Software gestão projetos', 'Projetos controlados, prazos cumpridos', 'implementacao'),
        criarAcao('Estruturar comitê de inovação', 'gestao', '3 semanas', 'baixa', 10, 'P&D', 'Processo ideias, budget inovação', 'Comitê funcionando, projetos iniciados', 'implementacao'),
        criarAcao('Implementar auditoria interna mensal', 'gestao', '2 semanas', 'media', 11, 'Auditor Interno', 'Check-lists, cronograma', 'Auditorias acontecendo, melhorias identificadas', 'implementacao')
      );
    }

    // === ÁREA DE RH/PESSOAS ===
    if (resultados.rh.percentage < 60) {
      acoes.push(
        criarAcao('Estruturar processo de recrutamento e seleção', 'rh', '3 semanas', 'alta', 1, 'RH', 'Plataforma recrutamento, testes', 'Processo estruturado, contratações assertivas', 'implementacao'),
        criarAcao('Implementar plano de cargos e salários', 'rh', '6 semanas', 'alta', 2, 'RH + Consultoria', 'R$ 5.000 consultoria, pesquisa mercado', 'Plano implementado, equipe motivada', 'implementacao'),
        criarAcao('Criar programa de integração de novos funcionários', 'rh', '2 semanas', 'media', 3, 'RH', 'Material integração, cronograma', 'Programa funcionando, integração melhor', 'implementacao'),
        criarAcao('Implementar avaliação de desempenho', 'rh', '4 semanas', 'media', 4, 'RH', 'Sistema avaliação, treinamento gestores', 'Avaliações acontecendo, feedback regular', 'implementacao'),
        criarAcao('Estruturar programa de treinamento e desenvolvimento', 'rh', '4 semanas', 'media', 5, 'RH', 'Orçamento treinamento, cronograma', 'Programa estruturado, colaboradores capacitados', 'implementacao'),
        criarAcao('Implementar pesquisa de clima organizacional', 'rh', '2 semanas', 'media', 6, 'RH', 'Ferramenta pesquisa, plano ação', 'Pesquisa realizada, ações melhoria definidas', 'implementacao'),
        criarAcao('Criar programa de reconhecimento e recompensas', 'rh', '3 semanas', 'media', 7, 'RH', 'Budget reconhecimento, critérios', 'Programa lançado, engajamento melhor', 'implementacao'),
        criarAcao('Implementar gestão de talentos', 'rh', '5 semanas', 'baixa', 8, 'RH', 'Mapeamento talentos, plano sucessão', 'Talentos identificados, planos desenvolvimento', 'implementacao'),
        criarAcao('Estruturar comunicação interna', 'rh', '2 semanas', 'media', 9, 'RH + Comunicação', 'Canais comunicação, cronograma', 'Comunicação melhorada, equipe informada', 'implementacao'),
        criarAcao('Implementar programa de saúde e bem-estar', 'rh', '4 semanas', 'baixa', 10, 'RH', 'Parcerias academias, campanhas saúde', 'Programa funcionando, colaboradores saudáveis', 'implementacao')
      );
    }

    // === ÁREA DE MARKETING ===
    if (resultados.marketing.percentage < 60) {
      acoes.push(
        criarAcao('Estruturar estratégia de marketing digital', 'marketing', '3 semanas', 'alta', 1, 'Marketing', 'Agência/consultor, orçamento mídia', 'Estratégia definida, campanhas rodando', 'implementacao'),
        criarAcao('Implementar presença profissional nas redes sociais', 'marketing', '2 semanas', 'alta', 2, 'Social Media', 'Cronograma posts, criação conteúdo', 'Perfis ativos, engajamento crescendo', 'implementacao'),
        criarAcao('Criar site otimizado para conversão', 'marketing', '4 semanas', 'alta', 3, 'Webdesigner', 'R$ 8.000 desenvolvimento, SEO', 'Site no ar, conversões aumentando', 'implementacao'),
        criarAcao('Implementar automação de marketing', 'marketing', '3 semanas', 'media', 4, 'Marketing', 'Plataforma automação, setup fluxos', 'Automação funcionando, nutrição leads', 'implementacao'),
        criarAcao('Estruturar programa de marketing de conteúdo', 'marketing', '4 semanas', 'media', 5, 'Redator', 'Planejamento editorial, produção', 'Conteúdo publicado, audiência crescendo', 'implementacao'),
        criarAcao('Implementar sistema de análise de resultados', 'marketing', '2 semanas', 'media', 6, 'Analista Marketing', 'Google Analytics, dashboards', 'Análises funcionando, ROI medido', 'implementacao'),
        criarAcao('Criar programa de email marketing', 'marketing', '2 semanas', 'media', 7, 'Marketing', 'Plataforma email, templates', 'Campanhas rodando, open rate boa', 'implementacao'),
        criarAcao('Estruturar parcerias estratégicas', 'marketing', '4 semanas', 'media', 8, 'Comercial + Marketing', 'Identificação parceiros, contratos', 'Parcerias firmadas, novos canais', 'implementacao'),
        criarAcao('Implementar programa de fidelização', 'marketing', '3 semanas', 'baixa', 9, 'Marketing', 'Sistema pontos, benefícios', 'Programa lançado, clientes engajados', 'implementacao'),
        criarAcao('Criar estratégia de posicionamento de marca', 'marketing', '3 semanas', 'media', 10, 'Branding', 'Consultoria marca, manual', 'Posicionamento definido, comunicação alinhada', 'implementacao')
      );
    }

    // === ÁREA FINANCEIRA ===
    if (resultados.financeiro.percentage < 60) {
      acoes.push(
        criarAcao('Implementar controle rigoroso de fluxo de caixa', 'financeiro', '1 semana', 'alta', 1, 'Financeiro', 'Planilha/software, rotina diária', 'Controle implementado, visibilidade total', 'implementacao'),
        criarAcao('Estruturar planejamento orçamentário', 'financeiro', '3 semanas', 'alta', 2, 'Controller', 'Orçamento anual, acompanhamento mensal', 'Orçamento criado, controle gastos', 'implementacao'),
        criarAcao('Implementar centro de custos', 'financeiro', '2 semanas', 'media', 3, 'Contador', 'Reestruturação plano contas', 'Custos controlados por área', 'implementacao'),
        criarAcao('Criar reserva de emergência', 'financeiro', '6 meses', 'alta', 4, 'Diretor Financeiro', '6 meses despesas, aplicação segura', 'Reserva formada, segurança financeira', 'implementacao'),
        criarAcao('Implementar análise de rentabilidade por produto', 'financeiro', '3 semanas', 'media', 5, 'Analista Financeiro', 'Custeio, análise margem', 'Rentabilidade conhecida, decisões embasadas', 'implementacao'),
        criarAcao('Estruturar controle de recebimentos', 'financeiro', '2 semanas', 'alta', 6, 'Financeiro', 'Sistema cobrança, follow-up', 'Inadimplência reduzida, recebimento otimizado', 'implementacao'),
        criarAcao('Implementar conciliação bancária automática', 'financeiro', '1 semana', 'media', 7, 'Contador', 'Software contábil, integração banco', 'Conciliação automática, tempo economizado', 'implementacao'),
        criarAcao('Criar relatórios gerenciais financeiros', 'financeiro', '2 semanas', 'media', 8, 'Controller', 'DRE gerencial, indicadores', 'Relatórios mensais, gestão informada', 'implementacao'),
        criarAcao('Implementar controle de investimentos', 'financeiro', '2 semanas', 'baixa', 9, 'Financeiro', 'Análise ROI, aprovação investimentos', 'Investimentos controlados, ROI medido', 'implementacao'),
        criarAcao('Estruturar política de crédito', 'financeiro', '2 semanas', 'media', 10, 'Comercial + Financeiro', 'Análise crédito, alçadas aprovação', 'Política implementada, risco reduzido', 'implementacao')
      );
    }

    // === ÁREA DE ATENDIMENTO/CLIENTE ===
    if (resultados.cliente.percentage < 60) {
      acoes.push(
        criarAcao('Implementar sistema de atendimento ao cliente', 'cliente', '2 semanas', 'alta', 1, 'Atendimento', 'Software help desk, protocolos', 'Sistema funcionando, atendimento organizado', 'implementacao'),
        criarAcao('Criar pesquisa de satisfação regular', 'cliente', '1 semana', 'alta', 2, 'Qualidade', 'Ferramenta pesquisa, cronograma', 'Pesquisas acontecendo, satisfação medida', 'implementacao'),
        criarAcao('Estruturar programa de relacionamento', 'cliente', '3 semanas', 'media', 3, 'CRM', 'Segmentação clientes, comunicação', 'Relacionamento melhorado, retenção maior', 'implementacao'),
        criarAcao('Implementar chat online no site', 'cliente', '1 semana', 'media', 4, 'TI + Atendimento', 'Ferramenta chat, treinamento', 'Chat funcionando, conversões aumentando', 'implementacao'),
        criarAcao('Criar central de conhecimento/FAQ', 'cliente', '2 semanas', 'media', 5, 'Atendimento', 'Documentação, plataforma online', 'FAQ publicado, dúvidas reduzidas', 'implementacao'),
        criarAcao('Implementar programa de recuperação de clientes', 'cliente', '3 semanas', 'media', 6, 'Comercial', 'Identificação churners, ações retenção', 'Programa funcionando, clientes recuperados', 'implementacao'),
        criarAcao('Estruturar atendimento omnichannel', 'cliente', '4 semanas', 'baixa', 7, 'TI + Atendimento', 'Integração canais, unificação dados', 'Atendimento integrado, experiência melhor', 'implementacao'),
        criarAcao('Criar programa de advocacy', 'cliente', '3 semanas', 'baixa', 8, 'Marketing', 'Identificação advocates, incentivos', 'Programa lançado, clientes promovendo', 'implementacao'),
        criarAcao('Implementar SLA de atendimento', 'cliente', '1 semana', 'media', 9, 'Atendimento', 'Definição tempos, monitoramento', 'SLA definido, qualidade garantida', 'implementacao'),
        criarAcao('Estruturar onboarding de novos clientes', 'cliente', '2 semanas', 'media', 10, 'Sucesso Cliente', 'Processo estruturado, materiais', 'Onboarding otimizado, satisfação alta', 'implementacao')
      );
    }

    // AÇÕES ADICIONAIS DE CRESCIMENTO E EXPANSÃO
    acoes.push(
      criarAcao('Pesquisar novos mercados e oportunidades', 'gestao', '4 semanas', 'media', 11, 'Estratégia', 'Pesquisa mercado, análise viabilidade', 'Oportunidades identificadas, plano expansão', 'implementacao'),
      criarAcao('Desenvolver novos produtos/serviços', 'gestao', '8 semanas', 'media', 12, 'P&D', 'Pesquisa, prototipagem, testes', 'Novos produtos desenvolvidos, receita diversificada', 'implementacao'),
      criarAcao('Implementar programa de sustentabilidade', 'gestao', '6 semanas', 'baixa', 13, 'Sustentabilidade', 'Auditoria ambiental, ações ESG', 'Programa implementado, responsabilidade social', 'implementacao'),
      criarAcao('Estruturar internacionalização', 'gestao', '12 semanas', 'baixa', 14, 'Comercial Internacional', 'Estudo mercados, regulamentação', 'Plano internacional, primeiras vendas', 'implementacao'),
      criarAcao('Implementar programa de inovação digital', 'gestao', '10 semanas', 'media', 15, 'TI', 'Transformação digital, automação', 'Processos digitalizados, eficiência aumentada', 'implementacao'),
      criarAcao('Criar cultura de melhoria contínua', 'gestao', '8 semanas', 'media', 16, 'Qualidade', 'Treinamento Kaizen, projetos melhoria', 'Cultura implementada, melhorias constantes', 'implementacao'),
      criarAcao('Estruturar programa de franquias', 'gestao', '16 semanas', 'baixa', 17, 'Franquias', 'Manual operações, modelo negócio', 'Programa criado, primeiros franqueados', 'implementacao'),
      criarAcao('Implementar business intelligence', 'gestao', '6 semanas', 'media', 18, 'TI', 'Ferramenta BI, dashboards', 'BI funcionando, decisões baseadas dados', 'implementacao'),
      criarAcao('Criar programa de mentoria empresarial', 'gestao', '4 semanas', 'baixa', 19, 'RH', 'Contratação mentores, cronograma', 'Mentoria acontecendo, liderança desenvolvida', 'implementacao'),
      criarAcao('Estruturar programa de aquisições', 'gestao', '12 semanas', 'baixa', 20, 'M&A', 'Análise targets, due diligence', 'Pipeline aquisições, crescimento acelerado', 'implementacao')
    );

    return acoes.sort((a, b) => a.dataVencimento.getTime() - b.dataVencimento.getTime());
  };

  return { gerarPlanoAcao };
};
