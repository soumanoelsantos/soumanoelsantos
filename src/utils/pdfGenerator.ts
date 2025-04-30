
import html2pdf from 'html2pdf.js';
import { getPdfStyles } from './pdf/index';
import { getDefaultPdfOptions, getBusinessMapPdfOptions } from './pdf/pdfOptions';

export const generatePDF = (element: HTMLDivElement, onComplete?: () => void) => {
  // Add classes to the content temporarily for PDF styling
  element.classList.add('pdf-export');

  // Create a style element for PDF export styles
  const styleElement = document.createElement('style');
  styleElement.innerHTML = getPdfStyles();
  document.head.appendChild(styleElement);

  // Get PDF options based on element type
  let pdfOptions = getDefaultPdfOptions();
  if (element.classList.contains('business-map')) {
    pdfOptions = getBusinessMapPdfOptions();
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
    });
};
