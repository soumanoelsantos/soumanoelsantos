
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";
import { useNavigate } from "react-router-dom";

// Test phases and questions
const phaseTest = [
  {
    id: 1,
    phase: "Fase Inicial (Criação)",
    questions: [
      "Você está tentando validar seu produto/serviço no mercado?",
      "Sua empresa existe há menos de 2 anos?",
      "Você tem poucos clientes pagantes (menos de 10)?",
      "Você ainda está ajustando seu modelo de negócio?",
      "Você é o principal responsável por todas as áreas da empresa?",
    ],
    description: "Nesta fase, o foco está na validação do modelo de negócio e na busca dos primeiros clientes. O empreendedor geralmente faz quase tudo sozinho e está testando se sua solução resolve um problema real do mercado.",
    recommendations: [
      "Concentre-se em validar seu produto/serviço com clientes reais",
      "Estabeleça um modelo de negócio claro",
      "Crie um MVP (Produto Mínimo Viável) para testar suas hipóteses",
      "Busque feedback constante dos clientes",
      "Comece a construir sua rede de contatos no setor"
    ]
  },
  {
    id: 2,
    phase: "Fase de Estruturação (Sobrevivência)",
    questions: [
      "Sua empresa já tem um fluxo constante de clientes?",
      "Você está começando a contratar pessoas para funções específicas?",
      "Sua receita mensal cobre os custos operacionais básicos?",
      "Você ainda está muito envolvido na operação diária?",
      "Você está começando a criar processos básicos na empresa?",
    ],
    description: "Nesta fase, a empresa já tem um produto/serviço validado e está começando a construir uma base de clientes recorrentes. O foco passa a ser a estruturação de processos básicos e a garantia da sobrevivência financeira.",
    recommendations: [
      "Estruture processos básicos de vendas e atendimento",
      "Comece a delegar atividades operacionais",
      "Estabeleça metas de crescimento realistas",
      "Implemente controles financeiros básicos",
      "Desenvolva uma estratégia de marketing mais estruturada"
    ]
  },
  {
    id: 3,
    phase: "Fase de Crescimento (Escala)",
    questions: [
      "Você já tem uma equipe estabelecida com funções bem definidas?",
      "Sua empresa possui processos documentados nas principais áreas?",
      "Você está conseguindo crescer sem aumentar proporcionalmente os custos?",
      "Você passa mais tempo planejando do que executando tarefas operacionais?",
      "Sua empresa já possui uma marca reconhecida no mercado?",
    ],
    description: "Na fase de crescimento, a empresa já possui uma base sólida de clientes e está expandindo rapidamente. O foco está em otimizar processos, escalar a operação e construir uma equipe eficiente.",
    recommendations: [
      "Implemente sistemas de gestão mais robustos",
      "Desenvolva um processo de recrutamento eficiente",
      "Crie um plano de marketing e vendas escalável",
      "Busque novas fontes de financiamento se necessário",
      "Estabeleça KPIs claros para todas as áreas"
    ]
  },
  {
    id: 4,
    phase: "Fase de Maturidade (Estabilidade)",
    questions: [
      "Sua empresa possui múltiplas unidades de negócio ou produtos?",
      "Você tem um time de liderança que gerencia as operações sem sua intervenção constante?",
      "Sua empresa consegue manter crescimento sustentável ano após ano?",
      "Você possui sistemas de gestão bem estabelecidos em todas as áreas?",
      "Sua empresa é referência no setor em que atua?",
    ],
    description: "Na fase de maturidade, a empresa já é bem estabelecida no mercado e possui operações estáveis. O foco passa a ser a diversificação, eficiência operacional e busca por novos mercados ou produtos.",
    recommendations: [
      "Desenvolva estratégias de diversificação",
      "Implemente programas de desenvolvimento de lideranças",
      "Busque inovações para manter a competitividade",
      "Considere aquisições estratégicas",
      "Avalie oportunidades de expansão para novos mercados"
    ]
  },
  {
    id: 5,
    phase: "Fase de Expansão (Liderança)",
    questions: [
      "Sua empresa atua em múltiplos mercados ou países?",
      "Você tem uma estrutura corporativa complexa com múltiplos níveis de gestão?",
      "Sua empresa é líder de mercado com forte vantagem competitiva?",
      "Você está mais focado na visão estratégica de longo prazo do que na gestão diária?",
      "Sua empresa tem presença de marca consolidada nacionalmente ou internacionalmente?",
    ],
    description: "Na fase de expansão, a empresa já é líder em seu setor e está buscando novos horizontes. O foco está na internacionalização, diversificação de negócios e consolidação da liderança de mercado.",
    recommendations: [
      "Desenvolva estratégias de internacionalização",
      "Busque parcerias estratégicas de alto nível",
      "Invista em pesquisa e desenvolvimento",
      "Considere abrir capital ou buscar investimentos significativos",
      "Estruture uma governança corporativa robusta"
    ]
  }
];

const TesteFase = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [currentPhaseIndex, setCurrentPhaseIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number[] }>({});
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState<{
    phaseName: string;
    score: number;
    description: string;
    recommendations: string[];
  } | null>(null);
  const [completed, setCompleted] = useState(false);
  
  useEffect(() => {
    // Check if there are saved results in localStorage
    const savedResult = localStorage.getItem("testeFaseResult");
    if (savedResult) {
      const parsedResult = JSON.parse(savedResult);
      setResult(parsedResult);
      setCompleted(true);
      setShowResult(true);
    }
    
    // Initialize answers
    const initialAnswers: { [key: number]: number[] } = {};
    phaseTest.forEach((phase, index) => {
      initialAnswers[index] = Array(phase.questions.length).fill(0);
    });
    setAnswers(initialAnswers);
  }, []);
  
  const handleAnswer = (questionIndex: number, value: number) => {
    setAnswers(prev => {
      const newAnswers = { ...prev };
      newAnswers[currentPhaseIndex][questionIndex] = value;
      return newAnswers;
    });
  };
  
  const handleNext = () => {
    // Check if all questions in the current phase have been answered
    const currentPhaseAnswers = answers[currentPhaseIndex];
    const allAnswered = currentPhaseAnswers.every(answer => answer !== 0);
    
    if (!allAnswered) {
      toast({
        title: "Responda todas as perguntas",
        description: "Por favor, responda todas as perguntas antes de continuar.",
        variant: "destructive"
      });
      return;
    }
    
    if (currentPhaseIndex < phaseTest.length - 1) {
      setCurrentPhaseIndex(prev => prev + 1);
    } else {
      calculateResult();
    }
  };
  
  const handlePrevious = () => {
    if (currentPhaseIndex > 0) {
      setCurrentPhaseIndex(prev => prev - 1);
    }
  };
  
  const calculateResult = () => {
    const phaseScores: number[] = [];
    
    // Calculate score for each phase
    phaseTest.forEach((phase, phaseIndex) => {
      const phaseAnswers = answers[phaseIndex];
      const yesCount = phaseAnswers.filter(answer => answer === 1).length;
      const phaseScore = (yesCount / phaseAnswers.length) * 100;
      phaseScores.push(phaseScore);
    });
    
    // Find the phase with the highest score
    let highestScoreIndex = 0;
    let highestScore = phaseScores[0];
    
    for (let i = 1; i < phaseScores.length; i++) {
      if (phaseScores[i] > highestScore) {
        highestScore = phaseScores[i];
        highestScoreIndex = i;
      }
    }
    
    const resultData = {
      phaseName: phaseTest[highestScoreIndex].phase,
      score: highestScore,
      description: phaseTest[highestScoreIndex].description,
      recommendations: phaseTest[highestScoreIndex].recommendations
    };
    
    // Save to localStorage
    localStorage.setItem("testeFaseResult", JSON.stringify(resultData));
    
    setResult(resultData);
    setCompleted(true);
    setShowResult(true);
  };
  
  const resetTest = () => {
    // Clear localStorage
    localStorage.removeItem("testeFaseResult");
    
    // Reset state
    const initialAnswers: { [key: number]: number[] } = {};
    phaseTest.forEach((phase, index) => {
      initialAnswers[index] = Array(phase.questions.length).fill(0);
    });
    
    setAnswers(initialAnswers);
    setCurrentPhaseIndex(0);
    setShowResult(false);
    setResult(null);
    setCompleted(false);
    
    toast({
      title: "Teste reiniciado",
      description: "Você pode fazer o teste novamente."
    });
  };
  
  const currentPhase = phaseTest[currentPhaseIndex];
  
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="container mx-auto max-w-4xl">
        <BackToMemberAreaButton />
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Teste: Em qual fase está sua empresa?
        </h1>
        
        {!showResult ? (
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle>
                {currentPhase.phase} ({currentPhaseIndex + 1}/{phaseTest.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {currentPhase.questions.map((question, qIndex) => (
                  <div key={qIndex} className="bg-gray-50 p-4 rounded-lg">
                    <p className="mb-3 font-medium text-gray-700">{question}</p>
                    <div className="flex gap-4">
                      <Button
                        variant={answers[currentPhaseIndex][qIndex] === 1 ? "default" : "outline"}
                        onClick={() => handleAnswer(qIndex, 1)}
                        className={answers[currentPhaseIndex][qIndex] === 1 ? "bg-green-600 hover:bg-green-700" : ""}
                      >
                        Sim
                      </Button>
                      <Button
                        variant={answers[currentPhaseIndex][qIndex] === 2 ? "default" : "outline"}
                        onClick={() => handleAnswer(qIndex, 2)}
                        className={answers[currentPhaseIndex][qIndex] === 2 ? "bg-red-600 hover:bg-red-700" : ""}
                      >
                        Não
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-between mt-8">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={currentPhaseIndex === 0}
                >
                  Anterior
                </Button>
                <Button onClick={handleNext}>
                  {currentPhaseIndex < phaseTest.length - 1 ? "Próximo" : "Ver Resultado"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="shadow-lg bg-white">
            <CardHeader>
              <CardTitle>Resultado</CardTitle>
            </CardHeader>
            <CardContent>
              {result && (
                <div className="space-y-6">
                  <div className="bg-blue-50 p-6 rounded-lg">
                    <h2 className="text-2xl font-bold text-blue-800 mb-2">
                      Sua empresa está na: {result.phaseName}
                    </h2>
                    <p className="text-gray-700 mb-2">
                      Compatibilidade com esta fase: {Math.round(result.score)}%
                    </p>
                    <p className="text-gray-600">{result.description}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Recomendações para esta fase:</h3>
                    <ul className="list-disc pl-5 space-y-2">
                      {result.recommendations.map((rec, index) => (
                        <li key={index} className="text-gray-700">{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <Button onClick={resetTest} variant="outline" className="mr-4">
                      Reiniciar Teste
                    </Button>
                    <Button onClick={() => navigate("/membros")}>
                      Voltar para Área de Membros
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default TesteFase;
