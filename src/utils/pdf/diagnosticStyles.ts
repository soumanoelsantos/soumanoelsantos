
/**
 * Diagnostic-specific PDF styling
 * Contains styles for diagnostic action plan PDF exports
 */

export const getDiagnosticPdfStyles = (): string => {
  return `
    /* Base styles for diagnostic PDF export */
    .pdf-export {
      color: #000000 !important;
      background-color: #ffffff !important;
      font-family: Arial, sans-serif !important;
      font-size: 12px !important;
      line-height: 1.4 !important;
      padding: 20px !important;
      margin: 0 !important;
      width: 100% !important;
      box-sizing: border-box !important;
    }
    
    /* All text elements */
    .pdf-export *,
    .pdf-export h1,
    .pdf-export h2,
    .pdf-export h3,
    .pdf-export h4,
    .pdf-export p,
    .pdf-export div,
    .pdf-export span,
    .pdf-export li,
    .pdf-export td,
    .pdf-export th {
      color: #000000 !important;
      font-family: Arial, sans-serif !important;
    }
    
    /* Headers */
    .pdf-export h1 {
      font-size: 24px !important;
      font-weight: bold !important;
      margin: 0 0 15px 0 !important;
      text-align: center !important;
    }
    
    .pdf-export h2 {
      font-size: 18px !important;
      font-weight: bold !important;
      margin: 20px 0 10px 0 !important;
    }
    
    .pdf-export h3 {
      font-size: 16px !important;
      font-weight: bold !important;
      margin: 15px 0 8px 0 !important;
    }
    
    .pdf-export h4 {
      font-size: 14px !important;
      font-weight: bold !important;
      margin: 10px 0 5px 0 !important;
    }
    
    /* Paragraphs and text */
    .pdf-export p {
      margin: 5px 0 !important;
      font-size: 12px !important;
    }
    
    /* Spacing */
    .pdf-export .space-y-8 > * {
      margin-top: 15px !important;
      margin-bottom: 15px !important;
    }
    
    /* Lists */
    .pdf-export ul,
    .pdf-export ol {
      padding-left: 20px !important;
      margin: 10px 0 !important;
    }
    
    .pdf-export li {
      margin-bottom: 5px !important;
      font-size: 12px !important;
    }
    
    /* Tables */
    .pdf-export table {
      width: 100% !important;
      border-collapse: collapse !important;
      margin: 10px 0 !important;
    }
    
    .pdf-export th,
    .pdf-export td {
      border: 1px solid #ccc !important;
      padding: 8px !important;
      text-align: left !important;
      font-size: 11px !important;
    }
    
    .pdf-export th {
      background-color: #f5f5f5 !important;
      font-weight: bold !important;
    }
    
    /* Cards and containers */
    .pdf-export .card {
      border: 1px solid #ccc !important;
      border-radius: 5px !important;
      margin: 10px 0 !important;
      padding: 15px !important;
      background-color: #ffffff !important;
    }
    
    /* Grid layouts */
    .pdf-export .grid {
      display: block !important;
    }
    
    .pdf-export .flex {
      display: block !important;
    }
    
    /* Specific diagnostic elements */
    .pdf-export .action-item {
      border: 1px solid #ddd !important;
      border-radius: 5px !important;
      padding: 15px !important;
      margin: 10px 0 !important;
      background-color: #ffffff !important;
      page-break-inside: avoid !important;
    }
    
    .pdf-export .priority-badge {
      padding: 3px 8px !important;
      border-radius: 3px !important;
      font-size: 10px !important;
      font-weight: bold !important;
      color: #ffffff !important;
    }
    
    .pdf-export .priority-alta {
      background-color: #ef4444 !important;
    }
    
    .pdf-export .priority-media {
      background-color: #f59e0b !important;
    }
    
    .pdf-export .priority-baixa {
      background-color: #10b981 !important;
    }
    
    /* Statistics section */
    .pdf-export .stats-container {
      border: 1px solid #ccc !important;
      padding: 15px !important;
      margin: 15px 0 !important;
      background-color: #f9f9f9 !important;
    }
    
    .pdf-export .stat-item {
      display: inline-block !important;
      margin: 5px 15px 5px 0 !important;
      padding: 10px !important;
      border: 1px solid #ddd !important;
      border-radius: 3px !important;
      background-color: #ffffff !important;
    }
    
    /* Footer */
    .pdf-export .footer {
      margin-top: 30px !important;
      padding-top: 20px !important;
      border-top: 1px solid #ccc !important;
      text-align: center !important;
      font-size: 10px !important;
      color: #666666 !important;
    }
    
    /* Page breaks */
    .pdf-export .page-break {
      page-break-before: always !important;
    }
    
    .pdf-export .avoid-break {
      page-break-inside: avoid !important;
    }
    
    /* Hide elements not needed in PDF */
    .pdf-export .print\\:hidden,
    .pdf-export button,
    .pdf-export .btn,
    .pdf-export .cursor-pointer {
      display: none !important;
    }
    
    /* Force visibility for important content */
    .pdf-export .pdf-content,
    .pdf-export .action-plan-content,
    .pdf-export .diagnostic-content {
      display: block !important;
      visibility: visible !important;
      opacity: 1 !important;
    }
  `;
};

export const getDiagnosticPdfOptionsConfig = () => {
  return {
    margin: [10, 10, 10, 10],
    filename: 'plano-aceleracao-empresarial.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      logging: true, 
      useCORS: true,
      allowTaint: true,
      backgroundColor: '#ffffff',
      windowWidth: 1200,
      windowHeight: 800
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
