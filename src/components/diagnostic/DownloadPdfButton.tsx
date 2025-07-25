
import React from 'react';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generatePDF } from '@/utils/pdfGenerator';
import ActionButton from '../ui/action-button';

interface DownloadPdfButtonProps {
  pdfRef: React.RefObject<HTMLDivElement>;
}

const DownloadPdfButton = ({ pdfRef }: DownloadPdfButtonProps) => {
  const { toast } = useToast();

  const downloadPDF = () => {
    if (!pdfRef.current) return;

    // Show toast notification
    toast({
      title: "Download iniciado!",
      description: "O PDF do seu diagnóstico está sendo gerado.",
    });

    // Generate the PDF using our utility function
    generatePDF(pdfRef.current);
  };

  return (
    <ActionButton 
      onClick={downloadPDF}
      variant="primary"
      icon={Download}
    >
      Baixar Diagnóstico em PDF
    </ActionButton>
  );
};

export default DownloadPdfButton;
