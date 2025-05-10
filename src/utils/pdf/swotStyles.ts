
/**
 * PDF Styles for SWOT analysis
 * Contains custom styles for PDF generation
 */

export const getSwotPdfStyles = () => {
  return `
    .swot-pdf-container {
      font-family: 'Arial', sans-serif;
      color: #333;
      line-height: 1.5;
    }

    .swot-pdf-container h1 {
      font-size: 24px;
      color: #1a202c;
      text-align: center;
      margin-bottom: 15px;
    }

    .swot-pdf-container h2 {
      font-size: 18px;
      color: #2d3748;
      margin-bottom: 10px;
      border-bottom: 1px solid #e2e8f0;
      padding-bottom: 5px;
    }

    .swot-pdf-container ul {
      margin-left: 15px;
      margin-bottom: 20px;
    }

    .swot-pdf-container li {
      margin-bottom: 8px;
      page-break-inside: avoid;
    }

    .swot-pdf-container a {
      color: #4299e1;
      text-decoration: none;
    }

    /* Prevent page breaks inside strategy sections */
    .swot-pdf-container div {
      page-break-inside: avoid;
    }

    /* PDF CTA Section */
    .swot-pdf-container .mt-12 {
      margin-top: 30px;
    }

    .swot-pdf-container .border-t {
      border-top: 1px solid #e2e8f0;
    }

    .swot-pdf-container .pt-6 {
      padding-top: 20px;
    }

    /* Make sure the CTA section starts on a new page */
    .swot-pdf-container .mt-12 {
      page-break-before: always;
    }

    /* Ensure proper styling for the CTA button in the PDF */
    .swot-pdf-container a.bg-yellow-500 {
      background-color: #f6e05e;
      color: #1a202c;
      padding: 10px 20px;
      border-radius: 5px;
      font-weight: bold;
      display: inline-block;
      margin-top: 15px;
      text-decoration: none;
    }
  `;
};

export const getSwotPdfOptionsConfig = () => {
  return {
    margin: [15, 10, 15, 10], // Top, right, bottom, left margins
    filename: 'plano_acao_swot.pdf',
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
