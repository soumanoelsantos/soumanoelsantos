
/**
 * Diagnostic-specific PDF styling
 * Contains styles for diagnostic reports in PDF exports
 */

export const getDiagnosticPdfStyles = (): string => {
  return `
    /* Print styles */
    @media print, .pdf-export {
      .print\\:hidden { display: none !important; }
      .print\\:bg-white { background-color: white !important; }
      .print\\:text-black { color: black !important; }
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
    
    /* Action plan section styles */
    .pdf-export .action-plan-section h3 {
      font-size: 14px !important;
      margin-bottom: 5px !important;
      color: #000000 !important;
    }
    .pdf-export .action-plan-section h4 {
      font-size: 12px !important;
      margin-bottom: 3px !important;
      color: #000000 !important;
    }
    .pdf-export .action-plan-section h5 {
      font-size: 11px !important;
      margin-bottom: 2px !important;
      color: #000000 !important;
    }
    .pdf-export .action-plan-section .space-y-6 > div {
      margin-bottom: 10px !important;
    }
    .pdf-export .action-plan-section ul li {
      color: #000000 !important;
      font-size: 10px !important;
      margin-bottom: 2px !important;
    }
    .pdf-export .action-plan-section .badge {
      font-size: 9px !important;
      padding: 2px 4px !important;
    }
    .pdf-export .action-plan-section .text-sm {
      font-size: 10px !important;
    }
    .pdf-export .action-plan-section .text-xs {
      font-size: 8px !important;
    }
    
    /* Card styles for PDF */
    .pdf-export .bg-gradient-to-r {
      background: white !important;
      color: black !important;
    }
    
    /* Progress bar styles */
    .pdf-export .bg-gray-200 {
      background-color: #e5e7eb !important;
    }
    .pdf-export .bg-gradient-to-r.from-blue-500.to-purple-600 {
      background-color: #3b82f6 !important;
    }
    
    /* Action item styles */
    .pdf-export .border-l-4 {
      border-left-width: 4px !important;
    }
    .pdf-export .border-l-green-500 {
      border-left-color: #10b981 !important;
    }
    .pdf-export .border-l-blue-500 {
      border-left-color: #3b82f6 !important;
    }
    .pdf-export .bg-green-50 {
      background-color: #f0fdf4 !important;
    }
    .pdf-export .bg-blue-50 {
      background-color: #eff6ff !important;
    }
    
    /* Hide interactive elements in PDF */
    .pdf-export button,
    .pdf-export .print\\:hidden,
    .pdf-export input[type="checkbox"] {
      display: none !important;
    }
    
    /* Ensure proper spacing in PDF */
    .pdf-export .space-y-4 > * + * {
      margin-top: 1rem !important;
    }
    .pdf-export .space-y-6 > * + * {
      margin-top: 1.5rem !important;
    }
  `;
};
