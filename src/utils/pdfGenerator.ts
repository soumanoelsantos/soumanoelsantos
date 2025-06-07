
import html2pdf from 'html2pdf.js';
import { getDefaultPdfOptionsConfig } from './pdf/pdfOptions';
import { getPUVPdfOptionsConfig, getPUVPdfStyles } from './pdf/puvStyles';
import { getMapaEquipePdfOptionsConfig, getMapaEquipeStyles } from './pdf/mapaEquipeStyles';
import { getSwotPdfOptionsConfig, getSwotPdfStyles } from './pdf/swotStyles';
import { getDiagnosticPdfOptionsConfig, getDiagnosticPdfStyles } from './pdf/diagnosticStyles';

/**
 * Generates a PDF from a given HTML element
 * @param element The HTML element to convert to PDF
 * @param fileName Optional custom filename
 */
export const generatePDF = (element: HTMLElement, fileName?: string) => {
  try {
    // Default options
    let options = getDefaultPdfOptionsConfig();
    
    // Check if the element has specific class patterns and apply appropriate styles
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
    // Check if the element has swot-pdf-container class
    else if (element.classList.contains('swot-pdf-container')) {
      // Add SWOT specific styles
      const styleElement = document.createElement('style');
      styleElement.textContent = getSwotPdfStyles();
      element.appendChild(styleElement);
      
      // Use SWOT specific options if available
      options = getSwotPdfOptionsConfig();
      
      // Override filename if provided
      if (fileName) {
        options.filename = fileName;
      }
      
      // Add link redirection function to the PDF for CTA button
      const scriptElement = document.createElement('script');
      scriptElement.textContent = `
        document.addEventListener('click', function(e) {
          if (e.target && e.target.closest('a[href="https://soumanoelsantos.com.br"]')) {
            window.open('https://soumanoelsantos.com.br', '_blank');
          }
        });
      `;
      element.appendChild(scriptElement);
    }
    // Check if it's a diagnostic PDF (action plan)
    else if (element.classList.contains('pdf-export') || element.querySelector('.action-plan-content')) {
      // Add diagnostic specific styles
      const styleElement = document.createElement('style');
      styleElement.textContent = getDiagnosticPdfStyles();
      element.appendChild(styleElement);
      
      // Use diagnostic specific options
      options = getDiagnosticPdfOptionsConfig();
      
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
            el.textContent?.includes('mapa-equipe-preview') ||
            el.textContent?.includes('swot-pdf-container') ||
            el.textContent?.includes('pdf-export')) {
          el.remove();
        }
      });
      
      // Remove any temporary script elements
      const scriptElements = element.querySelectorAll('script');
      scriptElements.forEach(el => {
        if (el.textContent?.includes('soumanoelsantos.com.br')) {
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
