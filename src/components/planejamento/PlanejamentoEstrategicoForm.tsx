import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Bot, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Lightbulb } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { perguntasPlanejamento } from "@/data/perguntasPlanejamento";
import { PerguntaPlanejamento, RespostaPlanejamento } from "@/types/planejamentoEstrategico";

interface PlanejamentoEstrategicoFormProps {
  onComplete: (respostas: RespostaPlanejamento[]) => void;
}

const PlanejamentoEstrategicoForm: React.FC<PlanejamentoEstrategicoFormProps> = ({ onComplete }) => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<RespostaPlanejamento[]>([]);
  const [respostaTemp, setRespostaTemp] = useState<string | string[]>( "");
  const [iaAtiva, setIaAtiva] = useState(false);
  const [dicaIA, setDicaIA] = useState<string>("");
  const { toast } = useToast();

  const pergunta = perguntasPlanejamento[perguntaAtual];
  const progresso = ((perguntaAtual + 1) / perguntasPlanejamento.length) * 100;

  useEffect(() => {
    // Carregar resposta existente se houver
    const respostaExistente = respostas.find(r => r.perguntaId === pergunta.id);
    if (respostaExistente) {
      setRespostaTemp(respostaExistente.resposta);
    } else {
      setRespostaTemp(pergunta.tipo === 'multipla_escolha_multi' ? [] : "");
    }
  }, [perguntaAtual, pergunta.id, respostas]);

  const salvarResposta = () => {
    if (pergunta.obrigatoria && (
      (Array.isArray(respostaTemp) && respostaTemp.length === 0) ||
      (!Array.isArray(respostaTemp) && !String(respostaTemp).trim())
    )) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, responda esta pergunta antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    const novasRespostas = respostas.filter(r => r.perguntaId !== pergunta.id);
    
    // Para perguntas SWOT guiadas, incluir a classificação
    let swotClassificacao: 'Força' | 'Fraqueza' | 'Oportunidade' | 'Ameaça' | null = null;
    if (pergunta.tipo === 'swot_guiada' && pergunta.direcionamento && respostaTemp) {
      const respostaString = Array.isArray(respostaTemp) ? respostaTemp[0] : String(respostaTemp);
      swotClassificacao = pergunta.direcionamento[respostaString] || null;
    }

    novasRespostas.push({
      perguntaId: pergunta.id,
      resposta: respostaTemp,
      swotClassificacao
    });
    setRespostas(novasRespostas);
  };

  const proximaPergunta = () => {
    salvarResposta();
    if (perguntaAtual < perguntasPlanejamento.length - 1) {
      setPerguntaAtual(perguntaAtual + 1);
      setDicaIA("");
    } else {
      finalizarQuestionario();
    }
  };

  const perguntaAnterior = () => {
    if (perguntaAtual > 0) {
      salvarResposta();
      setPerguntaAtual(perguntaAtual - 1);
      setDicaIA("");
    }
  };

  const finalizarQuestionario = () => {
    salvarResposta();
    const respostasFinal = respostas.filter(r => r.perguntaId !== pergunta.id);
    
    // Incluir a resposta atual
    let swotClassificacao: 'Força' | 'Fraqueza' | 'Oportunidade' | 'Ameaça' | null = null;
    if (pergunta.tipo === 'swot_guiada' && pergunta.direcionamento && respostaTemp) {
      const respostaString = Array.isArray(respostaTemp) ? respostaTemp[0] : String(respostaTemp);
      swotClassificacao = pergunta.direcionamento[respostaString] || null;
    }
    
    respostasFinal.push({
      perguntaId: pergunta.id,
      resposta: respostaTemp,
      swotClassificacao
    });
    
    onComplete(respostasFinal);
  };

  const handleMultipleChoice = (value: string, checked: boolean) => {
    if (Array.isArray(respostaTemp)) {
      if (checked) {
        setRespostaTemp([...respostaTemp, value]);
      } else {
        setRespostaTemp(respostaTemp.filter(item => item !== value));
      }
    }
  };

  const gerarDicaIA = async () => {
    setIaAtiva(true);
    try {
      // Simular resposta da IA
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const dicasPraticas = {
        // Informações básicas da empresa
        "empresa_nome": {
          dica: "Escolha um nome que seja fácil de lembrar, pronunciar e que reflita sua proposta de valor.",
          exemplo: "Exemplo: 'TechSolutions' para consultoria em tecnologia ou 'Verde Vida' para produtos sustentáveis."
        },
        "empresa_setor": {
          dica: "Seja específico sobre seu setor de atuação. Isso ajuda a criar estratégias mais direcionadas.",
          exemplo: "Exemplos: 'E-commerce de moda feminina', 'Consultoria em marketing digital', 'Restaurante de comida saudável'."
        },
        "empresa_produtos": {
          dica: "Liste seus principais produtos/serviços de forma clara e objetiva, focando no que gera mais receita.",
          exemplo: "Exemplo: 'Desenvolvimento de sites, aplicativos mobile, consultoria em UX/UI, treinamentos em tecnologia'."
        },
        "empresa_publico": {
          dica: "Defina seu público de forma específica: idade, renda, comportamento, necessidades principais.",
          exemplo: "Exemplo: 'Pequenos empresários de 30-50 anos, faturamento até R$ 500k/ano, que precisam digitalizar seus negócios'."
        },

        // Diagnóstico empresarial
        "processos_documentados": {
          dica: "Processos documentados incluem: fluxos de trabalho escritos, procedimentos padrão, checklists, manuais.",
          exemplo: "Exemplos: manual de atendimento ao cliente, processo de vendas passo a passo, fluxo de produção documentado."
        },
        "controle_qualidade": {
          dica: "Sistema de controle de qualidade pode ser desde checklists simples até certificações ISO.",
          exemplo: "Exemplos: revisão de produtos antes da entrega, pesquisa de satisfação, testes de qualidade, indicadores de performance."
        },
        "metas_definidas": {
          dica: "Metas devem ser SMART: Específicas, Mensuráveis, Atingíveis, Relevantes e com Tempo definido.",
          exemplo: "Exemplo: 'Aumentar vendas em 20% nos próximos 6 meses' ao invés de 'vender mais'."
        },
        "acompanhamento_resultados": {
          dica: "Acompanhamento regular significa verificar indicadores pelo menos mensalmente.",
          exemplo: "Exemplos: reuniões mensais de resultados, dashboards de vendas, relatórios de performance, análise de KPIs."
        },
        "sistema_gestao": {
          dica: "Sistemas de gestão organizam informações da empresa: clientes, vendas, estoque, financeiro.",
          exemplo: "Exemplos: ERP (SAP, TOTVS), CRM (Salesforce, HubSpot), planilhas organizadas, software específico do setor."
        },
        "capacitacao_equipe": {
          dica: "Capacitação inclui treinamentos técnicos, comportamentais, cursos, workshops, mentorias.",
          exemplo: "Exemplos: curso de vendas, treinamento em atendimento, capacitação técnica, workshops de liderança."
        },

        // Perguntas SWOT guiadas
        "swot_marketing_plano": {
          dica: "Um bom plano de marketing tem: público-alvo definido, canais ativos, orçamento destinado, métricas acompanhadas.",
          exemplo: "Exemplo de SIM: temos estratégia de redes sociais, investimos em Google Ads, medimos ROI. Exemplo de NÃO: fazemos marketing 'no feeling', sem planejamento."
        },
        "swot_concorrentes_redes_sociais": {
          dica: "Compare: frequência de posts, número de seguidores, engajamento, investimento em anúncios pagos.",
          exemplo: "Exemplo de SIM: concorrentes postam diariamente, investem em Stories patrocinados. Exemplo de NÃO: nossa presença digital é mais forte."
        },
        "swot_novo_nicho_mercado": {
          dica: "Observe: mudanças de comportamento do consumidor, novas tecnologias, gaps no mercado atual.",
          exemplo: "Exemplo de SIM: crescimento do mercado pet, produtos sustentáveis, serviços online pós-pandemia."
        },
        "swot_equipe_qualificada": {
          dica: "Compare: experiência, certificações, produtividade, capacidade de inovação da sua equipe vs concorrência.",
          exemplo: "Exemplo de SIM: equipe com certificações, maior experiência média. Exemplo de NÃO: concorrentes têm profissionais mais qualificados."
        },
        "swot_fluxo_caixa": {
          dica: "Problemas de fluxo de caixa: atrasos em pagamentos, dificuldade para cobrir custos mensais, falta de reserva.",
          exemplo: "Exemplo de SIM: dificuldade para pagar fornecedores, sem reserva de emergência. Exemplo de NÃO: fluxo equilibrado e previsível."
        },
        "swot_tecnologia_atual": {
          dica: "Compare suas ferramentas, softwares, equipamentos com o padrão do mercado atual.",
          exemplo: "Exemplo de SIM: usando sistemas antigos, equipamentos defasados. Exemplo de NÃO: tecnologia atualizada e competitiva."
        },
        "swot_clientes_fieis": {
          dica: "Base sólida significa: clientes que compram regularmente, baixa taxa de cancelamento, indicam outros clientes.",
          exemplo: "Exemplo de SIM: 70%+ dos clientes são recorrentes, baixo churn. Exemplo de NÃO: alta rotatividade de clientes."
        },
        "swot_regulamentacao_setor": {
          dica: "Pesquise: novas leis em discussão, mudanças regulatórias, normas que podem afetar sua operação.",
          exemplo: "Exemplo de SIM: nova lei de proteção de dados, regulamentação de delivery, normas ambientais mais rígidas."
        },
        "swot_localizacao_estrategica": {
          dica: "Considere: facilidade de acesso dos clientes, visibilidade, proximidade do público-alvo, custo-benefício.",
          exemplo: "Exemplo de SIM: centro comercial movimentado, fácil acesso. Exemplo de NÃO: local de difícil acesso ou pouco movimento."
        },
        "swot_parcerias_estrategicas": {
          dica: "Pense em: fornecedores complementares, empresas do mesmo nicho, influenciadores, canais de distribuição.",
          exemplo: "Exemplo de SIM: parcerias com complementares não exploradas, influenciadores do setor, novos canais de venda."
        },
        "swot_dependencia_fornecedores": {
          dica: "Avalie: quantos % da sua operação dependem de 1-2 fornecedores principais, existem alternativas?",
          exemplo: "Exemplo de SIM: 80% dos produtos vêm de 1 fornecedor. Exemplo de NÃO: múltiplos fornecedores, baixa dependência."
        },
        "swot_crise_economica": {
          dica: "Considere: seu produto é essencial ou supérfluo? Seu público tem renda estável? Há sazonalidade?",
          exemplo: "Exemplo de SIM: produtos de luxo, muito dependente de economia. Exemplo de NÃO: produtos essenciais, demanda estável."
        },
        "swot_expansao_geografica": {
          dica: "Analise: outras cidades/estados/países onde seu produto faz sentido, demanda não atendida.",
          exemplo: "Exemplo de SIM: atendemos só São Paulo, mas há demanda no Rio. Exemplo de NÃO: já cobrimos todo mercado relevante."
        },
        "swot_inovacao_produtos": {
          dica: "Considere: frequência de lançamentos, diferenciação no mercado, investimento em P&D, patentes.",
          exemplo: "Exemplo de SIM: referência em inovação, produtos únicos. Exemplo de NÃO: produtos similares aos concorrentes."
        },
        "swot_competidores_grandes": {
          dica: "Monitore: grandes players entrando no seu nicho, aquisições, investimentos de multinacionais.",
          exemplo: "Exemplo de SIM: Magazine Luiza entrando no seu segmento, grandes redes se expandindo."
        },

        // Proposta Única de Valor
        "diferencial_competitivo": {
          dica: "Pense no que faz os clientes escolherem você: qualidade, preço, atendimento, rapidez, especialização, inovação.",
          exemplo: "Exemplo: 'Entrega em 24h com qualidade premium' ou 'Atendimento personalizado com 15 anos de experiência no setor'."
        },
        "problema_cliente": {
          dica: "Identifique a dor principal que seu cliente sente antes de conhecer sua solução.",
          exemplo: "Exemplo: 'Pequenos empresários perdem vendas por não ter presença digital' ou 'Pessoas não têm tempo para cuidar da alimentação saudável'."
        },
        "beneficio_principal": {
          dica: "Foque no resultado final que o cliente obtém, não nas características do produto.",
          exemplo: "Exemplo: 'Economia de 30% nos custos operacionais' ao invés de 'software com 50 funcionalidades'."
        },

        // Fase da empresa
        "tempo_mercado": {
          dica: "Considere desde o início oficial das operações comerciais, não apenas a abertura da empresa.",
          exemplo: "Conte a partir de quando começou a vender efetivamente, mesmo que informalmente."
        },
        "faturamento_atual": {
          dica: "Considere a média dos últimos 3 meses para ter uma base mais realista.",
          exemplo: "Se varia muito, use a média. Se é sazonal, mencione isso e use o período típico."
        },
        "crescimento_atual": {
          dica: "Compare os últimos 6 meses com o período anterior. Considere vendas, clientes, faturamento.",
          exemplo: "Crescimento acelerado: +20% ao mês. Estável: variação entre -5% e +5%. Declínio: queda consistente."
        },

        // Equipe
        "principais_cargos": {
          dica: "Selecione todas as áreas que existem atualmente na sua empresa, mesmo que sejam pequenas ou em desenvolvimento.",
          exemplo: "Exemplo: Uma pequena empresa pode ter apenas 'Vendas' e 'Operacional', enquanto uma maior pode ter todas as áreas."
        }
      };
      
      const dicaAtual = dicasPraticas[pergunta.id as keyof typeof dicasPraticas];
      
      if (dicaAtual) {
        setDicaIA(`${dicaAtual.dica}\n\n💡 ${dicaAtual.exemplo}`);
      } else {
        setDicaIA("Seja específico e honesto na sua resposta. Pense nos dados concretos da sua empresa e use exemplos práticos. Isso ajudará a gerar um plano de ação mais efetivo e personalizado.");
      }
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível obter dica da IA. Tente novamente.",
        variant: "destructive"
      });
    }
    setIaAtiva(false);
  };

  const renderizarCampoResposta = () => {
    switch (pergunta.tipo) {
      case "texto":
        return (
          <Textarea
            value={String(respostaTemp)}
            onChange={(e) => setRespostaTemp(e.target.value)}
            placeholder="Digite sua resposta..."
            className="min-h-[100px]"
          />
        );
      
      case "sim_nao":
        return (
          <RadioGroup value={String(respostaTemp)} onValueChange={setRespostaTemp}>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="sim" id="sim" />
              <Label htmlFor="sim">Sim</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="nao" id="nao" />
              <Label htmlFor="nao">Não</Label>
            </div>
          </RadioGroup>
        );
      
      case "multipla_escolha_multi":
        return (
          <div className="space-y-3">
            {pergunta.opcoes?.map((opcao, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Checkbox
                  id={`opcao-multi-${index}`}
                  checked={Array.isArray(respostaTemp) && respostaTemp.includes(opcao)}
                  onCheckedChange={(checked) => handleMultipleChoice(opcao, checked as boolean)}
                />
                <Label htmlFor={`opcao-multi-${index}`}>{opcao}</Label>
              </div>
            ))}
          </div>
        );
      
      case "swot_guiada":
        return (
          <div className="space-y-4">
            <RadioGroup value={String(respostaTemp)} onValueChange={setRespostaTemp}>
              {pergunta.opcoes?.map((opcao, index) => {
                const direcionamento = pergunta.direcionamento?.[opcao];
                return (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={opcao} id={`opcao-${index}`} />
                      <Label htmlFor={`opcao-${index}`} className="font-medium">{opcao}</Label>
                    </div>
                    {direcionamento && (
                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        direcionamento === 'Força' ? 'bg-green-100 text-green-800' :
                        direcionamento === 'Fraqueza' ? 'bg-red-100 text-red-800' :
                        direcionamento === 'Oportunidade' ? 'bg-blue-100 text-blue-800' :
                        direcionamento === 'Ameaça' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        👉 {direcionamento}
                      </div>
                    )}
                  </div>
                );
              })}
            </RadioGroup>
            
            {respostaTemp && pergunta.direcionamento?.[String(respostaTemp)] && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-blue-600" />
                  <span className="text-blue-800 font-medium">
                    Esta resposta será classificada como: {pergunta.direcionamento[String(respostaTemp)]}
                  </span>
                </div>
              </div>
            )}
          </div>
        );
      
      case "multipla_escolha":
        return (
          <RadioGroup value={String(respostaTemp)} onValueChange={setRespostaTemp}>
            {pergunta.opcoes?.map((opcao, index) => (
              <div key={index} className="flex items-center space-x-2">
                <RadioGroupItem value={opcao} id={`opcao-${index}`} />
                <Label htmlFor={`opcao-${index}`}>{opcao}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      default:
        return (
          <Input
            value={String(respostaTemp)}
            onChange={(e) => setRespostaTemp(e.target.value)}
            placeholder="Digite sua resposta..."
          />
        );
    }
  };

  const getCategoriaLabel = (categoria: string) => {
    const labels = {
      negocio: "Informações do Negócio",
      diagnostico: "Diagnóstico Empresarial", 
      swot: "Análise SWOT",
      puv: "Proposta Única de Valor",
      equipe: "Estrutura da Equipe",
      fase: "Fase da Empresa"
    };
    return labels[categoria as keyof typeof labels] || categoria;
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">Planejamento Estratégico</CardTitle>
            <div className="text-sm text-gray-500">
              Pergunta {perguntaAtual + 1} de {perguntasPlanejamento.length}
            </div>
          </div>
          <div className="text-sm text-blue-600 font-medium">
            {getCategoriaLabel(pergunta.categoria)}
          </div>
          <Progress value={progresso} className="mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{pergunta.pergunta}</h3>
            {pergunta.obrigatoria && (
              <p className="text-sm text-red-500 mb-2">* Campo obrigatório</p>
            )}
            {pergunta.tipo === 'multipla_escolha_multi' && (
              <p className="text-sm text-blue-600 mb-2">Você pode selecionar múltiplas opções</p>
            )}
            {renderizarCampoResposta()}
          </div>

          {dicaIA && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full p-2">
                    <Lightbulb className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      Dica da IA - Como responder melhor:
                    </p>
                    <div className="text-blue-800 text-sm leading-relaxed whitespace-pre-line">
                      {dicaIA}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={perguntaAnterior}
              disabled={perguntaAtual === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            <Button
              variant="outline"
              onClick={gerarDicaIA}
              disabled={iaAtiva}
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-200"
            >
              {iaAtiva ? (
                <>
                  <Bot className="mr-2 h-4 w-4 animate-pulse" />
                  Gerando dica...
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Dica da IA
                </>
              )}
            </Button>

            <Button onClick={proximaPergunta}>
              {perguntaAtual === perguntasPlanejamento.length - 1 ? "Finalizar" : "Próxima"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanejamentoEstrategicoForm;
