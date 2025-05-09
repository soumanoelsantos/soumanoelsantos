
import React from 'react';
import ResultsCard from './ResultsCard';
import ActionPlanCard from './ActionPlanCard';
import DownloadPdfButton from './DownloadPdfButton';
import ResetDiagnosticButton from './ResetDiagnosticButton';
import BackToMemberAreaButton from './BackToMemberAreaButton';
import { AnswersDataType } from '@/types/diagnostic';
import { Calendar } from 'lucide-react';
import ActionButton from '../ui/action-button';
import LeadCaptureForm from '../LeadCaptureForm';

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
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">aceleração empresarial</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">gestão</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">marketing</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">acompanhamento</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">vendas</span>
          <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">treinamento</span>
        </div>
        
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Transforme sua empresa em <br />
          uma <span className="text-[#D4AF37]">máquina de vendas</span>
        </h2>
        <p className="text-lg text-gray-700 mb-6">
          Em 30 minutos farei um <strong>PLANO DE AÇÃO GRATUITO</strong> para sua empresa <strong>DOBRAR</strong> o faturamento em 90 dias!
        </p>
        
        <div className="pdf-cta-button mb-2">
          <LeadCaptureForm 
            source="diagnostic_results"
            buttonClassName="px-8 py-6 text-lg mx-auto bg-dark-primary hover:bg-dark-primary/90 text-black font-medium flex items-center gap-2"
            buttonText={
              <>
                <Calendar className="h-4 w-4" />
                Agendar diagnóstico gratuito
              </>
            }
          />
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
