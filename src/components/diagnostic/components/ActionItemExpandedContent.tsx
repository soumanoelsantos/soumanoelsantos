
import React from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Lightbulb, ListChecks } from 'lucide-react';
import { ActionItem } from '../NewDiagnosticTestContent';

interface ActionItemExpandedContentProps {
  action: ActionItem;
  onStepComplete: (actionId: string, stepIndex: number, completed: boolean) => void;
}

const generateStepsForAction = (actionText: string, category: string): string[] => {
  // Check if it's an OKR implementation action
  if (actionText.toLowerCase().includes('okr') || actionText.toLowerCase().includes('objetivos e resultados')) {
    return [
      'Definir 3 objetivos estratégicos trimestrais claros e mensuráveis (ex: "Aumentar receita", "Melhorar satisfação do cliente", "Otimizar processos")',
      'Para cada objetivo, criar 3-4 Key Results específicos com números (ex: "Aumentar receita em 25%", "Atingir NPS de 8.5", "Reduzir tempo de processo em 30%")',
      'Instalar ferramenta gratuita de acompanhamento (Google Sheets, Notion ou Weekdone) e criar dashboard visual com progresso semanal',
      'Agendar reuniões semanais de 30min às segundas-feiras para revisar progresso, identificar bloqueios e ajustar estratégias',
      'Implementar check-ins individuais quinzenais de 15min com cada responsável por KR para acompanhamento e suporte',
      'Criar ritual de review mensal: analisar resultados, celebrar conquistas, identificar lições aprendidas e planejar próximo ciclo',
      'Estabelecer sistema de transparência: compartilhar progresso dos OKRs com toda equipe via dashboard visível ou reunião all-hands',
      'Documentar processo, templates e lições aprendidas para replicar metodologia nos próximos trimestres'
    ];
  }

  // Generate AI-like steps based on action and category for other actions
  const baseSteps: { [key: string]: string[] } = {
    'comercial': [
      'Mapear o processo atual de vendas e identificar gargalos',
      'Definir métricas e KPIs para acompanhamento',
      'Treinar a equipe nas novas práticas comerciais',
      'Implementar ferramentas de CRM ou otimizar as existentes',
      'Monitorar resultados e ajustar estratégias conforme necessário'
    ],
    'marketing': [
      'Analisar o público-alvo e definir personas',
      'Criar estratégia de conteúdo e canais de comunicação',
      'Desenvolver materiais de marketing alinhados com a marca',
      'Implementar campanhas e monitorar métricas de engagement',
      'Otimizar estratégias com base nos resultados obtidos'
    ],
    'gestao': [
      'Documentar processos atuais e identificar melhorias',
      'Definir responsabilidades e fluxos de trabalho claros',
      'Implementar ferramentas de gestão e controle',
      'Treinar equipe nos novos procedimentos',
      'Estabelecer rotina de monitoramento e feedback'
    ],
    'financeiro': [
      'Organizar e categorizar todas as movimentações financeiras',
      'Implementar controles de fluxo de caixa e orçamento',
      'Definir indicadores financeiros para acompanhamento',
      'Criar relatórios gerenciais periódicos',
      'Estabelecer metas financeiras e planos de contingência'
    ],
    'rh': [
      'Mapear competências atuais da equipe',
      'Definir perfis e descrições de cargos',
      'Criar plano de desenvolvimento e treinamento',
      'Implementar processos de avaliação de desempenho',
      'Estabelecer políticas de retenção e motivação'
    ],
    'operacional': [
      'Mapear todos os processos operacionais críticos',
      'Identificar gargalos e oportunidades de melhoria',
      'Padronizar procedimentos operacionais',
      'Implementar controles de qualidade',
      'Monitorar indicadores de eficiência operacional'
    ],
    'tecnologia': [
      'Avaliar infraestrutura tecnológica atual',
      'Definir necessidades e prioridades tecnológicas',
      'Implementar soluções tecnológicas adequadas',
      'Treinar equipe no uso das novas ferramentas',
      'Estabelecer rotinas de manutenção e atualização'
    ],
    'cultura': [
      'Definir valores e princípios organizacionais',
      'Comunicar a cultura desejada para toda a equipe',
      'Implementar práticas que reforcem a cultura',
      'Criar rituais e tradições que fortaleçam o ambiente',
      'Monitorar clima organizacional e fazer ajustes'
    ],
    'relacionamento': [
      'Mapear todos os pontos de contato com clientes',
      'Definir padrões de atendimento e comunicação',
      'Implementar ferramentas de relacionamento',
      'Treinar equipe em técnicas de relacionamento',
      'Monitorar satisfação e feedback dos clientes'
    ],
    'produto': [
      'Analisar produtos/serviços atuais e mercado',
      'Identificar oportunidades de melhoria ou inovação',
      'Desenvolver protótipos ou versões melhoradas',
      'Testar com grupo seleto de clientes',
      'Lançar e monitorar performance no mercado'
    ],
    'sucesso-cliente': [
      'Mapear jornada completa do cliente',
      'Identificar pontos de atrito e oportunidades',
      'Implementar processos de onboarding e suporte',
      'Criar métricas de sucesso do cliente',
      'Estabelecer programa de acompanhamento pós-venda'
    ]
  };

  const categorySteps = baseSteps[category] || baseSteps['gestao'];
  
  // Customize steps based on the specific action
  return categorySteps.map(step => {
    if (actionText.toLowerCase().includes('implementar')) {
      return step.replace('Implementar', 'Implementar e configurar');
    }
    if (actionText.toLowerCase().includes('melhorar')) {
      return step.replace('Definir', 'Redefinir e melhorar');
    }
    return step;
  });
};

const ActionItemExpandedContent = ({ action, onStepComplete }: ActionItemExpandedContentProps) => {
  // Generate steps if they don't exist or regenerate for better AI-like content
  const steps = action.comoFazer || generateStepsForAction(action.acao, action.categoria);
  
  const handleStepToggle = (stepIndex: number, completed: boolean) => {
    onStepComplete(action.id, stepIndex, completed);
  };

  return (
    <div className="space-y-4 pt-4 border-t border-gray-200">
      {/* Metrics and Benefits */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Métricas Esperadas</h5>
          <p className="text-sm text-gray-600">{action.metricas}</p>
        </div>
        <div>
          <h5 className="font-medium text-gray-900 mb-2">Benefícios</h5>
          <p className="text-sm text-gray-600">{action.beneficios}</p>
        </div>
      </div>

      {/* AI Tip */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
        <div className="flex items-start gap-2">
          <Lightbulb className="h-4 w-4 text-blue-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-blue-900 mb-1">Dica</h5>
            <p className="text-sm text-blue-800">{action.dicaIA}</p>
          </div>
        </div>
      </div>

      {/* How to Do Steps */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <ListChecks className="h-4 w-4 text-gray-700" />
          <h5 className="font-medium text-gray-900">Como Fazer na Prática</h5>
        </div>
        <div className="space-y-2">
          {steps.map((step, stepIndex) => (
            <div key={stepIndex} className="flex items-start gap-2">
              <Checkbox
                checked={action.completedSteps?.[stepIndex] || false}
                onCheckedChange={(checked) => handleStepToggle(stepIndex, !!checked)}
                className="mt-0.5"
              />
              <span className={`text-sm ${action.completedSteps?.[stepIndex] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                <strong>{stepIndex + 1}.</strong> {step}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Resources */}
      <div>
        <h5 className="font-medium text-gray-900 mb-2">Recursos Necessários</h5>
        <p className="text-sm text-gray-600">{action.recursos}</p>
      </div>

      {/* Implementation Details */}
      <div>
        <h5 className="font-medium text-gray-900 mb-2">Detalhes da Implementação</h5>
        <p className="text-sm text-gray-600">{action.detalhesImplementacao}</p>
      </div>
    </div>
  );
};

export default ActionItemExpandedContent;
