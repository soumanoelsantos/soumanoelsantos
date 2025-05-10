
import React, { useRef } from "react";
import DiagnosticResultsChart from "../DiagnosticResultsChart";
import ResultsCard from "./ResultsCard";
import AnswersDisplay from "./AnswersDisplay";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { useToast } from '@/hooks/use-toast';
import { generatePDF } from '@/utils/pdfGenerator';
import DownloadPdfButton from "./DownloadPdfButton";
import { useNavigate } from "react-router-dom";
import LeadCaptureForm from "../LeadCaptureForm";

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
  const navigate = useNavigate();
  const pdfRef = useRef<HTMLDivElement>(null);

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
    if (!pdfRef.current) {
      toast({
        variant: "destructive",
        title: "Erro ao gerar PDF",
        description: "Não foi possível gerar o PDF do diagnóstico.",
      });
      return;
    }
    
    toast({
      title: "Download iniciado!",
      description: "O PDF do seu diagnóstico está sendo gerado.",
    });
    
    // Use the PDF generator utility to create and download the PDF
    generatePDF(pdfRef.current, 'diagnostico-negocio.pdf');
  };

  const handleRestart = () => {
    // Show a toast message to provide feedback
    toast({
      title: "Reiniciando diagnóstico",
      description: "O diagnóstico está sendo reiniciado...",
    });
    
    // Call the onRestart function provided by the parent
    onRestart();

    // Navigate to the diagnostic test page
    navigate("/teste");
  };

  return (
    <div className="pdf-export space-y-8" ref={pdfRef}>
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

      <div className="flex justify-between items-center flex-wrap gap-4 pt-6 print:hidden">
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
      
      {/* CTA Section for Lead Capture */}
      <div className="mt-10 pt-6 border-t border-gray-200 print:hidden">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Transforme sua empresa em <span className="text-[#D4AF37]">máquina de vendas</span>
              </h2>
              <p className="text-gray-700 mb-4">
                Exclusivo para empresas com faturamento acima de R$ 50 mil por mês
              </p>
              <p className="text-gray-700 font-medium">
                Em 30 minutos farei um <span className="font-bold">PLANO DE AÇÃO GRATUITO</span> para sua empresa <span className="font-bold">DOBRAR</span> o faturamento em 90 dias!
              </p>
            </div>
            <div className="flex flex-col items-center">
              <LeadCaptureForm 
                source="diagnostico_resultados" 
                buttonText="Agendar diagnóstico gratuito"
                buttonClassName="w-full bg-[#D4AF37] hover:bg-[#c69e22] text-black font-medium py-3"
              />
              <p className="text-sm text-gray-500 mt-2 text-center">
                Clique acima e agende agora – As vagas são limitadas!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiagnosticResults;
