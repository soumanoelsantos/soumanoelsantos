
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { ArrowRight, ArrowLeft, Lightbulb, Sparkles } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { perguntasDiagnostico } from "@/data/perguntasDiagnostico";
import { PerguntaPlanejamento, RespostaPlanejamento } from "@/types/planejamentoEstrategico";

interface DiagnosticoEmpresarialProps {
  onComplete: (respostas: RespostaPlanejamento[], resultados: DiagnosticoResultados) => void;
}

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

const DiagnosticoEmpresarial: React.FC<DiagnosticoEmpresarialProps> = ({ onComplete }) => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<RespostaPlanejamento[]>([]);
  const [respostaTemp, setRespostaTemp] = useState<string>("");
  const { toast } = useToast();

  const pergunta = perguntasDiagnostico[perguntaAtual];
  const progresso = ((perguntaAtual + 1) / perguntasDiagnostico.length) * 100;

  useEffect(() => {
    // Carregar resposta existente se houver
    const respostaExistente = respostas.find(r => r.perguntaId === pergunta.id);
    if (respostaExistente) {
      const resposta = typeof respostaExistente.resposta === 'number' 
        ? String(respostaExistente.resposta)
        : Array.isArray(respostaExistente.resposta) 
          ? respostaExistente.resposta.join(', ')
          : String(respostaExistente.resposta);
      setRespostaTemp(resposta);
    } else {
      setRespostaTemp("");
    }
  }, [perguntaAtual, pergunta.id, respostas]);

  const salvarResposta = () => {
    if (pergunta.obrigatoria && !respostaTemp.trim()) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, responda esta pergunta antes de continuar.",
        variant: "destructive"
      });
      return false;
    }

    const novasRespostas = respostas.filter(r => r.perguntaId !== pergunta.id);
    novasRespostas.push({
      perguntaId: pergunta.id,
      resposta: respostaTemp
    });
    setRespostas(novasRespostas);
    return true;
  };

  const proximaPergunta = () => {
    if (salvarResposta()) {
      if (perguntaAtual < perguntasDiagnostico.length - 1) {
        setPerguntaAtual(perguntaAtual + 1);
      } else {
        finalizarDiagnostico();
      }
    }
  };

  const perguntaAnterior = () => {
    if (perguntaAtual > 0) {
      salvarResposta();
      setPerguntaAtual(perguntaAtual - 1);
    }
  };

  const calcularResultados = (): DiagnosticoResultados => {
    const areas = ['comercial', 'gestao', 'rh', 'marketing', 'financeiro', 'cliente', 'sistema'];
    const resultados: any = {};

    areas.forEach(area => {
      const perguntasArea = perguntasDiagnostico.filter(p => 
        p.id.includes(area) || 
        (area === 'comercial' && p.id.includes('vendas')) ||
        (area === 'sistema' && p.id.includes('sistema_gestao'))
      );
      
      let score = 0;
      let total = 0;

      perguntasArea.forEach(perguntaArea => {
        if (perguntaArea.tipo === 'multipla_escolha' && perguntaArea.opcoes) {
          const resposta = respostas.find(r => r.perguntaId === perguntaArea.id);
          if (resposta) {
            total += 20; // Máximo por pergunta
            if (resposta.resposta === 'Existe e é satisfatório') {
              score += 20;
            } else if (resposta.resposta === 'Existe, mas não é satisfatório') {
              score += 10;
            }
            // "Não existe" = 0 pontos
          }
        }
      });

      const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
      resultados[area] = { score, total, percentage };
    });

    return resultados;
  };

  const finalizarDiagnostico = () => {
    const resultados = calcularResultados();
    const todasRespostas = [...respostas];
    
    // Incluir resposta atual se não foi salva
    if (!respostas.find(r => r.perguntaId === pergunta.id)) {
      todasRespostas.push({
        perguntaId: pergunta.id,
        resposta: respostaTemp
      });
    }
    
    onComplete(todasRespostas, resultados);
  };

  const getCategoriaLabel = (categoria: string) => {
    const labels = {
      negocio: "Informações do Negócio",
      diagnostico: "Diagnóstico Empresarial", 
      puv: "Proposta Única de Valor",
      equipe: "Estrutura da Equipe",
      fase: "Fase da Empresa"
    };
    return labels[categoria as keyof typeof labels] || categoria;
  };

  const renderizarCampoResposta = () => {
    switch (pergunta.tipo) {
      case "texto":
        if (pergunta.id.includes('dores_')) {
          return (
            <Textarea
              value={respostaTemp}
              onChange={(e) => setRespostaTemp(e.target.value)}
              placeholder="Descreva detalhadamente os principais problemas e desafios que você enfrenta nesta área..."
              className="min-h-[120px]"
            />
          );
        }
        return (
          <Textarea
            value={respostaTemp}
            onChange={(e) => setRespostaTemp(e.target.value)}
            placeholder="Digite sua resposta..."
            className="min-h-[100px]"
          />
        );
      
      case "multipla_escolha":
        return (
          <RadioGroup value={respostaTemp} onValueChange={setRespostaTemp}>
            {pergunta.opcoes?.map((opcao, index) => (
              <div key={index} className={`flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 ${
                respostaTemp === opcao ? 'border-blue-500 bg-blue-50' : ''
              }`}>
                <RadioGroupItem value={opcao} id={`opcao-${index}`} />
                <Label htmlFor={`opcao-${index}`} className="flex-1 cursor-pointer">
                  {opcao}
                </Label>
                {opcao === 'Existe e é satisfatório' && (
                  <div className="px-2 py-1 bg-green-100 text-green-800 rounded text-xs font-medium">
                    20 pontos
                  </div>
                )}
                {opcao === 'Existe, mas não é satisfatório' && (
                  <div className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                    10 pontos
                  </div>
                )}
                {opcao === 'Não existe' && (
                  <div className="px-2 py-1 bg-red-100 text-red-800 rounded text-xs font-medium">
                    0 pontos
                  </div>
                )}
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
            <CardTitle className="text-2xl">Diagnóstico Empresarial</CardTitle>
            <div className="text-sm text-gray-500">
              Pergunta {perguntaAtual + 1} de {perguntasDiagnostico.length}
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
            {pergunta.id.includes('dores_') && (
              <div className="mb-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-start gap-3">
                  <Lightbulb className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div className="text-blue-800 text-sm">
                    <strong>Dica:</strong> Seja específico sobre os problemas. Quanto mais detalhes, melhor poderemos propor soluções direcionadas.
                  </div>
                </div>
              </div>
            )}
            {renderizarCampoResposta()}
          </div>

          <div className="flex justify-between items-center pt-4">
            <Button
              variant="outline"
              onClick={perguntaAnterior}
              disabled={perguntaAtual === 0}
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Anterior
            </Button>

            <Button onClick={proximaPergunta}>
              {perguntaAtual === perguntasDiagnostico.length - 1 ? "Finalizar Diagnóstico" : "Próxima"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DiagnosticoEmpresarial;
