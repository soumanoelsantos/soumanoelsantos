
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Bot, ArrowRight, ArrowLeft, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { perguntasPlanejamento } from "@/data/perguntasPlanejamento";
import { PerguntaPlanejamento, RespostaPlanejamento } from "@/types/planejamentoEstrategico";

interface PlanejamentoEstrategicoFormProps {
  onComplete: (respostas: RespostaPlanejamento[]) => void;
}

const PlanejamentoEstrategicoForm: React.FC<PlanejamentoEstrategicoFormProps> = ({ onComplete }) => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<RespostaPlanejamento[]>([]);
  const [respostaTemp, setRespostaTemp] = useState<string>("");
  const [iaAtiva, setIaAtiva] = useState(false);
  const [dicaIA, setDicaIA] = useState<string>("");
  const { toast } = useToast();

  const pergunta = perguntasPlanejamento[perguntaAtual];
  const progresso = ((perguntaAtual + 1) / perguntasPlanejamento.length) * 100;

  useEffect(() => {
    // Carregar resposta existente se houver
    const respostaExistente = respostas.find(r => r.perguntaId === pergunta.id);
    if (respostaExistente) {
      setRespostaTemp(String(respostaExistente.resposta));
    } else {
      setRespostaTemp("");
    }
  }, [perguntaAtual, pergunta.id, respostas]);

  const gerarDicaIA = async () => {
    setIaAtiva(true);
    try {
      // Simular resposta da IA (aqui você integraria com a API real)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const dicas = {
        "empresa_nome": "Escolha um nome que reflita sua proposta de valor e seja fácil de lembrar.",
        "forcas_empresa": "Pense em: qualidade dos produtos, atendimento, localização, preços, tecnologia, experiência da equipe.",
        "fraquezas_empresa": "Considere: falta de recursos, processos ineficientes, dependência de poucos clientes, falta de marketing.",
        "oportunidades_mercado": "Analise: novos mercados, mudanças de comportamento, tecnologias emergentes, parcerias estratégicas.",
        "diferencial_competitivo": "O que faz seus clientes escolherem você? Pode ser qualidade, preço, atendimento, inovação ou especialização."
      };
      
      setDicaIA(dicas[pergunta.id as keyof typeof dicas] || "Seja específico e honesto na sua resposta. Isso ajudará a gerar um plano mais efetivo.");
    } catch (error) {
      toast({
        title: "Erro",
        description: "Não foi possível obter dica da IA. Tente novamente.",
        variant: "destructive"
      });
    }
    setIaAtiva(false);
  };

  const salvarResposta = () => {
    if (pergunta.obrigatoria && !respostaTemp.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, responda esta pergunta antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    const novasRespostas = respostas.filter(r => r.perguntaId !== pergunta.id);
    novasRespostas.push({
      perguntaId: pergunta.id,
      resposta: respostaTemp
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
    respostasFinal.push({
      perguntaId: pergunta.id,
      resposta: respostaTemp
    });
    onComplete(respostasFinal);
  };

  const renderizarCampoResposta = () => {
    switch (pergunta.tipo) {
      case "texto":
        return (
          <Textarea
            value={respostaTemp}
            onChange={(e) => setRespostaTemp(e.target.value)}
            placeholder="Digite sua resposta..."
            className="min-h-[100px]"
          />
        );
      
      case "sim_nao":
        return (
          <RadioGroup value={respostaTemp} onValueChange={setRespostaTemp}>
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
      
      case "multipla_escolha":
        return (
          <RadioGroup value={respostaTemp} onValueChange={setRespostaTemp}>
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
            value={respostaTemp}
            onChange={(e) => setRespostaTemp(e.target.value)}
            placeholder="Digite sua resposta..."
          />
        );
    }
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
          <Progress value={progresso} className="mt-4" />
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">{pergunta.pergunta}</h3>
            {pergunta.obrigatoria && (
              <p className="text-sm text-red-500 mb-2">* Campo obrigatório</p>
            )}
            {renderizarCampoResposta()}
          </div>

          {dicaIA && (
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <Bot className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900 mb-1">Dica da IA:</p>
                    <p className="text-blue-800">{dicaIA}</p>
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
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
            >
              <Sparkles className="mr-2 h-4 w-4" />
              {iaAtiva ? "Gerando..." : "Dica da IA"}
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
