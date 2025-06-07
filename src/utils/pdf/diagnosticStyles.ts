
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
      
      /* Ensure content is visible */
      * {
        -webkit-print-color-adjust: exact !important;
        color-adjust: exact !important;
      }
    }

    /* Base PDF styles */
    .pdf-export {
      background: white !important;
      color: black !important;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif !important;
      line-height: 1.4 !important;
      font-size: 12px !important;
    }

    .pdf-export * {
      background: transparent !important;
      box-shadow: none !important;
    }

    .pdf-export h1 {
      font-size: 24px !important;
      font-weight: bold !important;
      color: #000000 !important;
      margin-bottom: 16px !important;
    }

    .pdf-export h2 {
      font-size: 20px !important;
      font-weight: bold !important;
      color: #000000 !important;
      margin-bottom: 12px !important;
    }

    .pdf-export h3 {
      font-size: 16px !important;
      font-weight: bold !important;
      color: #000000 !important;
      margin-bottom: 8px !important;
    }

    .pdf-export h4 {
      font-size: 14px !important;
      font-weight: bold !important;
      color: #000000 !important;
      margin-bottom: 6px !important;
    }

    .pdf-export h5 {
      font-size: 12px !important;
      font-weight: bold !important;
      color: #000000 !important;
      margin-bottom: 4px !important;
    }

    .pdf-export p {
      font-size: 11px !important;
      color: #000000 !important;
      margin-bottom: 4px !important;
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
    .pdf-export .action-plan-section {
      background: white !important;
      color: black !important;
    }
    
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
      border: 1px solid #ccc !important;
      border-radius: 4px !important;
      background: #f5f5f5 !important;
      color: #000000 !important;
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
    
    /* Border and spacing styles */
    .pdf-export .border {
      border: 1px solid #d1d5db !important;
    }
    
    .pdf-export .rounded-lg {
      border-radius: 8px !important;
    }
    
    .pdf-export .p-4 {
      padding: 16px !important;
    }
    
    .pdf-export .p-2 {
      padding: 8px !important;
    }
    
    .pdf-export .mb-3 {
      margin-bottom: 12px !important;
    }
    
    .pdf-export .mb-4 {
      margin-bottom: 16px !important;
    }
    
    .pdf-export .mb-6 {
      margin-bottom: 24px !important;
    }
    
    .pdf-export .space-y-6 > *:not(:first-child) {
      margin-top: 24px !important;
    }
    
    .pdf-export .space-y-4 > *:not(:first-child) {
      margin-top: 16px !important;
    }
    
    .pdf-export .grid {
      display: block !important;
    }
    
    .pdf-export .grid > * {
      display: block !important;
      margin-bottom: 8px !important;
    }
    
    /* Hide interactive elements in PDF */
    .pdf-export button,
    .pdf-export .print\\:hidden,
    .pdf-export input[type="checkbox"] {
      display: none !important;
    }
    
    /* Text visibility */
    .pdf-export .text-center {
      text-align: center !important;
    }
    
    .pdf-export .font-bold {
      font-weight: bold !important;
    }
    
    .pdf-export .font-semibold {
      font-weight: 600 !important;
    }
    
    .pdf-export .font-medium {
      font-weight: 500 !important;
    }
    
    /* List styles */
    .pdf-export .list-decimal {
      list-style-type: decimal !important;
      padding-left: 20px !important;
    }
    
    .pdf-export .list-inside {
      list-style-position: inside !important;
    }
    
    .pdf-export ol, .pdf-export ul {
      margin-bottom: 8px !important;
    }
    
    .pdf-export li {
      margin-bottom: 4px !important;
      color: #000000 !important;
    }
    
    /* Specific content visibility */
    .pdf-export strong {
      font-weight: bold !important;
      color: #000000 !important;
    }
    
    .pdf-export .text-2xl {
      font-size: 20px !important;
      font-weight: bold !important;
      color: #000000 !important;
    }
    
    .pdf-export .text-xl {
      font-size: 18px !important;
      color: #000000 !important;
    }
    
    .pdf-export .text-lg {
      font-size: 16px !important;
      color: #000000 !important;
    }
    
    .pdf-export .text-sm {
      font-size: 11px !important;
      color: #000000 !important;
    }
    
    .pdf-export .text-xs {
      font-size: 10px !important;
      color: #000000 !important;
    }
  `;
};
