
import html2pdf from 'html2pdf.js';
import { getPdfStyles } from './pdf/index';
import { getDefaultPdfOptions, getBusinessMapPdfOptions, getPUVPdfOptions, getMapaEquipePdfOptions } from './pdf/index';

export const generatePDF = (element: HTMLDivElement, onComplete?: () => void) => {
  // Add classes to the content temporarily for PDF styling
  element.classList.add('pdf-export');

  // Create a style element for PDF export styles
  const styleElement = document.createElement('style');
  styleElement.innerHTML = getPdfStyles();
  document.head.appendChild(styleElement);

  // Get PDF options based on element type
  let pdfOptions = getDefaultPdfOptions();
  
  // Check element classes to determine which PDF options to use
  if (element.classList.contains('business-map')) {
    pdfOptions = getBusinessMapPdfOptions();
  } else if (element.classList.contains('puv-preview')) {
    pdfOptions = getPUVPdfOptions();
  } else if (element.classList.contains('mapa-equipe-preview')) {
    console.log('Using Mapa Equipe PDF options');
    pdfOptions = getMapaEquipePdfOptions();
  }

  // Generate the PDF
  html2pdf()
    .set(pdfOptions)
    .from(element)
    .save()
    .then(() => {
      // Remove the temporary class and styles after PDF generation
      element.classList.remove('pdf-export');
      document.head.removeChild(styleElement);
      
      if (onComplete) {
        onComplete();
      }
    })
    .catch((error) => {
      console.error('Error generating PDF:', error);
      element.classList.remove('pdf-export');
      document.head.removeChild(styleElement);
    });
};
