
import React from 'react';
import ResultsCard from './ResultsCard';
import ActionPlanCard from './ActionPlanCard';
import DownloadPdfButton from './DownloadPdfButton';
import ResetDiagnosticButton from './ResetDiagnosticButton';
import BackToMemberAreaButton from './BackToMemberAreaButton';
import { AnswersDataType } from '@/types/diagnostic';
import { Button } from '@/components/ui/button';
import { Calendar } from 'lucide-react';

interface DiagnosticResultsProps {
  results: {
    processos: { score: number; total: number; percentage: number };
    resultados: { score: number; total: number; percentage: number };
    sistemaGestao: { score: number; total: number; percentage: number };
    pessoas: { score: number; total: number; percentage: number };
  };
  actionPlan: {
    [key: string]: string[];
  };
  answersData?: AnswersDataType;
  pdfRef: React.RefObject<HTMLDivElement>;
}

const DiagnosticResults = ({ results, actionPlan, answersData, pdfRef }: DiagnosticResultsProps) => {
  const handleReset = () => {
    // This will be handled by the ResetDiagnosticButton component
  };

  const handleScheduleClick = () => {
    const message = encodeURIComponent("Olá, Manoel! Gostaria de agendar meu diagnóstico gratuito com você!");
    window.location.href = `https://wa.me/31986994906?text=${message}`;
  };

  return (
    <div ref={pdfRef} className="mt-10 space-y-8 pdf-container">
      <div className="pdf-results-card">
        <ResultsCard results={results} />
      </div>
      
      <div className="pdf-action-plan">
        <ActionPlanCard actionPlan={actionPlan} answersData={answersData} />
      </div>
      
      {/* Marketing CTA Section - Updated to white background with appropriate text colors */}
      <div className="bg-white p-6 border rounded-lg shadow-sm text-center mt-12 pdf-marketing-section">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Transforme sua empresa em <br />
          uma <span className="text-[#D4AF37]">máquina de vendas</span>
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Em 45 minutos, farei um plano de ação <strong>GRATUITO</strong> de vendas, marketing e gestão para a sua empresa <strong>DOBRAR</strong> o faturamento em 90 dias.
        </p>
        
        <div className="pdf-cta-button mb-2">
          <Button 
            onClick={handleScheduleClick}
            className="bg-[#D4AF37] hover:bg-[#C4A030] text-black font-semibold rounded-full px-8 py-6 text-lg mx-auto gap-2 inline-flex items-center"
          >
            <Calendar className="h-5 w-5" />
            Agendar diagnóstico gratuito
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-2">
          Clique acima e agende agora – As vagas são limitadas!
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 print:hidden">
        <DownloadPdfButton pdfRef={pdfRef} />
        <BackToMemberAreaButton />
        <ResetDiagnosticButton onReset={handleReset} />
      </div>
    </div>
  );
};

export default DiagnosticResults;
