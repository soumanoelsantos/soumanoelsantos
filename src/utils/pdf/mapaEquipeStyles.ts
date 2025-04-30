
/**
 * Mapa da Equipe specific PDF styling
 */

export const getMapaEquipeStyles = () => {
  return `
    .mapa-equipe-preview {
      max-width: 100%;
      margin: 0 auto;
      font-family: 'Helvetica', sans-serif;
      color: #333;
    }

    .mapa-equipe-preview h2 {
      color: #1d365c;
      font-size: 24px;
      margin-bottom: 10px;
    }

    .mapa-equipe-preview h3 {
      color: #fff !important;
      background-color: #1d365c !important;
      padding: 8px 10px;
      font-size: 18px;
      margin: 15px 0;
    }

    .mapa-equipe-preview .bg-\\[\\#1d365c\\] {
      background-color: #1d365c !important;
    }

    .mapa-equipe-preview .bg-\\[\\#1d365c\\] * {
      color: #fff !important;
    }

    .mapa-equipe-preview table {
      width: 100%;
      border-collapse: collapse;
    }

    .mapa-equipe-preview th {
      background-color: #f3f4f6;
      padding: 8px;
      text-align: left;
      font-weight: bold;
      color: #1d365c;
    }

    .mapa-equipe-preview td {
      padding: 8px;
      border-bottom: 1px solid #e5e7eb;
    }

    .mapa-equipe-preview tr:nth-child(even) {
      background-color: #f9fafb;
    }

    @media print {
      .mapa-equipe-preview {
        padding: 20px;
      }
      
      .mapa-equipe-preview th {
        background-color: #f3f4f6 !important;
        -webkit-print-color-adjust: exact;
      }
      
      .mapa-equipe-preview .bg-\\[\\#1d365c\\] {
        background-color: #1d365c !important;
        -webkit-print-color-adjust: exact;
      }
      
      .mapa-equipe-preview .bg-\\[\\#1d365c\\] * {
        color: #fff !important;
      }

      .mapa-equipe-preview .card-header {
        background-color: #1d365c !important;
        -webkit-print-color-adjust: exact;
      }
      
      .mapa-equipe-preview .card-header * {
        color: #fff !important;
      }
    }
  `;
};

export const getMapaEquipePdfOptionsConfig = () => {
  return {
    margin: [10, 10, 10, 10],
    filename: 'mapa-da-equipe.pdf',
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
