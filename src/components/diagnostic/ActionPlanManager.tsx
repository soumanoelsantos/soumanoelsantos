
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calendar, Filter, CheckCircle2, Clock, AlertTriangle, Target, TrendingUp, Users, DollarSign, Settings, Lightbulb } from 'lucide-react';
import { format, addDays, isWeekend } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ActionItem {
  id: string;
  titulo: string;
  categoria: 'comercial' | 'gestao' | 'financeiro' | 'rh' | 'marketing' | 'operacional';
  prazo: string;
  data: Date;
  status: 'pendente' | 'em_andamento' | 'atrasado' | 'realizado';
  comoFazer: string[];
  recursos?: string;
  impacto: 'alto' | 'medio' | 'baixo';
}

interface ActionPlanManagerProps {
  actionPlan: {[key: string]: string[]};
}

const ActionPlanManager: React.FC<ActionPlanManagerProps> = ({ actionPlan }) => {
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');
  const [filtroStatus, setFiltroStatus] = useState<string>('todos');

  // Generate comprehensive action items
  const generateActionItems = (): ActionItem[] => {
    const actions: ActionItem[] = [];
    let actionId = 1;
    let currentDate = new Date();
    
    // Skip to next Monday if today is weekend
    while (isWeekend(currentDate)) {
      currentDate = addDays(currentDate, 1);
    }

    const categoriaActions = {
      comercial: [
        'Implementar CRM para controle do funil de vendas',
        'Criar script de vendas padronizado e treinar equipe',
        'Desenvolver estratégia de follow-up automatizada',
        'Definir metas claras e sistema de comissões',
        'Criar processo de qualificação de leads',
        'Implementar sistema de indicadores comerciais',
        'Desenvolver material de apoio às vendas',
        'Criar programa de relacionamento com clientes',
        'Estabelecer processo de pós-venda estruturado',
        'Implementar pesquisa de satisfação do cliente',
        'Criar estratégia de up-sell e cross-sell',
        'Desenvolver parcerias comerciais estratégicas',
        'Implementar sistema de previsão de vendas',
        'Criar programa de fidelização de clientes',
        'Estabelecer processo de recuperação de clientes inativos',
        'Implementar sistema de gestão de propostas',
        'Criar estratégia de precificação dinâmica',
        'Desenvolver canais de venda alternativos',
        'Implementar sistema de gestão de território',
        'Criar programa de capacitação contínua da equipe comercial'
      ],
      marketing: [
        'Criar presença digital profissional (site + redes sociais)',
        'Desenvolver estratégia de conteúdo relevante',
        'Implementar campanhas de Google Ads segmentadas',
        'Criar programa de indicações de clientes',
        'Investir em branding e identidade visual consistente',
        'Desenvolver estratégia de SEO para site',
        'Criar campanhas de e-mail marketing automatizadas',
        'Implementar sistema de lead scoring',
        'Desenvolver conteúdo educativo para prospects',
        'Criar estratégia de marketing de relacionamento',
        'Implementar sistema de automação de marketing',
        'Desenvolver parcerias para co-marketing',
        'Criar programa de embaixadores da marca',
        'Implementar análise de concorrência sistemática',
        'Desenvolver estratégia de marketing local',
        'Criar sistema de monitoramento de marca',
        'Implementar estratégia de marketing de conteúdo',
        'Desenvolver campanhas sazonais estratégicas',
        'Criar programa de eventos e networking',
        'Implementar sistema de análise de ROI de marketing'
      ],
      gestao: [
        'Criar organograma com responsabilidades bem definidas',
        'Implementar reuniões semanais de alinhamento',
        'Estabelecer processos documentados para principais atividades',
        'Usar ferramentas de gestão de projetos (Trello, Asana)',
        'Definir indicadores de performance (KPIs) por setor',
        'Implementar sistema de gestão da qualidade',
        'Criar manual de procedimentos operacionais',
        'Estabelecer sistema de gestão de riscos',
        'Implementar controle de documentos e registros',
        'Criar sistema de gestão de fornecedores',
        'Estabelecer processo de melhoria contínua',
        'Implementar sistema de gestão de projetos',
        'Criar comitê de tomada de decisões estratégicas',
        'Estabelecer sistema de comunicação interna',
        'Implementar gestão por processos',
        'Criar sistema de gestão de mudanças',
        'Estabelecer controles internos robustos',
        'Implementar sistema de gestão de desempenho',
        'Criar programa de inovação empresarial',
        'Estabelecer sistema de planejamento estratégico'
      ],
      financeiro: [
        'Implementar controle de fluxo de caixa diário',
        'Separar completamente finanças pessoais das empresariais',
        'Negociar prazos com fornecedores e clientes',
        'Criar reserva de emergência de 6 meses',
        'Automatizar cobrança e reduzir inadimplência',
        'Implementar orçamento empresarial detalhado',
        'Criar sistema de análise de custos por produto/serviço',
        'Estabelecer controles de gastos por departamento',
        'Implementar sistema de conciliação bancária',
        'Criar relatórios financeiros gerenciais mensais',
        'Estabelecer sistema de análise de investimentos',
        'Implementar controle de estoques financeiro',
        'Criar sistema de análise de rentabilidade',
        'Estabelecer política de crédito estruturada',
        'Implementar sistema de gestão tributária',
        'Criar indicadores financeiros de performance',
        'Estabelecer sistema de auditoria interna',
        'Implementar gestão de capital de giro',
        'Criar sistema de análise de viabilidade',
        'Estabelecer controles de compliance financeiro'
      ],
      rh: [
        'Criar programa de integração para novos funcionários',
        'Implementar avaliações de desempenho trimestrais',
        'Desenvolver plano de carreira interno',
        'Investir em treinamentos e capacitação',
        'Melhorar comunicação interna e feedback constante',
        'Criar política de remuneração estratégica',
        'Implementar sistema de gestão de talentos',
        'Desenvolver programa de liderança',
        'Criar sistema de reconhecimento e recompensas',
        'Estabelecer política de benefícios competitiva',
        'Implementar pesquisa de clima organizacional',
        'Criar programa de desenvolvimento pessoal',
        'Estabelecer sistema de sucessão',
        'Implementar gestão de competências',
        'Criar programa de mentoring interno',
        'Estabelecer política de home office',
        'Implementar sistema de gestão de conflitos',
        'Criar programa de bem-estar dos funcionários',
        'Estabelecer sistema de comunicação interna',
        'Implementar gestão de diversidade e inclusão'
      ],
      operacional: [
        'Mapear e otimizar processos principais',
        'Implementar controle de qualidade rigoroso',
        'Automatizar tarefas repetitivas',
        'Investir em tecnologia adequada',
        'Criar indicadores de produtividade',
        'Implementar sistema de gestão de estoques',
        'Estabelecer controles de segurança do trabalho',
        'Criar sistema de manutenção preventiva',
        'Implementar gestão de cadeia de suprimentos',
        'Estabelecer sistema de logística eficiente',
        'Criar programa de redução de desperdícios',
        'Implementar sistema de gestão ambiental',
        'Estabelecer controles de capacidade produtiva',
        'Criar sistema de rastreabilidade de produtos',
        'Implementar gestão de facilities',
        'Estabelecer sistema de backup e segurança de dados',
        'Criar programa de inovação tecnológica',
        'Implementar sistema de gestão de energia',
        'Estabelecer controles de terceirização',
        'Criar sistema de gestão de ativos'
      ]
    };

    // Generate actions for each category
    Object.entries(categoriaActions).forEach(([categoria, acoesList]) => {
      acoesList.forEach((acao) => {
        // Find next business day
        while (isWeekend(currentDate)) {
          currentDate = addDays(currentDate, 1);
        }

        const comoFazerMap: {[key: string]: string[]} = {
          'Implementar CRM para controle do funil de vendas': [
            '1. Pesquisar e escolher uma ferramenta de CRM adequada ao seu negócio',
            '2. Configurar os estágios do funil de vendas no sistema',
            '3. Treinar a equipe para usar a ferramenta corretamente',
            '4. Importar a base de clientes existente',
            '5. Estabelecer rotina de atualização diária dos dados'
          ],
          'Criar presença digital profissional (site + redes sociais)': [
            '1. Contratar ou desenvolver um site responsivo e otimizado',
            '2. Criar perfis profissionais nas principais redes sociais',
            '3. Desenvolver calendário de conteúdo semanal',
            '4. Investir em fotografias profissionais da empresa',
            '5. Implementar ferramentas de análise e monitoramento'
          ],
          'Implementar controle de fluxo de caixa diário': [
            '1. Escolher uma ferramenta de controle financeiro',
            '2. Categorizar todas as receitas e despesas',
            '3. Estabelecer rotina de lançamentos diários',
            '4. Criar relatórios semanais de acompanhamento',
            '5. Definir alertas para situações críticas de caixa'
          ]
        };

        const defaultComoFazer = [
          '1. Definir responsável pela implementação da ação',
          '2. Estabelecer cronograma detalhado de execução',
          '3. Identificar recursos necessários (pessoas, tempo, dinheiro)',
          '4. Criar indicadores para medir o sucesso da implementação',
          '5. Acompanhar progresso semanalmente e ajustar conforme necessário'
        ];

        actions.push({
          id: `action-${actionId++}`,
          titulo: acao,
          categoria: categoria as ActionItem['categoria'],
          prazo: '30 dias',
          data: new Date(currentDate),
          status: 'pendente',
          comoFazer: comoFazerMap[acao] || defaultComoFazer,
          recursos: 'Equipe interna + Investimento baixo/médio',
          impacto: Math.random() > 0.6 ? 'alto' : Math.random() > 0.3 ? 'medio' : 'baixo'
        });

        // Move to next business day
        currentDate = addDays(currentDate, 1);
      });
    });

    return actions.slice(0, 300); // Limit to 300 actions
  };

  const [actionItems, setActionItems] = useState<ActionItem[]>(generateActionItems());

  const toggleActionStatus = (actionId: string) => {
    setActionItems(prev => prev.map(action => 
      action.id === actionId 
        ? { ...action, status: action.status === 'realizado' ? 'pendente' : 'realizado' }
        : action
    ));
  };

  const filteredActions = useMemo(() => {
    return actionItems.filter(action => {
      const categoriaMatch = filtroCategoria === 'todas' || action.categoria === filtroCategoria;
      const statusMatch = filtroStatus === 'todos' || action.status === filtroStatus;
      return categoriaMatch && statusMatch;
    });
  }, [actionItems, filtroCategoria, filtroStatus]);

  const getIconeCategoria = (categoria: string) => {
    switch(categoria) {
      case 'comercial': return <TrendingUp className="h-4 w-4" />;
      case 'gestao': return <Target className="h-4 w-4" />;
      case 'rh': return <Users className="h-4 w-4" />;
      case 'marketing': return <Target className="h-4 w-4" />;
      case 'financeiro': return <DollarSign className="h-4 w-4" />;
      case 'operacional': return <Settings className="h-4 w-4" />;
      default: return <CheckCircle2 className="h-4 w-4" />;
    }
  };

  const getCorCategoria = (categoria: string) => {
    switch(categoria) {
      case 'comercial': return 'bg-green-100 text-green-800';
      case 'gestao': return 'bg-blue-100 text-blue-800';
      case 'rh': return 'bg-purple-100 text-purple-800';
      case 'marketing': return 'bg-orange-100 text-orange-800';
      case 'financeiro': return 'bg-red-100 text-red-800';
      case 'operacional': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'realizado': return 'text-green-600';
      case 'em_andamento': return 'text-yellow-600';
      case 'atrasado': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'realizado': return <CheckCircle2 className="h-4 w-4" />;
      case 'em_andamento': return <Clock className="h-4 w-4" />;
      case 'atrasado': return <AlertTriangle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6 action-plan-section">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Plano de Ação Personalizado ({filteredActions.length} ações)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Filtros */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filtrar por Categoria:</label>
              <Select value={filtroCategoria} onValueChange={setFiltroCategoria}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="todas">Todas as categorias</SelectItem>
                  <SelectItem value="comercial">Comercial</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="gestao">Gestão</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                  <SelectItem value="rh">RH</SelectItem>
                  <SelectItem value="operacional">Operacional</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <label className="text-sm font-medium mb-2 block">Filtrar por Status:</label>
              <Select value={filtroStatus} onValueChange={setFiltroStatus}>
                <SelectTrigger className="bg-white">
                  <SelectValue placeholder="Todos os status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200 shadow-lg">
                  <SelectItem value="todos">Todos os status</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="em_andamento">Em Andamento</SelectItem>
                  <SelectItem value="realizado">Realizado</SelectItem>
                  <SelectItem value="atrasado">Atrasado</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Lista de Ações */}
          <div className="space-y-4">
            {filteredActions.map((action) => (
              <Card key={action.id} className={`border-l-4 ${action.status === 'realizado' ? 'border-l-green-500 bg-green-50' : 'border-l-blue-500'}`}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Checkbox
                        checked={action.status === 'realizado'}
                        onCheckedChange={() => toggleActionStatus(action.id)}
                        className="mt-1"
                      />
                      <div>
                        <h4 className={`font-medium ${action.status === 'realizado' ? 'line-through text-gray-500' : ''}`}>
                          {action.titulo}
                        </h4>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className={getCorCategoria(action.categoria)}>
                            {getIconeCategoria(action.categoria)}
                            <span className="ml-1 capitalize">{action.categoria}</span>
                          </Badge>
                          <span className={`text-sm flex items-center gap-1 ${getStatusColor(action.status)}`}>
                            {getStatusIcon(action.status)}
                            {action.status.replace('_', ' ')}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(action.data, 'dd/MM/yyyy', { locale: ptBR })}
                      </div>
                      <div>Prazo: {action.prazo}</div>
                    </div>
                  </div>

                  {/* Como Fazer na Prática */}
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <h5 className="font-semibold text-blue-800 flex items-center gap-2 mb-2">
                      <Lightbulb className="h-4 w-4" />
                      Como Fazer na Prática:
                    </h5>
                    <div className="space-y-2">
                      {action.comoFazer.map((passo, index) => (
                        <div key={index} className="flex items-start gap-2">
                          <Checkbox className="mt-0.5" />
                          <span className="text-sm text-blue-900">{passo}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {action.recursos && (
                    <div className="mt-2 text-sm text-gray-600">
                      <strong>Recursos necessários:</strong> {action.recursos}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActionPlanManager;
