
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
      /* Base styles for PDF export */
      .pdf-export {
        color: #000000 !important;
        margin: 0 !important;
        padding: 0 !important;
        width: 100% !important;
      }
      
      /* Text colors */
      .pdf-export * {
        color: #000000 !important;
      }
      .pdf-export p, 
      .pdf-export li, 
      .pdf-export span, 
      .pdf-export div:not(.card-header):not(.bg-[#1d365c]) {
        color: #000000 !important;
      }
      
      /* Card headers */
      .pdf-export .bg-[#1d365c], 
      .pdf-export [class*="bg-[#1d365c]"] {
        background-color: #1d365c !important;
      }
      .pdf-export .bg-[#1d365c] *,
      .pdf-export [class*="bg-[#1d365c]"] * {
        color: #FFFFFF !important;
      }
      .pdf-export .card-header {
        background-color: #1d365c !important;
      }
      .pdf-export .card-header * {
        color: #FFFFFF !important;
      }
      
      /* Specifically target the "Resultados do Diagnóstico" title */
      .pdf-export .card-header .text-center.text-white,
      .pdf-export .card-header .text-xl.text-center.text-white {
        color: #FFFFFF !important;
      }
      
      /* Headers */
      .pdf-export .pdf-header {
        color: #000000 !important;
      }
      
      /* Chart styling */
      .pdf-export .recharts-layer {
        color: inherit !important;
      }
      .pdf-export .recharts-surface {
        overflow: visible !important;
      }
      .pdf-export .recharts-wrapper {
        width: 100% !important;
        height: 300px !important; /* Reduced from 400px */
        overflow: visible !important;
        margin: 0 auto !important;
        transform: scale(0.9) !important; /* Slightly reduce chart size */
      }
      .pdf-export .recharts-legend-wrapper {
        bottom: -10px !important; /* Moved up from -20px */
      }
      
      /* Tables and content layout */
      .pdf-export .chart-container {
        transform: scale(0.9) !important;
        transform-origin: center !important;
      }
      .pdf-export .grid {
        display: grid !important;
        grid-template-columns: 1fr 1fr !important;
        gap: 10px !important;
      }
      
      /* Answer section styles */
      .pdf-export .answers-section ul li {
        color: #000000 !important;
        font-size: 11px !important;
        margin-bottom: 3px !important;
      }
      .pdf-export .answers-section .question-text {
        font-weight: 600 !important;
        color: #000000 !important;
      }
      .pdf-export .answers-section h3 {
        font-size: 14px !important;
        margin-bottom: 5px !important;
      }
      .pdf-export .answers-section h2 {
        font-size: 16px !important;
        margin-bottom: 10px !important;
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
      
      /* Table styling */
      .pdf-export table {
        width: 100% !important;
        font-size: 12px !important;
      }
      .pdf-export table th {
        color: #000000 !important;
        font-weight: bold !important;
        padding: 5px !important;
      }
      .pdf-export table td {
        color: #000000 !important;
        padding: 5px !important;
      }
      
      /* List styling */
      .pdf-export ul {
        padding-left: 15px !important;
      }
      .pdf-export ul li {
        color: #000000 !important;
        font-size: 12px !important;
        margin-bottom: 3px !important;
      }
      
      /* Action plan section */
      .pdf-export .space-y-6 > div {
        margin-bottom: 10px !important;
      }
      .pdf-export .space-y-6 h3 {
        font-size: 14px !important;
        margin-bottom: 5px !important;
      }
      
      /* Marketing section */
      .pdf-export .pdf-marketing-section {
        margin-top: 15px !important;
        padding: 15px !important;
      }
      .pdf-export .pdf-marketing-section h2 {
        font-size: 18px !important;
        line-height: 1.3 !important;
        color: #000000 !important;
        margin-bottom: 10px !important;
      }
      .pdf-export .pdf-marketing-section h2 span {
        color: #D4AF37 !important;
      }
      .pdf-export .pdf-marketing-section p {
        font-size: 12px !important;
        line-height: 1.4 !important;
        color: #000000 !important;
        margin-bottom: 10px !important;
      }
      .pdf-export .pdf-marketing-section strong {
        font-weight: bold !important;
        color: #000000 !important;
      }
      .pdf-export .pdf-cta-button button {
        background-color: #D4AF37 !important;
        color: #000000 !important;
        font-weight: 600 !important;
        padding: 8px 16px !important;
        border-radius: 9999px !important;
        margin: 8px auto !important;
        display: block !important;
      }
      .pdf-export .pdf-cta-button svg {
        color: #000000 !important;
      }
      
      /* General spacing adjustments */
      .pdf-export .space-y-8 > * {
        margin-top: 10px !important;
        margin-bottom: 10px !important;
      }
      .pdf-export .card {
        margin-bottom: 15px !important;
      }
      .pdf-export .card-content {
        padding: 10px !important;
      }
      
      /* Hide elements not needed in PDF */
      .pdf-export .print\\:hidden {
        display: none !important;
      }
    `;
    document.head.appendChild(styleElement);

    const opt = {
      margin: [10, 10, 10, 10],
      filename: 'diagnostico-negocio.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { 
        scale: 2,
        logging: true, 
        useCORS: true,
        allowTaint: true
      },
      jsPDF: { 
        unit: 'mm', 
        format: 'a4', 
        orientation: 'portrait',
        compress: true
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
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
