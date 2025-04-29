
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import html2pdf from 'html2pdf.js';

interface DownloadPdfButtonProps {
  pdfRef: React.RefObject<HTMLDivElement>;
}

const DownloadPdfButton = ({ pdfRef }: DownloadPdfButtonProps) => {
  const { toast } = useToast();

  const downloadPDF = () => {
    if (!pdfRef.current) return;

    // Add a class to the content temporarily for PDF styling
    const element = pdfRef.current;
    element.classList.add('pdf-export');

    // Create a style element for PDF export styles
    const styleElement = document.createElement('style');
    styleElement.innerHTML = `
      .pdf-export {
        color: #000000 !important;
      }
      .pdf-export * {
        color: #000000 !important;
      }
    `;
    document.head.appendChild(styleElement);

    const opt = {
      margin: 10,
      filename: 'diagnostico-negocio.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    };

    // Generate the PDF
    html2pdf().set(opt).from(element).save().then(() => {
      // Remove the temporary class and styles after PDF generation
      element.classList.remove('pdf-export');
      document.head.removeChild(styleElement);
    });

    toast({
      title: "Download iniciado!",
      description: "O PDF do seu diagnóstico está sendo gerado.",
    });
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
