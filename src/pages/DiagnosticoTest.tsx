import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/useAuth";
import DiagnosticHeader from "@/components/DiagnosticHeader";
import DiagnosticSections from "@/components/diagnostic/DiagnosticSections";
import DiagnosticResults from "@/components/diagnostic/DiagnosticResults";
import { generateActionPlan } from "@/utils/generateActionPlan";
import { DiagnosticResults as DiagnosticResultsType, AnswersDataType, DiagnosticSections as DiagnosticSectionsType } from "@/types/diagnostic";

const DiagnosticoTest = () => {
  const { toast } = useToast();
  const { userEmail } = useAuth();
  const [results, setResults] = useState<DiagnosticResultsType>({
    processos: { score: 0, total: 100, percentage: 0 },
    resultados: { score: 0, total: 100, percentage: 0 },
    sistemaGestao: { score: 0, total: 100, percentage: 0 },
    pessoas: { score: 0, total: 100, percentage: 0 },
  });
  const [showResults, setShowResults] = useState(false);
  const [answersData, setAnswersData] = useState<AnswersDataType>({
    processos: { title: "", answers: [] },
    resultados: { title: "", answers: [] },
    sistemaGestao: { title: "", answers: [] },
    pessoas: { title: "", answers: [] }
  });
  const pdfRef = useRef<HTMLDivElement>(null);

  // Load saved diagnostic results when the component mounts
  useEffect(() => {
    if (userEmail) {
      const savedResultsKey = `diagnostic_results_${userEmail}`;
      const savedAnswersKey = `diagnostic_answers_${userEmail}`;
      
      const savedResults = localStorage.getItem(savedResultsKey);
      const savedAnswers = localStorage.getItem(savedAnswersKey);
      
      if (savedResults) {
        setResults(JSON.parse(savedResults));
        setShowResults(true);
      }
      
      if (savedAnswers) {
        setAnswersData(JSON.parse(savedAnswers));
      }
    }
  }, [userEmail]);

  const sections: DiagnosticSectionsType = {
    processos: {
      title: "PROCESSOS",
      questions: [
        "Os principais processos do negócio estão documentados.",
        "Quando aparecem problemas, não somente apagamos incêndios, as causas são investigadas.",
        "Os colaboradores tem clareza da missão, visão, valores, políticas, ações e objetivos.",
        "Existem indicadores mapeados e monitorados.",
        "Acontecem reuniões de alinhamento das tarefas com as equipes (gerenciamento da rotina).",
        "Os colaboradores sabem exatamente o que fazer, pois existe um manual (ou documento) de cultura/orientações.",
        "São realizados planos de ação para alcançar as metas/objetivos.",
        "Existe uma dose adequada de planejamento antes da execução.",
        "Temos uma mentalidade de melhoria contínua, utilizando a ferramenta PDCA",
        "Temos um organograma documentado e compartilhado com todos."
      ],
      pointValue: 10,
    },
    resultados: {
      title: "RESULTADOS",
      questions: [
        "A margem de lucro do negócio é mensurada e está em nível satisfatório.",
        "A satisfação do cliente é mensurada e está em nível satisfatório.",
        "A satisfação do colaborador é mensurada e está em nível satisfatório.",
        "Existe remuneração atrelada ao desempenho (ao menos para as pessoas chave) na organização?",
        "A taxa de crescimento da empresa geralmente é maior que a esperada/planejada."
      ],
      pointValue: 20,
    },
    sistemaGestao: {
      title: "SISTEMA DE GESTÃO",
      questions: [
        "É feito planejamento anualmente para curto, médio e longo prazo (01 a 03 ou 01 a 05 anos).",
        "Os sistemas da informação (softwares) são adequados para o nível de maturidade/momento da empresa.",
        "As metas são bem estabelecidas sempre contemplando: indicador, prazo e valor.",
        "Existe por parte dos Donos/Líderes alocamento de tempo adequado para a parte estratégica da empresa.",
        "Os indicadores são acompanhados e comunicados para a equipe."
      ],
      pointValue: 20,
    },
    pessoas: {
      title: "PESSOAS",
      questions: [
        "Existem ações de comunicação interna/endomarketing para gerar engajamento nas pessoas.",
        "O processo de recrutamento, seleção & integração é adequadamente conduzido.",
        "Os colaboradores recebem feedback periódico sobre seu desempenho.",
        "Talento e perfil dos colaboradores são mapeados com alguma ferramenta de Assessment (DISC, MBTI ou outros).",
        "É feito um planejamento e descrição de cada cargo?",
        "A Liderança (incluindo os donos) tem uma comunicação clara, flexível e adequada.",
        "A Liderança (incluindo os donos) realizam e oportunizam treinamentos técnicos e comportamentais.",
        "A Liderança (incluindo os donos) executam estratégias de engajamento da equipe.",
        "A Liderança (incluindo os donos) delegam de forma efetiva.",
        "O ambiente físico da empresa está adequado às necessidades das atividades e dos funcionários?"
      ],
      pointValue: 10,
    }
  };

  const handleSubmit = () => {
    // Save results to localStorage associated with the user
    if (userEmail) {
      const resultsKey = `diagnostic_results_${userEmail}`;
      const answersKey = `diagnostic_answers_${userEmail}`;
      
      localStorage.setItem(resultsKey, JSON.stringify(results));
      localStorage.setItem(answersKey, JSON.stringify(answersData));
      
      setShowResults(true);
      
      toast({
        title: "Diagnóstico salvo!",
        description: "Os resultados foram salvos e estão disponíveis na sua conta.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Erro ao salvar",
        description: "Você precisa estar logado para salvar seu diagnóstico.",
      });
    }
  };

  const actionPlan = generateActionPlan(results);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#151515] text-white">
      <div className="container mx-auto px-4 py-10">
        <DiagnosticHeader />
        
        {!showResults ? (
          <>
            <DiagnosticSections 
              sections={sections} 
              results={results} 
              setResults={setResults}
              setAnswersData={setAnswersData}
            />

            <div className="flex justify-center mt-8">
              <Button 
                onClick={handleSubmit} 
                size="lg" 
                className="bg-[#1d365c] hover:bg-[#1d365c]/90 text-white"
              >
                Finalizar e Ver Resultados
              </Button>
            </div>
          </>
        ) : (
          <DiagnosticResults 
            results={results} 
            actionPlan={actionPlan}
            pdfRef={pdfRef}
          />
        )}
      </div>
    </div>
  );
};

export default DiagnosticoTest;
