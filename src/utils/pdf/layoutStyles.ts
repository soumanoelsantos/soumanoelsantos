
/**
 * Layout-specific PDF styling
 * Contains styles for layout elements in PDF exports
 */

export const getLayoutPdfStyles = (): string => {
  return `
    /* Tables and content layout */
    .pdf-export .grid {
      display: grid !important;
      grid-template-columns: 1fr 1fr !important;
      gap: 10px !important;
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
  `;
};
