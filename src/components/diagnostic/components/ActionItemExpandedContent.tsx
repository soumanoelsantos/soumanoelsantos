
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
      'Criar lista de 20 perguntas frequentes dos clientes e transformar em 5 posts educativos para Instagram/LinkedIn',
      'Gravar 3 vídeos de 2 minutos no celular respondendo dúvidas principais e postar no YouTube/Instagram',
      'Fazer e-book simples de 8 páginas no Canva com "Guia prático para [resolver problema específico do seu cliente]"',
      'Criar página no site ou Instagram para capturar emails em troca do material gratuito',
      'Configurar sequência de 3 emails automáticos (Mailchimp gratuito) enviados nos dias 1, 3 e 7 após captação'
    ],
    'pre_venda': [
      'Criar lista de 20 perguntas frequentes dos clientes e transformar em 5 posts educativos para Instagram/LinkedIn',
      'Gravar 3 vídeos de 2 minutos no celular respondendo dúvidas principais e postar no YouTube/Instagram',
      'Fazer e-book simples de 8 páginas no Canva com "Guia prático para [resolver problema específico do seu cliente]"',
      'Criar página no site ou Instagram para capturar emails em troca do material gratuito',
      'Configurar sequência de 3 emails automáticos (Mailchimp gratuito) enviados nos dias 1, 3 e 7 após captação'
    ],
    'encantamento-cliente': [
      'Montar kit de boas-vindas: caixa personalizada com brinde, carta manuscrita e cronograma dos primeiros 15 dias',
      'Agendar 3 ligações obrigatórias: dia 3 (como está?), dia 15 (precisa de algo?) e dia 30 (satisfação de 0 a 10)',
      'Criar grupo VIP no WhatsApp só para clientes com dicas exclusivas e atendimento prioritário em até 2 horas',
      'Cadastrar aniversário de todos os clientes e enviar cartão personalizado + desconto especial na data',
      'Fazer pesquisa NPS a cada 3 meses via Google Forms e ligar pessoalmente para quem der nota abaixo de 8'
    ],
    'encantamento_cliente': [
      'Montar kit de boas-vindas: caixa personalizada com brinde, carta manuscrita e cronograma dos primeiros 15 dias',
      'Agendar 3 ligações obrigatórias: dia 3 (como está?), dia 15 (precisa de algo?) e dia 30 (satisfação de 0 a 10)',
      'Criar grupo VIP no WhatsApp só para clientes com dicas exclusivas e atendimento prioritário em até 2 horas',
      'Cadastrar aniversário de todos os clientes e enviar cartão personalizado + desconto especial na data',
      'Fazer pesquisa NPS a cada 3 meses via Google Forms e ligar pessoalmente para quem der nota abaixo de 8'
    ],
    'marketing': [
      'Definir cliente ideal em 1 página: idade, renda, problemas principais, onde passa tempo online e como decide comprar',
      'Criar calendário no Google Sheets: 20 posts planejados com data, rede social, tipo de conteúdo e call-to-action',
      'Produzir 5 posts no Canva: 3 carrosséis educativos e 2 imagens com dicas práticas do seu segmento',
      'Configurar anúncio no Instagram: budget R$ 5/dia, público similar aos seus clientes atuais, objetivo conversões',
      'Acompanhar resultados toda sexta: anotar alcance, cliques, mensagens recebidas e calcular custo por lead'
    ],
    'gestao': [
      'Mapear 3 processos principais: anotar passo a passo em documento Word como cada atividade crítica é feita hoje',
      'Criar planilha de indicadores com 6 números: receita mensal, custos, novos clientes, satisfação, produtividade da equipe',
      'Agendar reunião semanal fixa toda segunda às 9h por 45 minutos: revisar números e definir 3 prioridades da semana',
      'Definir responsável único para cada meta: escrever nome da pessoa e data limite para cada objetivo',
      'Fazer relatório mensal de 1 página: principais resultados, o que funcionou, o que não funcionou e focos do próximo mês'
    ],
    'financeiro': [
      'Separar conta pessoal da empresarial: abrir conta PJ no banco e transferir todas movimentações da empresa',
      'Anotar TODAS as entradas e saídas por 30 dias em planilha Excel: data, descrição, valor, categoria',
      'Calcular preço real de cada produto: somar material + mão de obra + impostos + 30% de lucro mínimo',
      'Guardar dinheiro para emergência: separar valor de 2 meses de gastos fixos numa conta poupança',
      'Instalar app Mobills ou GuiaBolso no celular e categorizar todos os gastos da empresa por 30 dias'
    ],
    'rh': [
      'Escrever descrição de cada cargo em 1 página: o que faz, requisitos mínimos, salário e a quem reporta',
      'Criar entrevista padrão: preparar 8 perguntas iguais para todos candidatos e dar nota de 1 a 5 para cada resposta',
      'Fazer checklist de primeiro dia: apresentar empresa, dar acesso aos sistemas, explicar regras e acompanhar por 1 semana',
      'Agendar conversa individual de 30 minutos com cada funcionário todo mês: perguntar dificuldades e dar feedback',
      'Definir benefícios claros: valor do vale alimentação, plano de saúde (se oferece) e outros benefícios por escrito'
    ],
    'operacional': [
      'Cronometrar quanto tempo leva cada atividade principal: medir 3 vezes e anotar tempo médio de execução',
      'Criar checklist de qualidade com 8 itens obrigatórios: verificar antes de entregar produto/serviço ao cliente',
      'Contar estoque toda sexta-feira: anotar quantidade de cada item em planilha e definir ponto mínimo para comprar',
      'Ter fornecedor reserva para 3 itens mais importantes: pesquisar e deixar contato de backup caso o principal falhe',
      'Organizar espaço físico: separar itens por categoria, etiquetar prateleiras, limpar e manter organização'
    ],
    'tecnologia': [
      'Contratar internet backup: ter segunda conexão (4G ou cabo) para não parar quando internet principal cair',
      'Configurar backup automático: usar Google Drive ou Dropbox para salvar arquivos importantes todo dia',
      'Instalar antivírus pago em todos computadores e atualizar sistema operacional todo mês',
      'Trocar senhas principais: usar combinação com números, letras e símbolos, anotar em local seguro',
      'Criar email profissional: fazer @suaempresa.com.br para você e equipe usando Google Workspace'
    ],
    'cultura': [
      'Escrever propósito da empresa em 1 frase simples: "Existe para fazer o quê?" e comunicar para toda equipe',
      'Definir 4 valores principais: comportamentos que vocês esperam na prática, com exemplos do dia a dia',
      'Escolher 1 funcionário por semana para destacar: reconhecer publicamente quem demonstrou os valores',
      'Fazer café da manhã mensal de 1 hora: momento para equipe conversar, se conhecer melhor e dar sugestões',
      'Perguntar satisfação da equipe a cada 3 meses: 3 perguntas anônimas no Google Forms e implementar melhorias'
    ],
    'relacionamento': [
      'Anotar informações pessoais dos 20 principais clientes: aniversário, preferências, família, hobbies',
      'Ligar para top 10 clientes a cada 3 meses: conversa de 10 minutos só para saber como estão (sem vender nada)',
      'Participar de 1 evento do setor por mês: networking para conhecer pessoas e possíveis parceiros',
      'Criar programa "indique e ganhe": oferecer desconto de 10% para quem trouxer cliente novo',
      'Fazer follow-up pós-venda: ligar em 1 semana e 1 mês após entrega para ver se está tudo bem'
    ],
    'produto': [
      'Conversar com 5 clientes atuais: perguntar "o que pode melhorar no nosso produto/serviço?" e anotar tudo',
      'Pesquisar 3 concorrentes principais: comparar preços, qualidade, atendimento e anotar diferenças',
      'Testar melhoria pequena com 3 clientes: implementar mudança simples e ver reação antes de lançar para todos',
      'Calcular preço baseado no valor que entrega: "quanto o cliente economiza/ganha usando seu produto?"',
      'Perguntar nota de 0 a 10 para satisfação todo mês: investigar quem deu nota menor que 8'
    ],
    'sucesso-cliente': [
      'Mapear jornada completa: desde primeiro contato até renovação, identificar onde cliente pode ter dificuldade',
      'Criar manual simples de "primeiros passos": passo a passo para cliente ter sucesso nos primeiros 15 dias',
      'Criar score de saúde do cliente: 4 indicadores para identificar quem pode cancelar (uso, satisfação, pagamento, contato)',
      'Agendar reunião trimestral: apresentar resultados que cliente conquistou usando seu produto/serviço',
      'Identificar oportunidades de vender mais: mapear quais clientes satisfeitos podem comprar produtos adicionais'
    ]
  };

  // Try different category formats
  let categorySteps = baseSteps[category] || 
                     baseSteps[category.replace('-', '_')] || 
                     baseSteps[category.replace('_', '-')] || 
                     baseSteps['gestao'];
  
  // Customize steps based on the specific action
  return categorySteps.map(step => {
    if (actionText.toLowerCase().includes('implementar')) {
      return step.replace('Criar', 'Implementar e criar').replace('Definir', 'Implementar e definir');
    }
    if (actionText.toLowerCase().includes('melhorar')) {
      return step.replace('Criar', 'Melhorar e criar').replace('Definir', 'Melhorar e redefinir');
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
