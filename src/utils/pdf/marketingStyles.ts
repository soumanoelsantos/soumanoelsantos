
/**
 * Marketing-specific PDF styling
 * Contains styles for marketing sections in PDF exports
 */

export const getMarketingPdfStyles = (): string => {
  return `
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
      text-align: center !important;
    }
    .pdf-export .pdf-marketing-section h2 span {
      color: #D4AF37 !important;
    }
    .pdf-export .pdf-marketing-section p {
      font-size: 12px !important;
      line-height: 1.4 !important;
      color: #000000 !important;
      margin-bottom: 10px !important;
      text-align: center !important;
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
    
    /* Ajustes para o layout da seção CTA nos PDFs */
    .pdf-export .cta-section {
      display: flex !important;
      align-items: center !important;
      gap: 20px !important;
    }
    .pdf-export .cta-section .image-container {
      width: 20% !important;
      max-width: 150px !important;
      flex-shrink: 0 !important;
    }
    .pdf-export .cta-section .text-container {
      flex-grow: 1 !important;
      text-align: center !important;
    }
  `;
};
