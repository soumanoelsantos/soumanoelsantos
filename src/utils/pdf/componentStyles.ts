
/**
 * Component-specific PDF styling
 * Contains styles for specific components in PDF exports
 */

export const getComponentPdfStyles = (): string => {
  return `
    /* Card headers - explicitly ensure white text in headers */
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
    .pdf-export .card-header .text-xl.text-center.text-white,
    .pdf-export .card-header .text-xl,
    .pdf-export .card-header CardTitle {
      color: #FFFFFF !important;
    }
    
    /* Card styling */
    .pdf-export .card {
      margin-bottom: 15px !important;
    }
    .pdf-export .card-content {
      padding: 10px !important;
    }
  `;
};
