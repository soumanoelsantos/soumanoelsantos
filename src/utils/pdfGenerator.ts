
import html2pdf from 'html2pdf.js';
import { getDefaultPdfOptionsConfig } from './pdf/pdfOptions';
import { getPUVPdfOptionsConfig, getPUVPdfStyles } from './pdf/puvStyles';
import { getMapaEquipePdfOptionsConfig, getMapaEquipeStyles } from './pdf/mapaEquipeStyles';

/**
 * Generates a PDF from a given HTML element
 * @param element The HTML element to convert to PDF
 * @param fileName Optional custom filename
 */
export const generatePDF = (element: HTMLElement, fileName?: string) => {
  try {
    // Default options
    let options = getDefaultPdfOptionsConfig();
    
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
    } 
    // Check if the element has mapa-equipe specific class
    else if (element.classList.contains('mapa-equipe-preview')) {
      // Add mapa-equipe specific styles
      const styleElement = document.createElement('style');
      styleElement.textContent = getMapaEquipeStyles();
      element.appendChild(styleElement);
      
      // Use mapa-equipe specific options if available
      options = getMapaEquipePdfOptionsConfig();
      
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
    }
    else {
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
    }

    // Generate PDF
    html2pdf().from(element).set(options).save();
    
    // Remove any temporary style elements after a delay
    setTimeout(() => {
      const styleElements = element.querySelectorAll('style');
      styleElements.forEach(el => {
        if (el.textContent?.includes('puv-preview') || 
            el.textContent?.includes('mapa-equipe-preview')) {
          el.remove();
        }
      });
    }, 1000);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};
