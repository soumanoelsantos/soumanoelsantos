
import html2pdf from 'html2pdf.js';
import { getPdfStyles, getPdfOptions } from './pdfStyles';

export const generatePDF = (element: HTMLDivElement, onComplete?: () => void) => {
  // Add classes to the content temporarily for PDF styling
  element.classList.add('pdf-export');

  // Create a style element for PDF export styles
  const styleElement = document.createElement('style');
  styleElement.innerHTML = getPdfStyles();
  document.head.appendChild(styleElement);

  // Generate the PDF
  html2pdf()
    .set(getPdfOptions())
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
