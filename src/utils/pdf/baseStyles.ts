
/**
 * Base PDF styling utility
 * Contains foundation styles for PDF exports
 */

export const getBasePdfStyles = (): string => {
  return `
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
    
    /* Headers */
    .pdf-export .pdf-header {
      color: #000000 !important;
    }
    
    /* General spacing adjustments */
    .pdf-export .space-y-8 > * {
      margin-top: 10px !important;
      margin-bottom: 10px !important;
    }
    
    /* Hide elements not needed in PDF */
    .pdf-export .print\\:hidden {
      display: none !important;
    }
  `;
};
