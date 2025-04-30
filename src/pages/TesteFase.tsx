
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import DiagnosticHeader from "@/components/DiagnosticHeader";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";

// Define the questions for each phase of a business
const phaseQuestions = [
  {
    id: 1,
    question: "Quanto tempo sua empresa está no mercado?",
    options: [
      { value: "startup", label: "Menos de 1 ano" },
      { value: "growth", label: "Entre 1 e 3 anos" },
      { value: "expansion", label: "Entre 3 e 5 anos" },
      { value: "maturity", label: "Mais de 5 anos" }
    ]
  },
  {
    id: 2,
    question: "Qual o número atual de funcionários na sua empresa?",
    options: [
      { value: "startup", label: "Apenas os sócios ou até 3 funcionários" },
      { value: "growth", label: "Entre 4 e 10 funcionários" },
      { value: "expansion", label: "Entre 11 e 30 funcionários" },
      { value: "maturity", label: "Mais de 30 funcionários" }
    ]
  },
  {
    id: 3,
    question: "Como você descreveria o crescimento da receita no último ano?",
    options: [
      { value: "startup", label: "Ainda estamos estabelecendo nossa receita inicial" },
      { value: "growth", label: "Crescimento entre 20% e 100%" },
      { value: "expansion", label: "Crescimento entre 10% e 20%" },
      { value: "maturity", label: "Crescimento estável até 10% ao ano" }
    ]
  },
  {
    id: 4,
    question: "Como está estruturada a liderança na sua empresa?",
    options: [
      { value: "startup", label: "Centralizada nos fundadores que fazem múltiplas funções" },
      { value: "growth", label: "Começando a definir papéis de liderança específicos" },
      { value: "expansion", label: "Hierarquia estabelecida com gerentes de departamento" },
      { value: "maturity", label: "Estrutura completa com C-level e conselho" }
    ]
  },
  {
    id: 5,
    question: "Como você classificaria seus processos e operações?",
    options: [
      { value: "startup", label: "Informais e ainda em desenvolvimento" },
      { value: "growth", label: "Alguns processos documentados, mas nem sempre seguidos" },
      { value: "expansion", label: "Maioria dos processos documentados e implementados" },
      { value: "maturity", label: "Processos otimizados, documentados e constantemente melhorados" }
    ]
  }
];

const COLORS = {
  startup: "#FF8042",
  growth: "#FFBB28",
  expansion: "#00C49F",
  maturity: "#0088FE"
};

const phaseDescriptions = {
  startup: "Fase de Início: Sua empresa está nos estágios iniciais, focada em validar o modelo de negócio, encontrar produto-mercado e estabelecer presença.",
  growth: "Fase de Crescimento: Sua empresa está em crescimento acelerado, expandindo a base de clientes e a equipe, e refinando os processos.",
  expansion: "Fase de Expansão: Sua empresa está escalando operações, possivelmente entrando em novos mercados e desenvolvendo novas linhas de produtos/serviços.",
  maturity: "Fase de Maturidade: Sua empresa está estabelecida, com processos otimizados, marca reconhecida e crescimento previsível."
};

const phaseRecommendations = {
  startup: [
    "Foque em validar seu produto/serviço com os primeiros clientes",
    "Otimize seu modelo de negócio e proposta de valor",
    "Desenvolva processos financeiros básicos para controlar o fluxo de caixa",
    "Crie parcerias estratégicas para aumentar visibilidade"
  ],
  growth: [
    "Invista em marketing digital para expandir alcance",
    "Estabeleça processos de vendas repetíveis e escaláveis",
    "Desenvolva políticas e procedimentos para onboarding de novos funcionários",
    "Implemente sistemas de gestão para escalar operações"
  ],
  expansion: [
    "Diversifique seus canais de venda e marketing",
    "Estabeleça métricas claras de performance para departamentos",
    "Considere novos mercados ou segmentos de clientes",
    "Refine sua estratégia de preços para maximizar margens"
  ],
  maturity: [
    "Invista em inovação para evitar estagnação",
    "Explore oportunidades de aquisição ou fusão",
    "Otimize custos e processos internos para melhorar eficiência",
    "Desenvolva programas de sucessão e retenção de talentos"
  ]
};

interface TestResult {
  startup: number;
  growth: number;
  expansion: number;
  maturity: number;
}

const TesteFase: React.FC = () => {
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [result, setResult] = useState<TestResult | null>(null);
  const [currentTab, setCurrentTab] = useState<string>("test");
  const { toast } = useToast();
  const [dominantPhase, setDominantPhase] = useState<string | null>(null);
  
  useEffect(() => {
    // Attempt to load previously saved results
    const savedResult = localStorage.getItem("testeFaseResult");
    if (savedResult) {
      try {
        const parsedResult = JSON.parse(savedResult);
        setResult(parsedResult.result);
        setAnswers(parsedResult.answers);
        setDominantPhase(parsedResult.dominantPhase);
        setCurrentTab("results");
      } catch (e) {
        console.error("Error parsing saved results:", e);
      }
    }
  }, []);
  
  const handleAnswerChange = (questionId: number, answer: string) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };
  
  const calculateResults = () => {
    // Check if all questions are answered
    if (Object.keys(answers).length < phaseQuestions.length) {
      toast({
        title: "Resposta incompleta",
        description: "Por favor, responda todas as perguntas para ver o resultado.",
        variant: "destructive"
      });
      return;
    }
    
    // Count occurrences of each phase in answers
    const phaseCounts: TestResult = {
      startup: 0,
      growth: 0,
      expansion: 0,
      maturity: 0
    };
    
    // Count each type of answer
    Object.values(answers).forEach(phase => {
      if (phase in phaseCounts) {
        phaseCounts[phase as keyof TestResult]++;
      }
    });
    
    setResult(phaseCounts);
    
    // Determine dominant phase
    let maxCount = 0;
    let maxPhase: string | null = null;
    
    Object.entries(phaseCounts).forEach(([phase, count]) => {
      if (count > maxCount) {
        maxCount = count;
        maxPhase = phase;
      }
    });
    
    setDominantPhase(maxPhase);
    
    // Save results to localStorage
    const resultData = {
      result: phaseCounts,
      answers,
      dominantPhase: maxPhase,
      date: new Date().toISOString()
    };
    localStorage.setItem("testeFaseResult", JSON.stringify(resultData));
    
    // Switch to results tab
    setCurrentTab("results");
    
    toast({
      title: "Análise concluída!",
      description: "Sua fase empresarial predominante foi identificada."
    });
  };

  const resetTest = () => {
    localStorage.removeItem("testeFaseResult");
    setAnswers({});
    setResult(null);
    setDominantPhase(null);
    setCurrentTab("test");
    toast({
      title: "Teste reiniciado",
      description: "Todas as respostas foram apagadas."
    });
  };

  const getChartData = () => {
    if (!result) return [];
    
    return [
      { name: 'Startup', value: result.startup },
      { name: 'Crescimento', value: result.growth },
      { name: 'Expansão', value: result.expansion },
      { name: 'Maturidade', value: result.maturity }
    ];
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <DiagnosticHeader title="Teste de Fase da Empresa" />
      
      <div className="container mx-auto px-4 py-8">
        <BackToMemberAreaButton />
        
        <div className="max-w-4xl mx-auto">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-gray-800">Diagnóstico de Fase Empresarial</CardTitle>
              <CardDescription className="text-gray-600">
                Identifique em qual fase de desenvolvimento sua empresa se encontra atualmente
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Tabs value={currentTab} onValueChange={setCurrentTab}>
            <TabsList className="mb-8">
              <TabsTrigger value="test">Questionário</TabsTrigger>
              <TabsTrigger value="results" disabled={!result}>Resultados</TabsTrigger>
            </TabsList>
            
            <TabsContent value="test" className="space-y-6">
              {phaseQuestions.map(question => (
                <Card key={question.id} className="mb-4">
                  <CardHeader>
                    <CardTitle className="text-lg text-gray-800">
                      {question.id}. {question.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={answers[question.id] || ""}
                      onValueChange={(value) => handleAnswerChange(question.id, value)}
                    >
                      {question.options.map((option, idx) => (
                        <div key={idx} className="flex items-center space-x-2 mb-2">
                          <RadioGroupItem value={option.value} id={`q${question.id}-${idx}`} />
                          <Label htmlFor={`q${question.id}-${idx}`} className="text-gray-700">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </CardContent>
                </Card>
              ))}
              
              <div className="flex justify-center">
                <Button
                  onClick={calculateResults}
                  className="bg-dark-primary hover:bg-dark-primary/90 text-white"
                >
                  Analisar resultados
                </Button>
              </div>
            </TabsContent>
            
            <TabsContent value="results" className="space-y-6">
              {result && dominantPhase && (
                <>
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-800">
                        Resultado da Análise
                      </CardTitle>
                      <CardDescription className="text-gray-600">
                        Baseado nas suas respostas, identificamos a fase predominante da sua empresa
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                      <div className="h-[300px] w-full max-w-[400px] mb-6">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={getChartData()}
                              cx="50%"
                              cy="50%"
                              labelLine={false}
                              outerRadius={80}
                              fill="#8884d8"
                              dataKey="value"
                              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            >
                              {getChartData().map((entry, index) => (
                                <Cell
                                  key={`cell-${index}`}
                                  fill={COLORS[entry.name.toLowerCase().replace('crescimento', 'growth').replace('expansão', 'expansion').replace('maturidade', 'maturity') as keyof typeof COLORS]}
                                />
                              ))}
                            </Pie>
                            <Legend verticalAlign="bottom" height={36} />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                      
                      <div className="mb-4 text-center">
                        <h3 className="text-lg font-bold text-gray-800 mb-2">
                          Fase predominante: <span className="text-dark-primary capitalize">
                            {dominantPhase === 'startup' ? 'Início' : 
                             dominantPhase === 'growth' ? 'Crescimento' :
                             dominantPhase === 'expansion' ? 'Expansão' : 'Maturidade'}
                          </span>
                        </h3>
                        <p className="text-gray-700">
                          {phaseDescriptions[dominantPhase as keyof typeof phaseDescriptions]}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className="mb-4">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-800">
                        Recomendações para sua fase
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        {phaseRecommendations[dominantPhase as keyof typeof phaseRecommendations].map((rec, idx) => (
                          <li key={idx}>{rec}</li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        onClick={resetTest}
                        variant="outline"
                        className="w-full border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
                      >
                        Refazer teste
                      </Button>
                    </CardFooter>
                  </Card>
                </>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TesteFase;
