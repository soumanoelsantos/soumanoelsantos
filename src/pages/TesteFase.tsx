
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Download } from "lucide-react";
import MemberHeader from "@/components/MemberHeader";
import DiagnosticHeader from "@/components/DiagnosticHeader";
import BackToMemberAreaButton from "@/components/diagnostic/BackToMemberAreaButton";

interface Question {
  id: number;
  text: string;
  options: {
    key: string;
    text: string;
    phase: number;
  }[];
}

interface Phase {
  id: number;
  title: string;
  description: string;
  characteristics: string[];
  skills: string[];
}

const questions: Question[] = [
  {
    id: 1,
    text: "1. Sua empresa em relação ao lucro já se percebe?",
    options: [
      { key: "A", text: "Estabelecida e já tem uma reserva financeira e precisa se preocupar mais com os processos, organizar as atividades para continuar lucrando.", phase: 3 },
      { key: "B", text: "Já consegue respirar e já se sente falta de aumentar o time para continuar lucrando.", phase: 2 },
      { key: "C", text: "Está consolidada no mercado e pode focar e pensar em um planejamento a longo prazo.", phase: 4 },
      { key: "D", text: "Precisa trabalhar focada em gerar lucro para consolidar o negócio.", phase: 1 }
    ]
  },
  {
    id: 2,
    text: "2. Sua empresa hoje em relação a gestão de pessoas está?",
    options: [
      { key: "A", text: "Está focando em contratar pessoal para aumentar o quadro de funcionários para continuar lucrando e crescendo.", phase: 2 },
      { key: "B", text: "Tem um bom quadro de funcionários, os processos já estão estabelecidos e aumentamos o lucro.", phase: 4 },
      { key: "C", text: "Tem um bom quadro de funcionários mas enfrenta conflitos frequentes e falta de organização.", phase: 3 },
      { key: "D", text: "Tem a mão de obra bem reduzida para dar conta do trabalho, todos (ou a maioria) acumulam várias funções para produzir resultado.", phase: 1 }
    ]
  },
  {
    id: 3,
    text: "3. Em relação a gestão onde sua empresa está focada atualmente?",
    options: [
      { key: "A", text: "Está focada em organizar, estruturar as atividades e criar indicadores.", phase: 3 },
      { key: "B", text: "A gestão está focada mais em pessoas, pra gerar engajamento na equipe.", phase: 2 },
      { key: "C", text: "A gestão está focada em controlar gastos e gerar mais lucros.", phase: 1 },
      { key: "D", text: "Está focada em acompanhar o planejamento estratégico.", phase: 4 }
    ]
  },
  {
    id: 4,
    text: "4. Na questão formação de liderança como está sua empresa hoje?",
    options: [
      { key: "A", text: "A empresa já tem uma liderança estabelecida e em constante desenvolvimento para alcançar as metas do planejamento estratégico.", phase: 4 },
      { key: "B", text: "Não a tanta necessidade de trabalhar liderança, pois todos estão bastante envolvidos e ocupados em fazer suas atividades, não sobra tempo para pensar em liderança.", phase: 1 },
      { key: "C", text: "A empresa já tem um bom time e se faz necessário a liderança até para controlar os processos.", phase: 3 },
      { key: "D", text: "Com o aumento da equipe percebe-se a necessidade de começar a estabelecer e trabalhar liderança.", phase: 2 }
    ]
  },
  {
    id: 5,
    text: "5. Em relação aos processos como está sua empresa hoje?",
    options: [
      { key: "A", text: "Temos um quadro bem reduzido e todos sabem o que tem a fazer e focam em suas atividades.", phase: 1 },
      { key: "B", text: "Nossos processos estão estabelecidos e controlamos os indicadores.", phase: 4 },
      { key: "C", text: "Já estamos com o time formado e precisamos organizar as atividades, estabelecendo a melhor maneira de realiza-las, de acordo com a necessidade do negócio.", phase: 3 },
      { key: "D", text: "Estamos ampliando o time de trabalho e com necessidade de redistribuir as atividades.", phase: 2 }
    ]
  },
  {
    id: 6,
    text: "6. Qual você percebe que o foco de sua empresa no momento?",
    options: [
      { key: "A", text: "Já temos um lucro razoável e para crescer sentimos a necessidade de mais braços.", phase: 2 },
      { key: "B", text: "Temos um time engajado, os conflitos internos diminuiram muito e aumentamos os lucros.", phase: 4 },
      { key: "C", text: "Já temos um bom lucro e um time, mais estamos com reclamações de clientes e conflitos internos.", phase: 3 },
      { key: "D", text: "Precisamos gerar lucro para continuar com a empresa e atingirmos mais lucratividade.", phase: 1 }
    ]
  },
  {
    id: 7,
    text: "7. A direção da empresa hoje?",
    options: [
      { key: "A", text: "Está focada em cuidar do time e se percebe que precisa de novos talentos para a empresa crescer.", phase: 2 },
      { key: "B", text: "Só tem tempo para fazer e não para planejar a longo prazo.", phase: 1 },
      { key: "C", text: "Já temos bons talentos dentro da empresa mais ainda temos muitos conflitos internos.", phase: 3 },
      { key: "D", text: "Nosso time é engajado e funciona bem mesmo na ausência dos gestores.", phase: 4 }
    ]
  },
  {
    id: 8,
    text: "8. Já é possível descentralizar e delegar atividades?",
    options: [
      { key: "A", text: "Tenho uma boa equipe e já delego grande parte das atividades, ficando somente com as funções gerenciais para o alcance do planejamento estabelecido.", phase: 4 },
      { key: "B", text: "Já delego as atividades necessárias para o meu time e consigo desenvolver mais o pessoal.", phase: 2 },
      { key: "C", text: "Já sinto uma grande necessidade de dividir as atividades e delegar algumas tarefas.", phase: 3 },
      { key: "D", text: "No momento tenho que ficar atendo a tudo que acontece e exercer diversas funções.", phase: 1 }
    ]
  },
  {
    id: 9,
    text: "9. Como é a relação da empresa com os consumidores?",
    options: [
      { key: "A", text: "Temos uma equipe formada mais nossos clientes ainda reclamam muito de nosso atendimento e produto.", phase: 3 },
      { key: "B", text: "Já estabelecemos nossa cultura, marca e nossos clientes já nos identificam no mercado, temos índice de reclamações bem baixos.", phase: 4 },
      { key: "C", text: "Para atender a demanda que temos no momento se percebe que precisamos aumentar a equipe.", phase: 2 },
      { key: "D", text: "Estamos focados em buscar mais clientes e entregar o que vendemos.", phase: 1 }
    ]
  },
  {
    id: 10,
    text: "10. Como é a relação da empresa hoje com os funcionários?",
    options: [
      { key: "A", text: "Temos poucos funcionários um quadro bem reduzido, só para conseguir manter o negócio funcionando.", phase: 1 },
      { key: "B", text: "Já conseguimos aumentar um pouco a equipe e dividir algumas atividades.", phase: 2 },
      { key: "C", text: "Já temos um bom quadro de funcionários, que desempenham suas funções mais ainda com grande necessidade de intervenção da gerencia.", phase: 3 },
      { key: "D", text: "Os funcionários já se mostram independentes e os líderes já tem pode decisório.", phase: 4 }
    ]
  },
  {
    id: 11,
    text: "11. Qual é a estratégia da empresa no momento?",
    options: [
      { key: "A", text: "De aumentar o time para gerar mais lucros, já perdemos negócio por falta de pessoal.", phase: 2 },
      { key: "B", text: "De gerar lucro para se manter no mercado.", phase: 1 },
      { key: "C", text: "Focar no planejamento estratégico para que a empresa cresça mais.", phase: 4 },
      { key: "D", text: "De diminuir o número de conflitos e reclamações.", phase: 3 }
    ]
  },
  {
    id: 12,
    text: "12. Como está a cultura da empresa no momento?",
    options: [
      { key: "A", text: "Já temos uma equipe, mas ainda não conseguimos encontrar a melhor maneira de trabalhar para alcançar os resultados.", phase: 3 },
      { key: "B", text: "Já contamos com uma equipe formada, mas a missão da empresa não é clara para todos.", phase: 2 },
      { key: "C", text: "Não temos uma cultura estabelecida, ainda não temos um jeito de trabalhar, resolvemos os problemas conforme aparecem.", phase: 1 },
      { key: "D", text: "A missão, visão e valores da empresa já são bem claros para todos.", phase: 4 }
    ]
  }
];

const phases: Phase[] = [
  {
    id: 1,
    title: "Fase 1 – Sobrevivência e Confirmação / Foco em Resultados",
    description: "Este é o estágio onde o empreendedor está focado em manter sua empresa viva, pagar as contas, honrar seus compromissos, captar novos recursos, ter capital de giro e fazer sua ideia se confirmar como um modelo de negócios possível de ser praticado.",
    characteristics: [
      "Neste estágio inicial, o fundador ou dono da empresa é quem toma todas as decisões e também é quem geralmente banca os investimentos, muitas vezes, colocando seu patrimônio em risco.",
      "Os objetivos e metas ainda são pensados em curto prazo e não são trabalhados de forma muito clara.",
      "Aqui é importante o Empreendedor meter a mão na massa e fazer acontecer, sem se esquecer de que para fazer o negócio prosperar ele vai precisar de talentos (pessoas certas e comprometidas) para fazer a empresa crescer, com foco em gerar resultado, em ter caixa para fazer contratações e poder começar a investir em inovações."
    ],
    skills: [
      "Geração de caixa (vendas e controle de custos)",
      "Tolerância ao risco",
      "Proatividade",
      "Perfil executor",
      "Capacidade de entregar o que foi vendido com qualidade"
    ]
  },
  {
    id: 2,
    title: "Fase 2 – Talentos / Foco em Pessoas",
    description: "Neste segundo momento, o empreendedor já entende que não consegue dar conta de tudo sozinho, ele percebe que é necessário ter mais "braços" para o negócio crescer e, com isso, a importância de contratar talentos, "gente boa", profissionais especializados em determinadas áreas (Vendas, Financeiro, Gestão de Pessoas, Marketing, por exemplo) para lhe ajudar atender as crescentes demandas do seu empreendimento junto ao mercado, fornecedores, parceiros e seus clientes.",
    characteristics: [
      "É importante que o Empresário já tenha estabelecido suas diretrizes estratégicas (missão, visão e valores) para com isso começar a criar uma forma de trabalhar dentro da empresa, a cultura e a personalidade do negócio.",
      "Um ponto de atenção são os aspectos legais relacionados a contratação de funcionários, é importante ter orientação contábil e jurídica para minimizar riscos trabalhistas e reduzir a carga tributária."
    ],
    skills: [
      "Recrutamento e seleção de pessoas",
      "Implantação da cultura (missão, visão e valores)",
      "Liderança",
      "Treinamento e desenvolvimento da equipe",
      "Gestão jurídica, trabalhista e legal dos funcionários"
    ]
  },
  {
    id: 3,
    title: "Fase 3 – Organização / Foco em Processos",
    description: "Nesta fase por melhores que sejam os profissionais contratados, a falta de processos se torna um gap importante do negócio e, portanto, deve virar um importante foco da atenção do empreendedor. Chega a hora, então, de evoluir as diretrizes da empresa e os procedimentos que devem ser seguidos por todos os departamentos e pessoas ao executar suas tarefas.",
    characteristics: [
      "Este alinhamento é fundamental para que os processos sejam orientadores do trabalho a ser feito, independente de quem o faça. Digo isso porque em empresas sem processos é comum que ao sair de uma função, apenas aquele colaborador que fazia aquela atividade, saiba o que fazer. Isso atravanca demais os processos e prejudica a produtividade de modo geral.",
      "Outro ponto - chave é o foco no desenvolvimento da maturidade da cultura organizacional, uma vez que ela é onipresente, ou seja, é o que as pessoas fazem quando você não está vendo. Portanto, se este conjunto de hábitos, valores, preceitos e crenças estão bem alinhados e incorporados às ações da sua equipe, os processos tendem a ser respeitados e seguidos felmente por todos estando você presente ou não na empresa."
    ],
    skills: [
      "Orientação para processos",
      "Reuniões efetivas",
      "Diretrizes claras",
      "Comunicação interna",
      "Desenvolvimento da cultura organizacional",
      "Indicadores de desempenho"
    ]
  },
  {
    id: 4,
    title: "Fase 4 – Excelência / Processos, Pessoas e Resultados em excelência",
    description: "Este é o momento onde todo empreendedor sonha em chegar, pois é quando todas as etapas anteriores estão funcionando perfeitamente e surtindo os resultados desejados. Para isso é essencial que haja o alinhamento entre Pessoas e Processos, conforme preconiza o modelo PPR, ou seja, processos claros e profissionais competentes e preparados para fazê-los, bem como para atender as demandas da empresa e ajudá-la a crescer cada vez mais.",
    characteristics: [
      "A empresa que está nessa fase precisa trabalhar a formação & desenvolvimento dos líderes e gestores para que o negócio possa se multiplicar cada vez mais. Os líderes são protagonistas dos resultados dentro de uma empresa e precisam ser muito bem preparados.",
      "Outro aspecto importante é a descentralização da tomada de decisão através de políticas, indicadores e alçadas, nessa fase os líderes (e não só o empresário) tomam muitas decisões e fazem o negócio crescer.",
      "Tudo deve ser amparado por um bom processo de planejamento estratégico, nesse processo se define as prioridades da organização, as diretrizes estratégicas são revisitadas e validadas, as alçadas são estabelecidas e principalmente as metas e os responsáveis por cada resultado são apontados."
    ],
    skills: [
      "Estratégia de negócios",
      "Formação de líderes",
      "Governança (políticas, alçadas e regras)",
      "Retenção dos talentos",
      "Planejamento estratégico",
      "Foco em melhoria contínua"
    ]
  }
];

const TesteFase: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState<boolean>(false);
  const [results, setResults] = useState<Record<number, number>>({1: 0, 2: 0, 3: 0, 4: 0});
  const [resultPhase, setResultPhase] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
    const email = localStorage.getItem("userEmail");
    
    if (!isAuthenticated) {
      toast({
        variant: "destructive",
        title: "Acesso negado",
        description: "Você precisa fazer login para acessar esta página",
      });
      navigate("/login");
      return;
    }
    
    setUserEmail(email);
    
    // Try to load saved answers from localStorage
    const savedData = localStorage.getItem(`testeFase_${email}`);
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setUserAnswers(parsedData.userAnswers || {});
      setResults(parsedData.results || {1: 0, 2: 0, 3: 0, 4: 0});
      setResultPhase(parsedData.resultPhase || null);
      setShowResults(true);
    }
    
    setIsLoading(false);
  }, [navigate, toast]);
  
  const handleAnswerChange = (questionId: number, value: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const handleSubmit = () => {
    // Check if all questions are answered
    if (Object.keys(userAnswers).length < questions.length) {
      toast({
        variant: "destructive",
        title: "Formulário incompleto",
        description: "Por favor, responda todas as perguntas antes de enviar.",
      });
      return;
    }
    
    // Calculate results
    const newResults = {1: 0, 2: 0, 3: 0, 4: 0};
    
    questions.forEach(question => {
      const selectedOption = question.options.find(option => option.key === userAnswers[question.id]);
      if (selectedOption) {
        newResults[selectedOption.phase as keyof typeof newResults] += 1;
      }
    });
    
    // Determine the dominant phase
    let highestScore = 0;
    let dominantPhase = 0;
    
    Object.entries(newResults).forEach(([phase, score]) => {
      if (score > highestScore) {
        highestScore = score;
        dominantPhase = parseInt(phase);
      }
    });
    
    setResults(newResults);
    setResultPhase(dominantPhase);
    setShowResults(true);
    
    // Save to localStorage
    const email = localStorage.getItem("userEmail");
    if (email) {
      localStorage.setItem(`testeFase_${email}`, JSON.stringify({
        userAnswers,
        results: newResults,
        resultPhase: dominantPhase
      }));
    }
    
    toast({
      title: "Teste concluído",
      description: "Os resultados do seu teste estão prontos!",
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso",
    });
    
    navigate("/login");
  };

  const resetTest = () => {
    setUserAnswers({});
    setResults({1: 0, 2: 0, 3: 0, 4: 0});
    setResultPhase(null);
    setShowResults(false);
    
    // Remove saved data from localStorage
    const email = localStorage.getItem("userEmail");
    if (email) {
      localStorage.removeItem(`testeFase_${email}`);
    }
    
    toast({
      title: "Teste reiniciado",
      description: "Você pode realizar o teste novamente.",
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-gray-800">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <MemberHeader userEmail={userEmail} onLogout={handleLogout} />
      
      <DiagnosticHeader 
        title="Teste Fase da Empresa"
        description="Descubra em qual fase de desenvolvimento sua empresa se encontra"
        logo="/lovable-uploads/c44e18a4-1484-475d-b95f-81ccfa62f3cc.png"
      />
      
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <div className="mb-8">
          <BackToMemberAreaButton />
        </div>
        
        {showResults ? (
          <div className="space-y-8">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader className="bg-dark-primary text-white">
                <CardTitle className="text-2xl">Resultado do Teste</CardTitle>
                <CardDescription className="text-gray-100">
                  Com base nas suas respostas, sua empresa está na:
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                {resultPhase && (
                  <>
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-dark-primary mb-4">{phases[resultPhase - 1].title}</h2>
                      <p className="text-gray-700 text-lg">{phases[resultPhase - 1].description}</p>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div className="col-span-2 lg:col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Características desta fase:</h3>
                        <ul className="list-disc pl-6 space-y-3">
                          {phases[resultPhase - 1].characteristics.map((characteristic, index) => (
                            <li key={index} className="text-gray-700">{characteristic}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="col-span-2 lg:col-span-1">
                        <h3 className="text-xl font-bold text-gray-800 mb-4">Habilidades necessárias:</h3>
                        <ul className="list-disc pl-6 space-y-3">
                          {phases[resultPhase - 1].skills.map((skill, index) => (
                            <li key={index} className="text-gray-700">{skill}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">Distribuição de pontos por fase:</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(results).map(([phase, score]) => (
                          <div key={phase} className="bg-gray-50 p-4 rounded-lg border border-gray-200 text-center">
                            <p className="text-sm text-gray-600 mb-1">Fase {phase}</p>
                            <div className="text-3xl font-bold text-dark-primary">{score}</div>
                            <p className="text-xs text-gray-500 mt-1">pontos</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
              <CardFooter className="flex flex-wrap gap-4 justify-center pb-6">
                <Button 
                  onClick={resetTest}
                  variant="outline"
                  className="border-dark-primary/30 text-dark-primary hover:bg-dark-primary/10"
                >
                  Refazer o teste
                </Button>
                
                <Button 
                  onClick={() => navigate('/membros')}
                  className="bg-dark-primary hover:bg-dark-primary/90 text-white"
                >
                  Voltar para área de membros
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <div className="space-y-8">
            <Card className="bg-white border-gray-200 shadow-lg">
              <CardHeader className="bg-gray-50 border-b border-gray-200">
                <CardTitle className="text-xl text-gray-800">Questionário - Fase da Empresa</CardTitle>
                <CardDescription className="text-gray-600">
                  Responda as 12 questões abaixo para identificar em qual fase sua empresa se encontra
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="text-gray-700 mb-6">
                  <p>Para cada questão, escolha <strong>apenas uma opção</strong> que melhor reflete a realidade atual da sua empresa.</p>
                </div>
                
                <div className="space-y-8">
                  {questions.map((question) => (
                    <div key={question.id} className="p-4 bg-gray-50 rounded-lg">
                      <h3 className="text-lg font-medium text-gray-800 mb-4">{question.text}</h3>
                      <RadioGroup
                        value={userAnswers[question.id] || ""}
                        onValueChange={(value) => handleAnswerChange(question.id, value)}
                      >
                        <div className="space-y-3">
                          {question.options.map((option) => (
                            <div 
                              key={option.key} 
                              className="flex items-start space-x-2 p-3 rounded-md bg-white border border-gray-200 hover:border-dark-primary/30"
                            >
                              <RadioGroupItem value={option.key} id={`q${question.id}-${option.key}`} />
                              <Label 
                                htmlFor={`q${question.id}-${option.key}`}
                                className="text-gray-700 flex-1 cursor-pointer"
                              >
                                {option.text}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </RadioGroup>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center pb-6">
                <Button 
                  onClick={handleSubmit}
                  className="bg-dark-primary hover:bg-dark-primary/90 text-white px-8"
                >
                  Enviar respostas
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default TesteFase;
