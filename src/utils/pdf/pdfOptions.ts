
/**
 * PDF configuration options
 * Contains options for PDF generation
 */

export const getDefaultPdfOptions = () => {
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

export const getBusinessMapPdfOptions = () => {
  return {
    margin: [10, 10, 10, 10],
    filename: 'mapa-do-negocio.pdf',
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
      orientation: 'landscape',
      compress: true
    },
    pagebreak: { mode: ['avoid-all', 'css', 'legacy'] }
  };
};
