import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { perguntasPlanejamento } from "@/data/perguntasPlanejamento";
import { RespostaPlanejamento } from "@/types/planejamentoEstrategico";
import FormHeader from "./form/FormHeader";
import FormNavigation from "./form/FormNavigation";
import FormQuestionRenderer from "./form/FormQuestionRenderer";
import AITipsSection from "./form/AITipsSection";
import { dicasPraticas } from "./form/utils/aiTipsData";
import { calcularResultadosDiagnostico, validateRequiredField } from "./form/utils/formUtils";

interface DiagnosticoResultados {
  comercial: { score: number; total: number; percentage: number };
  gestao: { score: number; total: number; percentage: number };
  rh: { score: number; total: number; percentage: number };
  marketing: { score: number; total: number; percentage: number };
  financeiro: { score: number; total: number; percentage: number };
  cliente: { score: number; total: number; percentage: number };
  sistema: { score: number; total: number; percentage: number };
}

interface PlanejamentoEstrategicoFormProps {
  onComplete: (respostas: RespostaPlanejamento[], resultados: DiagnosticoResultados) => void;
}

const PlanejamentoEstrategicoForm: React.FC<PlanejamentoEstrategicoFormProps> = ({ onComplete }) => {
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostas, setRespostas] = useState<RespostaPlanejamento[]>([]);
  const [respostaTemp, setRespostaTemp] = useState<string | string[]>("" as string | string[]);
  const [iaAtiva, setIaAtiva] = useState(false);
  const [dicaIA, setDicaIA] = useState<string>("");
  const { toast } = useToast();

  const pergunta = perguntasPlanejamento[perguntaAtual];

  // Função para verificar se é tipo que aceita múltiplas respostas
  const isMultipleSelectionType = (tipo: string) => {
    return tipo === 'multipla_escolha_multi' || tipo === 'swot_guiada_multi';
  };

  useEffect(() => {
    console.log('=== PERGUNTA MUDOU ===');
    console.log('Pergunta atual:', perguntaAtual);
    console.log('Tipo da pergunta:', pergunta.tipo);
    console.log('É múltipla seleção?', isMultipleSelectionType(pergunta.tipo));
    
    // Carregar resposta existente se houver
    const respostaExistente = respostas.find(r => r.perguntaId === pergunta.id);
    if (respostaExistente) {
      const resposta = typeof respostaExistente.resposta === 'number' 
        ? String(respostaExistente.resposta)
        : respostaExistente.resposta;
      console.log('Carregando resposta existente:', resposta);
      setRespostaTemp(resposta);
    } else {
      // Inicializar com valor apropriado baseado no tipo
      const valorInicial = isMultipleSelectionType(pergunta.tipo) ? [] : "";
      console.log('Inicializando com valor:', valorInicial, 'para tipo:', pergunta.tipo);
      setRespostaTemp(valorInicial);
    }
  }, [perguntaAtual, pergunta.id, pergunta.tipo, respostas]);

  const handleMultipleChoice = (value: string, checked: boolean) => {
    console.log('=== HANDLE MULTIPLE CHOICE ===');
    console.log('Valor:', value);
    console.log('Checked:', checked);
    console.log('Estado atual respostaTemp:', respostaTemp);
    console.log('Tipo do estado:', typeof respostaTemp, 'É array?', Array.isArray(respostaTemp));
    
    // Garantir que sempre temos um array para trabalhar
    let currentArray: string[] = [];
    
    if (Array.isArray(respostaTemp)) {
      currentArray = [...respostaTemp];
    } else {
      // Se não é array, inicializar como array vazio
      currentArray = [];
      console.log('Convertendo para array vazio pois respostaTemp não era array');
    }
    
    console.log('Array atual para trabalhar:', currentArray);
    
    let newArray: string[];
    
    if (checked) {
      // Adicionar se não estiver presente
      if (!currentArray.includes(value)) {
        newArray = [...currentArray, value];
        console.log('Adicionando valor. Novo array:', newArray);
      } else {
        newArray = currentArray;
        console.log('Valor já existe, mantendo array atual');
      }
    } else {
      // Remover se estiver presente
      newArray = currentArray.filter(item => item !== value);
      console.log('Removendo valor. Novo array:', newArray);
    }
    
    console.log('Array final a ser definido:', newArray);
    setRespostaTemp(newArray);
  };

  const salvarResposta = () => {
    console.log('=== SALVANDO RESPOSTA ===');
    console.log('Pergunta obrigatória?', pergunta.obrigatoria);
    console.log('Resposta temp:', respostaTemp);
    
    if (pergunta.obrigatoria && validateRequiredField(respostaTemp)) {
      toast({
        title: "Campo obrigatório",
        description: "Por favor, responda esta pergunta antes de continuar.",
        variant: "destructive"
      });
      return;
    }

    const novasRespostas = respostas.filter(r => r.perguntaId !== pergunta.id);
    
    let swotClassificacao: 'Força' | 'Fraqueza' | 'Oportunidade' | 'Ameaça' | null = null;
    
    if ((pergunta.tipo === 'swot_guiada' || pergunta.tipo === 'swot_guiada_multi') && pergunta.direcionamento && respostaTemp) {
      if (pergunta.tipo === 'swot_guiada_multi' && Array.isArray(respostaTemp)) {
        // Para múltipla escolha SWOT, usar a primeira classificação encontrada
        const classificacoes = respostaTemp
          .map(resp => pergunta.direcionamento?.[resp])
          .filter(Boolean);
        swotClassificacao = classificacoes[0] || null;
      } else {
        const respostaString = Array.isArray(respostaTemp) ? respostaTemp[0] : String(respostaTemp);
        swotClassificacao = pergunta.direcionamento[respostaString] || null;
      }
    }

    console.log('Salvando resposta:', {
      perguntaId: pergunta.id,
      resposta: respostaTemp,
      swotClassificacao
    });

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
    
    let swotClassificacao: 'Força' | 'Fraqueza' | 'Oportunidade' | 'Ameaça' | null = null;
    
    if ((pergunta.tipo === 'swot_guiada' || pergunta.tipo === 'swot_guiada_multi') && pergunta.direcionamento && respostaTemp) {
      if (pergunta.tipo === 'swot_guiada_multi' && Array.isArray(respostaTemp)) {
        const classificacoes = respostaTemp
          .map(resp => pergunta.direcionamento?.[resp])
          .filter(Boolean);
        swotClassificacao = classificacoes[0] || null;
      } else {
        const respostaString = Array.isArray(respostaTemp) ? respostaTemp[0] : String(respostaTemp);
        swotClassificacao = pergunta.direcionamento[respostaString] || null;
      }
    }
    
    respostasFinal.push({
      perguntaId: pergunta.id,
      resposta: respostaTemp,
      swotClassificacao
    });

    const resultadosDiagnostico = calcularResultadosDiagnostico(respostasFinal);
    onComplete(respostasFinal, resultadosDiagnostico);
  };

  const gerarDicaIA = async () => {
    setIaAtiva(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
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

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Card>
        <FormHeader
          perguntaAtual={perguntaAtual}
          totalPerguntas={perguntasPlanejamento.length}
          categoria={pergunta.categoria}
          pergunta={pergunta.pergunta}
          obrigatoria={pergunta.obrigatoria}
          isMultipleChoice={isMultipleSelectionType(pergunta.tipo)}
        />
        
        <CardContent className="space-y-6">
          <FormQuestionRenderer
            pergunta={pergunta}
            respostaTemp={respostaTemp}
            onRespostaChange={setRespostaTemp}
            onMultipleChoiceChange={handleMultipleChoice}
          />

          <AITipsSection dicaIA={dicaIA} />

          <FormNavigation
            perguntaAtual={perguntaAtual}
            totalPerguntas={perguntasPlanejamento.length}
            iaAtiva={iaAtiva}
            onAnterior={perguntaAnterior}
            onProxima={proximaPergunta}
            onGerarDica={gerarDicaIA}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default PlanejamentoEstrategicoForm;
