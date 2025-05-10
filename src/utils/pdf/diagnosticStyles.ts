
/**
 * PDF styling utility for diagnostic reports
 * Contains all styles needed for diagnostic PDF export
 */

export const getDiagnosticPdfStyles = (): string => {
  return `
    /* Base styles for PDF export */
    .pdf-export {
      font-family: 'Arial', sans-serif !important;
      color: #000000 !important;
      margin: 0 !important;
      padding: 0 !important;
      width: 100% !important;
    }
    
    /* Text colors */
    .pdf-export * {
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
      height: 300px !important;
      overflow: visible !important;
      margin: 0 auto !important;
    }
    
    /* Card styling */
    .pdf-export .bg-\\[\\#1d365c\\] {
      background-color: #1d365c !important;
      color: white !important;
    }
    .pdf-export .bg-\\[\\#1d365c\\] * {
      color: white !important;
    }
    
    /* Hide elements not needed in PDF */
    .pdf-export .print\\:hidden {
      display: none !important;
    }
    
    /* Grid layout for PDF */
    .pdf-export .grid {
      display: grid !important;
      grid-template-columns: repeat(2, 1fr) !important;
      gap: 16px !important;
    }
    
    @media print {
      .print\\:hidden {
        display: none !important;
      }
    }
  `;
};

export const getDiagnosticPdfOptions = () => {
  return {
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
};
