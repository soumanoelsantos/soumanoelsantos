
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ArrowLeft, ArrowRight, Check, Download, Home, Redo } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import html2pdf from 'html2pdf.js';

// Define the phases of business
const businessPhases = [
  {
    id: 1,
    title: "Fase 1 – Sobrevivência / Foco no Caixa",
    description: "Neste primeiro momento, o empreendedor está em uma verdadeira batalha pela sobrevivência do seu negócio. Nesta fase, a empresa precisa se firmar no mercado, mostrando o valor do produto/serviço e conquistando clientes.",
    characteristics: [
      "O foco está na sobrevivência, em gerar caixa para pagar as contas, os fornecedores e outros compromissos.",
      "Existe grande sacrifício pessoal (principalmente financeiro) por parte do empreendedor.",
      "Concentração no curto prazo, resolvendo problemas do dia-a-dia.",
      "A empresa opera principalmente na base do improviso.",
      "Geralmente, é o empresário quem cuida de todas as áreas do negócio.",
      "Decisões são tomadas conforme a necessidade, sem planejamento.",
      "Erro, acerto, tentativa."
    ]
  },
  {
    id: 2,
    title: "Fase 2 – Talentos / Foco em Pessoas",
    description: "Neste segundo momento, o empreendedor já entende que não consegue dar conta de tudo sozinho, ele percebe que é necessário ter mais \"braços\" para o negócio crescer e, com isso, a importância de contratar talentos, \"gente boa\", profissionais especializados em determinadas áreas (Vendas, Financeiro, Gestão de Pessoas, Marketing, por exemplo) para lhe ajudar atender as crescentes demandas do seu empreendimento junto ao mercado, fornecedores, parceiros e seus clientes.",
    characteristics: [
      "É importante que o Empresário já tenha estabelecido suas diretrizes estratégicas (missão, visão e valores) para com isso começar a criar uma forma de trabalhar dentro da empresa, a cultura e a personalidade do negócio.",
      "Entende que é fundamental definir com clareza qual é o seu negócio, ou seja, qual é o real benefício que a sua empresa leva para o mercado.",
      "Dá os primeiros passos para estruturar e organizar melhor o negócio.",
      "Sabe que não é possível fazer tudo sozinho.",
      "Esboça um planejamento, mas ainda com foco no curto prazo.",
      "Começa a implementar algumas ferramentas básicas de administração.",
      "Ainda se envolve em muitas questões operacionais."
    ]
  },
  {
    id: 3,
    title: "Fase 3 – Sistemas / Foco nos Processos",
    description: "Neste terceiro momento, o empreendedor já contratou alguns talentos para atuarem em sua empresa de acordo com a sua especialidade técnica. É necessário aprender a trabalhar em conjunto e em sinergia para que o resultado do time seja maior que a soma dos resultados individuais. Para isso, é fundamental desenvolver sistemas de trabalho, com regras claras e processos bem definidos.",
    characteristics: [
      "Já possui talentos contratados, mas nem sempre consegue obter o melhor de cada um.",
      "Identifica a necessidade de criar e implementar sistemas de trabalho.",
      "Começa a entender a diferença entre ser eficaz (fazer o que precisa ser feito) e ser eficiente (fazer da melhor forma possível).",
      "Percebe a importância da padronização e do controle de qualidade.",
      "Inicia o processo de documentação dos procedimentos.",
      "Começa a elaborar um planejamento com visão de médio prazo.",
      "Sente necessidade de implementar indicadores de desempenho."
    ]
  },
  {
    id: 4,
    title: "Fase 4 – Expansão / Foco no Crescimento",
    description: "Neste quarto momento, com talentos integrados às suas funções e sistemas de trabalho implementados, o empreendedor pode focar na expansão segura e sustentável do negócio. É o momento de ampliar a participação no mercado, diversificar os produtos/serviços e, possivelmente, considerar novas unidades ou filiais.",
    characteristics: [
      "Empresa já está madura e consolidada no mercado.",
      "Possui uma equipe qualificada e bem treinada.",
      "Sistemas de trabalho estão implementados e funcionando.",
      "Planeja com visão de longo prazo.",
      "Possui metas claras de crescimento.",
      "Tem capital para investir na expansão.",
      "Pensa estrategicamente no negócio."
    ]
  }
];

// Question model for the test
const questions = [
  {
    id: 1,
    text: "Qual é o principal foco de atenção do empresário no dia a dia?",
    options: [
      { id: 'a', text: "Gerar caixa para pagar as contas e manter o negócio funcionando", phase: 1 },
      { id: 'b', text: "Encontrar e contratar bons profissionais para a equipe", phase: 2 },
      { id: 'c', text: "Implementar sistemas e processos para melhorar a operação", phase: 3 },
      { id: 'd', text: "Planejar a expansão do negócio e novas oportunidades de mercado", phase: 4 }
    ]
  },
  {
    id: 2,
    text: "Como são tomadas as decisões na empresa?",
    options: [
      { id: 'a', text: "De forma improvisada e reativa, resolvendo problemas conforme aparecem", phase: 1 },
      { id: 'b', text: "Começando a ser mais estruturadas, mas ainda centralizadas no dono", phase: 2 },
      { id: 'c', text: "Com base em processos definidos e alguma análise de dados", phase: 3 },
      { id: 'd', text: "De forma estratégica, com planejamento de longo prazo e análise aprofundada", phase: 4 }
    ]
  },
  {
    id: 3,
    text: "Como está estruturada a equipe da empresa?",
    options: [
      { id: 'a', text: "O dono faz praticamente tudo ou tem ajudantes sem funções bem definidas", phase: 1 },
      { id: 'b', text: "Começando a contratar profissionais especializados para áreas específicas", phase: 2 },
      { id: 'c', text: "Equipe bem definida com funções claras e trabalhando com processos", phase: 3 },
      { id: 'd', text: "Equipe completa, profissionalizada e preparada para escalar o negócio", phase: 4 }
    ]
  },
  {
    id: 4,
    text: "Como é o planejamento financeiro da empresa?",
    options: [
      { id: 'a', text: "Praticamente inexistente, foco em pagar as contas do mês", phase: 1 },
      { id: 'b', text: "Básico, com algum controle, mas ainda focado no curto prazo", phase: 2 },
      { id: 'c', text: "Estruturado, com orçamentos e indicadores financeiros definidos", phase: 3 },
      { id: 'd', text: "Completo, com planejamento de investimentos e expansão", phase: 4 }
    ]
  },
  {
    id: 5,
    text: "Como estão documentados os processos da empresa?",
    options: [
      { id: 'a', text: "Não existem processos documentados, tudo está na cabeça do dono", phase: 1 },
      { id: 'b', text: "Começando a criar algumas documentações básicas e instruções", phase: 2 },
      { id: 'c', text: "Principais processos estão documentados e são seguidos pela equipe", phase: 3 },
      { id: 'd', text: "Processos completamente documentados, otimizados e em constante melhoria", phase: 4 }
    ]
  },
  {
    id: 6,
    text: "Qual é a visão de futuro para o negócio?",
    options: [
      { id: 'a', text: "Sobreviver e conseguir pagar as contas mês a mês", phase: 1 },
      { id: 'b', text: "Estabilizar o negócio e formar uma boa equipe", phase: 2 },
      { id: 'c', text: "Crescer com base em processos bem definidos e controlados", phase: 3 },
      { id: 'd', text: "Expandir para novos mercados, produtos ou unidades de negócio", phase: 4 }
    ]
  },
  {
    id: 7,
    text: "Como está a gestão do tempo do empresário?",
    options: [
      { id: 'a', text: "Totalmente operacional, \"apagando incêndios\" o tempo todo", phase: 1 },
      { id: 'b', text: "Ainda muito operacional, mas começando a delegar algumas funções", phase: 2 },
      { id: 'c', text: "Dividido entre operação e gestão, com tempo para pensar em melhorias", phase: 3 },
      { id: 'd', text: "Principalmente estratégico, com foco no crescimento do negócio", phase: 4 }
    ]
  },
  {
    id: 8,
    text: "Como é feito o controle de qualidade na empresa?",
    options: [
      { id: 'a', text: "Não existe um controle formal, apenas reação a reclamações", phase: 1 },
      { id: 'b', text: "Começando a implementar alguns controles básicos", phase: 2 },
      { id: 'c', text: "Processos de qualidade definidos e monitorados regularmente", phase: 3 },
      { id: 'd', text: "Sistema completo de gestão da qualidade com melhorias contínuas", phase: 4 }
    ]
  },
  {
    id: 9,
    text: "Como está a capacitação e desenvolvimento da equipe?",
    options: [
      { id: 'a', text: "Inexistente ou apenas treinamento básico para executar tarefas", phase: 1 },
      { id: 'b', text: "Alguns treinamentos pontuais quando necessário", phase: 2 },
      { id: 'c', text: "Programa de desenvolvimento estruturado para principais funções", phase: 3 },
      { id: 'd', text: "Plano completo de desenvolvimento para toda a equipe, incluindo lideranças", phase: 4 }
    ]
  },
  {
    id: 10,
    text: "Como é a gestão de marketing e vendas na empresa?",
    options: [
      { id: 'a', text: "Informal e baseada em oportunidades que surgem", phase: 1 },
      { id: 'b', text: "Começando a estruturar ações mais planejadas", phase: 2 },
      { id: 'c', text: "Processos definidos com metas e indicadores", phase: 3 },
      { id: 'd', text: "Estratégia completa alinhada ao plano de expansão do negócio", phase: 4 }
    ]
  }
];

// Result explanations
const phaseExplanations = {
  1: [
    "Sua empresa está na fase de sobrevivência, com foco principal na geração de caixa para manter as operações.",
    "É comum nesta fase o empresário se envolver diretamente em todas as atividades do negócio.",
    "Recomendamos começar a estruturar as bases para o crescimento, definindo funções e responsabilidades claras.",
    "Desenvolva controles financeiros básicos para entender melhor o fluxo de caixa do seu negócio."
  ],
  2: [
    "Sua empresa está na fase de formação de equipe, buscando atrair e reter talentos.",
    "É importante nesta fase definir claramente a cultura e os valores da empresa.",
    "Recomendamos formalizar descrições de cargos e começar a documentar processos básicos.",
    "Comece a implementar reuniões regulares de acompanhamento com a equipe."
  ],
  3: [
    "Sua empresa está na fase de implementação de sistemas e processos.",
    "O foco agora deve ser na eficiência operacional e na padronização.",
    "Recomendamos desenvolver indicadores de desempenho (KPIs) para as principais áreas.",
    "Invista em ferramentas de gestão para automatizar e controlar os processos."
  ],
  4: [
    "Sua empresa está na fase de expansão e crescimento acelerado.",
    "O negócio está maduro e pronto para explorar novas oportunidades de mercado.",
    "Recomendamos desenvolver um plano estratégico detalhado para os próximos anos.",
    "Considere opções de financiamento para suportar a expansão planejada."
  ]
};

const TesteFase = () => {
  const [activeQuestion, setActiveQuestion] = useState(1);
  const [answers, setAnswers] = useState<{[key: number]: string}>({});
  const [showResults, setShowResults] = useState(false);
  const [phaseCounts, setPhaseCounts] = useState<{[key: number]: number}>({1: 0, 2: 0, 3: 0, 4: 0});
  const [dominantPhase, setDominantPhase] = useState<number>(0);
  const [loaded, setLoaded] = useState(false);
  const pdfRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved test
    const savedTest = localStorage.getItem('testeFaseAnswers');
    if (savedTest) {
      const parsedData = JSON.parse(savedTest);
      setAnswers(parsedData.answers);
      setPhaseCounts(parsedData.phaseCounts);
      setDominantPhase(parsedData.dominantPhase);
      setShowResults(true);
    }
    setLoaded(true);
  }, []);

  const handleAnswerSelect = (questionId: number, optionPhase: number) => {
    const newAnswers = { ...answers, [questionId]: optionPhase };
    setAnswers(newAnswers);
    
    if (activeQuestion < questions.length) {
      setActiveQuestion(activeQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (newAnswers: {[key: number]: string}) => {
    const counts = {1: 0, 2: 0, 3: 0, 4: 0};
    
    Object.values(newAnswers).forEach((phase) => {
      if (typeof phase === 'number') {
        counts[phase] += 1;
      }
    });
    
    setPhaseCounts(counts);
    
    // Find the dominant phase
    let maxCount = 0;
    let dominant = 0;
    
    Object.entries(counts).forEach(([phase, count]) => {
      if (count > maxCount) {
        maxCount = count;
        dominant = parseInt(phase);
      }
    });
    
    setDominantPhase(dominant);
    setShowResults(true);
    
    // Save to localStorage
    localStorage.setItem('testeFaseAnswers', JSON.stringify({
      answers: newAnswers,
      phaseCounts: counts,
      dominantPhase: dominant
    }));
    
    toast({
      title: "Teste concluído",
      description: "Seus resultados estão prontos para visualização",
    });
  };

  const goToQuestion = (questionId: number) => {
    setActiveQuestion(questionId);
  };

  const resetTest = () => {
    setAnswers({});
    setPhaseCounts({1: 0, 2: 0, 3: 0, 4: 0});
    setDominantPhase(0);
    setActiveQuestion(1);
    setShowResults(false);
    localStorage.removeItem('testeFaseAnswers');
    
    toast({
      title: "Teste resetado",
      description: "Você pode iniciar o teste novamente",
    });
  };

  const downloadPDF = () => {
    if (pdfRef.current) {
      const element = pdfRef.current;
      const opt = {
        margin: 10,
        filename: 'teste-fase-empresa-resultado.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
      };
  
      html2pdf().set(opt).from(element).save();
      
      toast({
        title: "PDF gerado",
        description: "Seu resultado foi baixado com sucesso",
      });
    }
  };

  if (!loaded) {
    return <div className="flex justify-center items-center h-screen">Carregando...</div>;
  }

  const currentProgress = (activeQuestion / questions.length) * 100;

  const chartData = Object.entries(phaseCounts).map(([phase, count]) => ({
    name: `Fase ${phase}`,
    value: count
  }));

  const colors = ['#FF8042', '#00C49F', '#0088FE', '#FFBB28'];

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-gray-100 p-4 border-b">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-gray-800">Teste da Fase da sua Empresa</h1>
          <p className="text-gray-600">Descubra em qual estágio de desenvolvimento sua empresa se encontra</p>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {!showResults ? (
          <div className="max-w-3xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Pergunta {activeQuestion} de {questions.length}</CardTitle>
                <CardDescription>
                  Responda com sinceridade para obter um resultado mais preciso
                </CardDescription>
                <Progress value={currentProgress} className="mt-2" />
              </CardHeader>
              <CardContent>
                <div className="text-xl font-medium mb-6">
                  {questions[activeQuestion - 1].text}
                </div>
                <RadioGroup onValueChange={(value) => handleAnswerSelect(activeQuestion, parseInt(value))}>
                  <div className="space-y-4">
                    {questions[activeQuestion - 1].options.map((option) => (
                      <div 
                        key={option.id}
                        className="flex items-start space-x-2 p-3 rounded-lg border border-gray-200 hover:bg-gray-50 cursor-pointer"
                        onClick={() => handleAnswerSelect(activeQuestion, option.phase)}
                      >
                        <RadioGroupItem value={option.phase.toString()} id={`q${activeQuestion}-${option.id}`} />
                        <Label htmlFor={`q${activeQuestion}-${option.id}`} className="flex-1 cursor-pointer">
                          {option.text}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={() => goToQuestion(Math.max(1, activeQuestion - 1))}
                  disabled={activeQuestion === 1}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" /> Anterior
                </Button>
                
                {activeQuestion < questions.length && (
                  <Button
                    variant="outline"
                    onClick={() => goToQuestion(activeQuestion + 1)}
                    disabled={!answers[activeQuestion]}
                  >
                    Próxima <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
                
                {activeQuestion === questions.length && (
                  <Button 
                    onClick={() => calculateResults(answers)}
                    disabled={!answers[activeQuestion]}
                    className="bg-green-600 hover:bg-green-700"
                  >
                    Finalizar teste <Check className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="space-y-8" ref={pdfRef}>
            <Card className="max-w-5xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl">Resultado: Sua empresa está na {businessPhases.find(p => p.id === dominantPhase)?.title}</CardTitle>
                <CardDescription>
                  Baseado nas suas respostas, identificamos que sua empresa está predominantemente na fase {dominantPhase}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={130}
                        fill="#8884d8"
                        dataKey="value"
                        label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {chartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-xl font-semibold">Sobre esta fase:</h3>
                  <p className="text-gray-700">{businessPhases.find(p => p.id === dominantPhase)?.description}</p>
                  
                  <h3 className="text-xl font-semibold">Características principais:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {businessPhases.find(p => p.id === dominantPhase)?.characteristics.map((char, idx) => (
                      <li key={idx} className="text-gray-700">{char}</li>
                    ))}
                  </ul>
                  
                  <h3 className="text-xl font-semibold">Recomendações:</h3>
                  <ul className="list-disc pl-5 space-y-2">
                    {phaseExplanations[dominantPhase]?.map((rec, idx) => (
                      <li key={idx} className="text-gray-700">{rec}</li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
            
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                variant="outline" 
                onClick={() => navigate('/membros')}
                className="flex items-center"
              >
                <Home className="mr-2 h-4 w-4" />
                Voltar para área de membros
              </Button>
              
              <Button 
                variant="outline" 
                onClick={resetTest}
                className="flex items-center"
              >
                <Redo className="mr-2 h-4 w-4" />
                Refazer o teste
              </Button>
              
              <Button 
                onClick={downloadPDF}
                className="bg-dark-primary hover:bg-dark-primary/90 flex items-center"
              >
                <Download className="mr-2 h-4 w-4" />
                Baixar resultado em PDF
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TesteFase;
