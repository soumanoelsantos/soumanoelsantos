
/**
 * Diagnostic-specific PDF styling
 * Contains styles for diagnostic reports in PDF exports
 */

export const getDiagnosticPdfStyles = (): string => {
  return `
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
    
    /* Action plan section */
    .pdf-export .space-y-6 > div {
      margin-bottom: 10px !important;
    }
    .pdf-export .space-y-6 h3 {
      font-size: 14px !important;
      margin-bottom: 5px !important;
    }
  `;
};
