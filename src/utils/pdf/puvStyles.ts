
/**
 * PUV specific PDF styles
 */

export const getPUVPdfStyles = () => {
  return `
    .puv-preview {
      max-width: 800px;
      margin: 0 auto;
      font-family: 'Helvetica', sans-serif;
      color: #333;
    }

    .puv-preview h2 {
      color: #1d365c;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .puv-preview h3 {
      color: #fff;
      background-color: #1d365c;
      padding: 8px 10px;
      font-size: 18px;
      margin: 15px 0;
    }

    .puv-preview .font-bold {
      font-weight: bold;
    }

    @media print {
      .puv-preview {
        padding: 20px;
      }
    }
  `;
};

export const getPUVPdfOptions = () => {
  return {
    margin: [10, 10, 10, 10],
    filename: 'proposta-unica-valor.pdf',
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
