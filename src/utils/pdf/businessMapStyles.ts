
/**
 * Business Map specific PDF styling
 * Contains styles for the business map in PDF exports
 */

export const getBusinessMapPdfStyles = (): string => {
  return `
    /* Business Map specific PDF styles */
    .pdf-export .business-map {
      width: 100% !important;
      page-break-inside: avoid !important;
      transform: scale(0.95) !important;
      transform-origin: top center !important;
    }
    
    .pdf-export .business-map-header {
      margin-bottom: 10px !important;
    }
    
    .pdf-export .business-map-header h2 {
      font-size: 20px !important;
      font-weight: bold !important;
      margin-bottom: 2px !important;
      color: #000000 !important;
    }
    
    .pdf-export .business-map-header p {
      font-size: 14px !important;
      margin-bottom: 8px !important;
      color: #000000 !important;
    }
    
    .pdf-export .business-map-grid {
      display: grid !important;
      gap: 4px !important;
      grid-auto-rows: auto !important;
    }
    
    .pdf-export .map-card {
      border: 1px solid #333333 !important;
      padding: 5px !important;
      overflow: hidden !important;
    }
    
    .pdf-export .map-card h3 {
      font-size: 10px !important;
      font-weight: bold !important;
      margin-bottom: 2px !important;
      color: #000000 !important;
    }
    
    .pdf-export .map-card p {
      font-size: 9px !important;
      color: #000000 !important;
      line-height: 1.2 !important;
      word-break: break-word !important;
    }
  `;
};
