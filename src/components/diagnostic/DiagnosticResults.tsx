
import React, { useRef } from "react";
import DiagnosticResultsChart from "../DiagnosticResultsChart";
import ResultsCard from "./ResultsCard";
import AnswersDisplay from "./AnswersDisplay";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from "react-router-dom";

interface DiagnosticResultsProps {
  results: any;
  answersData: any;
  onRestart: () => void;
}

const DiagnosticResults = ({
  results,
  answersData,
  onRestart,
}: DiagnosticResultsProps) => {
  const { toast } = useToast();
  const pdfRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Safety check for results
  if (!results) {
    return (
      <div className="p-8 text-center">
        <p className="text-lg text-gray-600">Não foram encontrados resultados do diagnóstico.</p>
        <Button 
          variant="outline" 
          onClick={onRestart}
          className="mt-4 flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Iniciar Novo Diagnóstico
        </Button>
      </div>
    );
  }

  const totalScore = results.totalScore || 0;
  const maxPossibleScore = results.maxPossibleScore || 100;
  const percentage = Math.round((totalScore / maxPossibleScore) * 100) || 0;

  const handleDownloadPDF = () => {
    toast({
      title: "Download iniciado!",
      description: "O PDF do seu diagnóstico está sendo gerado.",
    });
    // Here you would add actual PDF generation logic
  };

  const handleRestart = () => {
    // Show a toast message to provide feedback
    toast({
      title: "Reiniciando diagnóstico",
      description: "O diagnóstico está sendo reiniciado...",
    });
    
    // Call the onRestart function provided by the parent
    onRestart();
    
    // Additional feedback after successful restart
    toast({
      title: "Diagnóstico reiniciado",
      description: "Você pode realizar um novo diagnóstico agora."
    });
  };

  return (
    <div className="space-y-8" ref={pdfRef}>
      <div>
        <h2 className="text-xl font-semibold mb-4 text-center">
          Pontuação Geral: {percentage}%
        </h2>
        {results && <DiagnosticResultsChart results={results} />}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResultsCard
          title="Processos"
          score={results?.processos?.percentage || 0}
          observations={[
            "Avalia o nível de maturidade dos processos",
            "Verifica documentação e padronização",
            "Analisa eficiência operacional"
          ]}
        />
        <ResultsCard
          title="Resultados"
          score={results?.resultados?.percentage || 0}
          observations={[
            "Avalia métricas financeiras e de desempenho",
            "Verifica o acompanhamento de indicadores",
            "Analisa a consistência dos resultados"
          ]}
        />
        <ResultsCard
          title="Sistema de Gestão"
          score={results?.sistemaGestao?.percentage || 0}
          observations={[
            "Avalia a estrutura organizacional",
            "Verifica ferramentas de gestão",
            "Analisa processos decisórios"
          ]}
        />
        <ResultsCard
          title="Pessoas"
          score={results?.pessoas?.percentage || 0}
          observations={[
            "Avalia cultura organizacional",
            "Verifica processos de RH",
            "Analisa desenvolvimento de equipes"
          ]}
        />
      </div>

      {answersData && Object.keys(answersData).length > 0 && (
        <AnswersDisplay answersData={answersData} />
      )}

      <div className="flex justify-between items-center flex-wrap gap-4 pt-6">
        <Button 
          variant="outline" 
          onClick={handleRestart}
          className="flex items-center gap-2"
        >
          <RefreshCw className="h-4 w-4" />
          Reiniciar Diagnóstico
        </Button>
        
        <Button 
          onClick={handleDownloadPDF}
          className="bg-[#1d365c] text-white flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Baixar Diagnóstico em PDF
        </Button>
      </div>
    </div>
  );
};

export default DiagnosticResults;
