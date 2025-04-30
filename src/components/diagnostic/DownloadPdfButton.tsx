
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generatePDF } from '@/utils/pdfGenerator';

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
    <div className="flex justify-center mt-4 print:hidden">
      <Button 
        onClick={downloadPDF} 
        className="bg-green-600 hover:bg-green-700 text-white"
        size="lg"
      >
        <Download className="mr-2" size={18} />
        Baixar Diagnóstico em PDF
      </Button>
    </div>
  );
};

export default DownloadPdfButton;
