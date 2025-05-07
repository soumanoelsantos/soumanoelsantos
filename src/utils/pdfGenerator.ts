
import html2pdf from 'html2pdf.js';
import { getPDFOptionsConfig } from './pdf/pdfOptions';
import { getPUVPdfOptionsConfig, getPUVPdfStyles } from './pdf/puvStyles';

/**
 * Generates a PDF from a given HTML element
 * @param element The HTML element to convert to PDF
 * @param fileName Optional custom filename
 */
export const generatePDF = (element: HTMLElement, fileName?: string) => {
  try {
    // Default options
    let options = getPDFOptionsConfig();
    
    // Check if the element has PUV specific class
    if (element.classList.contains('puv-preview')) {
      // Add PUV specific styles
      const styleElement = document.createElement('style');
      styleElement.textContent = getPUVPdfStyles();
      element.appendChild(styleElement);
      
      // Use PUV specific options if available
      options = getPUVPdfOptionsConfig();
      
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
    } else {
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
    }

    // Generate PDF
    html2pdf().from(element).set(options).save();
    
    // Remove any temporary style elements after a delay
    setTimeout(() => {
      if (element.classList.contains('puv-preview')) {
        const styleElements = element.querySelectorAll('style');
        styleElements.forEach(el => {
          if (el.textContent?.includes('puv-preview')) {
            el.remove();
          }
        });
      }
    }, 1000);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
