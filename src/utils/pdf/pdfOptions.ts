
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
    margin: [5, 5, 5, 5], // Reduced margins for more space
    filename: 'mapa-do-negocio.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { 
      scale: 2,
      logging: true, 
      useCORS: true,
      allowTaint: true,
      windowWidth: 1200, // Set fixed width for consistent rendering
      windowHeight: 800  // Set fixed height for consistent rendering
    },
    jsPDF: { 
      unit: 'mm', 
      format: 'a4', 
      orientation: 'landscape',
      compress: true
    },
    pagebreak: { mode: ['avoid-all'] }
  };
};
