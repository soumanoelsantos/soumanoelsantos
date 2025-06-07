
import { IntegratedData } from '@/hooks/useIntegratedData';

interface DiagnosticData {
  empresaNome: string;
  segmento: string;
  tempoMercado: string;
  faturamentoMensal: string;
  numeroFuncionarios: string;
  problemasComerciais: string;
  problemasGestao: string;
  problemasFinanceiros: string;
  problemasRH: string;
  problemasMarketing: string;
  problemasOperacionais: string;
  maioresDificuldades: string;
  objetivos6Meses: string;
}

interface ActionItem {
  id: string;
  acao: string;
  categoria: string;
  prioridade: 'alta' | 'media' | 'baixa';
  prazo: string;
  responsavel: string;
  recursos: string;
  metricas: string;
  beneficios: string;
  dataVencimento: Date;
  concluida: boolean;
  detalhesImplementacao: string;
  dicaIA: string;
  status: 'pendente' | 'em_andamento' | 'realizado' | 'atrasado';
  semana: number;
}

export const generateIntelligentActionPlan = (
  diagnosticData: DiagnosticData, 
  integratedData: IntegratedData
): ActionItem[] => {
  const actions: ActionItem[] = [];
  let actionId = 1;

  // Template de ações expandido para garantir 104 ações únicas e diversas
  const actionTemplates = {
    gestao: [
      "Criar organograma detalhado da empresa com definição clara de hierarquias e responsabilidades",
      "Implementar sistema de reuniões periódicas estruturadas (daily, weekly, monthly) com atas",
      "Desenvolver manual completo de procedimentos operacionais padrão (POP) para cada área",
      "Estabelecer política clara de delegação de responsabilidades com matriz RACI",
      "Criar sistema de acompanhamento de metas por setor com KPIs mensuráveis",
      "Implementar software de gestão empresarial (ERP) adequado ao porte da empresa",
      "Desenvolver política estruturada de tomada de decisões com níveis de alçada",
      "Criar comitê executivo de gestão estratégica com reuniões quinzenais",
      "Implementar dashboard de indicadores gerenciais em tempo real",
      "Desenvolver plano de sucessão organizacional detalhado para cargos-chave",
      "Criar política de comunicação interna eficaz com canais definidos",
      "Implementar gestão por processos mapeados com fluxogramas detalhados",
      "Desenvolver sistema robusto de gestão de projetos com metodologia ágil",
      "Criar política estruturada de gestão de mudanças organizacionais",
      "Implementar sistema certificado de gestão da qualidade ISO 9001",
      "Desenvolver programa contínuo de melhoria operacional (Kaizen)",
      "Criar sistema preventivo de gestão de riscos empresariais",
      "Implementar balanced scorecard empresarial com perspectivas balanceadas",
      "Desenvolver política completa de governança corporativa transparente",
      "Criar sistema interno de auditoria e controles preventivos"
    ],
    comercial: [
      "Implementar CRM profissional integrado com automações de vendas",
      "Criar funil de vendas estruturado com etapas bem definidas e métricas",
      "Desenvolver scripts de vendas padronizados e testados para toda equipe",
      "Estabelecer processo rigoroso de qualificação de leads com scoring",
      "Criar programa intensivo de treinamento em vendas consultivas",
      "Implementar sistema automatizado de follow-up comercial multicanal",
      "Desenvolver estratégia inteligente de pricing dinâmico baseada em valor",
      "Criar programa estruturado de pós-venda e retenção de clientes",
      "Implementar análise competitiva sistemática da concorrência mensal",
      "Desenvolver estratégia eficaz de cross-selling para aumentar ticket médio",
      "Criar sistema avançado de gestão de pipeline com previsões precisas",
      "Implementar programa estruturado de indicações e referências premiadas",
      "Desenvolver estratégia lucrativa de up-selling baseada em necessidades",
      "Criar sistema preciso de forecasting de vendas com cenários",
      "Implementar gestão especializada de contas-chave com account managers",
      "Desenvolver programa completo de fidelização de clientes VIP",
      "Criar estratégia detalhada de segmentação de clientes por valor",
      "Implementar metodologia de vendas consultivas com certificação",
      "Desenvolver programa estratégico de parcerias comerciais win-win",
      "Criar sistema eficiente de gestão de propostas comerciais automatizado"
    ],
    marketing: [
      "Desenvolver identidade visual profissional e manual de marca completo",
      "Criar estratégia completa de marketing digital multicanal integrada",
      "Implementar presença estratégica e consistente nas redes sociais",
      "Desenvolver site responsivo otimizado para conversões e SEO",
      "Criar estratégia robusta de conteúdo (blog, artigos, vídeos, podcasts)",
      "Implementar campanhas otimizadas de Google Ads com ROI positivo",
      "Desenvolver estratégia eficaz de e-mail marketing segmentado",
      "Criar programa estruturado de marketing de relacionamento CRM",
      "Implementar análise detalhada de ROI em todas campanhas de marketing",
      "Desenvolver estratégia completa de SEO e SEM para dominar buscas",
      "Criar campanhas inteligentes de remarketing para recuperar visitantes",
      "Implementar plataforma de marketing automation com nurturing",
      "Desenvolver estratégia colaborativa com influencers do nicho",
      "Criar programa regular de eventos e networking para relacionamento",
      "Implementar análise comportamental avançada do cliente com heatmaps",
      "Desenvolver estratégia consistente de branding e posicionamento",
      "Criar programa estratégico de relações públicas e assessoria",
      "Implementar marketing de conteúdo especializado B2B ou B2C",
      "Desenvolver estratégia integrada omnichannel para experiência única",
      "Criar sistema inteligente de lead scoring automatizado"
    ],
    financeiro: [
      "Implementar controle rigoroso de fluxo de caixa diário e projeções",
      "Separar definitivamente contas pessoais das empresariais com auditoria",
      "Criar sistema detalhado de controle de custos por centro de resultado",
      "Implementar orçamento empresarial anual com revisões trimestrais",
      "Desenvolver análise precisa de rentabilidade por produto/serviço",
      "Criar reserva robusta de emergência empresarial (6 meses custos)",
      "Implementar sistema automatizado de cobrança com régua definida",
      "Desenvolver política clara de crédito e cobrança preventiva",
      "Criar análise detalhada de viabilidade de investimentos com TIR",
      "Implementar controle preciso de estoque com giro otimizado",
      "Desenvolver sistema estratégico de precificação baseada em valor",
      "Criar dashboard financeiro executivo em tempo real automatizado",
      "Implementar controle automatizado de contas a pagar e receber",
      "Desenvolver análise precisa de break-even por produto/serviço",
      "Criar política estruturada de investimentos com critérios claros",
      "Implementar sistema rigoroso de auditoria financeira interna",
      "Desenvolver planejamento tributário otimizado com consultoria",
      "Criar análise detalhada de margem de contribuição por segmento",
      "Implementar sistema de budget departamental com responsabilização",
      "Desenvolver análise precisa de ROI por projeto e investimento"
    ],
    rh: [
      "Criar descrições detalhadas de cargos com competências e responsabilidades",
      "Implementar processo estruturado de recrutamento e seleção por competências",
      "Desenvolver programa completo de integração (onboarding) de 90 dias",
      "Estabelecer política justa de salários e benefícios competitiva",
      "Criar sistema regular de avaliação de desempenho 360 graus",
      "Implementar programa contínuo de treinamento e desenvolvimento pessoal",
      "Desenvolver plano estruturado de carreira interno com trilhas",
      "Criar política regular de feedback construtivo e coaching",
      "Implementar sistema de gestão por competências comportamentais",
      "Desenvolver programa eficaz de reconhecimento e recompensas",
      "Criar política flexível de trabalho remoto/híbrido estruturada",
      "Implementar pesquisa regular de clima organizacional trimestral",
      "Desenvolver programa estruturado de mentoria interna cruzada",
      "Criar sistema avançado de gestão de talentos e sucessão",
      "Implementar programa eficaz de retenção de talentos críticos",
      "Desenvolver política inclusiva de diversidade e inclusão ativa",
      "Criar programa completo de bem-estar e qualidade de vida",
      "Implementar sistema eficaz de comunicação interna transparente",
      "Desenvolver política robusta de desenvolvimento de liderança",
      "Criar programa estratégico de employer branding interno"
    ],
    operacional: [
      "Mapear detalhadamente todos os processos principais com VSM",
      "Implementar controle rigoroso de qualidade em todas as etapas",
      "Criar manual completo de procedimentos operacionais padronizados",
      "Desenvolver sistema eficaz de gestão de fornecedores estratégicos",
      "Implementar controle inteligente de estoque com sistema WMS",
      "Criar sistema otimizado de logística e distribuição eficiente",
      "Desenvolver programa intensivo de produtividade e eficiência",
      "Implementar automação de processos repetitivos com RPA",
      "Criar sistema robusto de gestão de projetos operacionais",
      "Desenvolver política estratégica de terceirização com SLAs",
      "Implementar sistema completo de gestão de ativos fixos",
      "Criar programa eficaz de redução de desperdícios lean",
      "Desenvolver sistema integrado de gestão da cadeia de suprimentos",
      "Implementar controle preciso de tempo e produtividade pessoal",
      "Criar sistema eficiente de gestão de facilidades e infraestrutura",
      "Desenvolver programa estruturado de otimização de custos operacionais",
      "Implementar sistema robusto de gestão de contratos e SLAs",
      "Criar política inteligente de gestão de estoques JIT",
      "Desenvolver sistema preventivo de gestão de manutenção preditiva",
      "Implementar programa contínuo de inovação operacional incremental"
    ],
    tecnologia: [
      "Avaliar e modernizar completamente infraestrutura de TI estratégica",
      "Implementar sistema automatizado e seguro de backup em nuvem",
      "Criar política robusta de segurança da informação e LGPD",
      "Desenvolver sistema integrado de gestão de dados e BI",
      "Implementar automação inteligente de processos (RPA avançado)",
      "Criar sistema avançado de business intelligence com dashboards",
      "Desenvolver aplicativo móvel empresarial customizado para negócio",
      "Implementar sistema profissional de videoconferência e colaboração",
      "Criar política clara de uso de tecnologia e governança",
      "Desenvolver sistema eficiente de gestão documental eletrônica",
      "Implementar solução completa de cloud computing híbrida",
      "Criar sistema de monitoramento de performance em tempo real",
      "Desenvolver integração completa entre sistemas empresariais",
      "Implementar solução robusta de e-commerce omnichannel",
      "Criar sistema avançado de gestão de relacionamento digital",
      "Desenvolver dashboard executivo interativo em tempo real",
      "Implementar sistema seguro de assinatura digital certificada",
      "Criar política estruturada de transformação digital gradual",
      "Desenvolver sistema inteligente de análise preditiva de dados",
      "Implementar solução customizada de inteligência artificial aplicada"
    ],
    cultura: [
      "Definir claramente missão, visão e valores empresariais autênticos",
      "Criar código detalhado de ética e conduta organizacional",
      "Implementar programa estruturado de cultura organizacional forte",
      "Desenvolver rituais e tradições empresariais significativas e únicas",
      "Criar programa eficaz de comunicação de valores através de ações",
      "Implementar sistema regular de reconhecimento cultural público",
      "Desenvolver programa contínuo de engajamento e motivação",
      "Criar espaços inspiradores de convivência e colaboração criativa",
      "Implementar programa estruturado de voluntariado corporativo",
      "Desenvolver política responsável de responsabilidade social empresarial",
      "Criar programa inclusivo de diversidade e inclusão genuína",
      "Implementar sistema regular de feedback cultural anônimo",
      "Desenvolver programa ativo de embaixadores da cultura interna",
      "Criar eventos regulares de integração e team building significativos",
      "Implementar programa robusto de desenvolvimento de liderança cultural",
      "Desenvolver sistema eficaz de onboarding cultural imersivo",
      "Criar programa envolvente de storytelling empresarial autêntico",
      "Implementar política equilibrada de work-life balance real",
      "Desenvolver programa contínuo de inovação colaborativa bottom-up",
      "Criar sistema eficaz de gestão da mudança cultural sustentável"
    ],
    pesquisa: [
      "Implementar pesquisa de satisfação NPS trimestral com clientes ativos",
      "Criar pesquisa anônima 360 graus para avaliação de lideranças",
      "Desenvolver pesquisa de clima organizacional semestral abrangente",
      "Implementar pesquisa de satisfação de funcionários pós-onboarding",
      "Criar pesquisa de mercado para identificar novas oportunidades",
      "Desenvolver pesquisa de satisfação pós-venda para melhoria contínua",
      "Implementar pesquisa de marca e posicionamento no mercado",
      "Criar pesquisa de necessidades não atendidas dos clientes",
      "Desenvolver pesquisa de eficácia de treinamentos corporativos",
      "Implementar pesquisa de canais de comunicação mais eficazes",
      "Criar pesquisa de benchmarking com concorrentes diretos",
      "Desenvolver pesquisa de tendências do setor e inovações",
      "Implementar pesquisa de motivação e engajamento da equipe",
      "Criar pesquisa de eficiência de processos internos críticos"
    ],
    endomarketing: [
      "Criar programa de comunicação interna mensal com newsletter",
      "Implementar mural digital interativo para comunicação transparente",
      "Desenvolver programa de reconhecimento público 'funcionário destaque'",
      "Criar eventos internos de confraternização e networking",
      "Implementar programa de sugestões e ideias inovadoras premiadas",
      "Desenvolver campanha interna de valores e cultura empresarial",
      "Criar programa de mentoria reversa entre gerações",
      "Implementar sistema de comunicação de resultados e conquistas",
      "Desenvolver programa de desenvolvimento pessoal e profissional",
      "Criar campanha interna de orgulho de pertencer à empresa",
      "Implementar programa de embaixadores da marca internos",
      "Desenvolver eventos de lançamento de produtos internamente primeiro",
      "Criar programa de comunicação de oportunidades internas",
      "Implementar sistema de feedback contínuo e melhoria sugerida"
    ],
    aceleracao: [
      "Implementar programa de inovação disruptiva com budget dedicado",
      "Criar laboratório de ideias e prototipagem rápida",
      "Desenvolver programa de parcerias estratégicas para crescimento",
      "Implementar sistema de métricas de crescimento (growth hacking)",
      "Criar programa de automação de processos para escalar rapidamente",
      "Desenvolver estratégia de expansão geográfica estruturada",
      "Implementar programa de aquisição de empresas menores",
      "Criar sistema de franquias ou licenciamento do modelo",
      "Desenvolver programa de diversificação de produtos/serviços",
      "Implementar estratégia de marketing viral e referências",
      "Criar programa de aceleração de vendas com novos canais",
      "Desenvolver sistema de precificação premium e valor agregado",
      "Implementar programa de fidelização avançada com gamificação",
      "Criar estratégia de marketplace ou plataforma digital",
      "Desenvolver programa de economia circular e sustentabilidade lucrativa"
    ]
  };

  // Função para gerar dica da IA mais específica e prática com estrutura detalhada
  const generateAITip = (acao: string, categoria: string): string => {
    const tipsStructured = {
      gestao: [
        `1. Definir Escopo e Objetivos
Meta: Estabelecer controle total sobre operações e processos.

Escopo: Interno (toda empresa) com foco em padronização e eficiência.

2. Mapear Processos Atuais
Método: Entrevistar gestores de cada área para documentar fluxos atuais.

Ferramentas: Lucidchart, Draw.io ou Bizagi para fluxogramas.

3. Identificar Responsáveis e Prazos
Responsável: Diretor de operações + um representante de cada área.

Prazo: 30 dias para mapeamento, 60 dias para implementação.

4. Implementar Gradualmente
Fase 1: Processos críticos (vendas, produção, financeiro).

Fase 2: Processos de apoio (RH, marketing, TI).

5. Ferramentas e Recursos Necessários
Software: ERP básico (R$ 200-500/mês) ou planilhas estruturadas.

Treinamento: 8 horas de capacitação para cada colaborador.

6. Métricas de Sucesso
Redução de 30% no tempo de execução de tarefas.

Diminuição de 50% em retrabalhos e erros.

7. Benefícios Esperados
Maior controle operacional e tomada de decisão baseada em dados.

Redução de custos e aumento da produtividade em 20-40%.`
      ],
      comercial: [
        `1. Estruturar o Funil de Vendas
Meta: Aumentar conversão e previsibilidade das vendas.

Etapas: Prospecção → Qualificação → Proposta → Negociação → Fechamento.

2. Escolher e Configurar CRM
Opções: HubSpot (gratuito), Pipedrive (R$ 65/mês), RD Station (R$ 150/mês).

Configuração: Campos personalizados, automações e relatórios.

3. Treinar Equipe Comercial
Programa: 16 horas de treinamento em vendas consultivas.

Conteúdo: Scripts, objeções, técnicas de fechamento.

4. Definir Métricas e Metas
KPIs: Taxa de conversão, ticket médio, ciclo de vendas.

Metas: Aumento de 25% nas vendas em 3 meses.

5. Implementar Follow-up Automatizado
Sistema: E-mails automáticos + ligações programadas.

Frequência: 1º dia, 3º dia, 1 semana, 2 semanas.

6. Recursos Necessários
Investimento: R$ 500-2.000/mês (CRM + treinamento).

Equipe: Vendedor + supervisor comercial.

7. Resultados Esperados
Aumento de 30-50% na taxa de conversão.

Redução de 40% no ciclo de vendas.`
      ],
      marketing: [
        `1. Definir Estratégia e Público-Alvo
Meta: Aumentar visibilidade e geração de leads qualificados.

Público: Personas detalhadas com dores, desejos e comportamentos.

2. Criar Identidade Visual Consistente
Elementos: Logo, cores, tipografia, tom de voz.

Aplicação: Site, redes sociais, materiais impressos.

3. Estruturar Presença Digital
Website: Responsivo, otimizado para SEO e conversões.

Redes sociais: 2-3 plataformas principais do seu público.

4. Implementar Marketing de Conteúdo
Formato: Blog posts, vídeos, infográficos, posts redes sociais.

Frequência: 3-4 posts por semana.

5. Configurar Automação de Marketing
Ferramenta: RD Station, HubSpot ou Mailchimp.

Fluxos: Nutrição de leads, welcome series, reativação.

6. Orçamento e Recursos
Investimento: R$ 800-3.000/mês (ferramentas + ads + criação).

Equipe: Gestor de marketing + freelancer/agência.

7. Métricas de Sucesso
Aumento de 200% no tráfego do site em 6 meses.

Geração de 50+ leads qualificados por mês.`
      ],
      financeiro: [
        `1. Implementar Controle de Fluxo de Caixa
Meta: Ter visibilidade total das entradas e saídas diárias.

Método: Planilha ou software financeiro atualizado diariamente.

2. Separar Contas Pessoais e Empresariais
Ação: Abrir conta PJ e transferir todas movimentações empresariais.

Prazo: 15 dias para implementação completa.

3. Categorizar Receitas e Despesas
Categorias: Vendas, custos, despesas operacionais, investimentos.

Detalhamento: Por centro de custo e responsável.

4. Criar Relatórios Gerenciais
Frequência: DRE mensal, fluxo de caixa semanal.

Indicadores: Margem bruta, EBITDA, ponto de equilíbrio.

5. Ferramentas Recomendadas
Básico: Planilha Google Sheets com templates prontos.

Profissional: ContaAzul (R$ 60/mês), Omie (R$ 90/mês).

6. Recursos Necessários
Investimento: R$ 200-1.000/mês (software + contador).

Tempo: 2 horas diárias para controle.

7. Benefícios Imediatos
Redução de 20% nos custos através de controle.

Melhoria na tomada de decisões financeiras.`
      ],
      rh: [
        `1. Mapear Perfis e Competências
Meta: Ter clareza sobre cada cargo e suas responsabilidades.

Método: Job description detalhado + competências técnicas e comportamentais.

2. Estruturar Processo Seletivo
Etapas: Triagem curricular → Entrevista → Teste técnico → Entrevista final.

Tempo: Máximo 15 dias por vaga.

3. Criar Programa de Integração
Duração: 90 dias com marcos aos 30, 60 e 90 dias.

Conteúdo: Cultura, processos, treinamentos específicos.

4. Implementar Avaliação de Performance
Frequência: Trimestral com metas claras e mensuráveis.

Método: Avaliação 360 graus + autoavaliação.

5. Desenvolver Plano de Carreira
Estrutura: Níveis hierárquicos + trilhas de desenvolvimento.

Critérios: Performance, tempo, competências desenvolvidas.

6. Ferramentas e Recursos
Software: Gupy (recrutamento), Convenia (gestão RH).

Investimento: R$ 300-1.500/mês conforme porte.

7. Resultados Esperados
Redução de 40% no turnover.

Aumento de 30% na satisfação dos colaboradores.`
      ],
      operacional: [
        `1. Mapear Processos Críticos
Meta: Documentar e otimizar fluxos operacionais principais.

Método: Value Stream Mapping (VSM) + entrevistas com operadores.

2. Identificar Gargalos e Desperdícios
Análise: Tempos, movimentações, retrabalhos, estoques.

Ferramentas: Cronoanálise + observação direta.

3. Padronizar Procedimentos
Criação: POPs (Procedimentos Operacionais Padrão) ilustrados.

Formato: Passo a passo com fotos e check-lists.

4. Implementar Controle de Qualidade
Pontos: Inspeção em etapas críticas do processo.

Ferramentas: Check-lists, formulários, indicadores.

5. Treinar Equipe Operacional
Programa: 12 horas de treinamento nos novos processos.

Método: Prático com supervisão e acompanhamento.

6. Recursos Necessários
Investimento: R$ 1.000-5.000 (consultoria + treinamento).

Tempo: 60-90 dias para implementação completa.

7. Benefícios Operacionais
Aumento de 25% na produtividade.

Redução de 50% em defeitos e retrabalhos.`
      ],
      tecnologia: [
        `1. Avaliar Infraestrutura Atual
Meta: Identificar necessidades e oportunidades de melhoria.

Auditoria: Hardware, software, segurança, backup.

2. Priorizar Investimentos
Critérios: Segurança → Produtividade → Inovação.

Orçamento: Definir budget anual para TI.

3. Implementar Backup e Segurança
Cloud: Google Drive, Dropbox Business ou AWS.

Segurança: Antivírus, firewall, senhas seguras.

4. Automatizar Processos Repetitivos
Identificação: Tarefas manuais que consomem tempo.

Ferramentas: Zapier, Power Automate, scripts personalizados.

5. Capacitar Equipe em Tecnologia
Treinamento: 8 horas sobre ferramentas digitais.

Conteúdo: Produtividade, segurança, novas tecnologias.

6. Orçamento e Cronograma
Investimento: R$ 1.000-5.000/mês conforme necessidades.

Implementação: 3-6 meses de forma gradual.

7. ROI Esperado
Aumento de 40% na produtividade da equipe.

Redução de 60% em problemas técnicos.`
      ],
      cultura: [
        `1. Definir Missão, Visão e Valores
Meta: Criar identidade organizacional autêntica e inspiradora.

Método: Workshops com lideranças + validação com equipe.

2. Comunicar Cultura de Forma Consistente
Canais: Reuniões, murais, intranet, eventos internos.

Frequência: Comunicação semanal sobre valores.

3. Criar Rituais e Tradições
Exemplos: Café da manhã mensal, premiações, comemorações.

Objetivo: Fortalecer senso de pertencimento.

4. Implementar Reconhecimento Regular
Sistema: Funcionário do mês, feedback positivo público.

Critérios: Alinhamento com valores + performance.

5. Desenvolver Lideranças Culturais
Programa: Capacitação de gestores como embaixadores.

Duração: 16 horas de treinamento em liderança.

6. Medir Clima Organizacional
Pesquisa: Trimestral com perguntas sobre cultura.

Indicadores: Engajamento, satisfação, senso de propósito.

7. Resultados Culturais
Melhoria de 40% no clima organizacional.

Redução de 50% no absenteísmo.`
      ],
      pesquisa: [
        `1. Definir Objetivos da Pesquisa
Meta: Coletar dados para melhoria contínua e tomada de decisão.

Escopo: Clientes, funcionários, mercado conforme necessidade.

2. Estruturar Questionário
Perguntas: Máximo 10-15 questões objetivas + 2-3 abertas.

Escala: NPS (0-10) ou Likert (1-5) para padronização.

3. Escolher Canais de Aplicação
Digital: Google Forms, SurveyMonkey, TypeForm.

Presencial: Entrevistas, grupos focais quando necessário.

4. Definir Amostra e Frequência
Amostra: Mínimo 30 respondentes para validez estatística.

Frequência: Trimestral para clientes, semestral para funcionários.

5. Analisar e Comunicar Resultados
Relatório: Dashboard com insights e planos de ação.

Comunicação: Transparente sobre resultados e melhorias.

6. Recursos Necessários
Investimento: R$ 200-800/mês (ferramenta + análise).

Equipe: 1 pessoa dedicada 8 horas/mês.

7. Benefícios da Pesquisa
Taxa de resposta >70% com insights acionáveis.

Melhoria contínua baseada em dados reais.`
      ],
      endomarketing: [
        `1. Estruturar Comunicação Interna
Meta: Engajar equipe e fortalecer cultura organizacional.

Canais: Newsletter, mural digital, reuniões, eventos.

2. Criar Conteúdo Relevante
Temas: Conquistas, novidades, reconhecimentos, treinamentos.

Formato: Textos curtos, vídeos, infográficos.

3. Implementar Programa de Reconhecimento
Sistema: Funcionário destaque mensal + premiação.

Critérios: Performance, valores, inovação, colaboração.

4. Desenvolver Eventos Internos
Frequência: Mensal (café da manhã, happy hour, palestras).

Objetivo: Networking interno e fortalecimento de vínculos.

5. Criar Sistema de Feedback
Canais: Caixa de sugestões, pesquisas, conversas diretas.

Resposta: Retorno obrigatório em até 15 dias.

6. Orçamento e Recursos
Investimento: R$ 300-1.500/mês (eventos + materiais).

Equipe: Coordenador RH + voluntários internos.

7. Resultados Esperados
Engajamento >80% nas ações internas.

Melhoria de 35% no clima organizacional.`
      ],
      aceleracao: [
        `1. Definir Estratégia de Crescimento
Meta: Crescimento exponencial sustentável.

Foco: Inovação, automação, parcerias estratégicas.

2. Implementar Growth Hacking
Métricas: AARRR (Aquisição, Ativação, Retenção, Receita, Referência).

Testes: A/B testing em campanhas e processos.

3. Criar Laboratório de Inovação
Espaço: Físico ou virtual para ideação e prototipagem.

Time: Multidisciplinar com perfis inovadores.

4. Automatizar Processos Críticos
Identificação: Tarefas repetitivas que consomem recursos.

Ferramentas: RPA, integração de sistemas, IA aplicada.

5. Desenvolver Parcerias Estratégicas
Tipo: Fornecedores, distribuidores, complementares.

Critério: Win-win com potencial de escala.

6. Investimento em Aceleração
Budget: 10-20% da receita dedicado à inovação.

ROI Esperado: >300% em 12-18 meses.

7. Resultados de Aceleração
Crescimento >50% em métricas-chave.

Vantagem competitiva sustentável no mercado.`
      ]
    };

    const categoryTips = tipsStructured[categoria as keyof typeof tipsStructured] || tipsStructured.gestao;
    return categoryTips[Math.floor(Math.random() * categoryTips.length)];
  };

  // Gerar exatamente 104 ações únicas distribuídas em 26 semanas (4 ações por semana)
  const categoriasChave = ['gestao', 'comercial', 'marketing', 'financeiro', 'rh', 'operacional', 'tecnologia', 'cultura', 'pesquisa', 'endomarketing', 'aceleracao'];
  const allTemplates: string[] = [];
  const usedActions = new Set<string>();

  // Criar pool de ações únicas
  Object.values(actionTemplates).forEach(categoryActions => {
    categoryActions.forEach(action => {
      if (!usedActions.has(action)) {
        allTemplates.push(action);
        usedActions.add(action);
      }
    });
  });

  // Shufflear as ações para distribuição aleatória
  const shuffledTemplates = allTemplates.sort(() => Math.random() - 0.5);

  for (let semana = 1; semana <= 26; semana++) {
    for (let acaoPorSemana = 0; acaoPorSemana < 4; acaoPorSemana++) {
      const actionIndex = (semana - 1) * 4 + acaoPorSemana;
      
      // Garantir que temos ações suficientes
      if (actionIndex >= shuffledTemplates.length) {
        break;
      }

      const acaoTemplate = shuffledTemplates[actionIndex];
      
      // Determinar categoria da ação
      let categoria = 'gestao';
      for (const [cat, templates] of Object.entries(actionTemplates)) {
        if (templates.includes(acaoTemplate)) {
          categoria = cat;
          break;
        }
      }

      // Definir prioridade baseada na semana
      let prioridade: 'alta' | 'media' | 'baixa' = 'media';
      if (semana <= 8) prioridade = 'alta';
      else if (semana >= 20) prioridade = 'baixa';

      // Calcular data de vencimento
      const dataVencimento = new Date();
      dataVencimento.setDate(dataVencimento.getDate() + (semana * 7));

      const action: ActionItem = {
        id: `action_${actionId++}`,
        acao: acaoTemplate,
        categoria,
        prioridade,
        prazo: `${7} dias`,
        responsavel: categoria === 'gestao' ? 'Diretor Geral' : 
                    categoria === 'comercial' ? 'Gestor Comercial' :
                    categoria === 'marketing' ? 'Gestor de Marketing' :
                    categoria === 'financeiro' ? 'Gestor Financeiro' :
                    categoria === 'rh' ? 'Gestor de RH' :
                    categoria === 'operacional' ? 'Gestor Operacional' :
                    categoria === 'tecnologia' ? 'Responsável de TI' :
                    categoria === 'pesquisa' ? 'Analista de Pesquisa' :
                    categoria === 'endomarketing' ? 'Coordenador de RH' :
                    categoria === 'aceleracao' ? 'Diretor de Crescimento' :
                    'Gestor Responsável',
        recursos: categoria === 'tecnologia' ? 'Software especializado, treinamento técnico, consultoria especializada' :
                 categoria === 'financeiro' ? 'Sistema financeiro robusto, tempo para análise, consultoria contábil' :
                 categoria === 'marketing' ? 'Ferramentas de design, orçamento para campanhas, criação de conteúdo' :
                 categoria === 'pesquisa' ? 'Ferramentas de pesquisa, plataforma de coleta, análise estatística' :
                 categoria === 'endomarketing' ? 'Ferramentas de comunicação, designer, conteúdo criativo' :
                 categoria === 'aceleracao' ? 'Budget para inovação, equipe dedicada, tecnologia avançada' :
                 'Tempo da equipe qualificada, materiais de apoio, ferramentas adequadas',
        metricas: categoria === 'comercial' ? 'Aumento de 15-25% nas vendas, melhoria na conversão de leads' :
                 categoria === 'financeiro' ? 'Redução de 20% nos custos, controle 100% atualizado' :
                 categoria === 'rh' ? 'Redução de 30% no turnover, melhoria significativa no clima' :
                 categoria === 'marketing' ? 'Aumento de 25% no engajamento, mais leads qualificados' :
                 categoria === 'pesquisa' ? 'Taxa de resposta >70%, insights acionáveis obtidos' :
                 categoria === 'endomarketing' ? 'Engajamento >80%, melhoria no clima organizacional' :
                 categoria === 'aceleracao' ? 'Crescimento >50% em métricas-chave, ROI >300%' :
                 'Melhoria mensurável no indicador específico da área',
        beneficios: categoria === 'gestao' ? 'Maior organização, eficiência operacional e tomada de decisão' :
                   categoria === 'comercial' ? 'Aumento sustentável das vendas e melhor relacionamento com clientes' :
                   categoria === 'marketing' ? 'Maior visibilidade da marca, autoridade no mercado e geração de leads' :
                   categoria === 'financeiro' ? 'Melhor controle financeiro, previsibilidade e tomada de decisões' :
                   categoria === 'rh' ? 'Equipe mais engajada, produtiva e alinhada com objetivos' :
                   categoria === 'operacional' ? 'Processos mais eficientes, menor retrabalho e custos otimizados' :
                   categoria === 'tecnologia' ? 'Maior eficiência, competitividade e escalabilidade' :
                   categoria === 'pesquisa' ? 'Decisões baseadas em dados, melhoria contínua orientada' :
                   categoria === 'endomarketing' ? 'Equipe mais motivada, orgulhosa e alinhada culturalmente' :
                   categoria === 'aceleracao' ? 'Crescimento exponencial, vantagem competitiva e inovação' :
                   'Cultura organizacional mais forte, alinhada e sustentável',
        dataVencimento,
        concluida: false,
        detalhesImplementacao: `Implementar ${acaoTemplate.toLowerCase()} seguindo as melhores práticas da indústria e adaptando à realidade da empresa`,
        dicaIA: generateAITip(acaoTemplate, categoria),
        status: 'pendente' as const,
        semana
      };

      actions.push(action);
    }
  }

  // Personalizar algumas ações baseadas nos dados coletados
  if (diagnosticData.problemasComerciais && actions.length > 10) {
    actions[5].acao = `Resolver urgentemente: ${diagnosticData.problemasComerciais.substring(0, 80)}...`;
    actions[5].prioridade = 'alta';
    actions[5].dicaIA = "Este é um problema comercial específico da sua empresa. Analise a raiz do problema, colete dados detalhados de vendas e feedback de clientes. Implemente mudanças graduais e meça resultados semanalmente.";
  }

  if (diagnosticData.problemasFinanceiros && actions.length > 20) {
    actions[15].acao = `Implementar solução financeira urgente: ${diagnosticData.problemasFinanceiros.substring(0, 80)}...`;
    actions[15].prioridade = 'alta';
    actions[15].dicaIA = "Problemas financeiros requerem ação imediata e controle rigoroso. Comece com fluxo de caixa diário, separe contas pessoais das empresariais e crie reservas de emergência.";
  }

  if (diagnosticData.objetivos6Meses && actions.length > 50) {
    actions[25].acao = `Executar estratégia para atingir: ${diagnosticData.objetivos6Meses.substring(0, 80)}...`;
    actions[25].prioridade = 'alta';
    actions[25].dicaIA = "Para atingir este objetivo, quebre-o em metas menores e mensuráveis. Crie um plano de 90 dias com marcos específicos e monitore progresso semanalmente.";
  }

  console.log(`Geradas ${actions.length} ações únicas para o programa de aceleração empresarial`);
  return actions.slice(0, 104); // Garantir exatamente 104 ações
};
