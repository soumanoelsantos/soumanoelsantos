
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
      'SEMANA 1: Baixar modelo OKR: Acesse drive.google.com/templates, procure "OKR", baixe planilha ou crie no Excel com colunas: Objetivo, Key Result, Meta Numérica, Responsável, Data Limite, Status (%)',
      'SEMANA 1: Reunião de definição de objetivos: Agende 3 horas com sócios/diretores, faça pergunta: "Quais 3 resultados mais importantes queremos em 90 dias?" Anote todas as respostas e vote nos 3 principais',
      'SEMANA 2: Transformar objetivos em números: Para cada objetivo, crie 3-4 metas específicas. Ex: "Aumentar vendas" vira "Vender R$ 150.000 em 90 dias" (seja específico com valor e prazo)',
      'SEMANA 2: Nomear responsáveis: Cada meta precisa de 1 pessoa responsável. Chame cada um individualmente, explique a meta, pergunte se aceita e defina entrega semanal específica',
      'SEMANA 3: Primeira reunião de acompanhamento: Toda segunda às 9h por 30 min. Cada responsável fala: % concluído, principal dificuldade, o que precisa de ajuda. Anote tudo.',
      'SEMANA 3: Criar dashboard visual: Use Google Sheets ou Notion. Faça gráfico de barras mostrando % de cada meta. Verde (no prazo), amarelo (atenção), vermelho (atrasado)',
      'SEMANA 4: Check-ins individuais: Toda quinta, 15 min com cada responsável. Pergunte: "Qual sua principal dificuldade?" e "Como posso ajudar?" Ofereça soluções práticas',
      'MÊS 3: Review e celebração: Último sábado do trimestre, 2h com equipe. Apresente resultados, analise o que funcionou/não funcionou, celebre conquistas e defina próximo trimestre'
    ];
  }

  // Generate specific, actionable steps based on category
  const baseSteps: { [key: string]: string[] } = {
    'comercial': [
      'SEMANA 1: Instalar CRM gratuito - Acesse hubspot.com/pt/pricing, crie conta gratuita, configure 5 estágios: "Novo Lead → Qualificado → Proposta → Negociação → Fechado". Importe planilha atual de clientes',
      'SEMANA 1: Criar base de dados atual - Abra Excel, liste últimos 50 clientes: Nome | Telefone | Email | Valor Venda | Tempo para Fechar | Fonte. Use essa base para análises',
      'SEMANA 2: Criar script de qualificação - Escreva 3 perguntas obrigatórias: "Qual orçamento disponível?", "Quem decide a compra?" e "Qual urgência para resolver?". Treine com role-play',
      'SEMANA 2: Treinamento prático de vendas - 2 horas com equipe, simule 10 situações: cliente sem dinheiro, cliente indeciso, cliente com pressa. Pratique objeções reais do seu negócio',
      'SEMANA 3: Definir e acompanhar metas - Meta semanal: X ligações, Y reuniões agendadas. Crie planilha compartilhada no Google Sheets, atualize diariamente, revise sexta-feira 17h',
      'SEMANA 4: Implementar follow-up sistemático - Configure lembretes no celular: ligar em 2 dias, 1 semana, 2 semanas, 1 mês. Use templates de WhatsApp com ofertas específicas'
    ],
    'pre-venda': [
      'SEMANA 1: Criar conteúdo educativo - Liste 20 perguntas frequentes dos clientes. Transforme em 5 posts educativos para Instagram/LinkedIn usando Canva. Poste 1 por dia útil',
      'SEMANA 1: Gravar vídeos explicativos - Use celular, grave 3 vídeos de 90 segundos respondendo principais dúvidas. Poste no Instagram Stories, YouTube e WhatsApp Business',
      'SEMANA 2: Criar material gratuito (lead magnet) - Faça e-book de 8 páginas no Canva: "Guia prático para [resolver problema do cliente]". Include checklist, exemplos e erros comuns',
      'SEMANA 2: Página de captura de leads - Use Linktree ou crie página simples. Título: "Baixe grátis", descrição do benefício, formulário (nome + email + telefone), botão "Baixar agora"',
      'SEMANA 3: Automação de email marketing - Cadastre no Mailchimp (grátis até 2000 contatos). Crie sequência: Email 1 (link do material), Email 3 (dica extra), Email 7 (oferta especial)',
      'SEMANA 4: Monitorar e otimizar - Acompanhe: quantos baixaram material, quantos abriram emails, quantos viraram clientes. Meta: 20 leads/semana, 30% abre emails, 5% vira cliente'
    ],
    'pre_venda': [
      'SEMANA 1: Criar conteúdo educativo - Liste 20 perguntas frequentes dos clientes. Transforme em 5 posts educativos para Instagram/LinkedIn usando Canva. Poste 1 por dia útil',
      'SEMANA 1: Gravar vídeos explicativos - Use celular, grave 3 vídeos de 90 segundos respondendo principais dúvidas. Poste no Instagram Stories, YouTube e WhatsApp Business',
      'SEMANA 2: Criar material gratuito (lead magnet) - Faça e-book de 8 páginas no Canva: "Guia prático para [resolver problema do cliente]". Include checklist, exemplos e erros comuns',
      'SEMANA 2: Página de captura de leads - Use Linktree ou crie página simples. Título: "Baixe grátis", descrição do benefício, formulário (nome + email + telefone), botão "Baixar agora"',
      'SEMANA 3: Automação de email marketing - Cadastre no Mailchimp (grátis até 2000 contatos). Crie sequência: Email 1 (link do material), Email 3 (dica extra), Email 7 (oferta especial)',
      'SEMANA 4: Monitorar e otimizar - Acompanhe: quantos baixaram material, quantos abriram emails, quantos viraram clientes. Meta: 20 leads/semana, 30% abre emails, 5% vira cliente'
    ],
    'encantamento-cliente': [
      'SEMANA 1: Criar kit de boas-vindas - Monte caixa com: carta manuscrita do CEO, brinde da empresa, cronograma dos próximos 30 dias, contatos importantes. Custo máximo R$ 50 por kit',
      'SEMANA 1: Agendar ligações obrigatórias - Configure lembretes: Dia 3 (como está se adaptando?), Dia 15 (precisa de algo?), Dia 30 (nota de 0-10 para satisfação). Use agenda do celular',
      'SEMANA 2: Criar grupo VIP WhatsApp - Nome: "Clientes VIP [Nome da Empresa]". Envie dicas exclusivas 2x/semana, responda em até 2h, compartilhe novidades antes de todos',
      'SEMANA 2: Mapear aniversários e datas - Planilha Excel: Nome | Aniversário | Data de Início | Preferências. Configure lembretes no celular para enviar cartão + desconto especial',
      'SEMANA 3: Pesquisa NPS trimestral - Google Forms com pergunta: "Recomendaria nossa empresa? (0-10)". Envie por email/WhatsApp. Ligue pessoalmente para quem der nota abaixo de 8',
      'SEMANA 4: Programa surpresas - Todo mês: escolha 1 cliente para surpresa (upgrade grátis, desconto especial, produto novo). Anuncie no grupo VIP para outros verem'
    ],
    'encantamento_cliente': [
      'SEMANA 1: Criar kit de boas-vindas - Monte caixa com: carta manuscrita do CEO, brinde da empresa, cronograma dos próximos 30 dias, contatos importantes. Custo máximo R$ 50 por kit',
      'SEMANA 1: Agendar ligações obrigatórias - Configure lembretes: Dia 3 (como está se adaptando?), Dia 15 (precisa de algo?), Dia 30 (nota de 0-10 para satisfação). Use agenda do celular',
      'SEMANA 2: Criar grupo VIP WhatsApp - Nome: "Clientes VIP [Nome da Empresa]". Envie dicas exclusivas 2x/semana, responda em até 2h, compartilhe novidades antes de todos',
      'SEMANA 2: Mapear aniversários e datas - Planilha Excel: Nome | Aniversário | Data de Início | Preferências. Configure lembretes no celular para enviar cartão + desconto especial',
      'SEMANA 3: Pesquisa NPS trimestral - Google Forms com pergunta: "Recomendaria nossa empresa? (0-10)". Envie por email/WhatsApp. Ligue pessoalmente para quem der nota abaixo de 8',
      'SEMANA 4: Programa surpresas - Todo mês: escolha 1 cliente para surpresa (upgrade grátis, desconto especial, produto novo). Anuncie no grupo VIP para outros verem'
    ],
    'marketing': [
      'SEMANA 1: Definir persona ideal - Preencha formulário: Idade, renda, problemas principais, onde passa tempo online, como pesquisa antes de comprar. Base essa persona em seus 10 melhores clientes',
      'SEMANA 1: Criar calendário editorial - Planilha Google: 30 dias de conteúdo. Coluna: Data | Rede Social | Tipo Post | Texto | Imagem | Call-to-Action. Produza tudo de uma vez',
      'SEMANA 2: Produzir conteúdo no Canva - 10 posts: 5 carrosséis educativos (dicas do seu setor), 3 antes/depois de clientes, 2 bastidores da empresa. Use templates prontos',
      'SEMANA 2: Configurar anúncio Instagram - Budget R$ 10/dia, público: mulheres/homens 25-45 anos na sua cidade + interesses relacionados ao seu produto. Objetivo: "Tráfego"',
      'SEMANA 3: Acompanhar resultados - Planilha semanal: Post | Alcance | Curtidas | Comentários | Cliques | Leads | Custo por Lead. Meta: custo máximo R$ 15 por lead qualificado',
      'SEMANA 4: Otimizar baseado em dados - Posts com mais engajamento = produzir mais similar. Anúncios com menor custo = aumentar budget. Horários com mais alcance = postar sempre'
    ],
    'gestao': [
      'SEMANA 1: Mapear processos críticos - Documento Word: Passo-a-passo de como faz atendimento ao cliente, entrega do produto, cobrança. Cronometre tempo de cada etapa',
      'SEMANA 1: Definir 6 indicadores principais - Planilha Excel: Receita mensal, custos totais, novos clientes, satisfação (NPS), produtividade equipe (vendas/pessoa), lucro líquido',
      'SEMANA 2: Implementar reunião semanal - Toda segunda 9h, 45 minutos. Pauta fixa: resultados da semana, 3 problemas principais, 3 prioridades para próxima semana. Ata por email',
      'SEMANA 2: Definir responsáveis únicos - Cada meta/projeto tem 1 responsável. Planilha: Meta | Responsável | Data Limite | Status. Reunião individual semanal de 15 min com cada',
      'SEMANA 3: Criar relatório mensal - Template 1 página: Principais números, o que funcionou, o que não funcionou, 3 focos do próximo mês. Envie para toda equipe',
      'SEMANA 4: Implementar sistema de metas - Meta mensal para cada área: vendas (R$ X), produção (Y unidades), qualidade (Z% satisfação). Acompanhe semanalmente'
    ],
    'financeiro': [
      'SEMANA 1: Separar conta PJ da pessoal - Abra conta empresarial (Nubank PJ, Inter, C6). Transfira todas movimentações da empresa. Nunca mais misture pessoal com empresarial',
      'SEMANA 1: Controlar entrada/saída 30 dias - Excel: Data | Descrição | Valor | Categoria (venda, material, salário, etc). Anote TUDO, até cafezinho. Meta: saber para onde vai cada R$ 1',
      'SEMANA 2: Calcular preço real produtos - Planilha: Produto | Material | Mão de obra | Impostos | Outros custos | Total + 30% lucro mínimo = Preço de venda. Ajuste se necessário',
      'SEMANA 2: Criar reserva emergência - Meta: valor de 3 meses de gastos fixos. Separe conta poupança exclusiva. Deposite 10% do lucro mensal até atingir. Só use em emergência real',
      'SEMANA 3: App controle financeiro - Baixe Mobills ou GuiaBolso. Conecte conta empresa. Categorize todos gastos por 30 dias: vendas, marketing, pessoal, operacional, outros',
      'SEMANA 4: Relatório financeiro mensal - Template: receita, custos, lucro líquido, fluxo de caixa próximos 60 dias, principais gastos. Revise última sexta de cada mês'
    ],
    'rh': [
      'SEMANA 1: Criar descrição de cargos - Documento por função: o que faz diariamente, requisitos mínimos, salário, a quem reporta, principais responsabilidades. Base para contratações',
      'SEMANA 1: Padronizar entrevistas - 8 perguntas iguais para todos: experiência, motivação, expectativa salarial, disponibilidade, exemplo situação difícil. Nota 1-5 cada resposta',
      'SEMANA 2: Checklist primeiro dia - Apresentar empresa (história, valores), dar acesso sistemas, explicar regras básicas, apresentar equipe, definir buddy por 1 semana',
      'SEMANA 2: Conversa individual mensal - 30 min com cada funcionário: como está se sentindo, principais dificuldades, sugestões melhoria, feedback sobre performance. Anote tudo',
      'SEMANA 3: Definir benefícios claros - Documento: valor vale alimentação/refeição, plano saúde (se oferece), outros benefícios. Entregue para todos assinarem ciência',
      'SEMANA 4: Pesquisa satisfação equipe - Google Forms anônimo: nota 0-10 satisfação geral, o que mais gosta, o que mudaria, se recomendaria empresa. Implemente melhorias'
    ],
    'operacional': [
      'SEMANA 1: Cronometrar atividades principais - Cronometre 3 vezes cada processo crítico: atendimento, produção, entrega. Anote tempo médio. Meta: reduzir 20% tempo sem perder qualidade',
      'SEMANA 1: Criar checklist qualidade - Lista 8 itens obrigatórios antes entregar produto/serviço ao cliente. Plastifique e cole na área de trabalho. Verificação 100% obrigatória',
      'SEMANA 2: Controle estoque semanal - Toda sexta 17h: conte quantidade cada item importante. Planilha: Item | Quantidade | Ponto Mínimo | Fornecedor. Compre quando atingir mínimo',
      'SEMANA 2: Fornecedores backup - Para 3 itens mais críticos: pesquise e tenha contato de fornecedor reserva. Negocie preços. Teste qualidade comprando pequena quantidade',
      'SEMANA 3: Organizar espaço físico - Método 5S: separar por categoria, etiquetar prateleiras/gavetas, limpar semanalmente, manter organização. Foto "antes e depois" para motivar',
      'SEMANA 4: Medir produtividade - Acompanhe: unidades produzidas/dia, tempo médio por unidade, % defeitos, % retrabalho. Meta: aumentar 15% produtividade em 2 meses'
    ],
    'tecnologia': [
      'SEMANA 1: Internet backup - Contrate plano 4G corporativo (Vivo, Claro, Tim). Configure roteador que aceita chip. Teste velocidade. Use quando internet principal cair',
      'SEMANA 1: Backup automático arquivos - Configure Google Drive ou Dropbox: sincronização automática pastas importantes. Teste restauração. Verifique diariamente se está funcionando',
      'SEMANA 2: Antivírus e atualizações - Instale Kaspersky ou Norton em todos PCs. Configure atualização automática. Atualize Windows/Office mensalmente. Agenda lembrete 1ª segunda do mês',
      'SEMANA 2: Senhas seguras - Use gerenciador (Bitwarden grátis). Troque senhas principais: 12+ caracteres, números, símbolos. Ative autenticação 2 fatores Gmail, banco, sistemas importantes',
      'SEMANA 3: Email profissional - Google Workspace R$ 20/usuário/mês: crie email @suaempresa.com. Configure em todos celulares/computadores. Use apenas para trabalho',
      'SEMANA 4: Sistema gestão básico - Teste grátis: Omie, Bling ou Tiny. Configure produtos, clientes, vendas. Treine equipe 2 horas. Use por 30 dias antes decidir qual comprar'
    ],
    'cultura': [
      'SEMANA 1: Definir propósito empresa - Reunião 2h com sócios/chefes: responda "Por que nossa empresa existe? Que problema resolvemos?" Escreva 1 frase simples. Comunique para todos',
      'SEMANA 1: Escolher 4 valores principais - Liste comportamentos que vocês esperam: "Ser honesto", "Entregar no prazo", "Tratar bem cliente". Dê exemplo prático de cada valor',
      'SEMANA 2: Reconhecimento semanal - Toda sexta escolha 1 funcionário que demonstrou os valores. Anuncie para equipe: "João foi honesto ao avisar erro e corrigir rapidamente"',
      'SEMANA 2: Café da manhã mensal - 1ª sexta do mês, 1 hora antes expediente. Conversa informal: como está empresa, sugestões, novidades pessoais. Crie proximidade com equipe',
      'SEMANA 3: Pesquisa cultura trimestral - 3 perguntas anônimas Google Forms: "Empresa vive os valores?" "Se sente parte da equipe?" "Recomendaria como local trabalho?" Implemente mudanças',
      'SEMANA 4: Rituais integração - Novo funcionário: apresente valores primeiro dia, conte história empresa, apresente para todos. Despedida: agradeça contribuição publicamente'
    ],
    'relacionamento': [
      'SEMANA 1: Mapear informações pessoais - Planilha top 20 clientes: nome, aniversário, time futebol, hobbies, família, preferências. Use em conversas para criar proximidade',
      'SEMANA 1: Ligações trimestrais - Agende celular: ligar para 10 melhores clientes só para saber como estão. 10 min máximo. NÃO venda nada. Apenas: "Como vai? Como posso ajudar?"',
      'SEMANA 2: Evento networking mensal - Procure eventos do setor na sua cidade. Cadastre Sympla, Eventbrite. Meta: 1 evento/mês, conhecer 5 pessoas novas, trocar cartão/contato',
      'SEMANA 2: Programa "indique e ganhe" - Ofereça 10% desconto para quem trouxer cliente novo. Crie material gráfico explicando. Envie WhatsApp para todos clientes atuais',
      'SEMANA 3: Follow-up pós-venda - Configure lembrete: ligar 1 semana e 1 mês após entrega. Perguntas: "Está tudo bem? Alguma dificuldade? Precisam de mais alguma coisa?"',
      'SEMANA 4: Criar "arquivo de relacionamento" - Pasta no Google Drive: anotações sobre cada contato importante, histórico conversas, oportunidades futuras. Revise mensalmente'
    ],
    'produto': [
      'SEMANA 1: Entrevista com 5 clientes atuais - Ligue/visite e pergunte: "O que pode melhorar no nosso produto?" "O que mais gosta?" "O que adicionaria?" Anote todas sugestões',
      'SEMANA 1: Análise 3 concorrentes - Pesquise: preços, qualidade, atendimento, diferenciais. Tabela comparativa: "Eles fazem X que nós não fazemos". Identifique oportunidades',
      'SEMANA 2: Teste melhoria pequena - Escolha 1 sugestão dos clientes, implemente rapidamente, teste com 3 clientes. Se aprovarem, lance para todos. Se rejeitarem, ajuste',
      'SEMANA 2: Precificar por valor entregue - Calcule: "Cliente economiza/ganha quanto usando nosso produto?" Se economiza R$ 1000, pode cobrar R$ 300. Base preço no valor',
      'SEMANA 3: Pesquisa satisfação mensal - WhatsApp ou email: "Nota 0-10 para nosso produto". Investigue quem dá nota menor que 8: "O que precisamos melhorar?"',
      'SEMANA 4: Roadmap melhorias - Lista priorizada: melhorias por impacto vs esforço. Alto impacto + baixo esforço = fazer primeiro. Comunique cronograma para clientes'
    ],
    'sucesso-cliente': [
      'SEMANA 1: Mapear jornada completa - Fluxograma: primeiro contato → compra → implementação → uso → renovação. Identifique onde cliente pode ter dificuldade/desistir',
      'SEMANA 1: Manual "primeiros passos" - Guia 1 página: passo-a-passo para cliente ter sucesso primeiros 15 dias. Use linguagem simples, com prints de tela se necessário',
      'SEMANA 2: Score saúde cliente - 4 indicadores: usa produto regularmente? Paga em dia? Responde contatos? Reclama pouco? Score 0-10. Abaixo de 7 = risco cancelamento',
      'SEMANA 2: Reunião trimestral resultados - Apresente para cliente: "Você economizou X, aumentou Y, melhorou Z usando nosso produto". Use dados reais, gráficos simples',
      'SEMANA 3: Identificar oportunidades venda - Planilha: clientes satisfeitos que podem comprar produtos adicionais/upgrade. Aborde com proposta específica baseada no uso atual',
      'SEMANA 4: Programa prevenção churn - Cliente score baixo: ligação imediata, entenda problema, ofereça solução, acompanhe de perto. Meta: reduzir cancelamentos 50%'
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
      return step.replace('SEMANA', 'IMPLEMENTAÇÃO SEMANA');
    }
    if (actionText.toLowerCase().includes('melhorar')) {
      return step.replace('SEMANA', 'MELHORIA SEMANA');
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
        <div className="space-y-3">
          {steps.map((step, stepIndex) => (
            <div key={stepIndex} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
              <Checkbox
                checked={action.completedSteps?.[stepIndex] || false}
                onCheckedChange={(checked) => handleStepToggle(stepIndex, !!checked)}
                className="mt-1"
              />
              <div className={`text-sm flex-1 ${action.completedSteps?.[stepIndex] ? 'line-through text-gray-500' : 'text-gray-700'}`}>
                <span className="font-semibold text-blue-600">{stepIndex + 1}.</span> {step}
              </div>
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
