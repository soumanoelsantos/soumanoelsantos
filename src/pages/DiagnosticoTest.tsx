
import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import DiagnosticHeader from "@/components/DiagnosticHeader";
import WhatsAppModal from "@/components/WhatsAppModal";
import DiagnosticSections from "@/components/diagnostic/DiagnosticSections";
import DiagnosticResults from "@/components/diagnostic/DiagnosticResults";
import { generateActionPlan } from "@/utils/generateActionPlan";
import { DiagnosticResults as DiagnosticResultsType, AnswersDataType, DiagnosticSections as DiagnosticSectionsType } from "@/types/diagnostic";

const DiagnosticoTest = () => {
  const { toast } = useToast();
  const [results, setResults] = useState<DiagnosticResultsType>({
    processos: { score: 0, total: 100, percentage: 0 },
    resultados: { score: 0, total: 100, percentage: 0 },
    sistemaGestao: { score: 0, total: 100, percentage: 0 },
    pessoas: { score: 0, total: 100, percentage: 0 },
  });
  const [showResults, setShowResults] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [answersData, setAnswersData] = useState<AnswersDataType>({
    processos: { title: "", answers: [] },
    resultados: { title: "", answers: [] },
    sistemaGestao: { title: "", answers: [] },
    pessoas: { title: "", answers: [] }
  });
  const pdfRef = useRef<HTMLDivElement>(null);

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
    setShowModal(true);
  };

  const handleSendResults = (whatsappNumber: string) => {
    setShowModal(false);
    setShowResults(true);
    toast({
      title: "Diagnóstico enviado!",
      description: `Os resultados foram enviados para o WhatsApp ${whatsappNumber}.`,
    });
  };

  const actionPlan = generateActionPlan(results);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0A0A] to-[#151515] text-white">
      <div className="container mx-auto px-4 py-10">
        <DiagnosticHeader />
        
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
            Finalizar Diagnóstico
          </Button>
        </div>

        {showResults && (
          <DiagnosticResults 
            results={results} 
            actionPlan={actionPlan}
            pdfRef={pdfRef}
          />
        )}
        
        <WhatsAppModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
          onSubmit={handleSendResults} 
        />
      </div>
    </div>
  );
};

export default DiagnosticoTest;
