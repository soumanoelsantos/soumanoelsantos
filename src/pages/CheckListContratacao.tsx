import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import MemberHeader from "@/components/MemberHeader";
import { ArrowLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";

interface ChecklistItem {
  id: number;
  question: string;
  description: string;
  checked: boolean;
}

const CheckListContratacao = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { userEmail } = useAuth();
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([
    {
      id: 1,
      question: "Sua empresa está estruturada financeiramente para aumentar o custo fixo da folha de pagamento?",
      description: "Pontos a considerar: o custo de contratação de um funcionário no Brasil pode ultrapassar os 60% do salário em questão, a depender do regime tributário da empresa.",
      checked: false
    },
    {
      id: 2,
      question: "Esse novo funcionário contribuirá para o crescimento efetivo do seu negócio?",
      description: "Pontos a considerar: a contratação de um novo funcionário deve fazer parte do objetivo estratégico da empresa e não apenas \"apagar um incêndio\" (quando você não está dando conta do volume de trabalho, por exemplo).",
      checked: false
    },
    {
      id: 3,
      question: "Existe uma demanda real e de longo prazo que justifique essa contratação?",
      description: "Pontos a considerar: não dá para contratar alguém fixo e em tempo integral por causa de um aumento temporário da demanda dos clientes.",
      checked: false
    },
    {
      id: 4,
      question: "Você tem certeza de que essa necessidade empresarial está diretamente relacionada à contratação de um novo funcionário?",
      description: "Pontos a considerar: Pessoas + Processos = Resultados. Sua empresa precisa de mais um profissional ou os processos é que devem ser rearranjos (implantação de um novo software, reorganização da equipe etc.)?",
      checked: false
    },
    {
      id: 5,
      question: "Está claro para você quais são as habilidades e expertise que esse novo funcionário deve aportar na empresa?",
      description: "Pontos a considerar: antes de pensar em contratar, é preciso ter claro o perfil profissional que agregará valor para a empresa.",
      checked: false
    },
    {
      id: 6,
      question: "Você já considerou a hipótese de terceirizar essa demanda específica, buscando inteligência externa para resolver o problema?",
      description: "Pontos a considerar: contar com uma ajuda pontual externa, além de ser muito mais barato, reduz dramaticamente o risco de uma contratação malsucedida.",
      checked: false
    },
    {
      id: 7,
      question: "Essa nova contratação vai desenvolver um trabalho que você ou alguém da equipe não pode executar e/ou aprender?",
      description: "Pontos a considerar: é sempre tempo de desenvolver suas próprias habilidades e expertise, portanto vale sempre a pena considerar essa hipótese.",
      checked: false
    },
    {
      id: 8,
      question: "Você tem percebido problemas na qualidade da entrega e do atendimento de sua empresa que justifiquem a contratação?",
      description: "Pontos a considerar: esse é um bom termômetro e é sempre bom ouvir o que os stakeholders têm a dizer sobre a qualidade de entrega e atendimento.",
      checked: false
    },
    {
      id: 9,
      question: "A estrutura física atual de sua empresa (espaço, mesa, computador) está preparada para receber esse novo funcionário?",
      description: "Pontos a considerar: é sempre importante lembrar que a contratação de um funcionário não representa aumento de custos apenas por seu salário e encargos. É preciso oferecer estrutura física adequada para receber este profissional.",
      checked: false
    },
    {
      id: 10,
      question: "Você já considerou e refletiu, de maneira aprofundada, sobre o que aconteceria em sua empresa se você não fizesse essa contratação?",
      description: "Pontos a considerar: este é um bom exercício para entender se a não contratação seria realmente sentida pela empresa.",
      checked: false
    }
  ]);

  // Load saved results when component mounts
  useEffect(() => {
    if (userEmail) {
      const resultsKey = `checklist_results_${userEmail}`;
      const savedData = localStorage.getItem(resultsKey);
      
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData);
          setChecklistItems(parsedData.checklistItems);
          setScore(parsedData.score);
          setShowResults(true);
        } catch (error) {
          console.error("Error parsing saved checklist data:", error);
        }
      }
      
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [userEmail]);

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("userEmail");
    
    toast({
      title: "Logout realizado",
      description: "Você saiu da sua conta com sucesso",
    });
    
    navigate("/login");
  };
  
  const handleCheckChange = (id: number) => {
    setChecklistItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };
  
  const calculateScore = () => {
    const checkedCount = checklistItems.filter(item => item.checked).length;
    setScore(checkedCount);
    setShowResults(true);
    
    // Save results to localStorage
    if (userEmail) {
      const resultsKey = `checklist_results_${userEmail}`;
      const dataToSave = {
        checklistItems,
        score: checkedCount
      };
      
      localStorage.setItem(resultsKey, JSON.stringify(dataToSave));
    }
    
    toast({
      title: "Pontuação calculada",
      description: `Você marcou ${checkedCount} de 10 itens.`,
    });
  };
  
  const getResultMessage = () => {
    if (score >= 7) {
      return {
        title: "É HORA DE CONTRATAR",
        description: "Se você deu check em pelo menos sete perguntas, significa que sua empresa está mesmo na hora de contratar um novo funcionário.",
        bgColor: "bg-blue-900",
        textColor: "text-white"
      };
    } else if (score >= 4) {
      return {
        title: "TALVEZ AINDA DÊ PARA ESPERAR",
        description: "Há algumas evidências claras de que sua empresa precisa de um novo funcionário, mas talvez ainda não seja a hora de optar por esse caminho.",
        bgColor: "bg-blue-900",
        textColor: "text-white"
      };
    } else {
      return {
        title: "BUSQUE ALTERNATIVAS",
        description: "Não é necessário contratar alguém ainda. Sua empresa está em ascensão, mas ainda há alternativas melhores para suprir a demanda e é sempre bom poder contar com uma ajuda externa, não é mesmo?",
        bgColor: "bg-blue-900",
        textColor: "text-white"
      };
    }
  };
  
  const resetChecklist = () => {
    setChecklistItems(prevItems => 
      prevItems.map(item => ({ ...item, checked: false }))
    );
    setScore(0);
    setShowResults(false);
    
    // Remove saved results from localStorage
    if (userEmail) {
      const resultsKey = `checklist_results_${userEmail}`;
      localStorage.removeItem(resultsKey);
      
      toast({
        title: "Checklist reiniciado",
        description: "Suas respostas foram apagadas com sucesso.",
      });
    }
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
      
      <div className="container mx-auto px-4 py-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/membros')}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para área de membros
        </Button>
        
        <div className="max-w-4xl mx-auto">
          <Card className="border-dark-primary/20 mb-8">
            <CardHeader className="bg-[#1d365c] text-white">
              <CardTitle className="text-2xl text-center">CHECK LIST PARA CONTRATAÇÃO</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <p className="text-gray-700 mb-6">
                Responda às perguntas abaixo para descobrir se sua empresa realmente precisa contratar um novo funcionário.
              </p>
              
              {!showResults ? (
                <>
                  <div className="space-y-6">
                    {checklistItems.map((item) => (
                      <div key={item.id} className="border-b pb-4 border-gray-200">
                        <div className="flex items-start space-x-3">
                          <Checkbox 
                            id={`question-${item.id}`} 
                            checked={item.checked}
                            onCheckedChange={() => handleCheckChange(item.id)}
                            className="mt-1"
                          />
                          <div>
                            <label 
                              htmlFor={`question-${item.id}`} 
                              className="text-base font-medium text-gray-800 cursor-pointer"
                            >
                              {item.question}
                            </label>
                            <p className="mt-1 text-sm text-gray-600">{item.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button 
                      onClick={calculateScore} 
                      className="bg-[#D4AF37] hover:bg-[#C4A030] text-black font-semibold px-8 py-6 text-lg"
                    >
                      Calcular Resultado
                    </Button>
                  </div>
                </>
              ) : (
                <div className="space-y-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-gray-800">Sua pontuação:</h3>
                    <span className="text-3xl font-bold text-[#D4AF37]">{score} / 10</span>
                  </div>
                  
                  <div className={`${getResultMessage().bgColor} p-4 rounded-md text-center`}>
                    <h4 className={`text-xl font-bold ${getResultMessage().textColor}`}>{getResultMessage().title}</h4>
                    <p className={`mt-2 ${getResultMessage().textColor}`}>{getResultMessage().description}</p>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button 
                      onClick={resetChecklist} 
                      variant="outline"
                      className="border-dark-primary/20 text-gray-800 mr-4"
                    >
                      Reiniciar Check List
                    </Button>
                    
                    <Button 
                      onClick={() => navigate('/membros')} 
                      className="bg-[#1d365c] hover:bg-[#1d365c]/90 text-white"
                    >
                      Voltar para Área de Membros
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
          
          {!showResults && (
            <div className="text-center text-sm text-gray-500">
              Este check list é inspirado em metodologias modernas de recrutamento e gestão de pessoas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckListContratacao;
