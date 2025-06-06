
import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Brain, MessageCircle, Lightbulb, ChevronRight, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { PlanoAcao } from "@/types/planejamentoEstrategico";

interface AiTipsDialogProps {
  acao: PlanoAcao;
}

const AiTipsDialog: React.FC<AiTipsDialogProps> = ({ acao }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [pergunta, setPergunta] = useState("");
  const [respostaAi, setRespostaAi] = useState("");
  const [carregando, setCarregando] = useState(false);
  const { toast } = useToast();

  const obterDicasDetalhadas = (acao: PlanoAcao) => {
    const dicasPorCategoria = {
      'Comercial': {
        passos: [
          '1. Mapeie seu processo atual de vendas desde o primeiro contato até o fechamento',
          '2. Identifique os gargalos e pontos de perda de clientes',
          '3. Defina etapas claras do funil de vendas (prospecção, qualificação, proposta, fechamento)',
          '4. Implemente um CRM para acompanhar leads e oportunidades',
          '5. Treine a equipe em técnicas de vendas consultivas',
          '6. Estabeleça metas claras e indicadores de performance (KPIs)'
        ],
        ferramentas: ['CRM (HubSpot, Pipedrive, RD Station)', 'Scripts de vendas', 'Material de apoio comercial', 'Planilhas de controle'],
        prazoRecomendado: '30-60 dias',
        dificuldade: 'Média',
        investimento: 'R$ 500 - R$ 2.000/mês'
      },
      'Gestão': {
        passos: [
          '1. Documente todos os processos principais da empresa',
          '2. Crie fluxogramas para visualizar cada processo',
          '3. Identifique redundâncias e gargalos',
          '4. Padronize procedimentos operacionais',
          '5. Implemente sistema de gestão de qualidade',
          '6. Treine equipe nos novos processos'
        ],
        ferramentas: ['Software de gestão (ERP)', 'Documentação de processos', 'Fluxogramas', 'Check-lists operacionais'],
        prazoRecomendado: '60-90 dias',
        dificuldade: 'Alta',
        investimento: 'R$ 1.000 - R$ 5.000/mês'
      },
      'Marketing': {
        passos: [
          '1. Defina seu público-alvo e personas',
          '2. Crie uma estratégia de conteúdo relevante',
          '3. Escolha os canais digitais mais adequados',
          '4. Desenvolva identidade visual consistente',
          '5. Implemente ferramentas de automação',
          '6. Meça resultados e otimize campanhas'
        ],
        ferramentas: ['Google Analytics', 'Redes sociais', 'Email marketing', 'Criação de conteúdo', 'Anúncios pagos'],
        prazoRecomendado: '45-90 dias',
        dificuldade: 'Média',
        investimento: 'R$ 800 - R$ 3.000/mês'
      },
      'Financeiro': {
        passos: [
          '1. Implemente controle de fluxo de caixa diário',
          '2. Separe contas pessoais das empresariais',
          '3. Organize demonstrativos financeiros mensais',
          '4. Calcule margem de lucro por produto/serviço',
          '5. Crie reserva de emergência',
          '6. Planeje investimentos e expansão'
        ],
        ferramentas: ['Software financeiro', 'Planilhas de controle', 'Conta bancária PJ', 'Relatórios gerenciais'],
        prazoRecomendado: '30-45 dias',
        dificuldade: 'Média',
        investimento: 'R$ 200 - R$ 1.000/mês'
      },
      'Cliente': {
        passos: [
          '1. Mapeie a jornada completa do cliente',
          '2. Identifique pontos de contato e experiência',
          '3. Implemente sistema de atendimento',
          '4. Crie processo de feedback e pesquisas',
          '5. Desenvolva programa de fidelização',
          '6. Monitore indicadores de satisfação (NPS, CSAT)'
        ],
        ferramentas: ['Sistema de atendimento', 'Pesquisas de satisfação', 'Chat online', 'CRM de relacionamento'],
        prazoRecomendado: '45-60 dias',
        dificuldade: 'Média',
        investimento: 'R$ 300 - R$ 1.500/mês'
      }
    };

    return dicasPorCategoria[acao.categoria as keyof typeof dicasPorCategoria] || dicasPorCategoria['Gestão'];
  };

  const simularRespostaAi = async (pergunta: string) => {
    setCarregando(true);
    
    // Simular delay da API
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const respostasSimuladas = [
      `Para implementar "${acao.acao.toLowerCase()}", recomendo começar com um diagnóstico da situação atual. Isso ajudará a identificar as principais lacunas e prioridades. Em seguida, desenvolva um plano de ação específico com marcos mensuráveis.`,
      
      `Uma abordagem eficaz seria dividir esta ação em etapas menores e mais gerenciáveis. Comece implementando uma versão piloto para testar a eficácia antes de expandir para toda a operação.`,
      
      `É importante envolver toda a equipe neste processo de mudança. Considere realizar workshops de treinamento e criar um sistema de acompanhamento regular para garantir que a implementação seja bem-sucedida.`,
      
      `Para esta ação específica, sugiro focar primeiro nos indicadores que terão maior impacto no resultado final. Isso permitirá ver resultados mais rapidamente e manter a motivação da equipe.`,
      
      `Lembre-se de documentar todo o processo de implementação. Isso facilitará ajustes futuros e servirá como base para treinar novos membros da equipe.`
    ];
    
    const respostaAleatoria = respostasSimuladas[Math.floor(Math.random() * respostasSimuladas.length)];
    setRespostaAi(respostaAleatoria);
    setCarregando(false);
  };

  const handlePerguntarAi = async () => {
    if (!pergunta.trim()) {
      toast({
        title: "Digite sua pergunta",
        description: "Por favor, digite uma pergunta específica sobre a ação.",
        variant: "destructive"
      });
      return;
    }

    await simularRespostaAi(pergunta);
    
    toast({
      title: "Resposta gerada!",
      description: "A IA analisou sua pergunta e gerou uma resposta personalizada.",
    });
  };

  const dicas = obterDicasDetalhadas(acao);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 bg-purple-50 border-purple-200 text-purple-700 hover:bg-purple-100"
        >
          <Brain className="h-4 w-4" />
          Dicas IA
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Brain className="h-5 w-5 text-purple-600" />
            Como Implementar: {acao.acao}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Informações básicas da ação */}
          <Card>
            <CardContent className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Categoria:</span>
                  <p className="text-gray-900">{acao.categoria}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Prazo:</span>
                  <p className="text-gray-900">{acao.prazo}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Prioridade:</span>
                  <Badge className={
                    acao.prioridade === 'alta' ? 'bg-red-100 text-red-800' :
                    acao.prioridade === 'media' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }>
                    {acao.prioridade.charAt(0).toUpperCase() + acao.prioridade.slice(1)}
                  </Badge>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Responsável:</span>
                  <p className="text-gray-900">{acao.responsavel}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passo a passo detalhado */}
          <div>
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <Lightbulb className="h-5 w-5 text-yellow-500" />
              Passo a Passo para Implementação
            </h3>
            <div className="space-y-2">
              {dicas.passos.map((passo, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="flex-shrink-0 w-6 h-6 bg-purple-600 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>
                  <p className="text-sm text-gray-700">{passo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Informações adicionais */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Ferramentas Recomendadas</h4>
                <ul className="text-sm space-y-1">
                  {dicas.ferramentas.map((ferramenta, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <ChevronRight className="h-3 w-3 text-purple-600" />
                      {ferramenta}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <h4 className="font-semibold mb-2">Detalhes da Implementação</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-medium">Prazo recomendado:</span>
                    <p className="text-gray-600">{dicas.prazoRecomendado}</p>
                  </div>
                  <div>
                    <span className="font-medium">Nível de dificuldade:</span>
                    <p className="text-gray-600">{dicas.dificuldade}</p>
                  </div>
                  <div>
                    <span className="font-medium">Investimento estimado:</span>
                    <p className="text-gray-600">{dicas.investimento}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Perguntar para a IA */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
              <MessageCircle className="h-5 w-5 text-blue-500" />
              Ainda tem dúvidas? Pergunte para a IA
            </h3>
            
            <div className="space-y-3">
              <Textarea
                placeholder="Digite sua pergunta específica sobre como implementar esta ação..."
                value={pergunta}
                onChange={(e) => setPergunta(e.target.value)}
                className="min-h-[80px]"
              />
              
              <Button 
                onClick={handlePerguntarAi}
                disabled={carregando}
                className="flex items-center gap-2"
              >
                {carregando ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Brain className="h-4 w-4" />
                )}
                {carregando ? "Analisando..." : "Perguntar para IA"}
              </Button>

              {respostaAi && (
                <Card className="bg-blue-50 border-blue-200">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <Brain className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-blue-900 mb-2">Resposta da IA:</h4>
                        <p className="text-blue-800 text-sm leading-relaxed">{respostaAi}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AiTipsDialog;
