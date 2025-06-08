
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
      'Baixar planilha de OKR do Google (buscar "OKR template Google Sheets") ou criar em Excel com 4 colunas: Objetivo, Key Result, Meta, Status',
      'Reunir sócios/diretores por 2 horas para definir 3 objetivos claros: "O que queremos alcançar nos próximos 3 meses?" (ex: Aumentar receita, Melhorar operação, Expandir mercado)',
      'Para cada objetivo, definir 3-4 Key Results mensuráveis: transformar cada objetivo em números específicos (ex: "Aumentar receita" vira "Aumentar receita de R$ 50k para R$ 65k")',
      'Dividir cada Key Result entre os responsáveis: nomear 1 pessoa como dono de cada KR e definir prazo semanal de entrega',
      'Agendar reunião semanal fixa de 30 minutos toda segunda-feira às 9h para revisar progresso: cada responsável apresenta % de conclusão e principais bloqueios',
      'Criar dashboard visual simples: usar Google Sheets ou Notion para mostrar progresso em % e cores (verde: no prazo, amarelo: atenção, vermelho: atrasado)',
      'Implementar check-in individual de 15 minutos com cada responsável toda quinta-feira: revisar dificuldades e oferecer suporte',
      'Fazer review mensal de 1 hora no último sábado do mês: analisar o que funcionou, ajustar metas e celebrar conquistas com a equipe'
    ];
  }

  // Generate specific, actionable steps based on action and category
  const baseSteps: { [key: string]: string[] } = {
    'comercial': [
      'Instalar CRM gratuito (HubSpot ou Pipedrive) e configurar 5 estágios: Lead, Qualificado, Proposta, Negociação, Fechado',
      'Criar planilha com dados dos últimos 50 clientes: nome, telefone, email, valor da venda, tempo para fechar',
      'Escrever script de 3 perguntas para qualificar leads: "Qual seu orçamento?", "Quem toma a decisão?" e "Qual a urgência?"',
      'Treinar equipe por 2 horas usando role-play: simular 10 situações de venda e praticar objeções mais comuns',
      'Definir meta semanal de ligações/contatos e acompanhar diariamente via planilha compartilhada'
    ],
    'pre-venda': [
      'Criar lista de 20 perguntas que os clientes fazem antes de comprar e transformar em conteúdo educativo',
      'Gravar 5 vídeos de 3 minutos respondendo dúvidas frequentes e postar no YouTube e Instagram',
      'Desenvolver e-book de 10 páginas com "Guia prático para [resolver problema do cliente]" usando Canva',
      'Configurar landing page no WordPress ou Wix para capturar emails em troca do material gratuito',
      'Criar sequência de 5 emails automáticos enviados a cada 2 dias para nutrir os leads capturados'
    ],
    'encantamento-cliente': [
      'Criar welcome kit: caixa personalizada com brinde, carta de boas-vindas e cronograma dos primeiros 30 dias',
      'Agendar ligação de check-in nos dias 7, 15 e 30 após a compra para verificar satisfação',
      'Desenvolver grupo VIP no WhatsApp para clientes com conteúdo exclusivo e suporte prioritário',
      'Implementar sistema de aniversário: agendar no calendário e enviar cartão/brinde na data da empresa do cliente',
      'Criar pesquisa NPS trimestral via Google Forms e ligar para todos os detratores em 48h'
    ],
    'marketing': [
      'Definir persona ideal: criar documento de 1 página com idade, problemas, onde está online e como tomar decisão',
      'Criar calendário editorial no Google Sheets: planejar 30 posts com data, hora, rede social e call-to-action',
      'Produzir 10 posts educativos usando Canva: 5 carrosséis informativos e 5 imagens com dicas práticas',
      'Configurar Google Ads com budget de R$ 10/dia: escolher 5 palavras-chave e criar anúncio simples',
      'Monitorar resultados semanalmente: anotar alcance, cliques, leads gerados e custo por lead'
    ],
    'gestao': [
      'Mapear 5 processos principais da empresa: anotar passo a passo como cada atividade é feita hoje',
      'Criar planilha de KPIs com 8 indicadores: receita, custos, clientes novos, satisfação, produtividade',
      'Agendar reunião semanal de 1 hora toda segunda às 9h: revisar números da semana e definir prioridades',
      'Implementar sistema de responsabilidades: cada meta tem 1 responsável e prazo específico de entrega',
      'Criar relatório mensal de 2 páginas: resumir principais resultados e definir 3 focos para o próximo mês'
    ],
    'financeiro': [
      'Abrir conta empresarial separada da pessoal e transferir todas as movimentações para ela',
      'Criar planilha de fluxo de caixa no Excel: anotar toda entrada e saída diariamente por 30 dias',
      'Calcular custo real de cada produto/serviço: somar material, mão de obra, impostos e margem desejada',
      'Definir reserva de emergência: separar valor equivalente a 3 meses de custos fixos em conta poupança',
      'Instalar app de controle financeiro (GuiaBolso ou Organizze) e categorizar todos os gastos'
    ],
    'rh': [
      'Criar descrição de cargo de 1 página para cada função: responsabilidades, requisitos e salário',
      'Implementar entrevista estruturada: preparar 10 perguntas padrão e avaliar candidatos com nota de 1 a 5',
      'Desenvolver programa de integração de 7 dias: checklist com apresentação, treinamentos e acompanhamento',
      'Agendar reunião individual mensal de 30 minutos com cada funcionário para feedback e desenvolvimento',
      'Criar política de benefícios clara: definir vale alimentação, plano de saúde e outros benefícios oferecidos'
    ],
    'operacional': [
      'Cronometrar tempo de execução de 5 atividades principais: medir quanto tempo leva cada processo',
      'Criar checklist de qualidade com 10 itens: verificar se produto/serviço atende padrão antes da entrega',
      'Implementar controle de estoque semanal: contar produtos toda sexta e anotar em planilha',
      'Definir fornecedor backup para 3 itens críticos: ter alternativa caso fornecedor principal falhe',
      'Organizar espaço físico usando método 5S: separar, organizar, limpar, padronizar e manter disciplina'
    ],
    'tecnologia': [
      'Contratar internet de backup: ter segunda conexão para garantir funcionamento em caso de falha',
      'Implementar backup automático na nuvem: Google Drive ou Dropbox para salvar arquivos importantes',
      'Instalar antivírus em todos os computadores e fazer atualização mensal do sistema',
      'Criar sistema de senhas seguras: usar gerenciador como LastPass e alterar senhas principais',
      'Configurar email profissional: criar contas @suaempresa.com.br para toda a equipe'
    ],
    'cultura': [
      'Escrever missão da empresa em 1 frase: definir qual o propósito e comunicar para toda equipe',
      'Criar 5 valores da empresa: listar comportamentos esperados e dar exemplos práticos do dia a dia',
      'Implementar reconhecimento semanal: destacar 1 funcionário que demonstrou os valores na prática',
      'Organizar coffee break mensal de 1 hora: momento para equipe se conhecer melhor e fortalecer relacionamento',
      'Fazer pesquisa de clima anônima trimestral: 5 perguntas sobre satisfação e implementar melhorias'
    ],
    'relacionamento': [
      'Criar base de dados com informações pessoais dos principais clientes: aniversário, preferências, família',
      'Agendar contato trimestral com top 20 clientes: ligação de 15 minutos para saber como estão',
      'Participar de 2 eventos do setor por mês: networking para conhecer potenciais parceiros e clientes',
      'Criar programa de indicações: oferecer desconto para quem indicar novo cliente',
      'Implementar follow-up pós-venda: ligar em 7 e 30 dias para verificar satisfação'
    ],
    'produto': [
      'Entrevistar 10 clientes atuais: perguntar o que pode melhorar no produto/serviço',
      'Pesquisar 5 concorrentes principais: analisar preços, características e diferenciais',
      'Criar protótipo simples da melhoria: testar nova versão com 5 clientes antes de lançar',
      'Definir precificação baseada em valor: calcular benefício que gera para cliente e precificar baseado nisso',
      'Monitorar satisfação mensalmente: usar escala de 1 a 10 e investigar notas abaixo de 8'
    ],
    'sucesso-cliente': [
      'Mapear jornada completa do cliente: desde primeiro contato até renovação, identificar pontos de melhoria',
      'Criar manual de onboarding: passo a passo para cliente ter sucesso nos primeiros 30 dias',
      'Implementar sistema de health score: 5 indicadores para identificar clientes em risco de cancelar',
      'Agendar reunião de review trimestral: apresentar resultados alcançados e planejar próximos passos',
      'Criar programa de expansão: identificar oportunidades de vender mais para clientes satisfeitos'
    ]
  };

  const categorySteps = baseSteps[category] || baseSteps['gestao'];
  
  // Customize steps based on the specific action
  return categorySteps.map(step => {
    if (actionText.toLowerCase().includes('implementar')) {
      return step.replace('Criar', 'Implementar e criar');
    }
    if (actionText.toLowerCase().includes('melhorar')) {
      return step.replace('Definir', 'Melhorar e redefinir');
    }
    return step;
  });
};

const ActionItemExpandedContent = ({ action, onStepComplete }: ActionItemExpandedContentProps) => {
  // Generate steps if they don't exist or regenerate for better practical content
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
