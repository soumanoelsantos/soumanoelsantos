
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

    // Add classes to the content temporarily for PDF styling
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
      .pdf-export .bg-[#1d365c], 
      .pdf-export [class*="bg-[#1d365c]"],
      .pdf-export [class*="bg-[#1d365c]"] * {
        color: #FFFFFF !important;
      }
      .pdf-export .pdf-header {
        color: #000000 !important;
      }
      .pdf-export .recharts-layer {
        color: inherit !important;
      }
      .pdf-export .recharts-surface {
        overflow: visible !important;
      }
      .pdf-export .recharts-wrapper {
        width: 100% !important;
        height: 400px !important;
        overflow: visible !important;
      }
      .pdf-export .recharts-legend-wrapper {
        bottom: -20px !important;
      }
      .pdf-export .answers-section ul li {
        color: #000000 !important;
      }
      .pdf-export .answers-section .answer-satisfactory {
        color: #22c55e !important;
      }
      .pdf-export .answers-section .answer-unsatisfactory {
        color: #eab308 !important;
      }
      .pdf-export .answers-section .answer-nonexistent {
        color: #ef4444 !important;
      }
      .pdf-export .answers-section .question-text {
        font-weight: 600 !important;
      }
    `;
    document.head.appendChild(styleElement);

    const opt = {
      margin: 10,
      filename: 'diagnostico-negocio.pdf',
      image: { type: 'jpeg', quality: 1.0 },
      html2canvas: { 
        scale: 2,
        logging: true, 
        useCORS: true,
        allowTaint: true
      },
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
